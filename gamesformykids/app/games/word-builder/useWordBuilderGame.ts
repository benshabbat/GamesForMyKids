'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useWordBuilderStore } from './wordBuilderStore';

export type { WordPuzzle, AvailableLetter } from './wordBuilderStore';

const _useStore = createShallowHook(useWordBuilderStore);

export function useWordBuilderGame() {
  const state = _useStore();
  return {
    ...state,
    current: state.puzzles[state.index],
    total: state.puzzles.length,
    restart: state.startGame,
  };
}
