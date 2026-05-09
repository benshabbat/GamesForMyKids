import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { setupLivesTimer } from '@/lib/stores/livesTimerHelpers';
import type { LivesGameState } from '@/lib/types';

const TIME_PER_Q = 5;
const FEEDBACK_MS = 500;
const INITIAL_LIVES = 3;

type TestState = LivesGameState & { q: number; streak?: number };

function makeTestStore(overrides: Partial<TestState> = {}) {
  let state: TestState = {
    phase: 'menu', score: 0, best: 0,
    lives: INITIAL_LIVES, timeLeft: TIME_PER_Q, feedback: null,
    q: 1,
    ...overrides,
  };

  const set = (partial: Record<string, unknown>) => {
    state = { ...state, ...partial };
  };
  const get = () => state;
  const patch = (partial: Partial<TestState>) => { state = { ...state, ...partial }; };

  let nextQ = 2;
  const timer = setupLivesTimer({
    name: 'test',
    timePerQ: TIME_PER_Q,
    feedbackMs: FEEDBACK_MS,
    initialLives: INITIAL_LIVES,
    set, get,
    getNextUpdates: () => ({ q: nextQ++ }),
  });

  return { timer, getState: get, patch };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('setupLivesTimer', () => {
  describe('startGame', () => {
    it('sets phase to playing', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      expect(getState().phase).toBe('playing');
    });

    it('resets score, lives, timeLeft, feedback', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      const s = getState();
      expect(s.score).toBe(0);
      expect(s.lives).toBe(INITIAL_LIVES);
      expect(s.timeLeft).toBe(TIME_PER_Q);
      expect(s.feedback).toBeNull();
    });

    it('applies initial updates from callback', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 99 }));
      expect(getState().q).toBe(99);
    });
  });

  describe('correct', () => {
    it('adds points to score', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.correct(10);
      expect(getState().score).toBe(10);
    });

    it('sets feedback to correct', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.correct(10);
      expect(getState().feedback).toBe('correct');
    });

    it('applies extra state updates', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.correct(10, { streak: 3 });
      expect(getState().streak).toBe(3);
    });

    it('clears feedback after feedbackMs', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.correct(10);
      vi.advanceTimersByTime(FEEDBACK_MS);
      expect(getState().feedback).toBeNull();
    });

    it('advances to next question after feedbackMs', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.correct(10);
      vi.advanceTimersByTime(FEEDBACK_MS);
      expect(getState().q).toBeGreaterThan(1);
    });
  });

  describe('wrong', () => {
    it('decrements lives', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.wrong();
      expect(getState().lives).toBe(INITIAL_LIVES - 1);
    });

    it('sets feedback to wrong', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.wrong();
      expect(getState().feedback).toBe('wrong');
    });

    it('ends game when last life lost', () => {
      const { timer, getState, patch } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      patch({ lives: 1 });
      timer.wrong();
      expect(getState().phase).toBe('dead');
    });

    it('saves best on game over', () => {
      const { timer, getState, patch } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      patch({ lives: 1, score: 40 });
      timer.wrong();
      expect(getState().best).toBe(40);
    });

    it('clears feedback after feedbackMs when not dead', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.wrong();
      vi.advanceTimersByTime(FEEDBACK_MS);
      expect(getState().feedback).toBeNull();
    });

    it('applies extra state updates', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      timer.wrong({ streak: 0 });
      expect(getState().streak).toBe(0);
    });
  });
});
