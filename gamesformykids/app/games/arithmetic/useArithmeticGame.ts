'use client';
import { useArithmeticGameStore } from './arithmeticGameStore';
import { LEVELS, QUESTIONS_PER_GAME } from './data/questions';

export function useArithmeticGame() {
  const store = useArithmeticGameStore();
  return { ...store, totalQuestions: QUESTIONS_PER_GAME, levels: LEVELS };
}

