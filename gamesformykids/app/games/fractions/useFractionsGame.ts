'use client';
import { createQuizHook } from '@/lib/utils/createQuizHook';
import { type FractionQuestion, FRACTION_QUESTIONS, QUESTIONS_PER_GAME } from './data/fractions';
import { shuffle } from '@/lib/utils';

export const useFractionsGame = createQuizHook<FractionQuestion>({
  gameType: 'fractions',
  allQuestions: FRACTION_QUESTIONS,
  questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.description, ...q.wrongOptions]),
  isCorrect: (choice, q) => choice === q.description,
  getCorrectLabel: (q) => q.description,
});
