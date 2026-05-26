'use client';

import { useCallback } from 'react';
import { SOCCER_QUESTIONS, SOCCER_CATEGORIES } from '@/lib/quiz/data/soccer';
import { createCategoryIndexQuizHook } from './createCategoryIndexQuizHook';
import { QUESTIONS_PER_GAME } from './constants';
import { useSoccerGameStore } from '@/app/games/soccer/soccerGameStore';

const _useSoccerQuiz = createCategoryIndexQuizHook({
  questions: SOCCER_QUESTIONS,
  gameType: 'soccer',
  questionsPerGame: QUESTIONS_PER_GAME,
  categories: SOCCER_CATEGORIES,
  allCategory: 'הכל' as const,
  getCategoryOf: (q) => q.category,
});

export function useSoccerGame() {
  const quiz = _useSoccerQuiz();
  const { showGoal, setShowGoal } = useSoccerGameStore();

  // Wrap selectAnswer to trigger the goal celebration on correct answers
  const selectAnswer = useCallback((idx: number | string) => {
    const idxStr = String(idx);
    const isCorrect = quiz.correctLabel === idxStr;
    if (isCorrect) {
      setShowGoal(true);
      setTimeout(() => setShowGoal(false), 1500);
    }
    quiz.selectAnswer(idxStr);
  }, [quiz, setShowGoal]);

  return {
    ...quiz,
    showGoal,
    selectAnswer,
  };
}
