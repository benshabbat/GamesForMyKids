'use client';
import { useCapitalsGameStore } from './capitalsGameStore';

export function useCapitalsGame() {
  const store = useCapitalsGameStore();
  const current = store.questions[store.index] ?? null;
  return {
    ...store,
    current,
    total: store.questions.length,
    correctCount: Math.round(store.score / 10),
  };
}
