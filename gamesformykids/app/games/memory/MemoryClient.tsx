'use client';

import { useShallow } from 'zustand/react/shallow';
import MemoryGameHeader from './components/MemoryGameHeader';
import GameWinMessage from './components/GameWinMessage';
import GameTimeoutScreen from './components/GameTimeoutScreen';
import MemoryGameBoard from './components/MemoryGameBoard';
import MemoryStartScreen from './components/MemoryStartScreen';
import { useMemoryGameContent } from './useMemoryGameContent';
import { useMemoryStore } from './stores/useMemoryStore';

export default function MemoryClient() {
  useMemoryGameContent();
  const { gameStarted, isGameWon, isCompleted } = useMemoryStore(
    useShallow((s) => ({ gameStarted: s.gameStarted, isGameWon: s.isGameWon, isCompleted: s.isCompleted })),
  );

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
