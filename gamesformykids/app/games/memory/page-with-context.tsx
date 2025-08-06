"use client";

import { MemoryProvider, useMemoryContext } from "@/contexts";
import AutoStartScreen from "@/components/shared/AutoStartScreen";

function MemoryGameContent() {
  const {
    state: {
      animals,
      cards,
      gameStarted,
      matchedPairs,
      isGameWon,
      gameStats,
      timeLeft,
      isGamePaused,
    },
    initializeGame,
    handleCardClick,
    pauseGame,
    resumeGame,
    resetGame,
    difficultyConfig,
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
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{gameStats.score}</div>
                <div className="text-sm text-gray-600">ניקוד</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{gameStats.moves}</div>
                <div className="text-sm text-gray-600">מהלכים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{matchedPairs.length}/{difficultyConfig.pairs}</div>
                <div className="text-sm text-gray-600">זוגות</div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">זמן</div>
              </div>
              <button
                onClick={isGamePaused ? resumeGame : pauseGame}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                {isGamePaused ? '▶️ המשך' : '⏸️ השהה'}
              </button>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                🔄 איפוס
              </button>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="relative">
          {/* מסך השהיה */}
          {isGamePaused && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 rounded-2xl">
              <div className="bg-white p-6 rounded-xl text-center shadow-2xl">
                <div className="text-4xl mb-3">⏸️</div>
                <div className="text-2xl font-bold text-gray-800">המשחק מושהה</div>
                <div className="text-gray-600 mt-2">לחץ על &quot;המשך&quot; כדי להמשיך</div>
              </div>
            </div>
          )}

          <div className={`grid gap-3 p-6 bg-white rounded-2xl shadow-lg ${
            cards.length <= 12 ? "grid-cols-3 md:grid-cols-4" : 
            cards.length <= 18 ? "grid-cols-3 md:grid-cols-6" : 
            "grid-cols-4 md:grid-cols-6"
          }`}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={`
                  relative w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-all duration-300
                  ${card.isFlipped || card.isMatched ? 'transform-none' : 'hover:scale-105'}
                `}
                onClick={() => !isGamePaused && handleCardClick(card.id)}
              >
                <div className={`
                  w-full h-full rounded-xl shadow-md transition-all duration-500 transform-style-preserve-3d
                  ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
                `}>
                  {/* חלק אחורי של הקלף */}
                  <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center backface-hidden">
                    <div className="text-2xl">🎴</div>
                  </div>
                  
                  {/* חלק קדמי של הקלף */}
                  <div className={`
                    absolute inset-0 w-full h-full rounded-xl flex items-center justify-center rotate-y-180 backface-hidden
                    ${card.isMatched ? 'bg-green-100 border-2 border-green-400' : 'bg-white border-2 border-gray-200'}
                  `}>
                    <div className="text-3xl md:text-4xl">{card.animal.emoji}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Win Message */}
        {isGameWon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl text-center shadow-2xl max-w-md mx-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">כל הכבוד!</h2>
              <div className="space-y-2 mb-6">
                <p className="text-gray-700">ניקוד: <span className="font-bold text-blue-600">{gameStats.score}</span></p>
                <p className="text-gray-700">מהלכים: <span className="font-bold text-green-600">{gameStats.moves}</span></p>
                <p className="text-gray-700">זמן: <span className="font-bold text-purple-600">{Math.floor(gameStats.timeElapsed / 60)}:{(gameStats.timeElapsed % 60).toString().padStart(2, '0')}</span></p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => initializeGame()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
                >
                  שחק שוב
                </button>
                <button
                  onClick={() => window.location.href = '/games'}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold"
                >
                  חזור למשחקים
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
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
