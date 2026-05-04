'use client';
import { useColorTapStore } from './colorTapStore';

export type { ColorItem, Question } from './colorTapStore';
export { COLORS, TIME_PER_Q }       from './colorTapStore';

export function useColorTapGame() {
  const phase     = useColorTapStore((s) => s.phase);
  const score     = useColorTapStore((s) => s.score);
  const best      = useColorTapStore((s) => s.best);
  const lives     = useColorTapStore((s) => s.lives);
  const timeLeft  = useColorTapStore((s) => s.timeLeft);
  const feedback  = useColorTapStore((s) => s.feedback);
  const question  = useColorTapStore((s) => s.question);
  const startGame = useColorTapStore((s) => s.startGame);
  const handleTap = useColorTapStore((s) => s.handleTap);

  return { phase, score, best, lives, question, timeLeft, feedback, startGame, handleTap };
}
