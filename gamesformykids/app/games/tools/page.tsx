"use client";

import { BaseGameItem } from "@/lib/types/base";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useToolGameDry } from "./useToolGameDry"; // ⭐ השינוי היחיד!
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import { ToolCard } from "@/components/shared/CardPresets"; // ⭐ קארד חדש!
import { ALL_TOOLS } from "@/lib/constants";

export default function ToolGame() {
  const tools: BaseGameItem[] = ALL_TOOLS;

  const {
    gameState,
    speakItemName: speakToolName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleToolClick, // שינוי שם בלבד
    resetGame,
  } = useToolGameDry(); // ⭐ לא צריך לשלוח tools!

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={tools}
        onStart={startGame}
        onSpeak={speakToolName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-orange-800"
            levelColor="text-orange-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה כלי עבודה שמעת?"
              icon="🔨🪛✂️🔧"
              iconColor="text-orange-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakToolName(gameState.currentChallenge!.name)}
              description="בחר את כלי העבודה הנכון!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="tool" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <GameCardGrid
          items={gameState.options}
          onItemClick={handleToolClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(tool) => (
            <ToolCard
              tool={tool}
              onClick={handleToolClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: הקשב לשם כלי העבודה שאני אומר!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על כלי העבודה למטה כדי לשמוע את השמות שלהם"
        />
      </div>
    </div>
  );
}
