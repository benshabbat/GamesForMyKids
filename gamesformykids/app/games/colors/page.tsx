"use client";

import { BaseGameItem } from "@/lib/types";
import StartScreen from "./StartScreen";
import { useColorGameDry } from "./useColorGameDry"; // ⭐ השינוי היחיד!
import CelebrationBox from "@/components/shared/CelebrationBox";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import ColorCard from "./ColorCard";
import { ALL_COLORS } from "@/lib/constants";

export default function ColorGame() {
  const colors: BaseGameItem[] = ALL_COLORS;

  const {
    gameState,
    speakItemName: speakColorName, // שינוי שם בלבד
    startGame,
    handleItemClick: handleColorClick, // שינוי שם בלבד
    resetGame,
  } = useColorGameDry(); // ⭐ לא צריך לשלוח colors!

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={colors}
        onStart={startGame}
        onSpeak={speakColorName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-pink-700"
            levelColor="text-pink-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="מצא את הצבע:"
              icon="🎨"
              iconColor="text-pink-700"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakColorName(gameState.currentChallenge!.hebrew)}
              description="לחץ על הצבע הנכון!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            // <CelebrationBox challenge={gameState.currentChallenge} />
            <CelebrationBox
              label="צבע"
              value={gameState.currentChallenge.hebrew}
            />
          )}
        </div>

        {/* לוח הצבעים - מציג רק את 4 האפשרויות הנוכחיות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleColorClick}
          currentChallenge={gameState.currentChallenge}
          showSoundIcon={true}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(color) => (
            <ColorCard
              color={color}
              onClick={handleColorClick}
            />
          )}
        />
        <TipsBox
          tip="💡 טיפ: תשמע את שם הצבע כשהאתג מופיע!"
          description="לחץ על שם הצבע כדי לשמוע שוב, או על הצבעים למטה לתרגול"
        />
      </div>
    </div>
  );
}
