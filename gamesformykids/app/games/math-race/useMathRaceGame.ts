'use client';
import { useMathRaceStore } from './mathRaceStore';

export type { Question } from './mathRaceStore';
export { makeQ, GAME_TIME } from './mathRaceStore';

export function useMathRaceGame() {
  const phase    = useMathRaceStore((s) => s.phase);
  const q        = useMathRaceStore((s) => s.q);
  const score    = useMathRaceStore((s) => s.score);
  const best     = useMathRaceStore((s) => s.best);
  const timeLeft = useMathRaceStore((s) => s.timeLeft);
  const feedback = useMathRaceStore((s) => s.feedback);
  const streak   = useMathRaceStore((s) => s.streak);
  const total    = useMathRaceStore((s) => s.total);
  const correct  = useMathRaceStore((s) => s.correct);
  const startGame = useMathRaceStore((s) => s.startGame);
  const tap       = useMathRaceStore((s) => s.tap);

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return { phase, q, score, best, timeLeft, feedback, streak, total, correct, accuracy, startGame, tap };
}
