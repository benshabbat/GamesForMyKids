'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useMathRaceStore } from './mathRaceStore';

export type { Question } from './mathRaceStore';
export { makeQ, GAME_TIME } from './mathRaceStore';

const _useStore = createShallowHook(useMathRaceStore);

export function useMathRaceGame() {
  const state = _useStore();
  const accuracy = state.total > 0 ? Math.round((state.correct / state.total) * 100) : 0;
  return { ...state, accuracy };
}
