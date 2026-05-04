'use client';
import { useShallow } from 'zustand/react/shallow';
import { useTrueFalseStore } from './trueFalseStore';

export type { Fact } from './trueFalseStore';
export { FACTS, TIME_PER_Q } from './trueFalseStore';

export function useTrueFalseGame() {
  const { phase, score, best, lives, timeLeft, feedback, deck, idx, startGame, answer } =
    useTrueFalseStore(useShallow((s) => s));
  return { phase, q: deck[idx], score, best, lives, timeLeft, feedback, startGame, answer };
}
