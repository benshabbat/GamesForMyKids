import { beforeEach, describe, expect, it } from 'vitest';
import { useWordScrambleStore } from '@/app/games/word-scramble/wordScrambleStore';

const store = useWordScrambleStore;

const INITIAL = {
  phase: 'menu' as const, words: [], wIdx: 0, letters: [], picked: [],
  score: 0, lives: 3, shake: false, correct: false,
};

beforeEach(() => {
  store.setState(INITIAL as unknown as Parameters<typeof store.setState>[0]);
});

describe('wordScrambleStore', () => {
  describe('initial state', () => {
    it('starts at menu phase', () => {
      expect(store.getState().phase).toBe('menu');
    });

    it('starts with 3 lives', () => {
      expect(store.getState().lives).toBe(3);
    });

    it('starts with score 0', () => {
      expect(store.getState().score).toBe(0);
    });

    it('starts with no picked letters', () => {
      expect(store.getState().picked).toHaveLength(0);
    });
  });

  describe('startGame', () => {
    it('transitions to playing phase', () => {
      store.getState().startGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('loads 8 words', () => {
      store.getState().startGame();
      expect(store.getState().words).toHaveLength(8);
    });

    it('creates letters for first word', () => {
      store.getState().startGame();
      const { letters, words } = store.getState();
      const firstWordLength = words[0]!.word.length;
      expect(letters).toHaveLength(firstWordLength);
    });

    it('resets word index to 0', () => {
      store.setState({ wIdx: 3 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      expect(store.getState().wIdx).toBe(0);
    });
  });

  describe('pickLetter', () => {
    it('does nothing when not playing', () => {
      store.getState().startGame();
      store.setState({ phase: 'menu' } as unknown as Parameters<typeof store.setState>[0]);
      const picksBefore = store.getState().picked.length;
      store.getState().pickLetter(0);
      expect(store.getState().picked).toHaveLength(picksBefore);
    });

    it('marks letter as picked', () => {
      store.getState().startGame();
      store.getState().pickLetter(0);
      expect(store.getState().letters[0]!.picked).toBe(true);
    });

    it('adds letter to picked array', () => {
      store.getState().startGame();
      store.getState().pickLetter(0);
      expect(store.getState().picked).toHaveLength(1);
    });
  });

  describe('resetPick', () => {
    it('clears picked letters', () => {
      store.getState().startGame();
      store.getState().pickLetter(0);
      store.getState().resetPick();
      expect(store.getState().picked).toHaveLength(0);
    });
  });
});
