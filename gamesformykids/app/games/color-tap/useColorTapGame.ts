'use client';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useColorTapStore } from './colorTapStore';
import { useGameCompletion } from '@/hooks/shared/progress';

export type { ColorItem, Question } from './colorTapStore';
export { COLORS, TIME_PER_Q } from './colorTapStore';

export function useColorTapGame() {
  const state = useColorTapStore(useShallow((s) => s));
  const { saveGameResultRef } = useGameCompletion('color-tap');

  const startTimeRef = useRef(0);
  const prevPhaseRef = useRef<string>(state.phase);

  useEffect(() => {
    const prev = prevPhaseRef.current;
    const curr = state.phase;
    prevPhaseRef.current = curr;

    if (curr === 'playing' && prev !== 'playing') {
      startTimeRef.current = Date.now();
    } else if (prev === 'playing' && curr === 'dead') {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: state.score, level: 1, durationSeconds: elapsed });
    }
  }, [state.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
