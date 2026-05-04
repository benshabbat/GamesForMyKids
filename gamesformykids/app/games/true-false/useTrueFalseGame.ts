'use client';
import { useTrueFalseStore } from './trueFalseStore';

export type { Fact } from './trueFalseStore';
export { FACTS, TIME_PER_Q } from './trueFalseStore';

export function useTrueFalseGame() {
  const phase    = useTrueFalseStore((s) => s.phase);
  const score    = useTrueFalseStore((s) => s.score);
  const best     = useTrueFalseStore((s) => s.best);
  const lives    = useTrueFalseStore((s) => s.lives);
  const timeLeft = useTrueFalseStore((s) => s.timeLeft);
  const feedback = useTrueFalseStore((s) => s.feedback);
  const deck     = useTrueFalseStore((s) => s.deck);
  const idx      = useTrueFalseStore((s) => s.idx);
  const startGame = useTrueFalseStore((s) => s.startGame);
  const answer    = useTrueFalseStore((s) => s.answer);

  return { phase, q: deck[idx], score, best, lives, timeLeft, feedback, startGame, answer };
}
