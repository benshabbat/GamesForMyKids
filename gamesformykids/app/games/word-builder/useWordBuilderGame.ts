'use client';
import { createPhaseGameHook } from '@/hooks/shared/progress/createPhaseGameHook';
import { useWordBuilderStore } from './wordBuilderStore';

export type { WordPuzzle, AvailableLetter } from './wordBuilderStore';

const _useBase = createPhaseGameHook(
  useWordBuilderStore,
  'word-builder',
  (s) => ({ score: s.score, level: 1 }),
  ['result'],
);

export function useWordBuilderGame() {
  const state = _useBase();
  return {
    ...state,
    current: state.puzzles[state.index],
    total: state.puzzles.length,
    restart: state.startGame,
  };
}
