import { beforeEach, describe, expect, it } from 'vitest';
import { useHangmanStore } from '@/app/games/hangman/hangmanStore';

const store = useHangmanStore;
const MAX_WRONG = 6;

/** Puts the store in a playing state on a known word, so tests don't depend on
 *  which entry startGame's random pick happened to land on. */
function playWord(word: string) {
  store.setState({
    phase: 'playing',
    categoryName: 'חיות',
    entry: { word, hint: 'רמז' },
    guessed: new Set(),
    wrongCount: 0,
  });
}

/** Six wrong guesses' worth of letters that appear in no test word here. */
const WRONG_LETTERS = ['ק', 'ר', 'ש', 'ת', 'ץ', 'ף'];

beforeEach(() => {
  store.setState({
    phase: 'menu',
    categoryName: '',
    entry: { word: '', hint: '' },
    guessed: new Set(),
    wrongCount: 0,
    score: 0,
    streak: 0,
  });
});

describe('hangmanStore', () => {
  describe('startGame', () => {
    it('starts a real word from a known category', () => {
      store.getState().startGame('חיות');
      const { phase, entry, categoryName } = store.getState();

      expect(phase).toBe('playing');
      expect(categoryName).toBe('חיות');
      expect(entry.word.length).toBeGreaterThan(0);
      expect(entry.hint.length).toBeGreaterThan(0);
    });

    it('ignores an unknown category rather than starting an empty round', () => {
      store.getState().startGame('לא-קיים');
      expect(store.getState().phase).toBe('menu');
    });

    it('clears guesses from the previous round', () => {
      playWord('כלב');
      store.getState().guessLetter('כ');
      store.getState().startGame('חיות');

      expect(store.getState().guessed.size).toBe(0);
      expect(store.getState().wrongCount).toBe(0);
    });
  });

  describe('guessLetter', () => {
    it('records a correct letter without costing a life', () => {
      playWord('כלב');
      store.getState().guessLetter('כ');

      expect(store.getState().guessed.has('כ')).toBe(true);
      expect(store.getState().wrongCount).toBe(0);
      expect(store.getState().phase).toBe('playing');
    });

    it('costs a life for a letter not in the word', () => {
      playWord('כלב');
      store.getState().guessLetter('ר');

      expect(store.getState().wrongCount).toBe(1);
      expect(store.getState().phase).toBe('playing');
    });

    it('ignores a repeated guess so it cannot drain lives twice', () => {
      playWord('כלב');
      store.getState().guessLetter('ר');
      store.getState().guessLetter('ר');

      expect(store.getState().wrongCount).toBe(1);
    });

    it('wins once every letter is revealed', () => {
      playWord('כלב');
      for (const letter of ['כ', 'ל', 'ב']) store.getState().guessLetter(letter);

      expect(store.getState().phase).toBe('won');
    });

    it('handles a repeated letter in the word with a single guess', () => {
      // 'ממ' — one guess must reveal both positions, not leave the word unfinished.
      playWord('ממ');
      store.getState().guessLetter('מ');

      expect(store.getState().phase).toBe('won');
    });

    it('loses after the maximum number of wrong guesses', () => {
      playWord('כלב');
      for (const letter of WRONG_LETTERS) store.getState().guessLetter(letter);

      expect(store.getState().wrongCount).toBe(MAX_WRONG);
      expect(store.getState().phase).toBe('lost');
    });

    it('does not lose one guess early', () => {
      playWord('כלב');
      for (const letter of WRONG_LETTERS.slice(0, MAX_WRONG - 1)) {
        store.getState().guessLetter(letter);
      }

      expect(store.getState().phase).toBe('playing');
    });
  });

  describe('scoring', () => {
    it('awards the full bonus for a flawless word', () => {
      playWord('כלב');
      for (const letter of ['כ', 'ל', 'ב']) store.getState().guessLetter(letter);

      // 50 base + (6 - 0 wrong) * 10
      expect(store.getState().score).toBe(110);
    });

    it('shrinks the bonus with each wrong guess', () => {
      playWord('כלב');
      store.getState().guessLetter('ר');
      store.getState().guessLetter('ש');
      for (const letter of ['כ', 'ל', 'ב']) store.getState().guessLetter(letter);

      // 50 base + (6 - 2 wrong) * 10
      expect(store.getState().score).toBe(90);
    });

    it('accumulates score across words', () => {
      playWord('כלב');
      for (const letter of ['כ', 'ל', 'ב']) store.getState().guessLetter(letter);
      const afterFirst = store.getState().score;

      playWord('פיל');
      for (const letter of ['פ', 'י', 'ל']) store.getState().guessLetter(letter);

      expect(store.getState().score).toBe(afterFirst * 2);
    });

    it('builds a streak on wins and resets it on a loss', () => {
      playWord('כלב');
      for (const letter of ['כ', 'ל', 'ב']) store.getState().guessLetter(letter);
      expect(store.getState().streak).toBe(1);

      playWord('פיל');
      for (const letter of ['פ', 'י', 'ל']) store.getState().guessLetter(letter);
      expect(store.getState().streak).toBe(2);

      playWord('כלב');
      for (const letter of WRONG_LETTERS) store.getState().guessLetter(letter);
      expect(store.getState().streak).toBe(0);
    });
  });

  describe('nextWord', () => {
    it('keeps the score and streak but clears the board', () => {
      playWord('כלב');
      for (const letter of ['כ', 'ל', 'ב']) store.getState().guessLetter(letter);
      const { score, streak } = store.getState();

      store.getState().nextWord();

      expect(store.getState().phase).toBe('playing');
      expect(store.getState().guessed.size).toBe(0);
      expect(store.getState().wrongCount).toBe(0);
      expect(store.getState().score).toBe(score);
      expect(store.getState().streak).toBe(streak);
    });

    it('does nothing when the category is unknown', () => {
      store.setState({ phase: 'won', categoryName: 'לא-קיים' });
      store.getState().nextWord();

      expect(store.getState().phase).toBe('won');
    });
  });

  describe('resetGame', () => {
    it('clears the score and streak and returns to the menu', () => {
      playWord('כלב');
      for (const letter of ['כ', 'ל', 'ב']) store.getState().guessLetter(letter);

      store.getState().resetGame();
      const state = store.getState();

      expect(state.phase).toBe('menu');
      expect(state.score).toBe(0);
      expect(state.streak).toBe(0);
      expect(state.guessed.size).toBe(0);
      expect(state.wrongCount).toBe(0);
    });
  });
});
