import { describe, expect, it } from 'vitest';
import { TYPING_WORDS_BY_LEVEL, TYPING_WORD_PRONUNCIATIONS } from '@/app/games/typing-race/typingWordBank';
import { HEBREW_KEYBOARD_ROWS } from '@/app/games/typing-race/components/HebrewKeyboard';

const KEYBOARD_LETTERS = new Set<string>(HEBREW_KEYBOARD_ROWS.flat());

const ALL_WORDS = Object.entries(TYPING_WORDS_BY_LEVEL).flatMap(([level, words]) =>
  words.map((word) => ({ level, word })),
);

describe('typing-race word bank', () => {
  it('only contains words typeable with the on-screen keyboard (no hyphens, spaces, or niqqud)', () => {
    const untypeable = ALL_WORDS.filter(({ word }) => [...word].some((ch) => !KEYBOARD_LETTERS.has(ch)));
    expect(untypeable).toEqual([]);
  });

  it('has no duplicate words inside a single level', () => {
    for (const [level, words] of Object.entries(TYPING_WORDS_BY_LEVEL)) {
      const list: readonly string[] = words;
      expect({ level, dupes: list.filter((w, i) => list.indexOf(w) !== i) }).toEqual({ level, dupes: [] });
    }
  });

  it('has a pronunciation entry for every word', () => {
    const missing = ALL_WORDS.filter(({ word }) => !(word in TYPING_WORD_PRONUNCIATIONS));
    expect(missing).toEqual([]);
  });

  it('has enough words per level for a 10-word game', () => {
    for (const words of Object.values(TYPING_WORDS_BY_LEVEL)) {
      expect(words.length).toBeGreaterThanOrEqual(10);
    }
  });
});
