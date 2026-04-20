"use client";

import { useEffect } from 'react';
import { useAutoGameConfig } from '@/hooks/shared/game-state/useGameConfig';
import { useGameActionsStore } from '@/lib/stores/gameActionsStore';
import { GameType } from '@/lib/types/core/base';
import { AutoGameType } from '@/lib/constants/gameHooksMap';

/**
 * Separate component: runs the game-specific hook and syncs actions to the store.
 * MUST be rendered as a SIBLING of UltimateGamePage (not a child) so that
 * UltimateGamePage re-renders (from gameActionsStore subscription) don't
 * cascade into GameLogicSync and trigger an infinite effect loop.
 */
export function GameLogicSync({ gameType }: { gameType?: AutoGameType | GameType }) {
  const { useGameHook } = useAutoGameConfig(gameType);
  const gameHookResult = useGameHook();

  // No dependency array — syncs on every render of THIS component only.
  // This component doesn't subscribe to the store, so no infinite loop.
  useEffect(() => {
    useGameActionsStore.getState().setGameActions({
      startGame: gameHookResult.startGame,
      resetGame: gameHookResult.resetGame,
      handleItemClick: gameHookResult.handleItemClick,
      speakItemName: gameHookResult.speakItemName,
      hints: gameHookResult.hints?.map(
        (h: string | { text?: string }) => (typeof h === 'string' ? h : h.text || ''),
      ) ?? [],
      hasMoreHints: gameHookResult.hasMoreHints ?? false,
      showNextHint: gameHookResult.showNextHint ?? (() => {}),
      currentAccuracy: gameHookResult.currentAccuracy ?? 0,
    });
  });

  return null;
}
