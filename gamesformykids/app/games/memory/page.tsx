"use client";

import { useMemoryGame } from "./useMemoryGame";
import MemoryGameBoard from "./MemoryGameBoard";
import GameWinMessage from "./GameWinMessage";
import GameHeader from "./GameHeader";
import StartScreen from "./StartScreen";
import TipsBox from "@/components/shared/TipsBox";

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

  if (!isGameStarted) {
    return <StartScreen onStart={initializeGame} items={[]} onSpeak={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
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

      <TipsBox
        tip="💡 טיפ: נסה לזכור איפה כל חיה מסתתרת!"
        description="לחץ על קלף כדי לחשוף חיה, ונסה למצוא את הזוג שלה."
      />
    </div>
  );
}
