"use client";

import { Color } from "@/lib/types/game";
import ColorGrid from "./ColorGrid";
import StartScreen from "./StartScreen";
import { useColorGame } from "./useColorGame";
import CelebrationBox from "@/components/shared/CelebrationBox";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";

export default function ColorGame() {
  const colors: Color[] = [
    {
      name: "red",
      hebrew: "אדום",
      value: "bg-red-500",
      sound: [440, 550, 660],
    },
    {
      name: "blue",
      hebrew: "כחול",
      value: "bg-blue-500",
      sound: [523, 659, 784],
    },
    {
      name: "green",
      hebrew: "ירוק",
      value: "bg-green-500",
      sound: [349, 440, 523],
    },
    {
      name: "yellow",
      hebrew: "צהוב",
      value: "bg-yellow-500",
      sound: [392, 494, 587],
    },
    {
      name: "purple",
      hebrew: "סגול",
      value: "bg-purple-500",
      sound: [294, 370, 440],
    },
    {
      name: "orange",
      hebrew: "כתום",
      value: "bg-orange-500",
      sound: [330, 415, 494],
    },
    {
      name: "pink",
      hebrew: "ורוד",
      value: "bg-pink-500",
      sound: [587, 698, 784],
    },
    {
      name: "brown",
      hebrew: "חום",
      value: "bg-amber-600",
      sound: [220, 277, 330],
    },
    {
      name: "black",
      hebrew: "שחור",
      value: "bg-gray-900",
      sound: [196, 247, 294],
    },
    {
      name: "white",
      hebrew: "לבן",
      value: "bg-gray-100 border-2 border-gray-300",
      sound: [659, 784, 880],
    },
  ];

  const {
    gameState,
    speakColorName,
    startGame,
    handleColorClick,
    resetGame,
  } = useColorGame(colors);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        colors={colors}
        onStart={startGame}
        onSpeak={speakColorName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
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
              title="מצא את הצבע:"
              icon="🎨"
              iconColor="text-purple-800"
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
        <ColorGrid
          colors={gameState.options}
          currentChallenge={gameState.currentChallenge}
          onColorClick={handleColorClick}
        />
        <TipsBox
          tip="💡 טיפ: תשמע את שם הצבע כשהאתג מופיע!"
          description="לחץ על שם הצבע כדי לשמוע שוב, או על הצבעים למטה לתרגול"
        />
      </div>
    </div>
  );
}
