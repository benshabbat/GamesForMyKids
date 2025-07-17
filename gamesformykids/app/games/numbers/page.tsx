"use client";

import { NumberItem } from "@/lib/types/game";
import NumberOptions from "./NumberOptions";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useNumberGame } from "./useNumberGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";

export default function NumberGame() {
  const numbers: NumberItem[] = [
    {
      name: "zero",
      hebrew: "אפס",
      english: "Zero",
      digit: "0",
      sound: [261, 329, 392],
    },
    {
      name: "one",
      hebrew: "אחד",
      english: "One", 
      digit: "1",
      sound: [293, 369, 440],
    },
    {
      name: "two",
      hebrew: "שתיים",
      english: "Two",
      digit: "2", 
      sound: [329, 415, 494],
    },
    {
      name: "three",
      hebrew: "שלוש",
      english: "Three",
      digit: "3",
      sound: [349, 440, 523],
    },
    {
      name: "four",
      hebrew: "ארבע",
      english: "Four",
      digit: "4",
      sound: [392, 494, 587],
    },
    {
      name: "five",
      hebrew: "חמש",
      english: "Five",
      digit: "5",
      sound: [440, 554, 659],
    },
    {
      name: "six",
      hebrew: "שש",
      english: "Six",
      digit: "6",
      sound: [493, 622, 740],
    },
    {
      name: "seven",
      hebrew: "שבע",
      english: "Seven",
      digit: "7",
      sound: [523, 659, 784],
    },
    {
      name: "eight",
      hebrew: "שמונה",
      english: "Eight",
      digit: "8",
      sound: [587, 740, 880],
    },
    {
      name: "nine",
      hebrew: "תשע",
      english: "Nine",
      digit: "9",
      sound: [659, 831, 988],
    },
  ];

  const {
    gameState,
    speakNumberName,
    startGame,
    handleNumberClick,
    resetGame,
  } = useNumberGame(numbers);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        numbers={numbers}
        onStart={startGame}
        onSpeak={speakNumberName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header עם ניקוד */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-indigo-800"
            levelColor="text-indigo-600"
          />

          {/* האתגר הנוכחי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה מספר שמעת?"
              icon="🔢"
              iconColor="text-indigo-800"
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
        <NumberOptions
          options={gameState.options}
          currentChallenge={gameState.currentChallenge}
          onNumberClick={handleNumberClick}
        />
        
        <TipsBox
          tip="💡 טיפ: תשמע את שם המספר שאני אומר!"
          description="לחץ על הסמל למעלה כדי לשמוע שוב, או על המספרים למטה לשמוע את השמות"
        />
      </div>
    </div>
  );
}