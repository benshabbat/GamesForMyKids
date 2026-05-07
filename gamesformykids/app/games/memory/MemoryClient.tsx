'use client';

import MemoryGameHeader from './components/MemoryGameHeader';
import GameWinMessage from './components/GameWinMessage';
import GameTimeoutScreen from './components/GameTimeoutScreen';
import MemoryGameBoard from './components/MemoryGameBoard';
import MemoryStartScreen from './components/MemoryStartScreen';
import { useMemoryGameContent } from './useMemoryGameContent';
import { useMemoryGame } from './useMemoryGame';

export default function MemoryClient() {
  useMemoryGameContent();
  const { gameStarted, isGameWon, isCompleted } = useMemoryGame();

  if (!gameStarted) return <MemoryStartScreen />;
  if (isGameWon)    return <GameWinMessage />;
  if (isCompleted)  return <GameTimeoutScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        <MemoryGameHeader />
        <MemoryGameBoard />
      </div>
    </div>
  );
}
