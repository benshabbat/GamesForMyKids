'use client';
import { useColorTapStore } from './colorTapStore';
import { createPhaseGameHook } from '@/hooks/shared/progress';

export type { ColorItem, Question } from './colorTapStore';
export { COLORS, getTimePerQ } from './colorTapStore';

export const useColorTapGame = createPhaseGameHook(
  useColorTapStore,
  'color-tap',
  (s) => ({ score: s.score, level: 1 }),
);
