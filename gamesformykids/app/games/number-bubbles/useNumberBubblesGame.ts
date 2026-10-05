'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useNumberBubblesStore } from './numberBubblesStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { usePhaseGameCompletion } from '@/hooks/shared/progress/usePhaseGameCompletion';

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

  // Persist a result each time a level is completed (playing → results). Tracking the
  // transition (rather than "phase === 'results'") matters because the result screen also
  // calls this hook: it mounts already in 'results' and would save the same level again.
  usePhaseGameCompletion(
    state.phase,
    saveGameResultRef,
    () => ({ score: state.level, level: state.level }),
    ['results'],
  );

  return state;
}
