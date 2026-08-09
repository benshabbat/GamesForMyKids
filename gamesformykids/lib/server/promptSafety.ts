import 'server-only';

/**
 * ===============================================
 * Prompt safety — shared by the AI routes
 * ===============================================
 *
 * Cheap first-pass filter only. The real safety mechanism is the model's own
 * safety config (`safetyFilterLevel` / `personGeneration` on Imagen, the system
 * instruction on Gemini). This exists to avoid spending API quota on obviously
 * inappropriate requests, and to keep one denylist instead of a copy per route.
 */

const DENYLIST = [
  'nude', 'naked', 'sex', 'porn', 'gore', 'blood', 'kill', 'murder', 'weapon', 'gun', 'knife',
  'suicide', 'drug', 'nazi',
  'עירום', 'סקס', 'דם', 'להרוג', 'רצח', 'נשק', 'אקדח', 'סכין', 'אלימות',
];

/** Control characters carry no meaning for a model and are a common way to
 *  smuggle formatting past a naive substring denylist. */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

export function containsDenylistedTerm(text: string): boolean {
  const lower = text.toLowerCase();
  return DENYLIST.some((term) => lower.includes(term));
}

/**
 * Normalises free text arriving from a client before it reaches a model.
 *
 * Returns null when the text is unusable (wrong type, empty, over-long, or
 * denylisted) so callers can reject with a single check. Callers decide the
 * user-facing message — the reason is deliberately not surfaced, since telling
 * a caller *which* rule they tripped is a free oracle for probing the filter.
 */
export function sanitisePrompt(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;

  const cleaned = value.replace(CONTROL_CHARS, ' ').trim();

  if (!cleaned || cleaned.length > maxLength) return null;
  if (containsDenylistedTerm(cleaned)) return null;

  return cleaned;
}
