'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useDamkaStore } from './damkaStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { usePhaseGameCompletion } from '@/hooks/shared/progress/usePhaseGameCompletion';
export type { Side, GamePhase, Cell, Board, Pos, DamkaMove } from './damkaStore';

const _useStore = createShallowHook(useDamkaStore);

const AI_DELAY_MS = 700;

export function useDamkaGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('checkers');

  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track game start/end for session stats
  usePhaseGameCompletion(
    state.phase,
    saveGameResultRef,
    () => ({ score: state.playerScore, level: 1 }),
    ['won', 'lost'],
  );

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
