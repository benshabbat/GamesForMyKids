import { createTimedQuizStore } from '@/lib/stores/createTimedQuizStore';
import {
  LEVELS, generateQuestion, TIME_PER_QUESTION,
  ArithmeticLevel,
} from './data/questions';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

const { useStore, stopTimer } = createTimedQuizStore({
  initialLevel: LEVELS[0] as ArithmeticLevel,
  questionsPerGame: QUESTIONS_PER_GAME,
  timePerQuestion: TIME_PER_QUESTION,
  generateQuestion,
  calcScore: (score, timeLeft) => score + Math.max(1, timeLeft) * 10,
});

export const useArithmeticGameStore = useStore;
export { stopTimer as stopArithmeticTimer };
