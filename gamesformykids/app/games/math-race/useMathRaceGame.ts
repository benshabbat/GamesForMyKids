'use client';
import { useShallow } from 'zustand/react/shallow';
import { useMathRaceStore } from './mathRaceStore';

export type { Question } from './mathRaceStore';
export { makeQ, GAME_TIME } from './mathRaceStore';

export function useMathRaceGame() {
  const { phase, q, score, best, timeLeft, feedback, streak, total, correct, startGame, tap } =
    useMathRaceStore(useShallow((s) => s));
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { phase, q, score, best, timeLeft, feedback, streak, total, correct, accuracy, startGame, tap };
}
