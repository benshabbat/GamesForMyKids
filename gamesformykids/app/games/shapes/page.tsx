"use client";

import { ShapeItem } from "@/lib/types/games";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useShapeGame } from "./useShapeGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import ShapeCard from "./ShapeCard";
import { ALL_SHAPES } from "@/lib/constants";

export default function ShapeGame() {
  const shapes: ShapeItem[] = ALL_SHAPES as ShapeItem[];

  const {
    gameState,
    speakShapeName,
    startGame,
    handleShapeClick,
    resetGame,
  } = useShapeGame(shapes);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={shapes}
        onStart={startGame}
        onSpeak={speakShapeName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-teal-700"
            levelColor="text-teal-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזו צורה שמעת?"
              icon="⭕�🔶⬛"
              iconColor="text-teal-700"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakShapeName(gameState.currentChallenge!.name)}
              description="בחר את הצורה הנכונה!"
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox label="צורה" value={gameState.currentChallenge.hebrew} />
          )}
        </div>

        {/* אפשרויות הצורות */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleShapeClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(shape) => (
            <ShapeCard
              shape={shape}
              onClick={handleShapeClick}
            />
          )}
        />
        <TipsBox
          tip="💡 טיפ: תשמע את שם הצורה שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על הצורות למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}
