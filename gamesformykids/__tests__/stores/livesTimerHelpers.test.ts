import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { setupLivesTimer } from '@/lib/stores/livesTimerHelpers';
import type { LivesGameState } from '@/lib/types';

const TIME_PER_Q = 5;
const FEEDBACK_MS = 500;
const INITIAL_LIVES = 3;

type TestState = LivesGameState & { q: number; streak?: number };

type TimerOverrides = Partial<Pick<Parameters<typeof setupLivesTimer>[0], 'timePerQ' | 'initialLives'>>;

function makeTestStore(overrides: Partial<TestState> = {}, timerOverrides: TimerOverrides = {}) {
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
    ...timerOverrides,
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
  // The countdown only runs in a browser (it bails out when `window` is undefined).
  describe('countdown (browser)', () => {
    beforeEach(() => { vi.stubGlobal('window', {}); });
    afterEach(() => { vi.unstubAllGlobals(); });

    it('loses a life and resets the clock when time runs out', () => {
      const { timer, getState } = makeTestStore();
      timer.startGame(() => ({ q: 1 }));
      vi.advanceTimersByTime(TIME_PER_Q * 1000);
      expect(getState().lives).toBe(INITIAL_LIVES - 1);
      expect(getState().feedback).toBe('wrong');
      expect(getState().timeLeft).toBe(TIME_PER_Q);
    });

    describe('per-question time that depends on difficulty (lazy timePerQ / initialLives)', () => {
      it('uses the resolved time and lives at game start', () => {
        const { timer, getState } = makeTestStore({}, { timePerQ: () => 8, initialLives: () => 5 });
        timer.startGame(() => ({ q: 1 }));
        expect(getState().timeLeft).toBe(8);
        expect(getState().lives).toBe(5);
      });

      it('keeps the same time on question 2 after a correct answer', () => {
        const { timer, getState } = makeTestStore({}, { timePerQ: () => 3 });
        timer.startGame(() => ({ q: 1 }));
        expect(getState().timeLeft).toBe(3);
        timer.correct(10);
        vi.advanceTimersByTime(FEEDBACK_MS);
        expect(getState().q).toBe(2);
        expect(getState().timeLeft).toBe(3);
      });

      it('keeps the same time on the next question after a timeout', () => {
        const { timer, getState } = makeTestStore({}, { timePerQ: () => 3 });
        timer.startGame(() => ({ q: 1 }));
        vi.advanceTimersByTime(3000);
        expect(getState().feedback).toBe('wrong');
        expect(getState().timeLeft).toBe(3);
        vi.advanceTimersByTime(FEEDBACK_MS);
        expect(getState().q).toBe(2);
        expect(getState().timeLeft).toBe(3);
      });

      it('counts the full per-question time down on question 2, not the default', () => {
        const { timer, getState } = makeTestStore({}, { timePerQ: () => 10 });
        timer.startGame(() => ({ q: 1 }));
        timer.correct(10);
        vi.advanceTimersByTime(FEEDBACK_MS);
        // 9 seconds into question 2: still alive (a fixed 5s would have timed out already).
        vi.advanceTimersByTime(9000);
        expect(getState().lives).toBe(INITIAL_LIVES);
        expect(getState().timeLeft).toBe(1);
      });

      it('re-reads the value for each game', () => {
        let seconds = 4;
        const { timer, getState } = makeTestStore({}, { timePerQ: () => seconds });
        timer.startGame(() => ({ q: 1 }));
        expect(getState().timeLeft).toBe(4);
        seconds = 9;
        timer.startGame(() => ({ q: 1 }));
        expect(getState().timeLeft).toBe(9);
      });
    });

    describe('stop', () => {
      it('stops the countdown so lives are not lost after the player leaves', () => {
        const { timer, getState } = makeTestStore();
        timer.startGame(() => ({ q: 1 }));
        timer.stop();
        vi.advanceTimersByTime(TIME_PER_Q * 5 * 1000);
        expect(getState().lives).toBe(INITIAL_LIVES);
        expect(getState().timeLeft).toBe(TIME_PER_Q);
        expect(getState().phase).toBe('playing');
      });

      it('cancels a pending next-question timer', () => {
        const { timer, getState } = makeTestStore();
        timer.startGame(() => ({ q: 1 }));
        timer.correct(10);
        timer.stop();
        vi.advanceTimersByTime(FEEDBACK_MS * 10);
        expect(getState().q).toBe(1);
        expect(getState().feedback).toBe('correct');
      });

      it('is safe to call when nothing is running', () => {
        const { timer } = makeTestStore();
        expect(() => { timer.stop(); timer.stop(); }).not.toThrow();
      });

      it('lets a new game start normally afterwards', () => {
        const { timer, getState } = makeTestStore();
        timer.startGame(() => ({ q: 1 }));
        timer.stop();
        timer.startGame(() => ({ q: 1 }));
        vi.advanceTimersByTime(TIME_PER_Q * 1000);
        expect(getState().lives).toBe(INITIAL_LIVES - 1);
      });
    });
  });
});
