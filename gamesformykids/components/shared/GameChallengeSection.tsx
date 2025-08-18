"use client";

import { useUniversalGame } from '@/contexts/UniversalGameContext';
import ChallengeBox from "./ChallengeBox";
import CelebrationBox from "./CelebrationBox";

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
