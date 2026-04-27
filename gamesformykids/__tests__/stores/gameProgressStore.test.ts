import { describe, it, expect, beforeEach } from 'vitest';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';

beforeEach(() => {
  useGameProgressStore.getState().resetProgress();
});

describe('gameProgressStore', () => {
  describe('incrementScore', () => {
    it('adds default 10 points', () => {
      useGameProgressStore.getState().incrementScore();
      expect(useGameProgressStore.getState().score).toBe(10);
    });

    it('adds custom points', () => {
      useGameProgressStore.getState().incrementScore(25);
      expect(useGameProgressStore.getState().score).toBe(25);
    });

    it('accumulates across calls', () => {
      useGameProgressStore.getState().incrementScore(10);
      useGameProgressStore.getState().incrementScore(15);
      expect(useGameProgressStore.getState().score).toBe(25);
    });
  });

  describe('incrementLevel', () => {
    it('increments level by 1', () => {
      useGameProgressStore.getState().incrementLevel();
      expect(useGameProgressStore.getState().level).toBe(2);
    });

    it('does not exceed maxLevel', () => {
      useGameProgressStore.setState({ level: 10 });
      useGameProgressStore.getState().incrementLevel(10);
      expect(useGameProgressStore.getState().level).toBe(10);
    });

    it('respects custom maxLevel', () => {
      useGameProgressStore.setState({ level: 3 });
      useGameProgressStore.getState().incrementLevel(3);
      expect(useGameProgressStore.getState().level).toBe(3);
    });
  });

  describe('recordAttempt', () => {
    it('correct: increments correctAnswers, attempts, streak, score', () => {
      useGameProgressStore.getState().recordAttempt(true);
      const s = useGameProgressStore.getState();
      expect(s.correctAnswers).toBe(1);
      expect(s.attempts).toBe(1);
      expect(s.totalQuestions).toBe(1);
      expect(s.streakCount).toBe(1);
      expect(s.score).toBe(10);
    });

    it('wrong: increments attempts but resets streak and does not add score', () => {
      useGameProgressStore.getState().recordAttempt(true);
      useGameProgressStore.getState().recordAttempt(false);
      const s = useGameProgressStore.getState();
      expect(s.streakCount).toBe(0);
      expect(s.correctAnswers).toBe(1);
      expect(s.attempts).toBe(2);
      expect(s.score).toBe(10);
    });

    it('bestStreak tracks the maximum streak', () => {
      useGameProgressStore.getState().recordAttempt(true);
      useGameProgressStore.getState().recordAttempt(true);
      useGameProgressStore.getState().recordAttempt(true);
      useGameProgressStore.getState().recordAttempt(false);
      useGameProgressStore.getState().recordAttempt(true);
      const s = useGameProgressStore.getState();
      expect(s.bestStreak).toBe(3);
      expect(s.streakCount).toBe(1);
    });

    it('uses custom pointsPerCorrect', () => {
      useGameProgressStore.getState().recordAttempt(true, 50);
      expect(useGameProgressStore.getState().score).toBe(50);
    });
  });

  describe('resetProgress', () => {
    it('resets all fields to initial values (except startTime)', () => {
      useGameProgressStore.getState().recordAttempt(true);
      useGameProgressStore.getState().incrementLevel();
      useGameProgressStore.getState().resetProgress();
      const s = useGameProgressStore.getState();
      expect(s.score).toBe(0);
      expect(s.level).toBe(1);
      expect(s.attempts).toBe(0);
      expect(s.correctAnswers).toBe(0);
      expect(s.streakCount).toBe(0);
      expect(s.bestStreak).toBe(0);
      expect(s.isGameActive).toBe(false);
    });
  });

  describe('pauseTimer / resumeTimer', () => {
    it('pauseTimer sets timerPaused to true', () => {
      useGameProgressStore.getState().pauseTimer();
      expect(useGameProgressStore.getState().timerPaused).toBe(true);
    });

    it('resumeTimer sets timerPaused to false', () => {
      useGameProgressStore.getState().pauseTimer();
      useGameProgressStore.getState().resumeTimer();
      expect(useGameProgressStore.getState().timerPaused).toBe(false);
    });
  });

  describe('setGameActive', () => {
    it('sets isGameActive to true', () => {
      useGameProgressStore.getState().setGameActive(true);
      expect(useGameProgressStore.getState().isGameActive).toBe(true);
    });

    it('sets startTime when activating for the first time', () => {
      const before = Date.now();
      useGameProgressStore.setState({ startTime: 0 });
      useGameProgressStore.getState().setGameActive(true);
      expect(useGameProgressStore.getState().startTime).toBeGreaterThanOrEqual(before);
    });

    it('does not reset startTime when already set', () => {
      const fixed = 12345678;
      useGameProgressStore.setState({ startTime: fixed, isGameActive: true });
      useGameProgressStore.getState().setGameActive(true);
      expect(useGameProgressStore.getState().startTime).toBe(fixed);
    });
  });
});
