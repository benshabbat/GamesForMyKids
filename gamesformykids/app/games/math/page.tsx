"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import MathNumberCard from "./MathNumberCard";
import { useMathGame } from "./useMathGame";
import StartScreen from "./StartScreen";

export default function MathGame() {
  // משחק המתמטיקה לא משתמש ב-items כמו שאר המשחקים
  const emptyItems: BaseGameItem[] = [];

  const {
    gameState,
    speakQuestion,
    startGame,
    handleNumberClick,
    resetGame,
  } = useMathGame();

  if (!gameState.isPlaying) {
    return <StartScreen items={emptyItems} onStart={startGame} onSpeak={speakQuestion} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-orange-800"
            levelColor="text-orange-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                פתור את התרגיל
              </h2>
              
              {/* תצוגת התרגיל */}
              <div className="mb-6 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-4 border-orange-200">
                <div className="text-6xl md:text-8xl text-center font-bold text-orange-800 mb-4">
                  {gameState.currentChallenge.firstNumber} {gameState.currentChallenge.operation === 'addition' ? '+' : '-'} {gameState.currentChallenge.secondNumber} = ?
                </div>
                
                {/* ייצוג ויזואלי */}
                <div className="flex justify-center items-center gap-8 text-5xl">
                  {/* מספר ראשון */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: gameState.currentChallenge.firstNumber }, (_, index) => `num1-${Date.now()}-${index}`).map((id) => (
                      <span key={id} 
                            className="text-blue-500 animate-bounce-in"
                            style={{ animationDelay: `${parseInt(id.split('-')[2]) * 0.1}s` }}>
                        {gameState.currentChallenge!.emoji}
                      </span>
                    ))}
                  </div>
                  
                  {/* אופרטור */}
                  <span className="text-6xl font-bold text-orange-600">
                    {gameState.currentChallenge.operation === 'addition' ? '➕' : '➖'}
                  </span>
                  
                  {/* מספר שני */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {gameState.currentChallenge.operation === 'addition' ? (
                      // עבור חיבור - הוסף עוד אימוג'ים מאותו סוג
                      Array.from({ length: gameState.currentChallenge.secondNumber }, (_, index) => `add-${Date.now()}-${index}`).map((id) => (
                        <span key={id} 
                              className="text-green-500 animate-bounce-in"
                              style={{ animationDelay: `${(gameState.currentChallenge!.firstNumber + parseInt(id.split('-')[2])) * 0.1}s` }}>
                          {gameState.currentChallenge!.emoji}
                        </span>
                      ))
                    ) : (
                      // עבור חיסור - הצג איקס אדום
                      Array.from({ length: gameState.currentChallenge.secondNumber }, (_, index) => `sub-${Date.now()}-${index}`).map((id) => (
                        <span key={id} 
                              className="text-red-500 animate-bounce-in"
                              style={{ animationDelay: `${(gameState.currentChallenge!.firstNumber + parseInt(id.split('-')[2])) * 0.1}s` }}>
                          ❌
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div
                className="font-bold mb-4 cursor-pointer hover:scale-110 transition-transform text-orange-700 text-4xl"
                onClick={speakQuestion}
              >
                🔊 (לחץ לשמיעה חוזרת)
              </div>
              <p className="text-xl text-gray-600">בחר את התשובה הנכונה!</p>
            </div>
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="תשובה" 
              value={`${gameState.currentChallenge.firstNumber} ${gameState.currentChallenge.operation === 'addition' ? '+' : '-'} ${gameState.currentChallenge.secondNumber} = ${gameState.currentChallenge.correctAnswer}`} 
            />
          )}
        </div>

        {/* אפשרויות התשובות */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {gameState.options && gameState.options.length > 0 ? (
            gameState.options.map((answer) => (
              <MathNumberCard
                key={`answer-${answer}-${Date.now()}`}
                number={answer}
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
          tip="💡 טיפ: השתמש בסמלים כדי לעזור לך לחשב!"
          description="ספור את הסמלים שרואה על המסך כדי לפתור את התרגיל"
        />
      </div>
    </div>
  );
}
