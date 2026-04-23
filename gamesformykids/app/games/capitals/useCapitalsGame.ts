'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type CapitalQuestion, CAPITAL_QUESTIONS, QUESTIONS_PER_GAME } from './data/capitals';
import { shuffle } from '@/lib/utils';

export const useCapitalsGame = createQuizHook<CapitalQuestion>({
  gameType: 'capitals',
  allQuestions: CAPITAL_QUESTIONS,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.capital, ...q.wrongOptions]),
  isCorrect: (choice, q) => choice === q.capital,
  getCorrectLabel: (q) => q.capital,
});
