'use client';

import { createCategoryIndexQuizHook } from '@/lib/quiz/createCategoryIndexQuizHook';
import { SCIENCE_QUESTIONS, QUESTIONS_PER_GAME, TOPICS } from './data/questions';

export const useScienceGame = createCategoryIndexQuizHook({
  questions: SCIENCE_QUESTIONS,
  gameType: 'science',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: ['all', ...TOPICS] as const,
  allCategory: 'all' as const,
  getCategoryOf: q => q.topic,
  scoreMultiplier: 1,
});
