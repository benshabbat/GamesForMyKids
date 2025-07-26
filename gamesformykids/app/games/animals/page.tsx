"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useAnimalGame } from "./useAnimalGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import AnimalCard from "./AnimalCard";
import { ALL_ANIMALS } from "@/lib/constants/gameConstants";

export default function AnimalGame() {
  const animals: BaseGameItem[] = ALL_ANIMALS;

  const {
    gameState,
    speakAnimalName,
    startGame,
    handleAnimalClick,
    resetGame,
  } = useAnimalGame(animals);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={animals}
        onStart={startGame}
        onSpeak={speakAnimalName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-green-800"
            levelColor="text-green-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזו חיה שמעת?"
              icon="🐾🐄🐶🐱"
              iconColor="text-green-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakAnimalName(gameState.currentChallenge!.name)}
              description="בחר את החיה הנכונה!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="חיה" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        {/* אפשרויות החיות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleAnimalClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(animal) => (
            <AnimalCard
              animal={animal}
              onClick={handleAnimalClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם החיה שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על החיות למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}
