'use client';
import { useEffect } from 'react';
import { useMazeStore } from './mazeStore';

export function useMazeGame() {
  const phase = useMazeStore(s => s.phase);
  const level = useMazeStore(s => s.level);
  const starsCollectedThisLevel = useMazeStore(s => s.starsCollectedThisLevel);
  const totalStarsCollected = useMazeStore(s => s.totalStarsCollected);
  const startGame = useMazeStore(s => s.startGame);
  const move = useMazeStore(s => s.move);
  const nextLevel = useMazeStore(s => s.nextLevel);
  const reset = useMazeStore(s => s.reset);

  useEffect(() => {
    if (phase !== 'playing') return;
    function handleKey(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowUp':    e.preventDefault(); move('N'); break;
        case 'ArrowDown':  e.preventDefault(); move('S'); break;
        case 'ArrowLeft':  e.preventDefault(); move('W'); break;
        case 'ArrowRight': e.preventDefault(); move('E'); break;
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, move]);

  return { phase, level, starsCollectedThisLevel, totalStarsCollected, startGame, nextLevel, reset };
}
