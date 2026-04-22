'use client';

import { useTransportStore } from './store/transportStore';

export function useTransportGame() {
  const store = useTransportStore();
  const currentQuestion = store.questions[store.currentIndex] ?? null;
  const total = store.questions.length;

  return {
    phase: store.phase,
    transportType: store.transportType,
    types: store.types,
    currentQuestion,
    currentIndex: store.currentIndex,
    total,
    selected: store.selected,
    isCorrect: store.isCorrect,
    score: store.score,
    startGame: store.startGame,
    selectAnswer: store.selectAnswer,
    nextQuestion: store.nextQuestion,
    goToMenu: store.goToMenu,
  };
}

