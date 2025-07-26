"use client";

import { BaseGameItem } from "@/lib/types";
import CelebrationBox from "@/components/shared/CelebrationBox";
import StartScreen from "./StartScreen";
import { useInstrumentGame } from "./useInstrumentGame";
import ChallengeBox from "@/components/shared/ChallengeBox";
import GameHeader from "@/components/shared/GameHeader";
import TipsBox from "@/components/shared/TipsBox";
import InstrumentCard from "./InstrumentCard";
import { ALL_INSTRUMENTS } from "@/lib/constants/gameConstants";

export default function InstrumentGame() {
  const instruments: BaseGameItem[] = ALL_INSTRUMENTS;

  const {
    gameState,
    speakInstrumentName,
    startGame,
    handleInstrumentClick,
    resetGame,
  } = useInstrumentGame(instruments);

  // Wrapper function for speaking instrument by name
  const speakByName = (instrumentName: string) => {
    speakInstrumentName(instrumentName);
  };

  if (!gameState.isPlaying) {
    return (
      <StartScreen
        items={instruments}
        onStart={startGame}
        onSpeak={speakByName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor="text-amber-800"
            levelColor="text-amber-600"
          />

          {gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title="איזה כלי נגינה שמעת?"
              icon="🎵🎹🎸🎻"
              iconColor="text-amber-800"
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakInstrumentName(gameState.currentChallenge!.name)}
              description="בחר את כלי הנגינה הנכון!"
            />
          )}

          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox 
              label="כלי נגינה" 
              value={gameState.currentChallenge.hebrew} 
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {gameState.options.map((instrument: BaseGameItem) => (
            <InstrumentCard
              key={instrument.name}
              instrument={instrument}
              onClick={handleInstrumentClick}
            />
          ))}
        </div>
        
        <TipsBox
          tip="💡 טיפ: הקשב לשם כלי הנגינה שאני אומר!"
          description="לחץ על האייקון למעלה כדי לשמוע שוב, או לחץ על כלי נגינה למטה כדי לשמוע את שמותיהם"
        />
      </div>
    </div>
  );
}
