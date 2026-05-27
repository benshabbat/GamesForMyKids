'use client';
import { createPhaseGameHook } from '@/hooks/shared/progress/createPhaseGameHook';
import { useMathRaceStore } from './mathRaceStore';

export type { Question } from './mathRaceStore';
export { makeQ, GAME_TIME } from './mathRaceStore';

const _useBase = createPhaseGameHook(
  useMathRaceStore,
  'math-race',
  (s) => ({ score: s.score, level: 1 }),
  ['dead'],
);

export function useMathRaceGame() {
  const state = _useBase();
  const accuracy = state.total > 0 ? Math.round((state.correct / state.total) * 100) : 0;
  return { ...state, accuracy };
}
