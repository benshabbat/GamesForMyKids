"use client";

import GameHeader from "./GameHeader";
import GameStatsButton from "../buttons/GameStatsButton";
import GameChallengeSection from "../GameChallengeSection";

export default function GameHeaderSection() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-center mb-6">
        <GameHeader />
        <GameStatsButton />
      </div>
      <GameChallengeSection />
    </div>
  );
}
