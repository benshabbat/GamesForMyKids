'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useTakiStore } from './takiGameStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { usePhaseGameCompletion } from '@/hooks/shared/progress/usePhaseGameCompletion';

const _useStore = createShallowHook(useTakiStore);

export function useTakiGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('taki');
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  usePhaseGameCompletion(
    state.phase,
    saveGameResultRef,
    () => ({ score: state.playerScore, level: 1 }),
    ['won', 'lost'],
  );

  // Computer AI turn timer — delays the computer move for a natural feel
  useEffect(() => {
    if (state.phase !== 'playing' || state.currentTurn !== 'computer') return;
    const delay = state.inTakiSequence ? 600 : 1100;
    aiTimerRef.current = setTimeout(() => state.computerTurn(), delay);
    return () => { if (aiTimerRef.current) clearTimeout(aiTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.currentTurn, state.turnId, state.inTakiSequence]);

  return state;
}
