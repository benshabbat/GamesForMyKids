"use client";

import GameHeader from "./GameHeader";
import GameStatsButton from "../buttons/GameStatsButton";
import SlowSpeechButton from "../buttons/SlowSpeechButton";
import NikudToggleButton from "../buttons/NikudToggleButton";
import RealPhotoToggleButton from "../buttons/RealPhotoToggleButton";
import BilingualToggleButton from "../buttons/BilingualToggleButton";
import GameChallengeSection from "../GameChallengeSection";
import { useGameTypeStore } from "@/lib/stores/gameTypeStore";
import { REAL_PHOTO_CARD_MAP } from "../GameCardMap";
import { StreakBadge } from "@/components/game/shared/StreakBadge";
import { FullscreenToggle } from "@/components/game/shared/FullscreenToggle";

export default function GameHeaderSection() {
  const gameType = useGameTypeStore((s) => s.currentGameType);
  const hasRealPhotos = !!gameType && gameType in REAL_PHOTO_CARD_MAP;

  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-center mb-6">
        <GameHeader />
        <div className="flex items-center gap-2">
          <StreakBadge />
          {hasRealPhotos && <RealPhotoToggleButton />}
          <BilingualToggleButton />
          <NikudToggleButton />
          <SlowSpeechButton />
          <FullscreenToggle />
          <GameStatsButton />
        </div>
      </div>
      <GameChallengeSection />
    </div>
  );
}
