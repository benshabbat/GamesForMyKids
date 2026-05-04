'use client';
import { useShallow } from 'zustand/react/shallow';
import { useWordBuilderStore } from './wordBuilderStore';

export type { WordPuzzle, AvailableLetter } from './wordBuilderStore';

export function useWordBuilderGame() {
  const { phase, puzzles, index, score, typed, available, status, startGame, pressLetter, clearTyped, next } =
    useWordBuilderStore(useShallow((s) => s));
  return {
    phase, index, score, typed, available, status,
    current: puzzles[index],
    total: puzzles.length,
    startGame, pressLetter, clearTyped, next,
    restart: startGame,
  };
}
