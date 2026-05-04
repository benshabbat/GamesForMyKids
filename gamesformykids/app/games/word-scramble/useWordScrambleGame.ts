'use client';
import { useShallow } from 'zustand/react/shallow';
import { useWordScrambleStore } from './wordScrambleStore';

export type { WordEntry, LetterSlot, PickedLetter } from './wordScrambleStore';
export { WORD_LIST } from './wordScrambleStore';

export function useWordScrambleGame() {
  const { phase, words, wIdx, letters, picked, score, lives, shake, correct, startGame, pickLetter, unpick } =
    useWordScrambleStore(useShallow((s) => s));
  return { phase, words, wIdx, letters, picked, score, lives, shake, correct, startGame, pickLetter, unpick };
}
