"use client";

import { useEffect } from 'react';
import { useAutoGameConfig } from '@/hooks/shared/game-state/useGameConfig';
import { useGameActionsStore } from '@/lib/stores/gameActionsStore';
import { useGameTypeStore } from '@/lib/stores/gameTypeStore';

/**
 * Inner component — only rendered once the game type is in the store.
 * Keeps hook calls unconditional (React rules of hooks).
 */
function GameLogicSyncInner() {
  const { useGameHook } = useAutoGameConfig();
  const gameHookResult = useGameHook();

  // No dependency array — syncs on every render of THIS component only.
  // This component doesn't subscribe to the store, so no infinite loop.
  useEffect(() => {
    useGameActionsStore.getState().setGameActions({
      startGame: gameHookResult.startGame,
      resetGame: gameHookResult.resetGame,
      handleItemClick: gameHookResult.handleItemClick,
      speakItemName: gameHookResult.speakItemName,
      hints: gameHookResult.hints?.map((h) => {
        const hint = h as string | { text?: string };
        return typeof hint === 'string' ? hint : hint.text ?? '';
      }) ?? [],
      hasMoreHints: gameHookResult.hasMoreHints ?? false,
      showNextHint: gameHookResult.showNextHint ?? (() => {}),
      currentAccuracy: gameHookResult.currentAccuracy ?? 0,
    });
  });

  return null;
}

/**
 * Outer shell — waits for the store to be seeded by GameTypeProvider before
 * rendering the inner component. Handles the first-render race between
 * GameTypeProvider's useMemo/useEffect and useSyncExternalStore's snapshot.
 *
 * MUST be rendered as a SIBLING of UltimateGamePage (not a child) so that
 * UltimateGamePage re-renders (from gameActionsStore subscription) don't
 * cascade into GameLogicSync and trigger an infinite effect loop.
 */
export function GameLogicSync() {
  const gameType = useGameTypeStore((s) => s.currentGameType);
  if (!gameType) return null;
  // key=gameType forces a full unmount/remount when the game type changes so
  // that the dynamic useGameHook() call inside GameLogicSyncInner always
  // starts with a fresh hook call-stack and never violates the Rules of Hooks
  // (React error #311: hooks called conditionally / call count mismatch).
  return <GameLogicSyncInner key={gameType} />;
}
