'use client';
import { useShallow } from 'zustand/react/shallow';
import { useColorTapStore } from './colorTapStore';
import { useGameCompletion, usePhaseGameCompletion } from '@/hooks/shared/progress';

export type { ColorItem, Question } from './colorTapStore';
export { COLORS, TIME_PER_Q } from './colorTapStore';

export function useColorTapGame() {
  const state = useColorTapStore(useShallow((s) => s));
  const { saveGameResultRef } = useGameCompletion('color-tap');

  usePhaseGameCompletion(state.phase, saveGameResultRef, () => ({ score: state.score, level: 1 }));

  return state;
}
