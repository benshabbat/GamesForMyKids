'use client';
import { useEffect, useRef } from 'react';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useMemoryStore } from './stores/useMemoryStore';
import { useGameCompletion } from '@/hooks/shared/progress/useGameCompletion';

const DIFFICULTY_LEVEL = { easy: 1, medium: 2, hard: 3 } as const;

const _useStore = createShallowHook(useMemoryStore);

export function useMemoryGame() {
  const state = _useStore();
  const { saveGameResultRef } = useGameCompletion('memory');
  const startTimeRef = useRef(0);
  const prevWonRef = useRef(false);

  // Record game-start time
  useEffect(() => {
    if (state.gameStarted) {
      startTimeRef.current = Date.now();
      prevWonRef.current = false;
    }
  }, [state.gameStarted]);

  // Save score when the game is won
  useEffect(() => {
    if (state.isGameWon && !prevWonRef.current) {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      saveGameResultRef.current({
        score: state.gameStats.score,
        level: DIFFICULTY_LEVEL[state.difficulty],
        durationSeconds,
      });
    }
    prevWonRef.current = state.isGameWon;
  }, [state.isGameWon, state.gameStats.score, state.difficulty, saveGameResultRef]);

  return state;
}
