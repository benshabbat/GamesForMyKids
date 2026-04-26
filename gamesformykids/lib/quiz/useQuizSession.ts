'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';

export function useQuizSession<Q>(gameType: string) {
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const { startQuiz, selectAnswer: storeSelect, restartQuiz } = useQuizGameStore();

  const [questions, setQuestions] = useState<Q[]>([]);
  const current = questions[index] ?? null;

  const begin = useCallback((qs: Q[]) => {
    setQuestions(qs);
    startQuiz(gameType, qs.length);
    useGameStore.getState().startGame(gameType);
    useGameProgressStore.getState().resetProgress();
    useGameProgressStore.getState().setGameActive(true);
  }, [startQuiz, gameType]);

  const answer = useCallback((value: string, correct: boolean) => {
    if (selected !== null || !current) return;
    storeSelect(value, correct);
    useGameProgressStore.getState().recordAttempt(correct);
  }, [selected, current, storeSelect]);

  const reset = useCallback((qs: Q[]) => {
    setQuestions(qs);
    restartQuiz();
    useGameStore.getState().startGame(gameType);
    useGameProgressStore.getState().resetProgress();
    useGameProgressStore.getState().setGameActive(true);
  }, [restartQuiz, gameType]);

  useEffect(() => {
    if (phase === 'result') {
      useGameStore.getState().endGame();
      useGameProgressStore.getState().setGameActive(false);
    }
  }, [phase]);

  return { phase, current, begin, answer, reset };
}
