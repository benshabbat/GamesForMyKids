'use client';
import { useEmojiMathStore } from './emojiMathStore';
import { createPhaseGameHook } from '@/hooks/shared/progress';

export type { Op, Question } from './emojiMathStore';
export { makeQuestion, getTimePerQ } from './emojiMathStore';

export const useEmojiMathGame = createPhaseGameHook(
  useEmojiMathStore,
  'emoji-math',
  (s) => ({ score: s.score, level: s.level }),
);
