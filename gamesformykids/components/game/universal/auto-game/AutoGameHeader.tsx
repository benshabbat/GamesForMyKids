"use client";

import { useAutoGame } from "@/hooks";
import { GameHeader } from "../../../shared";
import { ChallengeBox } from "../../../shared";
import { CelebrationBox } from "../../../shared";
import { SlowSpeechToggle } from "@/components/game/shared/SlowSpeechToggle";
import { FullscreenToggle } from "@/components/game/shared/FullscreenToggle";

/**
 * AutoGameHeader - header section of AutoGamePage
 * Contains: GameHeader, accuracy button, ChallengeBox / CelebrationBox
 */
export function AutoGameHeader() {
  const {
    gameState,
    showCelebration,
    currentChallenge,
    currentAccuracy,
    setShowProgressModal,
  } = useAutoGame();

  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-center mb-4">
        <GameHeader />

        {/* כפתורי שליטה */}
        <div className="flex items-center gap-2">
          <SlowSpeechToggle />
          <FullscreenToggle />
          <button
            onClick={() => setShowProgressModal(true)}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105 transition-[transform,background-color] duration-200 text-sm font-bold"
            title="הצג סטטיסטיקות"
          >
            📊 {currentAccuracy || 0}%
          </button>
        </div>
      </div>

      {/* Challenge Box */}
      {gameState && currentChallenge && !showCelebration && (
        <ChallengeBox />
      )}

      {/* Celebration */}
      {gameState && showCelebration && currentChallenge && (
        <CelebrationBox />
      )}
    </div>
  );
}
