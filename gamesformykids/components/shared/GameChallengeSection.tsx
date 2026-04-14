"use client";

import { useUniversalGame } from '@/hooks/shared/game-state/useUniversalGame';
import ChallengeBox from "./feedback/ChallengeBox";
import CelebrationBox from "./feedback/CelebrationBox";

export default function GameChallengeSection() {
  const { currentChallenge, showCelebration } = useUniversalGame();

  if (!currentChallenge) return null;

  return (
    <div className="mb-6">
      {showCelebration ? (
        <CelebrationBox />
      ) : (
        <ChallengeBox />
      )}
    </div>
  );
}
