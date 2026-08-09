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

const DENYLIST_EN = [
  'nude', 'naked', 'sex', 'porn', 'gore', 'blood', 'kill', 'murder', 'weapon', 'gun', 'knife',
  'suicide', 'drug', 'nazi',
];

const DENYLIST_HE = [
  'עירום', 'סקס', 'דם', 'להרוג', 'רצח', 'נשק', 'אקדח', 'סכין', 'אלימות',
];

/**
 * Single-letter particles that attach to the front of a Hebrew word (ו/ה/ב/ל/מ/כ/ש).
 * "דם" should still be caught in "הדם" and "בדם" — but not in "אדם".
 */
const HEBREW_PREFIXES = ['', 'ו', 'ה', 'ב', 'ל', 'מ', 'כ', 'ש'];

/** Control characters carry no meaning for a model and are a common way to
 *  smuggle formatting past a naive substring denylist. */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

/** Anything that separates words in either language, including punctuation. */
const TOKEN_SPLIT = /[^\p{L}\p{N}]+/u;

/**
 * Whether `text` contains a denylisted term as a *word*, not as a substring.
 *
 * Substring matching is what this used to do, and it is wrong in both
 * languages. In Hebrew "דם" (blood) sits inside "אדם" (person), "אדמה" (earth)
 * and "קדם"; in English "kill" sits inside "skill" and "gun" inside
 * "gunpowder". A filter that rejects a child's request to draw a person is
 * worse than one that misses a creative spelling — the model's own safety
 * config is the real backstop, and it sees the prompt either way.
 */
export function containsDenylistedTerm(text: string): boolean {
  const tokens = text.toLowerCase().split(TOKEN_SPLIT).filter(Boolean);

  return tokens.some((token) => {
    if (DENYLIST_EN.includes(token)) return true;

    return DENYLIST_HE.some((term) =>
      HEBREW_PREFIXES.some((prefix) => token === prefix + term),
    );
  });
}

/**
 * Trims free text and enforces a length cap, without judging its content.
 *
 * Use this for text the *model* authored that is coming back through the
 * browser — a story choice the child clicked, for instance. It still can't be
 * trusted for length or encoding (the browser could have changed it), but
 * running it through a denylist built for user-typed image prompts only
 * produces false rejections mid-story.
 *
 * Returns null when the text is unusable (wrong type, empty, or over-long).
 */
export function normaliseModelText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;

  const cleaned = value.replace(CONTROL_CHARS, ' ').trim();
  if (!cleaned || cleaned.length > maxLength) return null;

  return cleaned;
}

/**
 * Normalises free text a *user* typed, and rejects denylisted content.
 *
 * Returns null when the text is unusable, so callers can reject with a single
 * check. Callers decide the user-facing message — the reason is deliberately
 * not surfaced, since telling a caller *which* rule they tripped is a free
 * oracle for probing the filter.
 */
export function sanitisePrompt(value: unknown, maxLength: number): string | null {
  const cleaned = normaliseModelText(value, maxLength);
  if (cleaned === null) return null;
  if (containsDenylistedTerm(cleaned)) return null;

  return cleaned;
}
