"use client";

import CelebrationBox from "@/components/shared/CelebrationBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import MathNumberCard from "./MathNumberCard";
import { useMathGame } from "./useMathGame";
import StartScreen from "./StartScreen";

export default function MathGame() {
  const {
    gameState,
    speakQuestion,
    startGame,
    handleNumberClick,
    resetGame,
  } = useMathGame();

  if (!gameState.isPlaying) {
    return <StartScreen onStart={startGame} />;
  }

  const renderMathProblem = () => {
    if (!gameState.currentChallenge) return null;
    
    const { firstNumber, secondNumber, operation, emoji } = gameState.currentChallenge;
    const operationSymbol = operation === 'addition' ? '+' : '-';
    const operationText = operation === 'addition' ? 'ועוד' : 'פחות';
    
    return (
      <div className="mb-6 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-4 border-yellow-200">
        {/* הצגת הבעיה במספרים */}
        <div className="text-4xl md:text-5xl font-bold text-center mb-6 text-orange-800">
          {firstNumber} {operationSymbol} {secondNumber} = ?
        </div>
        
        {/* הצגה ויזואלית עם אימוג'ים */}
        <div className="text-center mb-4">
          <div className="text-lg text-orange-700 mb-3">
            {firstNumber} {gameState.currentChallenge.itemPlural}
          </div>
          
          {/* קבוצה ראשונה של אימוג'ים */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {Array.from({ length: firstNumber }).map((_, index) => (
              <span 
                key={`first-${index}`}
                className="text-3xl animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
          
          {/* סימן הפעולה */}
          <div className="text-3xl font-bold text-orange-800 mb-4">
            {operationText}
          </div>
          
          {/* קבוצה שנייה של אימוג'ים */}
          <div className="text-lg text-orange-700 mb-3">
            {secondNumber} {gameState.currentChallenge.itemPlural}
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {Array.from({ length: secondNumber }).map((_, index) => (
              <span 
                key={`second-${index}`}
                className={`text-3xl animate-bounce-in ${operation === 'subtraction' ? 'opacity-50 line-through' : ''}`}
                style={{ animationDelay: `${(firstNumber + index) * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
          
          {/* קו הפרדה ושאלה */}
          <div className="border-t-4 border-orange-300 my-4"></div>
          <div className="text-xl text-orange-700">
            כמה {gameState.currentChallenge.itemPlural} יש בסך הכל?
          </div>
        </div>
      </div>
    );
  };

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
                בואו נחשב יחד! 🧮
              </h2>
              
              {renderMathProblem()}

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
              label="תשובה נכונה" 
              value={`${gameState.currentChallenge.correctAnswer}`} 
            />
          )}
        </div>

        {/* אפשרויות התשובות */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {gameState.options && gameState.options.length > 0 ? (
            gameState.options.map((number, index) => (
              <MathNumberCard
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
          tip="💡 טיפ: השתמש באימוג'ים כדי לעזור לך לחשב!"
          description="לחץ על הרמקול כדי לשמוע את השאלה שוב"
        />
      </div>
    </div>
  );
}
