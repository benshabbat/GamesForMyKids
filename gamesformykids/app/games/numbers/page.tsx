"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useNumberGameDry } from "./useNumberGameDry"; // ⭐ השינוי היחיד!
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import NumberCard from "./NumberCard";
import { ALL_NUMBERS } from "@/lib/constants";

export default function NumberGame() {
  const numbers: BaseGameItem[] = ALL_NUMBERS;

  const {
    gameState,
    speakItemName: speakNumberName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleNumberClick, // שינוי שם בלבד
    resetGame,
  } = useNumberGameDry(); // ⭐ לא צריך לשלוח numbers!

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={numbers}
        onStart={startGame}
        onSpeak={speakNumberName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-purple-700"
            levelColor="text-purple-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה מספר שמעת?"
              icon="🔢"
              iconColor="text-purple-700"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakNumberName(gameState.currentChallenge!.name)}
              description="בחר את המספר הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="מספר" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        {/* אפשרויות המספרים */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleNumberClick}
          currentChallenge={gameState.currentChallenge}
          showSoundIcon={true}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(number) => (
            <NumberCard
              number={number}
              onClick={handleNumberClick}
            />
          )}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם המספר שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על המספרים למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}
