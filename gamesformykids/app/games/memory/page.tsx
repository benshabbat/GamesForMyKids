"use client";

import { useMemoryGame } from "./useMemoryGame";
import MemoryGameBoard from "./MemoryGameBoard";
import GameWinMessage from "./GameWinMessage";
import GameHeader from "./GameHeader";
import AutoStartScreen from "@/components/shared/AutoStartScreen";
import TipsBox from "@/components/shared/TipsBox";

export default function MemoryGamePage() {
  const {
    animals,
    cards,
    isGameStarted,
    matchedPairs,
    isGameWon,
    difficultyConfig,
    gameStats,
    timeLeft,
    isGamePaused,
    initializeGame,
    handleCardClick,
    setDifficulty,
    pauseGame,
    resetGame,
  } = useMemoryGame();

  if (!isGameStarted) {
    // המרת AnimalData ל-BaseGameItem עבור AutoStartScreen
    const gameItems = animals.map(animal => ({
      name: animal.name,
      hebrew: animal.name,
      english: animal.name,
      emoji: animal.emoji,
      color: '#8B5CF6', // צבע סגול כברירת מחדל
      sound: [], // Array ריק כי לא משתמשים בזה ב-AutoStartScreen
    }));

    return (
      <AutoStartScreen 
        gameType="memory" 
        items={gameItems} 
        onStart={initializeGame} 
        onSpeak={() => {}} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          isGameStarted={isGameStarted}
          matchedPairs={matchedPairs.length}
          totalPairs={animals.length}
          onStart={resetGame}
          gameStats={gameStats}
          timeLeft={timeLeft}
          isGamePaused={isGamePaused}
          onPause={pauseGame}
          difficultyConfig={difficultyConfig}
          onDifficultyChange={(newDifficulty) => {
            setDifficulty(newDifficulty);
          }}
        />

        {isGameWon && (
          <GameWinMessage 
            animals={animals} 
            gameStats={gameStats}
            difficultyName={difficultyConfig.name}
            timeLeft={timeLeft}
          />
        )}

        {isGameStarted && (
          <MemoryGameBoard 
            cards={cards} 
            onCardClick={handleCardClick}
            isGamePaused={isGamePaused}
          />
        )}
      </div>

      <TipsBox
        tip="💡 טיפ: נסה לזכור איפה כל חיה מסתתרת!"
        description="לחץ על קלף כדי לחשוף חיה, ונסה למצוא את הזוג שלה. השתמש בזיכרון שלך כדי לזכור מיקומים!"
      />
    </div>
  );
}
