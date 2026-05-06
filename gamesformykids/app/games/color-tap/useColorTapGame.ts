'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useColorTapStore } from './colorTapStore';

export type { ColorItem, Question } from './colorTapStore';
export { COLORS, TIME_PER_Q } from './colorTapStore';

export const useColorTapGame = createShallowHook(useColorTapStore);
