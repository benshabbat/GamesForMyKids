'use client';
import { createPhaseGameHook } from '@/hooks/shared/progress/createPhaseGameHook';
import { useArithmeticGameStore } from './arithmeticGameStore';

const _useBase = createPhaseGameHook(
  useArithmeticGameStore,
  'arithmetic',
  (s) => ({
    score: s.score,
    level: typeof s.level === 'object' && s.level !== null && 'id' in (s.level as object)
      ? (s.level as { id: number }).id
      : 1,
  }),
);

export function useArithmeticGame() {
  return _useBase();
}
