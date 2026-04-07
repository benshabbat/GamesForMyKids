'use client';
import { useGeographyGameStore } from './geographyGameStore';
import { QUESTIONS_PER_GAME } from './data/countries';

export function useGeographyGame() {
  const store = useGeographyGameStore();
  const current = store.questions[store.index] ?? null;
  return {
    ...store,
    current,
    total: QUESTIONS_PER_GAME,
  };
}
