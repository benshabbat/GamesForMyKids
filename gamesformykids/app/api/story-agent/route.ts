import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { logError } from '@/lib/utils/errorUtils';

const ai = new GoogleGenAI(
  process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {}
);

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

// ── Local action executed server-side when story ends ──────

async function awardPointsToUser(points: number) {
  // TODO: replace with real DB update, e.g. Supabase RPC
  console.log(`[Story Agent] Awarding ${points} points to user`);
  return { status: 'success', newPointsBalance: points };
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
    const body: StoryAgentRequest = await request.json();
    const { history = [], userChoice } = body;

    if (!Array.isArray(history)) {
      return NextResponse.json({ success: false, error: 'history must be an array' }, { status: 400 });
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
        const actionData = await awardPointsToUser(args.points);
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
    const message = error instanceof Error ? error.message : 'Unknown error';
    logError('[Story Agent] Error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
