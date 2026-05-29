'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useDamkaStore } from './damkaStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
export type { Side, GamePhase, Cell, Board, Pos, DamkaMove } from './damkaStore';

const _useStore = createShallowHook(useDamkaStore);

const AI_DELAY_MS = 700;

export function useDamkaGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('checkers');

  const startTimeRef = useRef(0);
  const prevPhaseRef = useRef(state.phase);
  const aiTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track game start/end for session stats
  useEffect(() => {
    const prev = prevPhaseRef.current;
    const curr = state.phase;
    prevPhaseRef.current = curr;

    if (curr === 'playing' && prev !== 'playing') {
      startTimeRef.current = Date.now();
    } else if ((curr === 'won' || curr === 'lost') && prev === 'playing') {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: state.playerScore, level: 1, durationSeconds });
    }
  }, [state.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Schedule AI move after player's turn with a short think delay
  useEffect(() => {
    if (state.phase === 'playing' && state.currentTurn === 'computer') {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
      aiTimerRef.current = setTimeout(() => {
        useDamkaStore.getState().doComputerMove();
        aiTimerRef.current = null;
      }, AI_DELAY_MS);
    }
    return () => {
      if (aiTimerRef.current) { clearTimeout(aiTimerRef.current); aiTimerRef.current = null; }
    };
  }, [state.phase, state.currentTurn]);

  return state;
}
