"use client";

import { BaseGameItem } from "@/lib/types/base";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useFruitGameDry } from "./useFruitGameDry";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import FruitCard from "./FruitCard";
import { ALL_FRUITS } from "@/lib/constants";

/**
 * דף משחק פירות מחודש - גרסה DRY
 * 
 * גם כאן - רק ה-Hook השתנה, כל השאר זהה!
 */
export default function FruitGameDry() {
  const fruits: BaseGameItem[] = ALL_FRUITS;

  const {
    gameState,
    speakItemName,
    startGame,
    handleItemClick,
    resetGame,
  } = useFruitGameDry(); // ⭐ זה השינוי היחיד!

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={fruits}
        onStart={startGame}
        onSpeak={speakItemName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-orange-800"
            levelColor="text-orange-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה פרי שמעת?"
              icon="🧺🍎🍌🍇"
              iconColor="text-orange-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakItemName(gameState.currentChallenge!.name)}
              description="בחר את הפרי הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="פרי" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        {/* לוח הפירות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleItemClick}
          currentChallenge={gameState.currentChallenge}
          showSoundIcon={true}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(fruit) => (
            <FruitCard
              key={fruit.name}
              fruit={fruit}
              onClick={handleItemClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם הפרי כשהאתגר מופיע!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב"
        />
      </div>
    </div>
  );
}
