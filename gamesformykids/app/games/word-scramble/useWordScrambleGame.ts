'use client';
import { useWordScrambleStore } from './wordScrambleStore';
import { createPhaseGameHook } from '@/hooks/shared/progress';

export type { WordEntry, LetterSlot, PickedLetter } from './wordScrambleStore';
export { WORD_LIST } from './wordScrambleStore';

export const useWordScrambleGame = createPhaseGameHook(
  useWordScrambleStore,
  'word-scramble',
  (s) => ({ score: s.score, level: 1 }),
  ['results'],
);
