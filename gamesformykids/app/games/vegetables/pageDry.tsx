"use client";

import { BaseGameItem } from "@/lib/types/base";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useVegetableGameDry } from "./useVegetableGameDry";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import VegetableCard from "./VegetableCard";
import { ALL_VEGETABLES } from "@/lib/constants";

/**
 * דף משחק ירקות מחודש - גרסה DRY
 * 
 * השינויים:
 * 1. השתמש ב-useVegetableGameDry במקום useVegetableGame
 * 2. הקוד זהה לגמרי - רק ה-Hook השתנה!
 * 3. האורך של ה-Hook ירד מ-150 שורות ל-5 שורות
 */
export default function VegetableGameDry() {
  const vegetables: BaseGameItem[] = ALL_VEGETABLES;

  const {
    gameState,
    speakItemName,
    startGame,
    handleItemClick,
    resetGame,
  } = useVegetableGameDry(); // ⭐ זה השינוי היחיד!

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={vegetables}
        onStart={startGame}
        onSpeak={speakItemName}
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
              title="איזה ירק שמעת?"
              icon="🧺🥕🥬🍅"
              iconColor="text-green-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakItemName(gameState.currentChallenge!.name)}
              description="בחר את הירק הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox
              label="ירק"
              value={gameState.currentChallenge.hebrew}
            />
          )}
        </div>

        {/* לוח הירקות - מציג רק את 4 האפשרויות הנוכחיות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleItemClick}
          currentChallenge={gameState.currentChallenge}
          showSoundIcon={true}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(vegetable) => (
            <VegetableCard
              key={vegetable.name}
              vegetable={vegetable}
              onClick={handleItemClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם הירק כשהאתגר מופיע!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על ירקות למטה כדי לשמוע את שמותיהם"
        />
      </div>
    </div>
  );
}
