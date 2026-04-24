'use client';

import { createCategoryIndexQuizHook } from '@/lib/quiz/createCategoryIndexQuizHook';
import { TRIVIA_QUESTIONS, QUESTIONS_PER_GAME, CATEGORIES } from './data/questions';

export const useTriviaGame = createCategoryIndexQuizHook({
  questions: TRIVIA_QUESTIONS,
  gameType: 'trivia',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: ['all', ...CATEGORIES] as const,
  allCategory: 'all' as const,
  getCategoryOf: q => q.category,
  scoreMultiplier: 1,
});
