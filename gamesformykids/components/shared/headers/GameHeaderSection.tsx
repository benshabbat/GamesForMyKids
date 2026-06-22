"use client";

import GameHeader from "./GameHeader";
import GameStatsButton from "../buttons/GameStatsButton";
import SlowSpeechButton from "../buttons/SlowSpeechButton";
import GameChallengeSection from "../GameChallengeSection";

export default function GameHeaderSection() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-center mb-6">
        <GameHeader />
        <div className="flex items-center gap-2">
          <SlowSpeechButton />
          <GameStatsButton />
        </div>
      </div>
      <GameChallengeSection />
    </div>
  );
}
