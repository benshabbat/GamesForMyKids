'use client';
import { useEffect, useRef } from 'react';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import { useMemoryStore } from './stores/useMemoryStore';

export function useMemorySyncDifficulty() {
  const { difficulty } = useGameDifficulty();
  const { setDifficulty } = useMemoryStore();
  const mounted = useRef(false);

  // Sync global difficulty picker → memory store, skipping the initial mount
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setDifficulty(difficulty);
  }, [difficulty, setDifficulty]);
}
