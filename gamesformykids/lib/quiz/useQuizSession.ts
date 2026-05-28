'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useGameStore } from '@/lib/stores/gameStore';
import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import type { GameType } from '@/lib/types';

export function useQuizSession<Q>(gameType: string) {
  const phase    = useQuizGameStore(s => s.phase);
  const index    = useQuizGameStore(s => s.index);
  const selected = useQuizGameStore(s => s.selected);
  const score    = useQuizGameStore(s => s.score);
  const { startQuiz, selectAnswer: storeSelect, restartQuiz } = useQuizGameStore();

  const [questions, setQuestions] = useState<Q[]>([]);
  const current = questions[index] ?? null;

  const { saveGameResultRef } = useGameCompletion(gameType as GameType);
  const startTimeRef = useRef(0);

  const begin = useCallback((qs: Q[]) => {
    setQuestions(qs);
    startQuiz(gameType, qs.length);
    startTimeRef.current = Date.now();
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
    startTimeRef.current = Date.now();
    useGameStore.getState().startGame(gameType);
    useGameProgressStore.getState().resetProgress();
    useGameProgressStore.getState().setGameActive(true);
  }, [restartQuiz, gameType]);

  useEffect(() => {
    if (phase === 'result') {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score, level: 1, durationSeconds });
      useGameStore.getState().endGame();
      useGameProgressStore.getState().setGameActive(false);
    }
  }, [phase, score, saveGameResultRef]);

  return { phase, current, begin, answer, reset };
}
