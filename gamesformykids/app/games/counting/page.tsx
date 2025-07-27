"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import CountingCard from "./CountingCard";
import { useCountingGame } from "./useCountingGame";
import StartScreen from "./StartScreen";

export default function CountingGame() {
  // משחק הספירה לא משתמש ב-items כמו שאר המשחקים
  const emptyItems: BaseGameItem[] = [];

  const {
    gameState,
    speakQuestion,
    startGame,
    handleNumberClick,
    resetGame,
  } = useCountingGame();

  if (!gameState.isPlaying) {
    return <StartScreen items={emptyItems} onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-cyan-800"
            levelColor="text-cyan-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                כמה {gameState.currentChallenge.itemPlural} יש?
              </h2>
              
              {/* תצוגת האימוג'ים */}
              <div className="mb-6 p-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border-4 border-cyan-200">
                <div className="text-6xl md:text-7xl text-center flex flex-wrap justify-center gap-4 items-center">
                  {Array.from({ length: gameState.currentChallenge.correctAnswer }).map((_, index) => (
                    <span 
                      key={index}
                      className="inline-block transform hover:scale-110 transition-transform duration-200 animate-bounce-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {gameState.currentChallenge!.emoji}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="font-bold mb-4 cursor-pointer hover:scale-110 transition-transform text-cyan-700 text-4xl"
                onClick={speakQuestion}
              >
                🔊 (לחץ לשמיעה חוזרת)
              </div>
              <p className="text-xl text-gray-600">בחר את המספר הנכון!</p>
            </div>
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label={gameState.currentChallenge.itemPlural} 
              value={`${gameState.currentChallenge.correctAnswer} ${gameState.currentChallenge.itemPlural}`} 
            />
          )}
        </div>

        {/* אפשרויות המספרים */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {gameState.options && gameState.options.length > 0 ? (
            gameState.options.map((number, index) => (
              <CountingCard
                key={`${number}-${index}`}
                number={number}
                onClick={handleNumberClick}
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              טוען אפשרויות...
            </div>
          )}
        </div>
        
        <TipsBox
          tip="💡 טיפ: ספור בקול רם את האימוג'ים!"
          description="לחץ על הרמקול כדי לשמוע את השאלה שוב"
        />
      </div>
    </div>
  );
}
