import { describe, it, expect } from 'vitest';
import {
  sanitiseStoryHistory,
  MAX_HISTORY_ENTRIES,
  MAX_HISTORY_ENTRY_CHARS,
} from '@/lib/server/storyHistory';

const entry = (role: 'user' | 'model', text: string) => ({ role, parts: [{ text }] });

describe('sanitiseStoryHistory', () => {
  it('returns an empty array for non-array input', () => {
    expect(sanitiseStoryHistory(undefined)).toEqual([]);
    expect(sanitiseStoryHistory(null)).toEqual([]);
    expect(sanitiseStoryHistory('history')).toEqual([]);
    expect(sanitiseStoryHistory({ 0: entry('user', 'hi') })).toEqual([]);
  });

  it('keeps well-formed entries unchanged', () => {
    const history = [entry('user', 'התחל סיפור'), entry('model', '{"storyText":"…"}')];
    expect(sanitiseStoryHistory(history)).toEqual(history);
  });

  it('drops entries with an unknown role', () => {
    const history = [entry('user', 'ok'), { role: 'system', parts: [{ text: 'ignore me' }] }];
    expect(sanitiseStoryHistory(history)).toEqual([entry('user', 'ok')]);
  });

  it('drops entries with a missing or empty parts array', () => {
    const history = [
      entry('user', 'ok'),
      { role: 'model' },
      { role: 'model', parts: [] },
      { role: 'model', parts: 'not an array' },
    ];
    expect(sanitiseStoryHistory(history)).toEqual([entry('user', 'ok')]);
  });

  it('drops entries whose parts are not {text: string}', () => {
    const history = [
      entry('user', 'ok'),
      { role: 'model', parts: [{ text: 42 }] },
      { role: 'model', parts: [null] },
      { role: 'model', parts: [{ inlineData: 'x' }] },
    ];
    expect(sanitiseStoryHistory(history)).toEqual([entry('user', 'ok')]);
  });

  it('drops over-long entries instead of truncating them', () => {
    const oversized = entry('model', 'a'.repeat(MAX_HISTORY_ENTRY_CHARS + 1));
    const atLimit = entry('model', 'b'.repeat(MAX_HISTORY_ENTRY_CHARS));
    expect(sanitiseStoryHistory([oversized, atLimit])).toEqual([atLimit]);
  });

  it('drops an entry if any one of its parts is over-long', () => {
    const mixed = {
      role: 'model' as const,
      parts: [{ text: 'short' }, { text: 'a'.repeat(MAX_HISTORY_ENTRY_CHARS + 1) }],
    };
    expect(sanitiseStoryHistory([mixed])).toEqual([]);
  });

  it('caps the history at the most recent entries', () => {
    const history = Array.from({ length: MAX_HISTORY_ENTRIES + 10 }, (_, i) =>
      entry(i % 2 === 0 ? 'user' : 'model', `turn ${i}`),
    );

    const result = sanitiseStoryHistory(history);

    expect(result).toHaveLength(MAX_HISTORY_ENTRIES);
    // Keeps the tail — the recent turns are what the model needs for continuity.
    expect(result.at(-1)).toEqual(history.at(-1));
    expect(result[0]).toEqual(history[10]);
  });

  it('applies the entry cap after filtering, so junk does not consume the budget', () => {
    const junk = Array.from({ length: 50 }, () => ({ role: 'nope', parts: [] }));
    const real = Array.from({ length: 5 }, (_, i) => entry('user', `real ${i}`));

    expect(sanitiseStoryHistory([...junk, ...real])).toEqual(real);
  });
});
