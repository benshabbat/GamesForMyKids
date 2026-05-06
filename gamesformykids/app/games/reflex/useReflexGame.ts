'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useReflexStore } from './reflexStore';

export type { Target } from './reflexStore';

export const useReflexGame = createShallowHook(useReflexStore);
