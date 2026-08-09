import 'server-only';

/**
 * ===============================================
 * Story conversation history — validation & caps
 * ===============================================
 *
 * The story game keeps its conversation history in the browser and posts it
 * back on every turn, so the request body decides how many tokens we pay Gemini
 * for. Everything here exists to bound that.
 */

export interface StoryHistoryEntry {
  role: 'user' | 'model';
  parts: { text: string }[];
}

/**
 * Generous enough for a full 4-6 chapter story (two entries per turn) plus
 * slack, small enough that a crafted body can't balloon the prompt.
 */
export const MAX_HISTORY_ENTRIES = 24;
export const MAX_HISTORY_ENTRY_CHARS = 4000;

function isValidEntry(entry: unknown): entry is StoryHistoryEntry {
  if (typeof entry !== 'object' || entry === null) return false;

  const { role, parts } = entry as Partial<StoryHistoryEntry>;
  if (role !== 'user' && role !== 'model') return false;
  if (!Array.isArray(parts) || parts.length === 0) return false;

  return parts.every((part) => {
    if (typeof part !== 'object' || part === null) return false;
    const text = (part as { text?: unknown }).text;
    return typeof text === 'string' && text.length <= MAX_HISTORY_ENTRY_CHARS;
  });
}

/**
 * Validates client-supplied history and trims it to the most recent turns.
 *
 * Malformed entries are dropped rather than rejected outright: a browser
 * holding a stale shape shouldn't hard-fail a child's story, and the worst case
 * of dropping context is that the model gets a shorter recap. Oversized entries
 * are dropped for the same reason — truncating them mid-sentence would feed the
 * model a corrupted transcript.
 */
export function sanitiseStoryHistory(value: unknown): StoryHistoryEntry[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isValidEntry).slice(-MAX_HISTORY_ENTRIES);
}
