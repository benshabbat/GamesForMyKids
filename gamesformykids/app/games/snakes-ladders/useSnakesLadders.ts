'use client';
import { useEffect } from 'react';
import { useSnakesLaddersStore } from './snakesLaddersStore';

export function useSnakesLadders() {
  const store = useSnakesLaddersStore();
  const { phase, players, currentPlayer, rollDice, answerQuestion } = store;

  // Auto-play AI turn
  useEffect(() => {
    const current = players[currentPlayer];
    if (!current?.isAI) return;

    if (phase === 'rolling') {
      const t = setTimeout(rollDice, 1200);
      return () => clearTimeout(t);
    }

    if (phase === 'quiz') {
      // AI always answers correctly
      const t = setTimeout(() => {
        const q = store.pendingQuestion;
        if (q) answerQuestion(q.answer);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [phase, currentPlayer, players, rollDice, answerQuestion, store.pendingQuestion]);

  return store;
}
