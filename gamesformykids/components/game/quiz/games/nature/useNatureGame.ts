'use client';

import { createCategoryIndexQuizHook } from '@/lib/quiz/createCategoryIndexQuizHook';
import { NATURE_QUESTIONS, QUESTIONS_PER_GAME, CATEGORIES } from './data/questions';

export const useNatureGame = createCategoryIndexQuizHook({
  questions: NATURE_QUESTIONS,
  gameType: 'nature',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: CATEGORIES,
  allCategory: 'הכל' as const,
  getCategoryOf: q => q.category,
});
