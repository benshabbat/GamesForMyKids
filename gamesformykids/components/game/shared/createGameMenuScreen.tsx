'use client';

import GameMenuCard from './GameMenuCard';

export interface GameMenuScreenConfig {
  emoji: string;
  title: string;
  description: string;
  gradientClass: string;
  buttonClass?: string;
  startLabel?: string;
  hint?: string;
  animateEmoji?: boolean;
}

export function createGameMenuScreen(
  config: GameMenuScreenConfig,
  useGameHook: () => { startGame: () => void; best?: number },
) {
  function GameMenuScreen() {
    const { startGame, best } = useGameHook();
    return (
      <GameMenuCard
        {...config}
        onStart={startGame}
        {...(best !== undefined && { best })}
      />
    );
  }
  GameMenuScreen.displayName = `GameMenuScreen(${config.title})`;
  return GameMenuScreen;
}
