import { NextResponse } from 'next/server';
import { ApiError, GoogleGenAI } from '@google/genai';
import { logError } from '@/lib/utils/errorUtils';

const ai = new GoogleGenAI(
  process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {}
);

const IMAGE_MODEL = 'imagen-4.0-fast-generate-001';

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
    const body: StoryImageRequest = await request.json();
    const { prompt } = body;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({ success: false, error: 'prompt is required' }, { status: 400 });
    }

    try {
      const response = await ai.models.generateImages({
        model: IMAGE_MODEL,
        prompt,
        config: { numberOfImages: 1, aspectRatio: '1:1', outputMimeType: 'image/png' },
      });
      const base64 = response.generatedImages?.[0]?.image?.imageBytes;
      if (!base64) {
        throw new Error('Model did not return image data');
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
    const message = error instanceof Error ? error.message : 'Unknown error';
    logError('[Story Agent Image] Error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
