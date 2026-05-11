'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useTetrisStore } from '../store/tetrisStore';

export const useTetrisState = createShallowHook(useTetrisStore);
