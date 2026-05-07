'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useChessStore } from './store/useChessStore';

export const useChessGame = createShallowHook(useChessStore);
