'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useWhackAMoleStore, GAME_DURATION } from './whackAMoleStore';

export type { HoleState } from './whackAMoleStore';
export { GAME_DURATION } from './whackAMoleStore';

const _useStore = createShallowHook(useWhackAMoleStore);

export function useWhackAMoleGame() {
  const state = _useStore();
  const pct     = (state.timeLeft / GAME_DURATION) * 100;
  const bgColor = state.timeLeft <= 10 ? 'from-red-100 to-rose-200' : 'from-yellow-50 to-amber-100';
  return { ...state, bgColor, pct };
}
