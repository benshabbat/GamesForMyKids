"use client";

import { MemoryProvider, useMemoryContext } from "@/contexts";
import GameHeader from "./GameHeader";
import GameWinMessage from "./GameWinMessage";
import MemoryGameBoard from "./MemoryGameBoard";
import AutoStartScreen from "@/components/shared/AutoStartScreen";
import TipsBox from "@/components/shared/TipsBox";

function MemoryGameContent() {
  const {
    state: {
      animals,
      gameStarted,
      isGameWon,
    },
    initializeGame,
  } = useMemoryContext();

  if (!gameStarted) {
    // המרת AnimalData ל-BaseGameItem עבור AutoStartScreen
    const gameItems = animals.length > 0 ? animals.map(animal => ({
      name: animal.name,
      hebrew: animal.name,
      english: animal.name,
      emoji: animal.emoji,
      color: '#8B5CF6', // צבע סגול כברירת מחדל
      sound: [], // Array ריק כי לא משתמשים בזה ב-AutoStartScreen
    })) : [];

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
        <GameHeader />

        {isGameWon && <GameWinMessage />}
        
        {gameStarted && <MemoryGameBoard />}
      </div>

      <TipsBox
        tip="💡 טיפ: נסה לזכור איפה כל חיה מסתתרת!"
        description="לחץ על קלף כדי לחשוף חיה, ונסה למצוא את הזוג שלה. השתמש בזיכרון שלך כדי לזכור מיקומים!"
      />
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
