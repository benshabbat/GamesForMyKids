'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useArithmeticGameStore } from './arithmeticGameStore';

export const useArithmeticGame = createShallowHook(useArithmeticGameStore);
