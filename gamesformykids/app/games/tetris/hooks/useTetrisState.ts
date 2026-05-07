'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useTetrisStore } from '@/lib/stores/tetrisStore';

export const useTetrisState = createShallowHook(useTetrisStore);
