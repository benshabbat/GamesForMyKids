import { createTimedQuizStore } from '@/lib/stores/createTimedQuizStore';
import {
  LEVELS, generateQuestion, QUESTIONS_PER_GAME, TIME_PER_QUESTION,
  ArithmeticLevel,
} from './data/questions';

const { useStore, stopTimer } = createTimedQuizStore({
  initialLevel: LEVELS[0] as ArithmeticLevel,
  questionsPerGame: QUESTIONS_PER_GAME,
  timePerQuestion: TIME_PER_QUESTION,
  generateQuestion,
  calcScore: (score, timeLeft) => score + Math.max(1, timeLeft) * 10,
});

export const useArithmeticGameStore = useStore;
export { stopTimer as stopArithmeticTimer };
