'use client';

import { createCategoryIndexQuizHook } from '@/lib/quiz/createCategoryIndexQuizHook';
import { ISRAEL_QUESTIONS, QUESTIONS_PER_GAME, CATEGORIES } from './data/questions';

export const useIsraelGame = createCategoryIndexQuizHook({
  questions: ISRAEL_QUESTIONS,
  gameType: 'israel',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: CATEGORIES,
  allCategory: 'הכל' as const,
  getCategoryOf: q => q.category,
});
