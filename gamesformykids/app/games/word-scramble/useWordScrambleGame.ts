'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useWordScrambleStore } from './wordScrambleStore';

export type { WordEntry, LetterSlot, PickedLetter } from './wordScrambleStore';
export { WORD_LIST } from './wordScrambleStore';

export const useWordScrambleGame = createShallowHook(useWordScrambleStore);
