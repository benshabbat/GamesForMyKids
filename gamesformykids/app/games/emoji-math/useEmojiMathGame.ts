'use client';
import { useShallow } from 'zustand/react/shallow';
import { useEmojiMathStore } from './emojiMathStore';
import { useGameCompletion, usePhaseGameCompletion } from '@/hooks/shared/progress';

export type { Op, Question } from './emojiMathStore';
export { makeQuestion, TIME_PER_Q } from './emojiMathStore';

export function useEmojiMathGame() {
  const state = useEmojiMathStore(useShallow((s) => s));
  const { saveGameResultRef } = useGameCompletion('emoji-math');

  usePhaseGameCompletion(state.phase, saveGameResultRef, () => ({ score: state.score, level: state.level }));

  return state;
}
