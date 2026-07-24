'use client';
import { useMazeStore } from './mazeStore';
import { useKeyboardControls } from '@/hooks/shared/game-controls';

export function useMazeGame() {
  const phase = useMazeStore(s => s.phase);
  const level = useMazeStore(s => s.level);
  const starsCollectedThisLevel = useMazeStore(s => s.starsCollectedThisLevel);
  const totalStarsCollected = useMazeStore(s => s.totalStarsCollected);
  const startGame = useMazeStore(s => s.startGame);
  const move = useMazeStore(s => s.move);
  const nextLevel = useMazeStore(s => s.nextLevel);
  const reset = useMazeStore(s => s.reset);

  useKeyboardControls({
    ArrowUp: () => move('N'),
    ArrowDown: () => move('S'),
    ArrowLeft: () => move('W'),
    ArrowRight: () => move('E'),
  }, phase === 'playing');

  return { phase, level, starsCollectedThisLevel, totalStarsCollected, startGame, move, nextLevel, reset };
}
