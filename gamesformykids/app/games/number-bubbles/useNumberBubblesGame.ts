'use client';
import { useShallow } from 'zustand/react/shallow';
import { useNumberBubblesStore } from './numberBubblesStore';

export type { Bubble } from './numberBubblesStore';
export { BUBBLE_COLORS, makeBubbles } from './numberBubblesStore';

export function useNumberBubblesGame() {
  const { phase, level, bubbles, next, elapsed, best, wrong, startGame, startRound, nextLevel, tap } =
    useNumberBubblesStore(useShallow((s) => s));
  return { phase, level, bubbles, next, elapsed, best, wrong, startGame, startRound, nextLevel, tap };
}
