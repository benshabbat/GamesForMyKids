'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useTakiStore } from './takiGameStore';

export const useTakiGame = createShallowHook(useTakiStore);
