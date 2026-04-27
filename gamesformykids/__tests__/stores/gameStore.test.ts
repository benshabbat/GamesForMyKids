import { describe, it, expect, beforeEach, vi } from 'vitest';

// Persist middleware uses localStorage — stub it for node environment
vi.stubGlobal('localStorage', {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
});

import { useGameStore } from '@/lib/stores/gameStore';

const INITIAL_ACTIVE = {
  gameType: null,
  isPlaying: false,
  score: 0,
  level: 1,
  startedAt: null,
};

const INITIAL_STATS = {
  totalGamesPlayed: 0,
  totalScore: 0,
  highScores: {},
  lastPlayedGame: null,
  lastPlayedAt: null,
};

beforeEach(() => {
  useGameStore.setState({ ...INITIAL_ACTIVE, ...INITIAL_STATS });
});

describe('gameStore', () => {
  describe('startGame', () => {
    it('sets gameType and isPlaying=true', () => {
      useGameStore.getState().startGame('animals');
      const s = useGameStore.getState();
      expect(s.gameType).toBe('animals');
      expect(s.isPlaying).toBe(true);
    });

    it('resets score and level to starting values', () => {
      useGameStore.setState({ score: 50, level: 5 });
      useGameStore.getState().startGame('colors');
      const s = useGameStore.getState();
      expect(s.score).toBe(0);
      expect(s.level).toBe(1);
    });

    it('records startedAt timestamp', () => {
      const before = Date.now();
      useGameStore.getState().startGame('animals');
      expect(useGameStore.getState().startedAt).toBeGreaterThanOrEqual(before);
    });
  });

  describe('updateProgress', () => {
    it('updates score and level', () => {
      useGameStore.getState().startGame('animals');
      useGameStore.getState().updateProgress(100, 3);
      const s = useGameStore.getState();
      expect(s.score).toBe(100);
      expect(s.level).toBe(3);
    });
  });

  describe('endGame', () => {
    it('increments totalGamesPlayed', () => {
      useGameStore.getState().startGame('animals');
      useGameStore.getState().endGame();
      expect(useGameStore.getState().totalGamesPlayed).toBe(1);
    });

    it('accumulates totalScore', () => {
      useGameStore.getState().startGame('animals');
      useGameStore.getState().updateProgress(80, 1);
      useGameStore.getState().endGame();
      expect(useGameStore.getState().totalScore).toBe(80);
    });

    it('tracks highScore per gameType', () => {
      useGameStore.getState().startGame('animals');
      useGameStore.getState().updateProgress(120, 1);
      useGameStore.getState().endGame();
      expect(useGameStore.getState().highScores['animals']).toBe(120);
    });

    it('keeps existing highScore when new score is lower', () => {
      useGameStore.setState({ highScores: { animals: 200 } });
      useGameStore.getState().startGame('animals');
      useGameStore.getState().updateProgress(50, 1);
      useGameStore.getState().endGame();
      expect(useGameStore.getState().highScores['animals']).toBe(200);
    });

    it('updates highScore when new score is higher', () => {
      useGameStore.setState({ highScores: { animals: 50 } });
      useGameStore.getState().startGame('animals');
      useGameStore.getState().updateProgress(300, 1);
      useGameStore.getState().endGame();
      expect(useGameStore.getState().highScores['animals']).toBe(300);
    });

    it('resets active game state after ending', () => {
      useGameStore.getState().startGame('animals');
      useGameStore.getState().endGame();
      const s = useGameStore.getState();
      expect(s.isPlaying).toBe(false);
      expect(s.gameType).toBeNull();
      expect(s.startedAt).toBeNull();
    });

    it('records lastPlayedGame', () => {
      useGameStore.getState().startGame('fruits');
      useGameStore.getState().endGame();
      expect(useGameStore.getState().lastPlayedGame).toBe('fruits');
    });
  });

  describe('resetGame', () => {
    it('resets only active state, not stats', () => {
      useGameStore.setState({ totalGamesPlayed: 5, totalScore: 500 });
      useGameStore.getState().startGame('animals');
      useGameStore.getState().resetGame();
      const s = useGameStore.getState();
      expect(s.isPlaying).toBe(false);
      expect(s.gameType).toBeNull();
      expect(s.totalGamesPlayed).toBe(5);
      expect(s.totalScore).toBe(500);
    });
  });

  describe('clearStats', () => {
    it('resets stats but not active game state', () => {
      useGameStore.setState({ totalGamesPlayed: 10, highScores: { animals: 100 } });
      useGameStore.getState().startGame('animals');
      useGameStore.getState().clearStats();
      const s = useGameStore.getState();
      expect(s.totalGamesPlayed).toBe(0);
      expect(s.highScores).toEqual({});
      expect(s.isPlaying).toBe(true);
    });
  });
});
