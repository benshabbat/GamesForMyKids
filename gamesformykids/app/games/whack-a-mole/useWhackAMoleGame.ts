'use client';
import { useShallow } from 'zustand/react/shallow';
import { useWhackAMoleStore, GAME_DURATION } from './whackAMoleStore';

export type { HoleState } from './whackAMoleStore';
export { GAME_DURATION } from './whackAMoleStore';

export function useWhackAMoleGame() {
  const { phase, holes, holeValues, score, timeLeft, best, combo, startGame, whack } =
    useWhackAMoleStore(useShallow((s) => s));
  const pct     = (timeLeft / GAME_DURATION) * 100;
  const bgColor = timeLeft <= 10 ? 'from-red-100 to-rose-200' : 'from-yellow-50 to-amber-100';
  return { phase, holes, holeValues, score, timeLeft, best, combo, bgColor, pct, startGame, whack };
}
