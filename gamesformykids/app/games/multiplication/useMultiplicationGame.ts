'use client';
import { useEffect, useRef } from 'react';
import { useMultiplicationGameStore } from './multiplicationGameStore';
import { LEVELS, QUESTIONS_PER_LEVEL, TIME_PER_QUESTION } from './data/tables';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

export function useMultiplicationGame() {
  const store = useMultiplicationGameStore();
  const { saveGameResultRef } = useGameCompletion('multiplication');
  const startTimeRef = useRef<number>(0);

  // Record start time when game begins
  useEffect(() => {
    if (store.phase === 'playing') {
      startTimeRef.current = Date.now();
    }
  }, [store.phase]);

  // Persist result when game ends
  useEffect(() => {
    if (store.phase === 'result') {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      const level = typeof store.level === 'number' ? store.level : 1;
      saveGameResultRef.current({ score: store.score, level, durationSeconds });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.phase]);

  return { ...store, totalQuestions: QUESTIONS_PER_LEVEL, levels: LEVELS, timePerQuestion: TIME_PER_QUESTION };
}
