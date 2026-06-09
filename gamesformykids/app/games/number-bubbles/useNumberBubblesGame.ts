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

  // Game timer — ticks every 100ms while playing
  useEffect(() => {
    if (state.phase !== 'playing') return;
    startTimeRef.current = Date.now();
    const id = setInterval(() => {
      state.tick(Math.floor((Date.now() - startTimeRef.current) / 100) / 10);
    }, 100);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // Clear wrong-answer flash after 600ms
  useEffect(() => {
    if (!state.wrong) return;
    const id = setTimeout(state.clearWrong, 600);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.wrong]);

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
