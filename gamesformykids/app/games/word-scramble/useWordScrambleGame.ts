'use client';
import { useShallow } from 'zustand/react/shallow';
import { useWordScrambleStore } from './wordScrambleStore';
import { useGameCompletion, usePhaseGameCompletion } from '@/hooks/shared/progress';

export type { WordEntry, LetterSlot, PickedLetter } from './wordScrambleStore';
export { WORD_LIST } from './wordScrambleStore';

export function useWordScrambleGame() {
  const state = useWordScrambleStore(useShallow((s) => s));
  const { saveGameResultRef } = useGameCompletion('word-scramble');

  usePhaseGameCompletion(state.phase, saveGameResultRef, () => ({ score: state.score, level: 1 }), ['results']);

  return state;
}
