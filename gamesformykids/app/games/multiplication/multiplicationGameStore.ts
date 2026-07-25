import { createTimedQuizStore } from '@/lib/stores/createTimedQuizStore';
import {
  generateQuestion, QUESTIONS_PER_LEVEL, getTimeForLevel,
} from './data/tables';

const { useStore, stopTimer } = createTimedQuizStore({
  initialLevel: 1,
  questionsPerGame: QUESTIONS_PER_LEVEL,
  timePerQuestion: getTimeForLevel,
  generateQuestion,
  calcScore: (score, timeLeft) => score + timeLeft,
});

export const useMultiplicationGameStore = useStore;
export { stopTimer as stopMultiplicationTimer };
