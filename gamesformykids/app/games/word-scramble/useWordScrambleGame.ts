'use client';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWordScrambleStore } from './wordScrambleStore';
import { useGameCompletion } from '@/hooks/shared/progress';

export type { WordEntry, LetterSlot, PickedLetter } from './wordScrambleStore';
export { WORD_LIST } from './wordScrambleStore';

export function useWordScrambleGame() {
  const state = useWordScrambleStore(useShallow((s) => s));
  const { saveGameResultRef } = useGameCompletion('word-scramble');

  const startTimeRef = useRef(0);
  const prevPhaseRef = useRef<string>(state.phase);

  useEffect(() => {
    const prev = prevPhaseRef.current;
    const curr = state.phase;
    prevPhaseRef.current = curr;

    if (curr === 'playing' && prev !== 'playing') {
      startTimeRef.current = Date.now();
    } else if (prev === 'playing' && curr === 'results') {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({ score: state.score, level: 1, durationSeconds: elapsed });
    }
  }, [state.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
