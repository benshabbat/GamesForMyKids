'use client';
import { useMultiplicationGameStore } from './multiplicationGameStore';
import { LEVELS, QUESTIONS_PER_LEVEL, TIME_PER_QUESTION } from './data/tables';

export function useMultiplicationGame() {
  const store = useMultiplicationGameStore();
  return { ...store, totalQuestions: QUESTIONS_PER_LEVEL, levels: LEVELS, timePerQuestion: TIME_PER_QUESTION };
}
