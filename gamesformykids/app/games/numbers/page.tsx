"use client";

import { NumberItem } from "@/lib/types/game";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useNumberGame } from "./useNumberGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import { ALL_NUMBERS } from "@/lib/constants/gameConstants";

export default function NumberGame() {
  const numbers: NumberItem[] = ALL_NUMBERS;

  const {
    gameState,
    speakNumberName,
    startGame,
    handleNumberClick,
    resetGame,
  } = useNumberGame(numbers);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        numbers={numbers}
        onStart={startGame}
        onSpeak={speakNumberName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-purple-700"
            levelColor="text-purple-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה מספר שמעת?"
              icon="🔢"
              iconColor="text-purple-700"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakNumberName(gameState.currentChallenge!.name)}
              description="בחר את המספר הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="מספר" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        {/* אפשרויות המספרים */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleNumberClick}
          currentChallenge={gameState.currentChallenge}
          showSoundIcon={true}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(number, isCorrect) => (
            <div
              onClick={() => handleNumberClick(number)}
              className={`
                aspect-square rounded-3xl cursor-pointer transition-all 
                duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
                bg-gradient-to-br from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600
                border-8 border-white
                ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
              `}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <div className="text-6xl md:text-8xl font-bold mb-2">
                  {number.digit}
                </div>
                <div className="text-lg md:text-xl font-semibold">
                  {number.hebrew}
                </div>
              </div>
            </div>
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם המספר שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על המספרים למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}