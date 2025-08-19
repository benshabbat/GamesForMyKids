"use client";

import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import MathNumberCard from "@/components/game/math/MathNumberCard";
import { useMathGame } from "./useMathGame";
import MathStartScreen from "@/components/game/math/MathStartScreen";

export default function MathGame() {
  const {
    gameState,
    speakQuestion,
    handleNumberClick,
    startGame,
  } = useMathGame();

  if (!gameState || !gameState.isPlaying) {
    return <MathStartScreen startGame={startGame} speakQuestion={speakQuestion} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <GameHeader />

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
                    {Array.from({ length: gameState.currentChallenge.firstNumber }).map((_, index) => (
                      <span key={`num1-${index}`} 
                            className="text-blue-500 animate-bounce-in"
                            style={{ animationDelay: `${index * 0.1}s` }}>
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
                      Array.from({ length: gameState.currentChallenge.secondNumber }).map((_, index) => (
                        <span key={`num2-${index}`} 
                              className="text-green-500 animate-bounce-in"
                              style={{ animationDelay: `${(gameState.currentChallenge!.firstNumber + index) * 0.1}s` }}>
                          {gameState.currentChallenge!.emoji}
                        </span>
                      ))
                    ) : (
                      // עבור חיסור - הצג איקס אדום
                      Array.from({ length: gameState.currentChallenge.secondNumber }).map((_, index) => (
                        <span key={`num2-${index}`} 
                              className="text-red-500 animate-bounce-in"
                              style={{ animationDelay: `${(gameState.currentChallenge!.firstNumber + index) * 0.1}s` }}>
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

          {/* הודעת ללא נתונים אם אין challengte */}
          {gameState.isPlaying && !gameState.currentChallenge && !gameState.showCelebration && (
            <div className="bg-yellow-100 rounded-3xl p-8 mb-8 shadow-xl">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">
                טוען משחק...
              </h2>
              <p className="text-yellow-700">
                המשחק מתכונן עבורך. רגע אחד!
              </p>
            </div>
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-3xl p-8 text-center shadow-2xl transform animate-bounce">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">מעולה!</h2>
                <p className="text-xl text-gray-700 mb-4">
                  התשובה נכונה! {gameState.currentChallenge.firstNumber} {gameState.currentChallenge.operation === 'addition' ? '+' : '-'} {gameState.currentChallenge.secondNumber} = {gameState.currentChallenge.correctAnswer}
                </p>
                <div className="text-lg text-purple-600 font-semibold">
                  + 10 נקודות
                </div>
              </div>
            </div>
          )}
        </div>

        {/* אפשרויות התשובות */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {gameState.options && gameState.options.length > 0 ? (
            gameState.options.map((answer, index) => (
              <MathNumberCard
                key={`${answer}-${index}`}
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
        
        <TipsBox />
      </div>
    </div>
  );
}
