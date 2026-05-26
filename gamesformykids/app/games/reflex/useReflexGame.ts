'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useReflexStore } from './reflexStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

export type { Target } from './reflexStore';

const _useStore = createShallowHook(useReflexStore);

export function useReflexGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('reflex');
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
      saveGameResultRef.current({ score: state.score, level: 1, durationSeconds });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  return state;
}
