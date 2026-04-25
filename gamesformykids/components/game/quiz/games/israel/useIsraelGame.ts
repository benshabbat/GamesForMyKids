'use client';

import { createCategoryIndexQuizHook } from '@/lib/quiz/createCategoryIndexQuizHook';
import { ISRAEL_QUESTIONS, CATEGORIES } from './data/questions';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

export const useIsraelGame = createCategoryIndexQuizHook({
  questions: ISRAEL_QUESTIONS,
  gameType: 'israel',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: CATEGORIES,
  allCategory: 'הכל' as const,
  getCategoryOf: q => q.category,
});
