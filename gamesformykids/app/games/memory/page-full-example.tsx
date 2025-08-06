"use client";

import { MemoryProvider, useMemoryContext } from "@/contexts";
import MemoryStats from "@/components/game/memory/MemoryStats";
import MemoryControls from "@/components/game/memory/MemoryControls";
import MemoryDebugPanel from "@/components/game/memory/MemoryDebugPanel";
import AutoStartScreen from "@/components/shared/AutoStartScreen";

function MemoryGameContent() {
  const {
    state: {
      animals,
      cards,
      gameStarted,
      isGameWon,
      isGamePaused,
      gameStats,
    },
    initializeGame,
    handleCardClick,
  } = useMemoryContext();

  if (!gameStarted) {
    // המרת AnimalData ל-BaseGameItem עבור AutoStartScreen
    const gameItems = animals.length > 0 ? animals.map(animal => ({
      name: animal.name,
      hebrew: animal.name,
      english: animal.name,
      emoji: animal.emoji,
      color: '#8B5CF6',
      sound: [],
    })) : [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
        <div className="max-w-4xl mx-auto">
          <AutoStartScreen 
            gameType="memory" 
            items={gameItems} 
            onStart={initializeGame} 
            onSpeak={() => {}} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* בקרות משחק */}
        <MemoryControls />
        
        {/* סטטיסטיקות */}
        <MemoryStats />

        {/* לוח המשחק */}
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

          {/* קלפי המשחק */}
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
                  ${isGamePaused ? 'pointer-events-none' : ''}
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
                    absolute inset-0 w-full h-full rounded-xl flex items-center justify-center rotate-y-180 backface-hidden transition-colors duration-300
                    ${card.isMatched 
                      ? 'bg-green-100 border-2 border-green-400 shadow-lg' 
                      : 'bg-white border-2 border-gray-200'
                    }
                  `}>
                    <div className="text-3xl md:text-4xl">{card.animal.emoji}</div>
                    {card.isMatched && (
                      <div className="absolute top-1 right-1 text-green-500 text-sm">✓</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* הודעת ניצחון */}
        {isGameWon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl text-center shadow-2xl max-w-md mx-4 animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">כל הכבוד!</h2>
              <div className="space-y-2 mb-6 text-lg">
                <p className="text-gray-700">
                  ניקוד: <span className="font-bold text-blue-600">{gameStats.score.toLocaleString()}</span>
                </p>
                <p className="text-gray-700">
                  מהלכים: <span className="font-bold text-green-600">{gameStats.moves}</span>
                </p>
                <p className="text-gray-700">
                  זמן: <span className="font-bold text-purple-600">
                    {Math.floor(gameStats.timeElapsed / 60)}:{(gameStats.timeElapsed % 60).toString().padStart(2, '0')}
                  </span>
                </p>
                {gameStats.perfectMatches > 0 && (
                  <p className="text-gray-700">
                    התאמות מושלמות: <span className="font-bold text-yellow-600">{gameStats.perfectMatches}</span>
                  </p>
                )}
                {gameStats.streak > 3 && (
                  <p className="text-gray-700">
                    רצף מקסימלי: <span className="font-bold text-orange-600">{gameStats.streak}</span>
                  </p>
                )}
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => initializeGame()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold transition-colors"
                >
                  שחק שוב
                </button>
                <button
                  onClick={() => window.location.href = '/games'}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold transition-colors"
                >
                  חזור למשחקים
                </button>
              </div>
            </div>
          </div>
        )}

        {/* פאנל דיבוג (רק בפיתוח) */}
        <MemoryDebugPanel />
      </div>
    </div>
  );
}

/**
 * דף משחק הזיכרון המלא עם Context
 * משתמש בכל הקומפוננטים והתכונות שיצרנו
 */
export default function MemoryGameFull() {
  return (
    <MemoryProvider>
      <MemoryGameContent />
    </MemoryProvider>
  );
}
