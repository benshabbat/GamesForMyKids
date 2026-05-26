'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useWhackAMoleStore, GAME_DURATION } from './whackAMoleStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

export type { HoleState } from './whackAMoleStore';
export { GAME_DURATION } from './whackAMoleStore';

const _useStore = createShallowHook(useWhackAMoleStore);

export function useWhackAMoleGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('whack-a-mole');
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

  const pct     = (state.timeLeft / GAME_DURATION) * 100;
  const bgColor = state.timeLeft <= 10 ? 'from-red-100 to-rose-200' : 'from-yellow-50 to-amber-100';
  return { ...state, bgColor, pct };
}
