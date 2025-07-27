"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useFruitGame } from "./useFruitGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import { FruitCard } from "@/components/shared/CardPresets"; // ⭐ קארד חדש!
import { ALL_FRUITS } from "@/lib/constants";

export default function FruitGame() {
  const fruits: BaseGameItem[] = ALL_FRUITS;

  const {
    gameState,
    speakFruitName,
    startGame,
    handleFruitClick,
    resetGame,
  } = useFruitGame(fruits);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={fruits}
        onStart={startGame}
        onSpeak={speakFruitName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4">
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
              title="איזה פרי שמעת?"
              icon="🧺🍎🍌🍇"
              iconColor="text-orange-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakFruitName(gameState.currentChallenge!.name)}
              description="בחר את הפרי הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="פרי" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        {/* אפשרויות הפירות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleFruitClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(fruit) => (
            <FruitCard
              fruit={fruit}
              onClick={handleFruitClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם הפרי שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על הפירות למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}
