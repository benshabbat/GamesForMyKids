'use client';
import { useCallback } from 'react';
import { buildSortingQuestions, type SortingQuestion } from '@/lib/quiz/data/sorting';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { useQuizSession } from '@/lib/quiz/useQuizSession';

export type { SortingQuestion };

export function useSortingGame() {
  const { phase, current, begin, answer, reset } = useQuizSession<SortingQuestion>('sorting');

  const startGame = useCallback(() => begin(buildSortingQuestions(QUESTIONS_PER_GAME)), [begin]);

  const selectAnswer = useCallback((choice: string) => {
    if (!current) return;
    const correct = current.itemCategory === 'A'
      ? choice === current.categoryA.name
      : choice === current.categoryB.name;
    answer(choice, correct);
  }, [answer, current]);

  const restart = useCallback(() => reset(buildSortingQuestions(QUESTIONS_PER_GAME)), [reset]);

  return { phase, current, startGame, selectAnswer, restart };
}
