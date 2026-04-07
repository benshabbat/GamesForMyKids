"use client";

import { useGameProgressStore } from '@/lib/stores/gameProgressStore';
import GameHeader from "./GameHeader";
import GameStatsButton from "../buttons/GameStatsButton";
import GameChallengeSection from "../GameChallengeSection";

export default function GameHeaderSection() {
  const score = useGameProgressStore((s) => s.score);
  const level = useGameProgressStore((s) => s.level);
  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-center mb-6">
        <GameHeader score={score} level={level} />
        <GameStatsButton />
      </div>
      <GameChallengeSection />
    </div>
  );
}
