'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useNumberBubblesStore } from './numberBubblesStore';

export type { Bubble } from './numberBubblesStore';
export { BUBBLE_COLORS, makeBubbles } from './numberBubblesStore';

export const useNumberBubblesGame = createShallowHook(useNumberBubblesStore);
