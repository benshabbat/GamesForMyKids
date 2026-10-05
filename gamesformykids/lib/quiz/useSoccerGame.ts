'use client';

import { useCallback, useEffect, useRef } from 'react';
import { SOCCER_QUESTIONS, SOCCER_CATEGORIES } from '@/lib/quiz/data/soccer';
import { createCategoryIndexQuizHook } from './createCategoryIndexQuizHook';
import { QUESTIONS_PER_GAME } from './constants';
import { useSoccerGameStore } from '@/app/games/soccer/soccerGameStore';

const useSoccerQuizBase = createCategoryIndexQuizHook({
  questions: SOCCER_QUESTIONS,
  gameType: 'soccer',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: SOCCER_CATEGORIES,
  allCategory: 'הכל' as const,
  getCategoryOf: (q) => q.category,
});

export function useSoccerGame() {
  const quiz = useSoccerQuizBase();
  const { showGoal, setShowGoal } = useSoccerGameStore();
  const goalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The goal flag lives in a store that outlives this component: cancel the pending hide when
  // the player leaves, and hide the animation right away so it is not left showing next visit.
  useEffect(() => () => {
    if (goalTimerRef.current) clearTimeout(goalTimerRef.current);
    setShowGoal(false);
  }, [setShowGoal]);

  // Wrap selectAnswer to trigger the goal celebration on correct answers
  const selectAnswer = useCallback((idx: number | string) => {
    const idxStr = String(idx);
    const isCorrect = quiz.correctLabel === idxStr;
    if (isCorrect) {
      setShowGoal(true);
      if (goalTimerRef.current) clearTimeout(goalTimerRef.current);
      goalTimerRef.current = setTimeout(() => setShowGoal(false), 1500);
    }
    quiz.selectAnswer(idxStr);
  }, [quiz, setShowGoal]);

  return {
    ...quiz,
    showGoal,
    selectAnswer,
  };
}
