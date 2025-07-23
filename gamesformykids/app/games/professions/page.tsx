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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-purple-800"
            levelColor="text-purple-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה מקצוע זה?"
              icon="👩‍⚕️👨‍🚒👩‍🏫👮‍♀️"
              iconColor="text-purple-800"
              challengeText={gameState.currentChallenge.description}
              onSpeak={() => speakProfessionName(gameState.currentChallenge!)}
              description="בחר את המקצוע הנכון!"
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

        {/* אפשרויות המקצועות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleProfessionClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-3xl"
          renderCustomCard={(profession) => (
            <ProfessionCard
              profession={profession}
              onClick={handleProfessionClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את תיאור המקצוע!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על המקצועות למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}