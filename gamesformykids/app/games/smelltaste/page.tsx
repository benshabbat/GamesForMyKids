"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useSmellTasteGameDry } from "./useSmellTasteGameDry"; // ⭐ השינוי היחיד!
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import { SmellTasteCard } from "@/components/shared/CardPresets"; // ⭐ קארד חדש!
import { ALL_SMELLS_TASTES } from "@/lib/constants";

export default function SmellTasteGame() {
  const smellTasteItems: BaseGameItem[] = ALL_SMELLS_TASTES;

  const {
    gameState,
    speakItemName: speakSmellTasteItemName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleSmellTasteItemClick, // שינוי שם בלבד
    resetGame,
  } = useSmellTasteGameDry(); // ⭐ לא צריך לשלוח smellTasteItems!

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={smellTasteItems}
        onStart={startGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-amber-800"
            levelColor="text-amber-700"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה ריח/טעם שמעת?"
              icon="👃🍯🧄🍋"
              iconColor="text-amber-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakSmellTasteItemName(gameState.currentChallenge!.name)}
              description="בחר את הריח/טעם הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="ריח/טעם" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        {/* אפשרויות הריחות והטעמים */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleSmellTasteItemClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(smellTasteItem) => (
            <SmellTasteCard
              key={smellTasteItem.name}
              smellTasteItem={smellTasteItem}
              onClick={handleSmellTasteItemClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם הריח או הטעם שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על הכרטיסים למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}
