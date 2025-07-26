"use client";

import { BaseGameItem } from "@/lib/types";
import ChallengeBox from "@/components/shared/ChallengeBox";
import StartScreen from "./StartScreen";
import { useLetterGame } from "./useLetterGame";
import CelebrationBox from "@/components/shared/CelebrationBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import LetterCard from "./LetterCard";
import { ALL_LETTERS } from "@/lib/constants/gameConstants";

export default function LetterGame() {
  const letters: BaseGameItem[] = ALL_LETTERS;

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
          renderCustomCard={(letter) => (
            <LetterCard
              letter={letter}
              onClick={handleLetterClick}
            />
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
