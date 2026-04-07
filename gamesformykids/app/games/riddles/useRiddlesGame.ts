'use client';
import { useRiddlesGameStore } from './riddlesGameStore';

export function useRiddlesGame() {
  const store = useRiddlesGameStore();
  const current = store.questions[store.index] ?? null;
  return {
    ...store,
    current,
    total: store.questions.length,
    correctCount: Math.round(store.score / 10),
  };
}
