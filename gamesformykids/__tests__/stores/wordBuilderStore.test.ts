import { beforeEach, describe, expect, it } from 'vitest';
import { useWordBuilderStore } from '@/app/games/word-builder/wordBuilderStore';

const store = useWordBuilderStore;

const INITIAL = {
  phase: 'menu' as const, puzzles: [], index: 0, score: 0,
  typed: [], available: [], status: 'idle' as const,
};

beforeEach(() => {
  store.setState(INITIAL as unknown as Parameters<typeof store.setState>[0]);
});

describe('wordBuilderStore', () => {
  describe('initial state', () => {
    it('starts at menu phase', () => {
      expect(store.getState().phase).toBe('menu');
    });

    it('starts with score 0', () => {
      expect(store.getState().score).toBe(0);
    });

    it('starts with empty typed array', () => {
      expect(store.getState().typed).toHaveLength(0);
    });

    it('starts with idle status', () => {
      expect(store.getState().status).toBe('idle');
    });
  });

  describe('startGame', () => {
    it('transitions to playing phase', () => {
      store.getState().startGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('loads 10 puzzles', () => {
      store.getState().startGame();
      expect(store.getState().puzzles).toHaveLength(10);
    });

    it('starts at index 0', () => {
      store.getState().startGame();
      expect(store.getState().index).toBe(0);
    });

    it('creates available letters for first puzzle', () => {
      store.getState().startGame();
      const { available, puzzles } = store.getState();
      const firstWordLength = puzzles[0]!.word.length;
      expect(available).toHaveLength(firstWordLength);
    });

    it('resets score to 0', () => {
      store.setState({ score: 100 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      expect(store.getState().score).toBe(0);
    });
  });

  describe('pressLetter', () => {
    it('does nothing when not playing', () => {
      store.getState().pressLetter(0);
      expect(store.getState().typed).toHaveLength(0);
    });

    it('adds letter to typed array', () => {
      store.getState().startGame();
      store.getState().pressLetter(0);
      expect(store.getState().typed).toHaveLength(1);
    });

    it('marks letter as used', () => {
      store.getState().startGame();
      store.getState().pressLetter(0);
      expect(store.getState().available[0]!.used).toBe(true);
    });
  });

  describe('clearTyped', () => {
    it('empties the typed array', () => {
      store.getState().startGame();
      store.getState().pressLetter(0);
      store.getState().clearTyped();
      expect(store.getState().typed).toHaveLength(0);
    });

    it('unmarks all used letters', () => {
      store.getState().startGame();
      store.getState().pressLetter(0);
      store.getState().clearTyped();
      const anyUsed = store.getState().available.some(l => l.used);
      expect(anyUsed).toBe(false);
    });
  });
});
