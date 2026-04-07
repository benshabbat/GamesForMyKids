'use client';
import { useSpellingGameStore } from './spellingGameStore';

export function useSpellingGame() {
  const store = useSpellingGameStore();
  const current = store.questions[store.index] ?? null;
  return {
    ...store,
    current,
    total: store.questions.length,
    correctCount: Math.round(store.score / 10),
  };
}
