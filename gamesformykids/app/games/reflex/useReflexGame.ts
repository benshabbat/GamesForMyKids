'use client';
import { useShallow } from 'zustand/react/shallow';
import { useReflexStore } from './reflexStore';

export type { Target } from './reflexStore';

export function useReflexGame() {
  const { phase, targets, score, missed, timeLeft, startGame, hitTarget } =
    useReflexStore(useShallow((s) => s));
  return { phase, targets, score, missed, timeLeft, startGame, hitTarget };
}
