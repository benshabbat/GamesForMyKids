'use client';

import { useSoccerStore } from './store/soccerStore';

export function useSoccerGame() {
  const store = useSoccerStore();
  const currentQuestion = store.questions[store.currentIndex] ?? null;
  const total = store.questions.length;

  return {
    phase: store.phase,
    category: store.category,
    categories: store.categories,
    currentQuestion,
    currentIndex: store.currentIndex,
    total,
    selected: store.selected,
    isCorrect: store.isCorrect,
    score: store.score,
    showGoal: store.showGoal,
    startGame: store.startGame,
    selectAnswer: store.selectAnswer,
    nextQuestion: store.nextQuestion,
  };
}

