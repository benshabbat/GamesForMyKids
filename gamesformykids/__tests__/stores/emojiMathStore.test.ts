import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { useEmojiMathStore, TIME_PER_Q } from '@/app/games/emoji-math/emojiMathStore';

const store = useEmojiMathStore;

beforeEach(() => {
  vi.useFakeTimers();
  store.setState({ phase: 'menu', score: 0, best: 0, lives: 3, timeLeft: TIME_PER_Q, feedback: null, level: 1, streak: 0 } as Parameters<typeof store.setState>[0]);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('emojiMathStore', () => {
  describe('startGame', () => {
    it('sets phase to playing', () => {
      store.getState().startGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('resets score, lives, level, streak', () => {
      store.setState({ score: 80, lives: 1, level: 3, streak: 5 } as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      const { score, lives, level, streak } = store.getState();
      expect(score).toBe(0);
      expect(lives).toBe(3);
      expect(level).toBe(1);
      expect(streak).toBe(0);
    });

    it('preserves best across restart', () => {
      store.setState({ best: 40 } as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      expect(store.getState().best).toBe(40);
    });
  });

  describe('tap — correct answer', () => {
    it('adds 10 points and sets feedback correct', () => {
      store.getState().startGame();
      const answer = store.getState().q.answer;
      store.getState().tap(answer);
      expect(store.getState().score).toBe(10);
      expect(store.getState().feedback).toBe('correct');
    });

    it('increments streak', () => {
      store.getState().startGame();
      store.getState().tap(store.getState().q.answer);
      expect(store.getState().streak).toBe(1);
    });

    it('awards 20 points on streak >= 3', () => {
      store.getState().startGame();
      store.setState({ streak: 2, score: 20 } as Parameters<typeof store.setState>[0]);
      store.getState().tap(store.getState().q.answer);
      expect(store.getState().score).toBe(40);
    });

    it('does not change lives', () => {
      store.getState().startGame();
      store.getState().tap(store.getState().q.answer);
      expect(store.getState().lives).toBe(3);
    });
  });

  describe('tap — wrong answer', () => {
    it('decrements lives and sets feedback wrong', () => {
      store.getState().startGame();
      const wrong = store.getState().q.answer + 99;
      store.getState().tap(wrong);
      expect(store.getState().lives).toBe(2);
      expect(store.getState().feedback).toBe('wrong');
    });

    it('resets streak on wrong', () => {
      store.getState().startGame();
      store.setState({ streak: 3 } as Parameters<typeof store.setState>[0]);
      store.getState().tap(store.getState().q.answer + 99);
      expect(store.getState().streak).toBe(0);
    });

    it('ends game when last life lost', () => {
      store.getState().startGame();
      store.setState({ lives: 1 } as Parameters<typeof store.setState>[0]);
      store.getState().tap(store.getState().q.answer + 99);
      expect(store.getState().phase).toBe('dead');
    });
  });

  describe('tap — guard conditions', () => {
    it('does nothing when not playing', () => {
      const answer = store.getState().q.answer;
      store.getState().tap(answer);
      expect(store.getState().score).toBe(0);
    });

    it('does nothing when feedback is set', () => {
      store.getState().startGame();
      store.setState({ feedback: 'correct' } as Parameters<typeof store.setState>[0]);
      const scoreBefore = store.getState().score;
      store.getState().tap(store.getState().q.answer);
      expect(store.getState().score).toBe(scoreBefore);
    });
  });

  describe('feedback transition', () => {
    it('clears feedback after feedbackMs', () => {
      store.getState().startGame();
      store.getState().tap(store.getState().q.answer);
      expect(store.getState().feedback).toBe('correct');
      vi.advanceTimersByTime(900);
      expect(store.getState().feedback).toBeNull();
    });
  });
});
