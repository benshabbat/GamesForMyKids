import { describe, expect, it } from 'vitest';
import { MAZE_WORDS, MAZE_WORD_LENGTH, type MazeDifficulty } from '@/lib/constants/wordMazeWords';

const LEVELS = Object.keys(MAZE_WORDS) as MazeDifficulty[];

// Plain Hebrew letters only (including final forms): no niqqud, spaces or Latin characters.
const PLAIN_HEBREW = /^[\u05D0-\u05EA]+$/;

describe('word-maze word lists', () => {
  it.each(LEVELS)('every %s word has exactly the number of letters the level label promises', (level) => {
    for (const word of MAZE_WORDS[level]) {
      expect(Array.from(word), `${word} (${level})`).toHaveLength(MAZE_WORD_LENGTH[level]);
    }
  });

  it.each(LEVELS)('%s words are plain Hebrew letters', (level) => {
    for (const word of MAZE_WORDS[level]) {
      expect(word, `${word} (${level})`).toMatch(PLAIN_HEBREW);
    }
  });

  it.each(LEVELS)('%s has enough different words to keep replays fresh', (level) => {
    expect(new Set(MAZE_WORDS[level]).size).toBe(MAZE_WORDS[level].length);
    expect(MAZE_WORDS[level].length).toBeGreaterThanOrEqual(7);
  });

  it('levels get longer: easy < medium < hard', () => {
    expect(MAZE_WORD_LENGTH.easy).toBeLessThan(MAZE_WORD_LENGTH.medium);
    expect(MAZE_WORD_LENGTH.medium).toBeLessThan(MAZE_WORD_LENGTH.hard);
  });

  it('no word appears on two levels', () => {
    const all = LEVELS.flatMap((level) => [...MAZE_WORDS[level]]);
    expect(new Set(all).size).toBe(all.length);
  });
});
