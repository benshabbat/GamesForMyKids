import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, AI_RATE_LIMITS } from '@/lib/server/rateLimit';
import { normaliseModelText } from '@/lib/server/promptSafety';
import { sanitiseStoryHistory } from '@/lib/server/storyHistory';
import { logError } from '@/lib/utils/errorUtils';

const ai = new GoogleGenAI(
  process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {}
);

const MAX_CHOICE_LENGTH = 200;
const MAX_POINTS_PER_STORY = 200;

const GAME_TYPE = 'story-agent';

// ── Types ──────────────────────────────────────────────────

export interface StoryResponse {
  storyText: string;
  choices: string[];
  imagePrompt: string;
  isEnding: boolean;
}

export interface StoryAgentRequest {
  history: { role: 'user' | 'model'; parts: { text: string }[] }[];
  userChoice?: string;
}

export interface StoryAgentResponse {
  success: boolean;
  agentResponse?: StoryResponse;
  actionTriggered?: 'awardPointsToUser';
  actionData?: { status: string; newPointsBalance: number };
  error?: string;
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

// ── Local action executed server-side when story ends ──────

/**
 * Persists the points Gemini decided to award onto the child's story-agent
 * progress row, and returns the new balance.
 *
 * Anonymous players get the celebration but nothing to persist to — the game is
 * deliberately playable without an account, so this reports the awarded amount
 * without a stored balance rather than failing the request.
 *
 * The award is clamped: `points` comes from a model function call, and a model
 * is not a trustworthy source for a number that lands in the database.
 */
async function awardPointsToUser(
  supabase: SupabaseServerClient,
  userId: string | null,
  points: number,
): Promise<{ status: string; newPointsBalance: number }> {
  const safePoints = Number.isFinite(points)
    ? Math.min(Math.max(Math.round(points), 0), MAX_POINTS_PER_STORY)
    : 0;

  if (!userId) {
    return { status: 'not-persisted', newPointsBalance: safePoints };
  }

  try {
    const { data: existing } = await supabase
      .from('game_progress')
      .select('score, best_score')
      .eq('user_id', userId)
      .eq('game_type', GAME_TYPE)
      .maybeSingle();

    const newScore = (existing?.score ?? 0) + safePoints;

    const { error } = await supabase.from('game_progress').upsert(
      {
        user_id: userId,
        game_type: GAME_TYPE,
        score: newScore,
        last_score: safePoints,
        best_score: Math.max(existing?.best_score ?? 0, safePoints),
        last_played_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,game_type' },
    );

    if (error) throw error;

    return { status: 'success', newPointsBalance: newScore };
  } catch (error) {
    // A points-write failure must not lose the child their story ending.
    logError('[Story Agent] Failed to persist awarded points:', error);
    return { status: 'not-persisted', newPointsBalance: safePoints };
  }
}

// ── Gemini tool declaration ────────────────────────────────

const gameTools = {
  functionDeclarations: [
    {
      name: 'awardPointsToUser',
      description:
        'מעניקה לילד נקודות כאשר הוא מסיים את הסיפור בהצלחה או פותר חידה משמעותית.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          points: {
            type: Type.INTEGER,
            description: 'כמות הנקודות להעניק (למשל 50, 100)',
          },
        },
        required: ['points'],
      },
    },
  ],
};

// ── JSON output schema ─────────────────────────────────────

const storyResponseSchema = {
  type: Type.OBJECT,
  properties: {
    storyText: {
      type: Type.STRING,
      description:
        'הקטע הבא בסיפור בעברית חמה ומותאמת לילדים בגילאי 5-10, עם ניקוד מלא על כל מילה',
    },
    choices: {
      type: Type.ARRAY,
      description: '2-3 אפשרויות בחירה להמשך הסיפור, כל אפשרות מנוקדת במלואה',
      items: { type: Type.STRING },
    },
    imagePrompt: {
      type: Type.STRING,
      description:
        'Detailed English prompt for an illustration. Style: children coloring page, black and white line art.',
    },
    isEnding: {
      type: Type.BOOLEAN,
      description: 'האם זהו סוף הסיפור?',
    },
  },
  required: ['storyText', 'choices', 'imagePrompt', 'isEnding'],
};

// ── Response parsing ────────────────────────────────────────

function parseStoryResponse(text: string | undefined): StoryResponse {
  const parsed = JSON.parse(text ?? '{}');
  if (
    typeof parsed.storyText !== 'string' ||
    !Array.isArray(parsed.choices) ||
    typeof parsed.imagePrompt !== 'string' ||
    typeof parsed.isEnding !== 'boolean'
  ) {
    throw new Error('Model returned a response that did not match the expected story format');
  }
  return parsed;
}

// ── Route handler ──────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse<StoryAgentResponse>> {
  try {
    // The story game is intentionally playable without an account, so a missing
    // session is fine here — the user id is only used to key the rate limit and
    // to persist points when there's somewhere to persist them to.
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id ?? null;

    const { allowed, retryAfterSeconds } = await checkRateLimit(
      request,
      userId,
      AI_RATE_LIMITS.storyAgent,
    );

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'המספר סיפורים צריך לנוח רגע, נסו שוב בעוד כמה דקות' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
      );
    }

    const body: unknown = await request.json();
    const rawBody = (typeof body === 'object' && body !== null ? body : {}) as Partial<StoryAgentRequest>;
    const history = sanitiseStoryHistory(rawBody.history);

    // A choice gets interpolated into the prompt, so it's capped and normalised
    // — but not denylisted. The text is one of the options the story model
    // itself wrote a turn earlier, and the image-prompt denylist would reject
    // ordinary story words: "דם" (blood) is a substring of "אדם" (person).
    const userChoice =
      rawBody.userChoice === undefined
        ? undefined
        : normaliseModelText(rawBody.userChoice, MAX_CHOICE_LENGTH) ?? undefined;

    if (rawBody.userChoice !== undefined && userChoice === undefined) {
      return NextResponse.json(
        { success: false, error: 'לא ניתן להמשיך עם הבחירה הזו, נסו אפשרות אחרת' },
        { status: 400 },
      );
    }

    const prompt = userChoice
      ? `בחרתי באפשרות: "${userChoice}". המשך את הסיפור בהתאם.`
      : 'התחל סיפור חדש ומלהיב לילדים.';

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] },
      ],
      config: {
        systemInstruction:
          'אתה מספר סיפורים חם, יצירתי ומלהיב לילדים. הסיפורים צריכים להיות מותאמים לגילאי 5-10, מלאי דמיון, ובשפה עברית עשירה אך מובנת. לאחר 4-6 פרקים הגע לסיום מרגש ומספק. חובה לנקד את כל הטקסט העברי (storyText וגם choices) בניקוד מלא ומדויק, כדי שילדים שעדיין לומדים קרוא יוכלו לקרוא בעצמם.',
        responseMimeType: 'application/json',
        responseSchema: storyResponseSchema,
        tools: [gameTools],
      },
    });

    // Handle function call (e.g. awarding points at story end)
    const functionCalls = response.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call && call.name === 'awardPointsToUser') {
        const args = call.args as { points: number };
        const actionData = await awardPointsToUser(supabase, userId, args.points);
        const agentResponse = parseStoryResponse(response.text);
        return NextResponse.json({
          success: true,
          agentResponse,
          actionTriggered: 'awardPointsToUser',
          actionData,
        });
      }
    }

    const agentResponse = parseStoryResponse(response.text);
    return NextResponse.json({ success: true, agentResponse });
  } catch (error) {
    // Deliberately generic: the raw message can carry model/provider internals
    // and stack detail, and this response is rendered straight to a child.
    logError('[Story Agent] Error:', error);
    return NextResponse.json(
      { success: false, error: 'משהו השתבש בסיפור, נסו שוב' },
      { status: 500 },
    );
  }
}
