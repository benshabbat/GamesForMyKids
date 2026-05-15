'use client';
import { useBalloonPopStore } from './balloonPopStore';
import { createPhaseGameHook } from '@/hooks/shared/progress';

export const useBalloonPopGame = createPhaseGameHook(
  useBalloonPopStore,
  'balloon-pop',
  (s) => ({ score: s.score, level: 1 }),
  ['result'],
);
