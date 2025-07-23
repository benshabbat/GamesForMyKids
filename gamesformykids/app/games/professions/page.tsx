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

  const { currentChallenge } = gameState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-300 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-purple-800"
            levelColor="text-purple-700"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה מקצוע זה?"
              icon="👩‍⚕️"
              iconColor="text-purple-700"
              challengeText={currentChallenge.description}
              onSpeak={() => speakProfessionName(currentChallenge)}
              description="לחץ על המקצוע הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox
              label="מקצוע"
              value={gameState.currentChallenge.name}
            />
          )}
        </div>

        {/* לוח המקצועות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleProfessionClick}
          currentChallenge={gameState.currentChallenge}
          showSoundIcon={true}
          gridCols="grid-cols-2 md:grid-cols-2"
          maxWidth="max-w-3xl"
          renderCustomCard={(profession: Profession) => (
            <ProfessionCard
              key={profession.id}
              profession={profession}
              onClick={() => handleProfessionClick(profession)}
              disabled={false}
            />
          )}
        />

        <TipsBox
          tip="הקשב לתיאור"
          description="הקשב לתיאור של המקצוע וחפש את האימוג'י המתאים! כל מקצוע חשוב ומיוחד."
        />
      </div>
    </div>
  );
}
