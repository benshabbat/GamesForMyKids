'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useEmojiMathStore } from './emojiMathStore';

export type { Op, Question } from './emojiMathStore';
export { makeQuestion, TIME_PER_Q } from './emojiMathStore';

export const useEmojiMathGame = createShallowHook(useEmojiMathStore);
