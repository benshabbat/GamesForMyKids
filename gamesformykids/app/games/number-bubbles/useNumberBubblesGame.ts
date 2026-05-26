'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useNumberBubblesStore } from './numberBubblesStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

export type { Bubble } from './numberBubblesStore';
export { BUBBLE_COLORS, makeBubbles } from './numberBubblesStore';

const _useStore = createShallowHook(useNumberBubblesStore);

export function useNumberBubblesGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('number-bubbles');
  const startTimeRef = useRef<number>(0);

  // Record start time when a round begins
  useEffect(() => {
    if (state.phase === 'playing') {
      startTimeRef.current = Date.now();
    }
  }, [state.phase]);

  // Persist result on each level completion
  useEffect(() => {
    if (state.phase === 'results') {
      const durationSeconds = Math.round(state.elapsed);
      saveGameResultRef.current({ score: state.level, level: state.level, durationSeconds });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.level]);

  return state;
}
