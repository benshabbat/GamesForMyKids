'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useTrueFalseStore } from './trueFalseStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

export type { Fact } from './trueFalseStore';
export { FACTS, TIME_PER_Q } from './trueFalseStore';

const _useStore = createShallowHook(useTrueFalseStore);

export function useTrueFalseGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('true-false');
  const startTimeRef = useRef<number>(0);

  // Record start time when game begins
  useEffect(() => {
    if (state.phase === 'playing') {
      startTimeRef.current = Date.now();
    }
  }, [state.phase]);

  // Persist result when game ends
  useEffect(() => {
    if (state.phase === 'dead') {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: state.score, level: 1, durationSeconds });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  return { ...state, q: state.deck[state.idx] };
}
