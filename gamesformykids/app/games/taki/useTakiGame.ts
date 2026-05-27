'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useTakiStore } from './takiGameStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { usePhaseGameCompletion } from '@/hooks/shared/progress/usePhaseGameCompletion';

const _useStore = createShallowHook(useTakiStore);

export function useTakiGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('taki');
  usePhaseGameCompletion(
    state.phase,
    saveGameResultRef,
    () => ({ score: state.playerScore, level: 1 }),
    ['won', 'lost'],
  );
  return state;
}
