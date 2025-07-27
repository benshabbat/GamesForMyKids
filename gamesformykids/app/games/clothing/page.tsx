"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useClothingGameDry } from "./useClothingGameDry"; // ⭐ השינוי היחיד!
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import ClothingCard from "./ClothingCard";
import { ALL_CLOTHING } from "@/lib/constants";

export default function ClothingGame() {
  const clothingItems: BaseGameItem[] = ALL_CLOTHING;

  const {
    gameState,
    speakItemName: speakClothingItemName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleClothingItemClick, // שינוי שם בלבד
    resetGame,
  } = useClothingGameDry(); // ⭐ לא צריך לשלוח clothingItems!

  // Wrapper function for speaking clothing item by name
  const speakByName = (clothingItemName: string) => {
    speakClothingItemName(clothingItemName);
  };

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={clothingItems}
        onStart={startGame}
        onSpeak={speakByName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 p-4 relative overflow-hidden">
      {/* דקורציה אופנתית ברקע */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-6xl">👗</div>
        <div className="absolute top-20 right-20 text-4xl">👕</div>
        <div className="absolute bottom-32 left-20 text-5xl">👠</div>
        <div className="absolute bottom-20 right-32 text-4xl">🧢</div>
        <div className="absolute top-1/2 left-1/4 text-3xl">👖</div>
        <div className="absolute top-1/3 right-1/3 text-4xl">🧥</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-pink-800"
            levelColor="text-pink-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה פריט לבוש שמעת?"
              icon="👕👗👖👠"
              iconColor="text-pink-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakClothingItemName(gameState.currentChallenge!.name)}
              description="בחר את פריט הלבוש הנכון!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="פריט לבוש" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {gameState.options.map((clothingItem: BaseGameItem) => (
            <ClothingCard
              key={clothingItem.name}
              clothingItem={clothingItem}
              onClick={handleClothingItemClick}
            />
          ))}
        </div>
        
        <TipsBox
          tip="💡 טיפ: הקשב לשם פריט הלבוש שאני אומר!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על הבגדים למטה כדי לשמוע את שמותיהם"
        />
      </div>
    </div>
  );
}
