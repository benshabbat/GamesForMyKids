"use client";

import { Shape } from "@/types/game";
import GameHeader from "./GameHeader";
import ShapeOptions from "./ShapeOptions";
import ChallengeBox from "./ChallengeBox";
import CelebrationBox from "@/app/components/CelebrationBox";
import StartScreen from "./StartScreen";
import TipsBox from "./TipsBox";
import { useShapeGame } from "./useShapeGame";

export default function ShapeGame() {
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
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              challenge={gameState.currentChallenge}
              onSpeak={() => speakShapeName(gameState.currentChallenge!.name)}
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox label="צורה" value={gameState.currentChallenge.hebrew} />
          )}
        </div>

        {/* אפשרויות הצורות */}
        <ShapeOptions
          options={gameState.options}
          currentChallenge={gameState.currentChallenge}
          onShapeClick={handleShapeClick}
        />
        <TipsBox />
      </div>
    </div>
  );
}