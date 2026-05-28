'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useDamkaStore } from './damkaStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
export type { Side, GamePhase, Cell, Board, Pos, DamkaMove } from './damkaStore';

const _useStore = createShallowHook(useDamkaStore);

export function useDamkaGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('checkers');

  const startTimeRef = useRef(0);
  const prevPhaseRef = useRef(state.phase);

  useEffect(() => {
    const prev = prevPhaseRef.current;
    const curr = state.phase;
    prevPhaseRef.current = curr;

    if (curr === 'playing' && prev !== 'playing') {
      // Game (re)started — begin timer
      startTimeRef.current = Date.now();
    } else if ((curr === 'won' || curr === 'lost') && prev === 'playing') {
      // Game just ended — save result
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: state.playerScore, level: 1, durationSeconds });
    }
  }, [state.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
