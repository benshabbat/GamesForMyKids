'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useChessStore } from './store/useChessStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

const useStoreBase = createShallowHook(useChessStore);

const TERMINAL_PHASES = ['checkmate', 'stalemate'] as const;
// 'check' is still the same game in progress — only menu/terminal -> active starts a new timer
const ACTIVE_PHASES = ['playing', 'check'] as const;

export function useChessGame() {
  const state = useStoreBase();
  const { saveGameResultRef } = useGameCompletion('chess');

  const startTimeRef = useRef(0);
  const prevPhaseRef = useRef(state.phase);

  useEffect(() => {
    const prev = prevPhaseRef.current;
    const curr = state.phase;
    prevPhaseRef.current = curr;

    if (
      (ACTIVE_PHASES as readonly string[]).includes(curr) &&
      !(ACTIVE_PHASES as readonly string[]).includes(prev)
    ) {
      // Game (re)started — begin timer
      startTimeRef.current = Date.now();
    } else if (
      (TERMINAL_PHASES as readonly string[]).includes(curr) &&
      !(TERMINAL_PHASES as readonly string[]).includes(prev)
    ) {
      // Game just ended (from 'playing' or 'check' → terminal)
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: state.playerScore, level: 1, durationSeconds });
    }
  }, [state.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
