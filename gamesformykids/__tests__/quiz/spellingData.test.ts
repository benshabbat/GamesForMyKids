import { describe, expect, it } from 'vitest';
import { SPELLING_WORDS } from '@/lib/quiz/data/spelling';

describe('spelling quiz data', () => {
  it('offers four distinct choices for every word', () => {
    const bad = SPELLING_WORDS.filter((q) => new Set([q.word, ...q.wrong]).size !== 4);
    expect(bad.map((q) => q.word)).toEqual([]);
  });
});
