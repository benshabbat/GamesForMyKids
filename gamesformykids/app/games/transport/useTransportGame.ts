'use client';

import { useTransportStore } from './store/transportStore';

export function useTransportGame() {
  const store = useTransportStore();
  const currentQuestion = store.questions[store.currentIndex] ?? null;

  return {
    phase: store.phase,
    transportType: store.transportType,
    types: store.types,
    currentQuestion,
    startGame: store.startGame,
    selectAnswer: store.selectAnswer,
  };
}

