"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useHouseGame } from "./useHouseGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import HouseCard from "./HouseCard";
import { ALL_HOUSE_ITEMS } from "@/lib/constants/gameConstants";

export default function HouseGame() {
  const houseItems: BaseGameItem[] = ALL_HOUSE_ITEMS;

  const {
    gameState,
    speakHouseItemName,
    startGame,
    handleHouseItemClick,
    resetGame,
  } = useHouseGame(houseItems);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        houseItems={houseItems}
        onStart={startGame}
        onSpeak={speakHouseItemName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-cyan-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-sky-800"
            levelColor="text-sky-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה חפץ בבית שמעת?"
              icon="🏠🛋️📺🪑"
              iconColor="text-sky-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakHouseItemName(gameState.currentChallenge!.name)}
              description="בחר את החפץ הנכון!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="house item" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <GameCardGrid
          items={gameState.options}
          onItemClick={handleHouseItemClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(houseItem) => (
            <HouseCard
              houseItem={houseItem}
              onClick={handleHouseItemClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: הקשב לשם החפץ שאני אומר!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על חפצים למטה כדי לשמוע את השמות שלהם"
        />
      </div>
    </div>
  );
}
