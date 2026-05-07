'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { usePuzzleStore } from './store/puzzleStore';

export const usePuzzleGame = createShallowHook(usePuzzleStore);
