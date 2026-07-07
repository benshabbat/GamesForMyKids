'use client';
import { createPhaseGameHook } from '@/hooks/shared/progress/createPhaseGameHook';
import { useMultiplicationGameStore } from './multiplicationGameStore';
import { LEVELS, QUESTIONS_PER_LEVEL, TIME_PER_QUESTION } from './data/tables';

const _useBase = createPhaseGameHook(
  useMultiplicationGameStore,
  'multiplication',
  (s) => ({ score: s.score, level: typeof s.level === 'number' ? s.level : 1 }),
);

export function useMultiplicationGame() {
  const store = _useBase();
  return { ...store, totalQuestions: QUESTIONS_PER_LEVEL, levels: LEVELS, timePerQuestion: TIME_PER_QUESTION };
}
