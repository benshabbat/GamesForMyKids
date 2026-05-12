'use client';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useEmojiMathStore } from './emojiMathStore';
import { useGameCompletion } from '@/hooks/shared/progress';

export type { Op, Question } from './emojiMathStore';
export { makeQuestion, TIME_PER_Q } from './emojiMathStore';

export function useEmojiMathGame() {
  const state = useEmojiMathStore(useShallow((s) => s));
  const { saveGameResultRef } = useGameCompletion('emoji-math');

  const startTimeRef = useRef(0);
  const prevPhaseRef = useRef<string>(state.phase);

  useEffect(() => {
    const prev = prevPhaseRef.current;
    const curr = state.phase;
    prevPhaseRef.current = curr;

    if (curr === 'playing' && prev !== 'playing') {
      startTimeRef.current = Date.now();
    } else if (prev === 'playing' && curr === 'dead') {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: state.score, level: state.level, durationSeconds: elapsed });
    }
  }, [state.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
