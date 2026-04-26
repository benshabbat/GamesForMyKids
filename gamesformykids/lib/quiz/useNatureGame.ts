'use client';
import { createCategoryIndexQuizHook } from '@/lib/quiz/createCategoryIndexQuizHook';
import { NATURE_QUESTIONS, CATEGORIES } from '@/lib/quiz/data/nature';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

export const useNatureGame = createCategoryIndexQuizHook({
  questions: NATURE_QUESTIONS,
  gameType: 'nature',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: CATEGORIES,
  allCategory: 'הכל' as const,
  getCategoryOf: q => q.category,
});
