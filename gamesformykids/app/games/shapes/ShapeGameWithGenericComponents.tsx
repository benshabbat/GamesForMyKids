"use client";

import { Shape } from "@/lib/types/game";
import { useShapeGame } from "./useShapeGame";
import CelebrationBox from "@/components/shared/CelebrationBox";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import StartScreen from "./StartScreen";
import { GameCardGrid } from "@/components/shared/GameCardGrid";
import * as ShapeIcons from "./ShapeIcons";

export default function ShapeGameWithGenericComponents() {
  const shapes: Shape[] = [
    {
      name: "circle",
      hebrew: "עיגול",
      english: "Circle",
      color: "bg-blue-500",
      sound: [523, 659, 784],
      svg: "circle"
    },
    {
      name: "square",
      hebrew: "ריבוע",
      english: "Square",
      color: "bg-red-500",
      sound: [440, 550, 660],
      svg: "square"
    },
    {
      name: "triangle",
      hebrew: "משולש",
      english: "Triangle",
      color: "bg-green-500",
      sound: [349, 440, 523],
      svg: "triangle"
    },
    {
      name: "rectangle",
      hebrew: "מלבן",
      english: "Rectangle",
      color: "bg-purple-500",
      sound: [294, 370, 440],
      svg: "rectangle"
    },
    {
      name: "star",
      hebrew: "כוכב",
      english: "Star",
      color: "bg-yellow-500",
      sound: [392, 494, 587],
      svg: "star"
    },
    {
      name: "heart",
      hebrew: "לב",
      english: "Heart",
      color: "bg-pink-500",
      sound: [587, 698, 784],
      svg: "heart"
    },
    {
      name: "diamond",
      hebrew: "מעויין",
      english: "Diamond",
      color: "bg-indigo-500",
      sound: [277, 349, 415],
      svg: "diamond"
    },
    {
      name: "oval",
      hebrew: "אליפסה",
      english: "Oval",
      color: "bg-teal-500",
      sound: [220, 277, 330],
      svg: "oval"
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-green-800"
            levelColor="text-green-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזו צורה שמעת?"
              icon="🔷"
              iconColor="text-green-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakShapeName(gameState.currentChallenge!.name)}
              description="בחר את הצורה הנכונה!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox label="צורה" value={gameState.currentChallenge.hebrew} />
          )}
        </div>

        {/* Using the generic GameCardGrid with custom rendering for shapes */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleShapeClick}
          currentChallenge={gameState.currentChallenge}
          renderCustomCard={(shape, isCorrect) => (
            <div
              onClick={() => handleShapeClick(shape)}
              className={`
                aspect-square rounded-3xl cursor-pointer transition-all 
                duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl
                ${shape.color}
                border-8 border-white
                ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
              `}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <div className="mb-2">
                  {/* Dynamically select the correct shape icon */}
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
