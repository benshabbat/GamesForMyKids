"use client";

import { useMemoryGame } from "./useMemoryGame";
import MemoryGameBoard from "./MemoryGameBoard";
import GameWinMessage from "./GameWinMessage";
import GameHeader from "./GameHeader";

export default function MemoryGamePage() {
  const {
    animals,
    cards,
    isGameStarted,
    matchedPairs,
    isGameWon,
    initializeGame,
    handleCardClick,
  } = useMemoryGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          isGameStarted={isGameStarted}
          matchedPairs={matchedPairs.length}
          totalPairs={animals.length}
          onStart={initializeGame}
        />

        {isGameWon && <GameWinMessage animals={animals} />}

        {isGameStarted && (
          <MemoryGameBoard cards={cards} onCardClick={handleCardClick} />
        )}
      </div>
    </div>
  );
}
