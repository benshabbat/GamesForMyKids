'use client';

import { createCategoryIndexQuizHook } from '@/lib/quiz/createCategoryIndexQuizHook';
import { TRANSPORT_QUESTIONS, TRANSPORT_TYPES } from '@/app/games/transport/data/transport';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';

export const useTransportGame = createCategoryIndexQuizHook({
  gameType: 'transport',
  questions: TRANSPORT_QUESTIONS,
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: TRANSPORT_TYPES,
  allCategory: 'הכל' as const,
  getCategoryOf: (q) => q.type,
});
