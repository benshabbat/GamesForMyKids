"use client";

import { useEffect } from 'react';
import { useAutoGameConfig } from '@/hooks/shared/game-state/useGameConfig';
import { useGameActionsStore } from '@/lib/stores/gameActionsStore';
import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { GAME_HOOKS_MAP } from '@/hooks/shared/game-state/gameHooksMap';
import { getQuizGameComponent } from '@/lib/quiz/quizGameRegistry';

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
      startGame: gameHookResult.startGame ?? (() => {}),
      resetGame: gameHookResult.resetGame ?? (() => {}),
      handleItemClick: gameHookResult.handleItemClick ?? (() => {}),
      speakItemName: gameHookResult.speakItemName ?? (() => {}),
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
  // Skip for game types without a registered hook (quiz games, etc.)
  if (!(gameType in GAME_HOOKS_MAP)) return null;
  // Skip for game types that have a dedicated quiz component — these games
  // are rendered by the quiz pipeline and must not also run a card-game hook
  // (e.g. emotions, instruments, family, transport appear in both registries).
  if (getQuizGameComponent(gameType) !== null) return null;
  return <GameLogicSyncInner key={gameType} />;
}
