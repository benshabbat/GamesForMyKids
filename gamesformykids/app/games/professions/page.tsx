"use client";

import { Profession } from "@/lib/types/game";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useProfessionGame } from "./useProfessionGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import ProfessionCard from "./ProfessionCard";
import { ALL_PROFESSIONS } from "@/lib/constants/gameConstants";

export default function ProfessionGame() {
  const professions: Profession[] = ALL_PROFESSIONS;

  const {
    gameState,
    speakProfessionName,
    startGame,
    handleProfessionClick,
    resetGame,
  } = useProfessionGame(professions);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        professions={professions}
        onStart={startGame}
        onSpeak={speakProfessionName}
      />
    );
  }

  const { currentChallenge, score, level, showCelebration } = gameState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          title="משחק מקצועות"
          score={score}
          level={level}
          onReset={resetGame}
        />

        {showCelebration && (
          <CelebrationBox
            message="כל הכבוד! למדת על מקצוע חדש!"
            onClose={() => {}}
          />
        )}

        {currentChallenge && (
          <div className="mb-8">
            <ChallengeBox
              title={`איזה מקצוע זה?`}
              description={currentChallenge.description}
              mainContent={
                <div className="text-8xl animate-bounce">
                  {currentChallenge.emoji}
                </div>
              }
              onSpeak={() => speakProfessionName(currentChallenge)}
            />
          </div>
        )}

        <GameCardGrid>
          {gameState.options.map((profession) => (
            <ProfessionCard
              key={profession.id}
              profession={profession}
              onClick={() => handleProfessionClick(profession)}
              disabled={false}
            />
          ))}
        </GameCardGrid>

        <TipsBox
          tips={[
            "הקשב לתיאור של המקצוע",
            "חפש את האימוג'י המתאים",
            "כל מקצוע חשוב ומיוחד!",
          ]}
        />
      </div>
    </div>
  );
}
