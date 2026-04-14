"use client";

/**
 * Memory Game Page — תצוגה בלבד.
 * כל הלוגיקה ב-useMemoryGameContent ובסטור.
 */

import MemoryGameHeader from "./components/MemoryGameHeader";
import GameWinMessage from "./components/GameWinMessage";
import MemoryGameBoard from "./components/MemoryGameBoard";
import MemoryStartScreen from "./components/MemoryStartScreen";
import { useMemoryGameContent } from "./useMemoryGameContent";

export default function MemoryGamePage() {
  const { gameStarted, isGameWon } = useMemoryGameContent();

  if (!gameStarted) {
    return <MemoryStartScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        <MemoryGameHeader />

        {isGameWon && <GameWinMessage />}

        <MemoryGameBoard />
      </div>
    </div>
  );
}
