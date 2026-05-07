'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useMemoryStore } from './stores/useMemoryStore';

export const useMemoryGame = createShallowHook(useMemoryStore);
