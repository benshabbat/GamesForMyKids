import { describe, it, expect, beforeEach } from 'vitest';
import { useWordClickerStore } from '@/app/games/word-clicker/wordClickerStore';

const get = () => useWordClickerStore.getState();

/** Taps the tile that carries the letter the word expects next. */
function tapNextLetter() {
  const { words, wordIndex, currentLetterIndex, floatingLetters } = get();
  const letter = words[wordIndex]![currentLetterIndex]!;
  const tile = floatingLetters.find((l) => l.letter === letter)!;
  get().tapLetter(tile.id);
  return tile;
}

function completeWord() {
  const length = get().words[get().wordIndex]!.length;
  let last = null as ReturnType<typeof tapNextLetter> | null;
  for (let i = 0; i < length; i++) last = tapNextLetter();
  return last!;
}

describe('wordClickerStore', () => {
  beforeEach(() => {
    get().reset();
    get().startGame();
  });

  it('scores a completed word once', () => {
    completeWord();
    expect(get().wordComplete).toBe(true);
    expect(get().score).toBe(1);
  });

  it('ignores re-tapping the last letter during the pause before the next word', () => {
    const lastTile = completeWord();
    for (let i = 0; i < 5; i++) get().tapLetter(lastTile.id);
    expect(get().score).toBe(1);
    expect(get().wordComplete).toBe(true);
    expect(get().feedback).toBe('correct');
  });

  it('ignores any tile tapped during the pause, even a wrong one', () => {
    completeWord();
    const word = get().words[get().wordIndex]!;
    const wrongTile = get().floatingLetters.find((l) => !word.includes(l.letter))!;
    get().tapLetter(wrongTile.id);
    expect(get().feedback).toBe('correct');
    expect(get().floatingLetters.some((l) => l.shaking)).toBe(false);
  });

  it('accepts taps again once the next word has started', () => {
    completeWord();
    get().nextWord();
    expect(get().wordIndex).toBe(1);
    expect(get().wordComplete).toBe(false);
    tapNextLetter();
    expect(get().currentLetterIndex).toBe(1);
  });

  it('scores every word of a full game exactly once', () => {
    for (let i = 0; i < 8; i++) {
      const lastTile = completeWord();
      get().tapLetter(lastTile.id); // impatient double tap
      get().nextWord();
    }
    expect(get().phase).toBe('result');
    expect(get().score).toBe(8);
  });

  it('a wrong letter before completion still gives wrong feedback', () => {
    const word = get().words[0]!;
    const wrongTile = get().floatingLetters.find((l) => !word.includes(l.letter))!;
    get().tapLetter(wrongTile.id);
    expect(get().feedback).toBe('wrong');
    expect(get().score).toBe(0);
  });
});
