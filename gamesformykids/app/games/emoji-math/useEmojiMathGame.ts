'use client';
import { useEmojiMathStore } from './emojiMathStore';

export type { Op, Question } from './emojiMathStore';
export { makeQuestion, TIME_PER_Q }  from './emojiMathStore';

export function useEmojiMathGame() {
  const phase    = useEmojiMathStore((s) => s.phase);
  const score    = useEmojiMathStore((s) => s.score);
  const best     = useEmojiMathStore((s) => s.best);
  const lives    = useEmojiMathStore((s) => s.lives);
  const timeLeft = useEmojiMathStore((s) => s.timeLeft);
  const feedback = useEmojiMathStore((s) => s.feedback);
  const q        = useEmojiMathStore((s) => s.q);
  const level    = useEmojiMathStore((s) => s.level);
  const streak   = useEmojiMathStore((s) => s.streak);
  const startGame = useEmojiMathStore((s) => s.startGame);
  const tap       = useEmojiMathStore((s) => s.tap);

  return { phase, q, score, best, lives, level, timeLeft, feedback, streak, startGame, tap };
}
