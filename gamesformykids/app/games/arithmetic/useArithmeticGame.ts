'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useArithmeticGameStore } from './arithmeticGameStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

const _useStore = createShallowHook(useArithmeticGameStore);

export function useArithmeticGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('arithmetic');
  const startTimeRef = useRef<number>(0);

  // Record start time when game begins
  useEffect(() => {
    if (state.phase === 'playing') {
      startTimeRef.current = Date.now();
    }
  }, [state.phase]);

  // Persist result when game ends
  useEffect(() => {
    if (state.phase === 'result') {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      const level = typeof state.level === 'object' && state.level !== null && 'id' in (state.level as object)
        ? (state.level as { id: number }).id
        : 1;
      saveGameResultRef.current({ score: state.score, level, durationSeconds });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  return state;
}
