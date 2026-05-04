'use client';
import { useShallow } from 'zustand/react/shallow';
import { useEmojiMathStore } from './emojiMathStore';

export type { Op, Question } from './emojiMathStore';
export { makeQuestion, TIME_PER_Q } from './emojiMathStore';

export function useEmojiMathGame() {
  const { phase, q, score, best, lives, level, timeLeft, feedback, streak, startGame, tap } =
    useEmojiMathStore(useShallow((s) => s));
  return { phase, q, score, best, lives, level, timeLeft, feedback, streak, startGame, tap };
}
