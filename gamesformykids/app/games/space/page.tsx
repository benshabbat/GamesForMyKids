"use client";

import { BaseGameItem } from "@/lib/types/base";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useSpaceGame } from "./useSpaceGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import SpaceCard from "./SpaceCard";
import { ALL_SPACE_OBJECTS } from "@/lib/constants/gameConstants";

export default function SpaceGame() {
  const spaceObjects: BaseGameItem[] = ALL_SPACE_OBJECTS;

  const {
    gameState,
    speakSpaceObjectName,
    startGame,
    handleSpaceObjectClick,
    resetGame,
  } = useSpaceGame(spaceObjects);

  // Wrapper function for speaking space object by name
  const speakByName = (spaceObjectName: string) => {
    speakSpaceObjectName(spaceObjectName);
  };

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={spaceObjects}
        onStart={startGame}
        onSpeak={speakByName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 relative overflow-hidden">
      {/* כוכבים מנצנצים ברקע */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-100"></div>
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-16 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-white rounded-full animate-pulse delay-400"></div>
        <div className="absolute bottom-20 right-32 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-blue-200"
            levelColor="text-blue-300"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה גוף שמים שמעת?"
              icon="🌌☀️🌙⭐"
              iconColor="text-blue-200"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakSpaceObjectName(gameState.currentChallenge!.name)}
              description="בחר את גוף השמים הנכון!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="גוף שמים" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {gameState.options.map((spaceObject: BaseGameItem) => (
            <SpaceCard
              key={spaceObject.name}
              spaceObject={spaceObject}
              onClick={handleSpaceObjectClick}
            />
          ))}
        </div>
        
        <TipsBox
          tip="💡 טיפ: הקשב לשם גוף השמים שאני אומר!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על גופי השמים למטה כדי לשמוע את שמותיהם"
        />
      </div>
    </div>
  );
}
