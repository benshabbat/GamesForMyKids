'use client';

import { useShallow } from 'zustand/react/shallow';
import { useSoccerStore } from './store/soccerStore';

export function useSoccerGame() {
  const store = useSoccerStore(useShallow(s => s));
  const currentQuestion = store.questions[store.currentIndex] ?? null;
  const total = store.questions.length;

  return {
    ...store,
    currentQuestion,
    total,
  };
}

