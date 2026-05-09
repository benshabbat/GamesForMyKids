import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { useColorTapStore, TIME_PER_Q } from '@/app/games/color-tap/colorTapStore';

const store = useColorTapStore;

const MENU_STATE = {
  phase: 'menu', score: 0, lives: 3, timeLeft: TIME_PER_Q, feedback: null,
};

beforeEach(() => {
  vi.useFakeTimers();
  store.setState({ ...MENU_STATE, best: 0 } as Parameters<typeof store.setState>[0]);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('colorTapStore', () => {
  describe('startGame', () => {
    it('sets phase to playing', () => {
      store.getState().startGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('resets score and lives', () => {
      store.setState({ score: 99, lives: 1 } as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      const { score, lives } = store.getState();
      expect(score).toBe(0);
      expect(lives).toBe(3);
    });

    it('resets timeLeft and feedback', () => {
      store.getState().startGame();
      const { timeLeft, feedback } = store.getState();
      expect(timeLeft).toBe(TIME_PER_Q);
      expect(feedback).toBeNull();
    });

    it('preserves best across restart', () => {
      store.setState({ best: 50 } as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      expect(store.getState().best).toBe(50);
    });
  });

  describe('handleTap — correct answer', () => {
    it('increments score by 10', () => {
      store.getState().startGame();
      const { question } = store.getState();
      store.getState().handleTap(question.target);
      expect(store.getState().score).toBe(10);
    });

    it('sets feedback to correct', () => {
      store.getState().startGame();
      const { question } = store.getState();
      store.getState().handleTap(question.target);
      expect(store.getState().feedback).toBe('correct');
    });

    it('does not change lives', () => {
      store.getState().startGame();
      const { question } = store.getState();
      store.getState().handleTap(question.target);
      expect(store.getState().lives).toBe(3);
    });
  });

  describe('handleTap — wrong answer', () => {
    it('decrements lives by 1', () => {
      store.getState().startGame();
      const { question } = store.getState();
      const wrongOption = question.options.find(o => o !== question.target)!;
      store.getState().handleTap(wrongOption);
      expect(store.getState().lives).toBe(2);
    });

    it('sets feedback to wrong', () => {
      store.getState().startGame();
      const { question } = store.getState();
      const wrongOption = question.options.find(o => o !== question.target)!;
      store.getState().handleTap(wrongOption);
      expect(store.getState().feedback).toBe('wrong');
    });

    it('ends game when last life lost', () => {
      store.getState().startGame();
      store.setState({ lives: 1 } as Parameters<typeof store.setState>[0]);
      const { question } = store.getState();
      const wrongOption = question.options.find(o => o !== question.target)!;
      store.getState().handleTap(wrongOption);
      expect(store.getState().phase).toBe('dead');
    });

    it('saves best score on game over', () => {
      store.getState().startGame();
      store.setState({ lives: 1, score: 30 } as Parameters<typeof store.setState>[0]);
      const { question } = store.getState();
      const wrongOption = question.options.find(o => o !== question.target)!;
      store.getState().handleTap(wrongOption);
      expect(store.getState().best).toBe(30);
    });
  });

  describe('handleTap — guard conditions', () => {
    it('does nothing when phase is not playing', () => {
      const { question } = store.getState();
      store.getState().handleTap(question.target);
      expect(store.getState().score).toBe(0);
    });

    it('does nothing when feedback is already set', () => {
      store.getState().startGame();
      store.setState({ feedback: 'correct' } as Parameters<typeof store.setState>[0]);
      const { question, score: scoreBefore } = store.getState();
      store.getState().handleTap(question.target);
      expect(store.getState().score).toBe(scoreBefore);
    });
  });

  describe('feedback → next question transition', () => {
    it('clears feedback after feedbackMs', () => {
      store.getState().startGame();
      const { question } = store.getState();
      store.getState().handleTap(question.target);
      expect(store.getState().feedback).toBe('correct');
      vi.advanceTimersByTime(700);
      expect(store.getState().feedback).toBeNull();
    });
  });
});
