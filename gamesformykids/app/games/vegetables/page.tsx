"use client";

import { BaseGameItem } from "@/lib/types/base";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useVegetableGame } from "./useVegetableGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import VegetableCard from "./VegetableCard";
import { ALL_VEGETABLES } from "@/lib/constants/gameConstants";

export default function VegetableGame() {
  const vegetables: BaseGameItem[] = ALL_VEGETABLES;

  const {
    gameState,
    speakVegetableName,
    startGame,
    handleVegetableClick,
    resetGame,
  } = useVegetableGame(vegetables);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={vegetables}
        onStart={startGame}
        onSpeak={speakVegetableName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-green-800"
            levelColor="text-green-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה ירק שמעת?"
              icon="🥕🥬🍅🥒"
              iconColor="text-green-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakVegetableName(gameState.currentChallenge!.name)}
              description="בחר את הירק הנכון!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="ירק" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <GameCardGrid
          items={gameState.options}
          onItemClick={handleVegetableClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(vegetable) => (
            <VegetableCard
              vegetable={vegetable}
              onClick={handleVegetableClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: הקשב לשם הירק שאני אומר!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על ירקות למטה כדי לשמוע את שמותיהם"
        />
      </div>
    </div>
  );
}
