'use client';

import { useState, useCallback } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';

/**
 * Shared Zustand + question-list state used by every Zustand-backed quiz hook.
 * Handles: phase tracking, question list, current question, answer dispatch, restart.
 */
export function useQuizSession<Q>(gameType: string) {
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelect, restartQuiz } = useQuizGameStore();

  const [questions, setQuestions] = useState<Q[]>([]);
  const current = questions[index] ?? null;

  /** Start a new game round with the given question list. */
  const begin = useCallback((qs: Q[]) => {
    setQuestions(qs);
    startQuiz(gameType, qs.length);
  }, [startQuiz, gameType]);

  /** Submit an answer. No-op if already answered or no current question. */
  const answer = useCallback((value: string, correct: boolean) => {
    if (selected !== null || !current) return;
    storeSelect(value, correct);
  }, [selected, current, storeSelect]);

  /** Restart with a new question list. */
  const reset = useCallback((qs: Q[]) => {
    setQuestions(qs);
    restartQuiz();
  }, [restartQuiz]);

  return { phase, current, begin, answer, reset };
}
