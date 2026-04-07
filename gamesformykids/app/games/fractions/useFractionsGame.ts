'use client';
import { useFractionsGameStore } from './fractionsGameStore';

export function useFractionsGame() {
  const store = useFractionsGameStore();
  const current = store.questions[store.index] ?? null;
  return {
    ...store,
    current,
    total: store.questions.length,
    correctCount: Math.round(store.score / 10),
  };
}
