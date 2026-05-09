import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { useTrueFalseStore, FACTS, TIME_PER_Q } from '@/app/games/true-false/trueFalseStore';

const store = useTrueFalseStore;

beforeEach(() => {
  vi.useFakeTimers();
  store.setState({
    phase: 'menu', score: 0, best: 0, lives: 3,
    timeLeft: TIME_PER_Q, feedback: null,
    deck: [...FACTS], idx: 0,
  } as Parameters<typeof store.setState>[0]);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('trueFalseStore', () => {
  describe('startGame', () => {
    it('sets phase to playing', () => {
      store.getState().startGame();
      expect(store.getState().phase).toBe('playing');
    });

    it('resets score and lives', () => {
      store.setState({ score: 50, lives: 1 } as Parameters<typeof store.setState>[0]);
      store.getState().startGame();
      expect(store.getState().score).toBe(0);
      expect(store.getState().lives).toBe(3);
    });

    it('starts from first question', () => {
      store.getState().startGame();
      expect(store.getState().idx).toBe(0);
    });

    it('loads a deck with all facts', () => {
      store.getState().startGame();
      expect(store.getState().deck).toHaveLength(FACTS.length);
    });
  });

  describe('answer — correct', () => {
    it('adds 10 points', () => {
      store.getState().startGame();
      const correctAnswer = store.getState().deck[store.getState().idx].answer;
      store.getState().answer(correctAnswer);
      expect(store.getState().score).toBe(10);
    });

    it('sets feedback to correct', () => {
      store.getState().startGame();
      store.getState().answer(store.getState().deck[0].answer);
      expect(store.getState().feedback).toBe('correct');
    });

    it('does not change lives', () => {
      store.getState().startGame();
      store.getState().answer(store.getState().deck[0].answer);
      expect(store.getState().lives).toBe(3);
    });
  });

  describe('answer — wrong', () => {
    it('decrements lives', () => {
      store.getState().startGame();
      store.getState().answer(!store.getState().deck[0].answer);
      expect(store.getState().lives).toBe(2);
    });

    it('sets feedback to wrong', () => {
      store.getState().startGame();
      store.getState().answer(!store.getState().deck[0].answer);
      expect(store.getState().feedback).toBe('wrong');
    });

    it('ends game when last life lost', () => {
      store.getState().startGame();
      store.setState({ lives: 1 } as Parameters<typeof store.setState>[0]);
      store.getState().answer(!store.getState().deck[0].answer);
      expect(store.getState().phase).toBe('dead');
    });

    it('saves best on game over', () => {
      store.getState().startGame();
      store.setState({ lives: 1, score: 30 } as Parameters<typeof store.setState>[0]);
      store.getState().answer(!store.getState().deck[0].answer);
      expect(store.getState().best).toBe(30);
    });
  });

  describe('answer — guard conditions', () => {
    it('does nothing when phase is not playing', () => {
      store.getState().answer(true);
      expect(store.getState().score).toBe(0);
    });

    it('does nothing when feedback is set', () => {
      store.getState().startGame();
      store.setState({ feedback: 'correct' } as Parameters<typeof store.setState>[0]);
      const scoreB = store.getState().score;
      store.getState().answer(true);
      expect(store.getState().score).toBe(scoreB);
    });
  });

  describe('question advancement', () => {
    it('advances to next question after feedback delay', () => {
      store.getState().startGame();
      store.getState().answer(store.getState().deck[0].answer);
      vi.advanceTimersByTime(800);
      expect(store.getState().idx).toBe(1);
      expect(store.getState().feedback).toBeNull();
    });
  });
});
