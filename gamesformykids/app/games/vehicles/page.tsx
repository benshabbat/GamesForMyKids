"use client";

import { Vehicle } from "@/lib/types/game";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useVehicleGame } from "./useVehicleGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import VehicleCard from "./VehicleCard";
import { ALL_VEHICLES } from "@/lib/constants/gameConstants";

export default function VehicleGame() {
  const vehicles: Vehicle[] = ALL_VEHICLES;

  const {
    gameState,
    speakVehicleName,
    startGame,
    handleVehicleClick,
    resetGame,
  } = useVehicleGame(vehicles);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        vehicles={vehicles}
        onStart={startGame}
        onSpeak={speakVehicleName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-sky-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-blue-800"
            levelColor="text-blue-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה כלי רכב שמעת?"
              icon="🚗✈️🚲🚌"
              iconColor="text-blue-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakVehicleName(gameState.currentChallenge!.name)}
              description="בחר את כלי הרכב הנכון!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="vehicle" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <GameCardGrid
          items={gameState.options}
          onItemClick={handleVehicleClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(vehicle) => (
            <VehicleCard
              vehicle={vehicle}
              onClick={handleVehicleClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: הקשב לשם כלי הרכב שאני אומר!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על כלי הרכב למטה כדי לשמוע את השמות שלהם"
        />
      </div>
    </div>
  );
}
