import { NextResponse } from 'next/server';
import { ApiError, GoogleGenAI, SafetyFilterLevel, PersonGeneration } from '@google/genai';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, AI_RATE_LIMITS } from '@/lib/server/rateLimit';
import { sanitisePrompt } from '@/lib/server/promptSafety';
import { logError } from '@/lib/utils/errorUtils';

const ai = new GoogleGenAI(
  process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {}
);

const IMAGE_MODEL = 'imagen-4.0-fast-generate-001';

/**
 * The prompt arrives from the browser (it's the `imagePrompt` the story model
 * produced on the previous turn), which means a caller can send anything at
 * all — it is not trusted just because a model authored the original.
 */
const MAX_PROMPT_LENGTH = 600;

export interface StoryImageRequest {
  prompt: string;
}

export interface StoryImageResponse {
  success: boolean;
  imageDataUrl?: string;
  isFallback?: boolean;
  error?: string;
}

// A tiny inline SVG so the image UI has something real to render when Imagen
// isn't reachable yet (no billing on the API key, or a transient outage) —
// no network dependency, no cost, and nothing that needs moderating.
function fallbackImageDataUrl(): string {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">' +
    '<rect width="512" height="512" fill="#eef2ff"/>' +
    '<text x="50%" y="50%" font-size="180" text-anchor="middle" dominant-baseline="central">🪄</text>' +
    '</svg>';
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export async function POST(request: Request): Promise<NextResponse<StoryImageResponse>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { allowed, retryAfterSeconds } = await checkRateLimit(
      request,
      user?.id ?? null,
      AI_RATE_LIMITS.storyImage,
    );

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'יותר מדי איורים בזמן קצר, נסו שוב בעוד כמה דקות' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
      );
    }

    const body: unknown = await request.json();
    const prompt = sanitisePrompt((body as Partial<StoryImageRequest> | null)?.prompt, MAX_PROMPT_LENGTH);

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'לא ניתן לצייר את התיאור הזה' }, { status: 400 });
    }

    try {
      const response = await ai.models.generateImages({
        model: IMAGE_MODEL,
        prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: '1:1',
          outputMimeType: 'image/png',
          // Same guarantees the coloring route asks for: this image is shown to
          // a 5-10 year old, so filter aggressively and never render people.
          safetyFilterLevel: SafetyFilterLevel.BLOCK_LOW_AND_ABOVE,
          personGeneration: PersonGeneration.DONT_ALLOW,
          includeRaiReason: true,
        },
      });
      const generated = response.generatedImages?.[0];
      const base64 = generated?.image?.imageBytes;
      if (!base64) {
        // With BLOCK_LOW_AND_ABOVE in play an empty result is usually the safety
        // filter doing its job, not a fault. The illustration is decorative, so
        // show the placeholder rather than surfacing an error to the child.
        logError('[Story Agent Image] Blocked or empty result', generated?.raiFilteredReason);
        return NextResponse.json({ success: true, imageDataUrl: fallbackImageDataUrl(), isFallback: true });
      }
      return NextResponse.json({ success: true, imageDataUrl: `data:image/png;base64,${base64}` });
    } catch (genError) {
      // Quota (billing not enabled, 429) and model-availability (404) errors are
      // expected until billing is turned on for this key — degrade to a
      // placeholder instead of breaking the story flow. Anything else (a real
      // bug, a malformed request) should surface normally via the outer catch.
      if (genError instanceof ApiError && (genError.status === 429 || genError.status === 404)) {
        logError('[Story Agent Image] Falling back to placeholder:', genError);
        return NextResponse.json({ success: true, imageDataUrl: fallbackImageDataUrl(), isFallback: true });
      }
      throw genError;
    }
  } catch (error) {
    // Generic on purpose — see the story route: raw provider messages must not
    // reach the browser.
    logError('[Story Agent Image] Error:', error);
    return NextResponse.json({ success: false, error: 'לא הצלחנו לצייר את האיור' }, { status: 500 });
  }
}
