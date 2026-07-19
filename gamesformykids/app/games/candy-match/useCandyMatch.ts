'use client';
import { useCandyMatchStore } from './candyMatchStore';
import { createPhaseGameHook } from '@/hooks/shared/progress/createPhaseGameHook';

export { GRID_SIZE, CANDIES } from './candyMatchStore';
export type { Cell } from './candyMatchStore';

export const useCandyMatch = createPhaseGameHook(
  useCandyMatchStore,
  'candy-match',
  (s) => ({ score: s.score, level: 1 }),
);
