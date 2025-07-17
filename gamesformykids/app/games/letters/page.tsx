"use client";

import { Letter } from "@/lib/types/game";
import ChallengeBox from "@/components/shared/ChallengeBox";
import StartScreen from "./StartScreen";
import { useLetterGame } from "./useLetterGame";
import CelebrationBox from "@/components/shared/CelebrationBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import { ALL_LETTERS } from "@/lib/constants/gameConstants";

export default function LetterGame() {
  const letters: Letter[] = ALL_LETTERS;

  const {
    gameState,
    speakLetterName,
    startGame,
    handleLetterClick,
    resetGame,
  } = useLetterGame(letters);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        letters={letters}
        onStart={startGame}
        onSpeak={speakLetterName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
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
            <ChallengeBox
              title="איזו אות שמעת?"
              icon="🔤"
              iconColor="text-orange-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakLetterName(gameState.currentChallenge!.name)}
              description="בחר את האות הנכונה!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            // <CelebrationBox challenge={gameState.currentChallenge} />
            <CelebrationBox label="אות" value={gameState.currentChallenge.hebrew} />
          )}
        </div>

        {/* אפשרויות האותיות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleLetterClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          showSoundIcon={true}
          maxWidth="max-w-2xl"
          renderCustomCard={(letter, isCorrect) => (
            <div
              onClick={() => handleLetterClick(letter)}
              className={`
                aspect-square rounded-3xl cursor-pointer transition-all 
                duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
                bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600
                border-8 border-white
                ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
              `}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <div className="text-5xl md:text-7xl font-bold mb-2">
                  {letter.hebrew}
                </div>
                <div className="text-lg md:text-xl font-semibold">
                  {letter.english}
                </div>
                <div className="mt-2 opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mx-auto">
                    <path d="M2 10s3-3 10-3 10 3 10 3-3 3-10 3-10-3-10-3z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </div>
            </div>
          )}
        />
        <TipsBox
          tip="💡 טיפ: תשמע את שם האות שאני אומר!"
          description="לחץ על האמוג'י למעלה כדי לשמוע שוב, או על האותיות למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}