'use client';
import { createCategoryIndexQuizHook } from '@/lib/quiz/createCategoryIndexQuizHook';
import { TRIVIA_QUESTIONS, CATEGORIES } from '@/lib/quiz/data/trivia';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

export const useTriviaGame = createCategoryIndexQuizHook({
  questions: TRIVIA_QUESTIONS,
  gameType: 'trivia',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: ['all', ...CATEGORIES] as const,
  allCategory: 'all' as const,
  getCategoryOf: q => q.category,
});
