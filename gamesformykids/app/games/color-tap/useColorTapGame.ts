'use client';
import { useShallow } from 'zustand/react/shallow';
import { useColorTapStore } from './colorTapStore';

export type { ColorItem, Question } from './colorTapStore';
export { COLORS, TIME_PER_Q }       from './colorTapStore';

export function useColorTapGame() {
  const { phase, score, best, lives, timeLeft, feedback, question, startGame, handleTap } =
    useColorTapStore(useShallow((s) => s));
  return { phase, score, best, lives, question, timeLeft, feedback, startGame, handleTap };
}
