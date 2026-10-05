'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useTrueFalseStore } from './trueFalseStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';
import { usePhaseGameCompletion } from '@/hooks/shared/progress/usePhaseGameCompletion';

export type { Fact } from './trueFalseStore';
export { FACTS, getTimePerQ } from './trueFalseStore';

const _useStore = createShallowHook(useTrueFalseStore);

export function useTrueFalseGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('true-false');

  // Save once, on the playing → dead transition. Tracking the transition (rather than
  // "phase === 'dead'") matters because the result screen also calls this hook: it mounts
  // already in 'dead' and must not save a second, start-time-less result.
  usePhaseGameCompletion(state.phase, saveGameResultRef, () => ({ score: state.score, level: 1 }), ['dead']);

  return { ...state, q: state.deck[state.idx] };
}
