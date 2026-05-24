'use client';

import { useState, useCallback } from 'react';
import { createCategoryIndexQuizHook } from './createCategoryIndexQuizHook';
import { SOCCER_QUESTIONS, SOCCER_CATEGORIES } from '@/app/games/soccer/data/soccer';
import { QUESTIONS_PER_GAME } from './constants';

const _useSoccerBase = createCategoryIndexQuizHook({
  questions: SOCCER_QUESTIONS,
  gameType: 'soccer',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: SOCCER_CATEGORIES,
  allCategory: 'הכל' as const,
  getCategoryOf: (q) => q.category,
});

export function useSoccerGame() {
  const base = _useSoccerBase();
  const [showGoal, setShowGoal] = useState(false);

  const selectAnswer = useCallback((idx: number) => {
    const idxStr = String(idx);
    if (base.correctLabel === idxStr) {
      setShowGoal(true);
      setTimeout(() => setShowGoal(false), 1500);
    }
    base.selectAnswer(idxStr);
  }, [base]);

  return { ...base, showGoal, selectAnswer };
}
