import { describe, expect, it } from 'vitest';
import { WORD_PUZZLES } from '@/app/games/word-builder/data/words';

describe('word-builder data', () => {
  it('does not describe red with the carrot (carrots are orange)', () => {
    const red = WORD_PUZZLES.find((p) => p.word === 'אדום')!;
    expect(red.hint).not.toContain('גזר');
  });

  it('has unique ids and non-empty hints', () => {
    expect(new Set(WORD_PUZZLES.map((p) => p.id)).size).toBe(WORD_PUZZLES.length);
    for (const p of WORD_PUZZLES) expect(p.hint.trim().length, p.id).toBeGreaterThan(0);
  });
});
