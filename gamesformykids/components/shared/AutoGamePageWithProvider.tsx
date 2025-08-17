/**
 * ===============================================
 * AutoGamePageWithProvider - עטיפה עם קונטקסט 🎯
 * ===============================================
 * 
 * מספק את הקונטקסט הדרוש לAutoGamePage
 */

"use client";

import { GameType } from "@/lib/types/base";
import { AutoGameType } from "@/lib/constants/gameHooksMap";
import { GameConfigProvider } from "@/contexts/GameConfigContext";
import { AutoGamePage } from "./AutoGamePage";
import { BaseGameItem } from "@/lib/types/base";

interface AutoGamePageWithProviderProps {
  gameType: AutoGameType | GameType;
  renderCard?: (item: BaseGameItem, onClick: (item: BaseGameItem) => void) => React.ReactNode;
}

/**
 * 🎯 AutoGamePage עם הקונטקסט הדרוש
 */
export function AutoGamePageWithProvider({ gameType, renderCard }: AutoGamePageWithProviderProps) {
  return (
    <GameConfigProvider gameType={gameType}>
      <AutoGamePage gameType={gameType} renderCard={renderCard} />
    </GameConfigProvider>
  );
}

export default AutoGamePageWithProvider;
