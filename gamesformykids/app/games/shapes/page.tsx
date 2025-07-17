"use client";

import { Shape } from "@/lib/types/game";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useShapeGame } from "./useShapeGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import * as ShapeIcons from "../../../public/icons/ShapeIcons";
import { ALL_SHAPES } from "@/lib/constants/gameConstants";

export default function ShapeGame() {
  const shapes: Shape[] = ALL_SHAPES;

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
        shapes={shapes}
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
              icon="🔷"
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
          renderCustomCard={(shape, isCorrect) => (
            <div
              onClick={() => handleShapeClick(shape)}
              className={`
                aspect-square rounded-3xl cursor-pointer transition-all 
                duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
                bg-gradient-to-br from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600
                border-8 border-white
                ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
              `}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <div className="mb-2">
                  {shape.svg === "circle" && <ShapeIcons.CircleIcon size={80} />}
                  {shape.svg === "square" && <ShapeIcons.SquareIcon size={80} />}
                  {shape.svg === "triangle" && <ShapeIcons.TriangleIcon size={80} />}
                  {shape.svg === "rectangle" && <ShapeIcons.RectangleIcon size={80} />}
                  {shape.svg === "star" && <ShapeIcons.StarIcon size={80} />}
                  {shape.svg === "heart" && <ShapeIcons.HeartIcon size={80} />}
                  {shape.svg === "diamond" && <ShapeIcons.DiamondIcon size={80} />}
                  {shape.svg === "oval" && <ShapeIcons.OvalIcon size={80} />}
                </div>
                <div className="text-xl md:text-2xl font-bold">
                  {shape.hebrew}
                </div>
              </div>
            </div>
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