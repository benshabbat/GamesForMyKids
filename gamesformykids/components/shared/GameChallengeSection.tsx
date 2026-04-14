"use client";

import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import ChallengeBox from "./feedback/ChallengeBox";
import CelebrationBox from "./feedback/CelebrationBox";
import MathChallengeBox from "./feedback/MathChallengeBox";

export default function GameChallengeSection() {
  const { currentChallenge, showCelebration, gameType } = useUniversalGame();

  if (!currentChallenge) return null;

  return (
    <div className="mb-6">
      {showCelebration ? (
        <CelebrationBox />
      ) : gameType === 'math' ? (
        <MathChallengeBox />
      ) : (
        <ChallengeBox />
      )}
    </div>
  );
}
