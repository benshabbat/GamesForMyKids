"use client";

/**
 * Memory Game Page — תצוגה בלבד.
 * כל הלוגיקה ב-useMemoryGameContent.
 */

import { MemoryProvider } from "@/contexts";
import MemoryGameHeader from "./components/MemoryGameHeader";
import GameWinMessage from "./components/GameWinMessage";
import MemoryGameBoard from "./components/MemoryGameBoard";
import MemoryStartScreen from "./components/MemoryStartScreen";
import { useMemoryGameContent } from "./useMemoryGameContent";

function MemoryGameContent() {
  const { gameStarted, isGameWon } = useMemoryGameContent();

  if (!gameStarted) {
    return <MemoryStartScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        <MemoryGameHeader />

        {isGameWon && <GameWinMessage />}
        
        {gameStarted && <MemoryGameBoard />}
      </div>

      {/* Tips can be added here later without context dependency */}
    </div>
  );
}

export default function MemoryGamePage() {
  return (
    <MemoryProvider>
      <MemoryGameContent />
    </MemoryProvider>
  );
}
