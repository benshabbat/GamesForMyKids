import { describe, it, expect, beforeEach } from 'vitest';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';

const INITIAL = {
  phase: 'menu',
  gameType: null,
  index: 0,
  total: 0,
  score: 0,
  selected: null,
  isCorrect: null,
} as const;

beforeEach(() => {
  useQuizGameStore.setState(INITIAL as Parameters<typeof useQuizGameStore.setState>[0]);
});

describe('quizGameStore', () => {
  describe('startQuiz', () => {
    it('sets phase to playing with correct total and gameType', () => {
      useQuizGameStore.getState().startQuiz('animals', 10);
      const s = useQuizGameStore.getState();
      expect(s.phase).toBe('playing');
      expect(s.gameType).toBe('animals');
      expect(s.total).toBe(10);
    });

    it('resets score and index to 0', () => {
      useQuizGameStore.setState({ score: 5, index: 3 });
      useQuizGameStore.getState().startQuiz('animals', 10);
      const s = useQuizGameStore.getState();
      expect(s.score).toBe(0);
      expect(s.index).toBe(0);
    });

    it('clears selected and isCorrect', () => {
      useQuizGameStore.setState({ selected: 'abc', isCorrect: true });
      useQuizGameStore.getState().startQuiz('animals', 5);
      const s = useQuizGameStore.getState();
      expect(s.selected).toBeNull();
      expect(s.isCorrect).toBeNull();
    });
  });

  describe('selectAnswer', () => {
    it('correct answer increments score and sets isCorrect=true', () => {
      useQuizGameStore.getState().startQuiz('animals', 5);
      useQuizGameStore.getState().selectAnswer('cat', true);
      const s = useQuizGameStore.getState();
      expect(s.selected).toBe('cat');
      expect(s.isCorrect).toBe(true);
      expect(s.score).toBe(1);
    });

    it('wrong answer does not increment score and sets isCorrect=false', () => {
      useQuizGameStore.getState().startQuiz('animals', 5);
      useQuizGameStore.getState().selectAnswer('dog', false);
      const s = useQuizGameStore.getState();
      expect(s.selected).toBe('dog');
      expect(s.isCorrect).toBe(false);
      expect(s.score).toBe(0);
    });

    it('accumulates score across multiple correct answers', () => {
      useQuizGameStore.getState().startQuiz('animals', 10);
      useQuizGameStore.getState().selectAnswer('a', true);
      useQuizGameStore.getState().selectAnswer('b', true);
      useQuizGameStore.getState().selectAnswer('c', false);
      expect(useQuizGameStore.getState().score).toBe(2);
    });
  });

  describe('nextQuestion', () => {
    it('increments index and clears selected/isCorrect when not on last question', () => {
      useQuizGameStore.getState().startQuiz('animals', 3);
      useQuizGameStore.getState().selectAnswer('x', true);
      useQuizGameStore.getState().nextQuestion();
      const s = useQuizGameStore.getState();
      expect(s.index).toBe(1);
      expect(s.selected).toBeNull();
      expect(s.isCorrect).toBeNull();
      expect(s.phase).toBe('playing');
    });

    it('transitions to result on the last question', () => {
      useQuizGameStore.getState().startQuiz('animals', 2);
      useQuizGameStore.getState().selectAnswer('x', true);
      useQuizGameStore.getState().nextQuestion(); // index 0 → 1
      useQuizGameStore.getState().selectAnswer('y', false);
      useQuizGameStore.getState().nextQuestion(); // index 1 = last → result
      expect(useQuizGameStore.getState().phase).toBe('result');
    });
  });

  describe('goToMenu', () => {
    it('sets phase to menu and clears selection', () => {
      useQuizGameStore.getState().startQuiz('animals', 5);
      useQuizGameStore.getState().selectAnswer('a', true);
      useQuizGameStore.getState().goToMenu();
      const s = useQuizGameStore.getState();
      expect(s.phase).toBe('menu');
      expect(s.selected).toBeNull();
      expect(s.isCorrect).toBeNull();
    });
  });

  describe('restartQuiz', () => {
    it('resets index and score, sets phase to playing', () => {
      useQuizGameStore.getState().startQuiz('animals', 5);
      useQuizGameStore.getState().selectAnswer('a', true);
      useQuizGameStore.getState().nextQuestion();
      useQuizGameStore.getState().restartQuiz();
      const s = useQuizGameStore.getState();
      expect(s.phase).toBe('playing');
      expect(s.index).toBe(0);
      expect(s.score).toBe(0);
      expect(s.selected).toBeNull();
    });
  });
});
