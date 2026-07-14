import { NextResponse } from 'next/server';
import { GoogleGenAI, ApiError, SafetyFilterLevel, PersonGeneration } from '@google/genai';
import sharp from 'sharp';
import { createClient } from '@/lib/supabase/server';
import { logError } from '@/lib/utils/errorUtils';

const ai = new GoogleGenAI(
  process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {}
);

const MAX_PROMPT_LENGTH = 200;
const DAILY_GENERATION_LIMIT = 5;

/**
 * Cheap first-pass filter only — the real safety mechanism is Imagen's own
 * safetyFilterLevel/personGeneration config below. This just avoids spending
 * API quota on obviously inappropriate requests.
 */
const DENYLIST = [
  'nude', 'naked', 'sex', 'porn', 'gore', 'blood', 'kill', 'murder', 'weapon', 'gun', 'knife',
  'suicide', 'drug', 'nazi',
  'עירום', 'סקס', 'דם', 'להרוג', 'רצח', 'נשק', 'אקדח', 'סכין', 'אלימות',
];

function containsDenylistedTerm(text: string): boolean {
  const lower = text.toLowerCase();
  return DENYLIST.some((term) => lower.includes(term));
}

export interface GenerateColoringPageResponse {
  success: boolean;
  page?: { id: string; src: string; width: number; height: number };
  error?: string;
}

export async function POST(request: Request): Promise<NextResponse<GenerateColoringPageResponse>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'יש להתחבר כדי ליצור דפי צביעה חדשים' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const rawPrompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';

    if (!rawPrompt) {
      return NextResponse.json({ success: false, error: 'נא לתאר מה לצייר' }, { status: 400 });
    }
    if (rawPrompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { success: false, error: 'התיאור ארוך מדי, נסו לקצר' },
        { status: 400 },
      );
    }
    if (containsDenylistedTerm(rawPrompt)) {
      return NextResponse.json(
        { success: false, error: 'לא ניתן ליצור תמונה מהתיאור הזה, נסו תיאור אחר' },
        { status: 400 },
      );
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from('generated_coloring_pages')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', since);

    if ((count ?? 0) >= DAILY_GENERATION_LIMIT) {
      return NextResponse.json(
        { success: false, error: 'הגעת למכסה היומית של דפי צביעה חדשים, נסו שוב מחר' },
        { status: 429 },
      );
    }

    const fullPrompt =
      'A black-and-white coloring book page for young children. Simple, bold, ' +
      'clean thick black outlines only, no shading, no gray tones, no color fills, ' +
      'flat plain white background, friendly cartoon style, appropriate for a 3-8 ' +
      'year old child. The picture shows: ' + rawPrompt +
      '. No text or letters anywhere in the image. No violence, no scary or ' +
      'frightening imagery, no realistic human faces, no brand logos.';

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-fast-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/png',
        safetyFilterLevel: SafetyFilterLevel.BLOCK_LOW_AND_ABOVE,
        personGeneration: PersonGeneration.DONT_ALLOW,
        includeRaiReason: true,
      },
    });

    const generated = response.generatedImages?.[0];
    const imageBytes = generated?.image?.imageBytes;

    if (!imageBytes) {
      logError('[Coloring Generate] Blocked or empty result', generated?.raiFilteredReason);
      return NextResponse.json(
        { success: false, error: 'לא הצלחנו ליצור תמונה מהתיאור הזה, נסו לתאר משהו אחר' },
        { status: 422 },
      );
    }

    const buffer = Buffer.from(imageBytes, 'base64');
    const metadata = await sharp(buffer).metadata();
    const width = metadata.width ?? 1024;
    const height = metadata.height ?? 1024;

    const path = `${user.id}/${crypto.randomUUID()}.png`;
    const { error: uploadError } = await supabase.storage
      .from('coloring-pages')
      .upload(path, buffer, { contentType: 'image/png', upsert: false });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('coloring-pages').getPublicUrl(path);

    const { data: row, error: insertError } = await supabase
      .from('generated_coloring_pages')
      .insert({ user_id: user.id, prompt: rawPrompt, image_url: publicUrl, width, height })
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json({
      success: true,
      page: { id: row.id, src: publicUrl, width, height },
    });
  } catch (error) {
    if (error instanceof ApiError && (error.status === 429 || error.status === 404)) {
      logError('[Coloring Generate] Gemini API unavailable', error);
      return NextResponse.json(
        { success: false, error: 'שירות היצירה עמוס כרגע, נסו שוב בעוד כמה דקות' },
        { status: 503 },
      );
    }
    logError('[Coloring Generate] Error:', error);
    return NextResponse.json(
      { success: false, error: 'משהו השתבש, נסו שוב' },
      { status: 500 },
    );
  }
}
