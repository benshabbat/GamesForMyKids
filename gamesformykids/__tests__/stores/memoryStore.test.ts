import { beforeEach, describe, expect, it } from 'vitest';
import { useMemoryStore } from '@/app/games/memory/stores/useMemoryStore';

const store = useMemoryStore;

beforeEach(() => {
  store.setState({
    phase: 'menu',
    timer: 0,
    timeLeft: 0,
    isGamePaused: false,
    difficulty: 'easy',
    gameStats: { moves: 0, score: 0, perfectMatches: 0, streak: 0 },
    lastMatchWasSuccess: false,
    cards: [],
    animals: [],
    flippedCards: [],
    matchedPairs: [],
    showHints: false,
    showDebug: false,
  } as unknown as Parameters<typeof store.setState>[0]);
});

describe('memoryStore', () => {
  describe('initial state', () => {
    it('starts at menu phase', () => {
      expect(store.getState().phase).toBe('menu');
    });

    it('starts with empty cards array', () => {
      expect(store.getState().cards).toHaveLength(0);
    });

    it('starts with no matched pairs', () => {
      expect(store.getState().matchedPairs).toHaveLength(0);
    });

    it('starts with score 0', () => {
      expect(store.getState().gameStats.score).toBe(0);
    });

    it('starts on easy difficulty', () => {
      expect(store.getState().difficulty).toBe('easy');
    });
  });

  describe('initializeGame', () => {
    it('transitions to playing phase', () => {
      store.getState().initializeGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('creates cards for the difficulty level', () => {
      store.getState().initializeGame('easy');
      expect(store.getState().cards.length).toBeGreaterThan(0);
    });

    it('creates an even number of cards (pairs)', () => {
      store.getState().initializeGame('easy');
      expect(store.getState().cards.length % 2).toBe(0);
    });

    it('clears matched pairs', () => {
      store.setState({ matchedPairs: ['cat', 'dog'] } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().initializeGame();
      expect(store.getState().matchedPairs).toHaveLength(0);
    });

    it('resets stats', () => {
      store.setState({ gameStats: { moves: 10, score: 50, perfectMatches: 2, streak: 3 } } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().initializeGame();
      expect(store.getState().gameStats.moves).toBe(0);
    });
  });

  describe('resetGame', () => {
    it('returns to menu phase', () => {
      store.getState().initializeGame();
      store.getState().resetGame();
      expect(store.getState().phase).toBe('menu');
    });

    it('clears cards', () => {
      store.getState().initializeGame();
      store.getState().resetGame();
      expect(store.getState().cards).toHaveLength(0);
    });
  });

  describe('pauseGame / resumeGame', () => {
    it('pauses the game', () => {
      store.getState().initializeGame();
      store.getState().pauseGame();
      expect(store.getState().isGamePaused).toBe(true);
    });

    it('resumes the game', () => {
      store.getState().initializeGame();
      store.getState().pauseGame();
      store.getState().resumeGame();
      expect(store.getState().isGamePaused).toBe(false);
    });
  });
});
