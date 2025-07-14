"use client";

import { Letter } from "@/types/game";
import ChallengeBox from "./ChallengeBox";
import CelebrationBox from "./CelebrationBox";
import { useLetterGame } from "./useLetterGame";
import GameHeader from "./GameHeader";
import StartScreen from "./StartScreen";
import LetterOptions from "./LetterOptions";
import TipsBox from "./TipsBox";

export default function LetterGame() {
  const letters: Letter[] = [
    {
      name: "alef",
      hebrew: "א",
      english: "A",
      sound: [440, 550, 660],
    },
    {
      name: "bet",
      hebrew: "ב",
      english: "B",
      sound: [494, 588, 740],
    },
    {
      name: "gimel",
      hebrew: "ג",
      english: "G",
      sound: [523, 659, 784],
    },
    {
      name: "dalet",
      hebrew: "ד",
      english: "D",
      sound: [587, 740, 880],
    },
    {
      name: "hey",
      hebrew: "ה",
      english: "H",
      sound: [659, 831, 988],
    },
    {
      name: "vav",
      hebrew: "ו",
      english: "V",
      sound: [392, 494, 622],
    },
    {
      name: "zayin",
      hebrew: "ז",
      english: "Z",
      sound: [349, 440, 523],
    },
    {
      name: "het",
      hebrew: "ח",
      english: "H",
      sound: [330, 415, 494],
    },
    {
      name: "tet",
      hebrew: "ט",
      english: "T",
      sound: [294, 370, 440],
    },
    {
      name: "yud",
      hebrew: "י",
      english: "Y",
      sound: [277, 349, 415],
    },
    {
      name: "kaf",
      hebrew: "כ",
      english: "K",
      sound: [262, 330, 392],
    },
    {
      name: "lamed",
      hebrew: "ל",
      english: "L",
      sound: [247, 311, 370],
    },
  ];

  const {
    gameState,
    speakLetterName,
    startGame,
    handleLetterClick,
    resetGame,
  } = useLetterGame(letters);

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        letters={letters}
        onStart={startGame}
        onSpeak={speakLetterName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-red-100 p-4">
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
              onSpeak={() => speakLetterName(gameState.currentChallenge!.name)}
            />
          )}

          {/* חגיגת הצלחה */}
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox challenge={gameState.currentChallenge} />
          )}
        </div>

        {/* אפשרויות האותיות */}
        <LetterOptions
          options={gameState.options}
          currentChallenge={gameState.currentChallenge}
          onLetterClick={handleLetterClick}
        />
        <TipsBox />
      </div>
    </div>
  );
}
