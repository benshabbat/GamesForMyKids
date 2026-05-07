'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useBalloonPopStore } from './balloonPopStore';

export const useBalloonPopGame = createShallowHook(useBalloonPopStore);
