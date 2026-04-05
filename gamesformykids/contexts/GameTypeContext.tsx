'use client';

/**
 * GameTypeContext  fully migrated to Zustand
 *
 * No React context. useGameType() reads state directly from useGameTypeStore
 * and calls useRouter() for navigation actions.
 *
 * GameTypeProvider is kept as a seeder component only:
 * it sets initialGameType into the store via useEffect.
 */

import { useCallback, useEffect, ReactNode } from 'react';
import { GameType } from '@/lib/types/core/base';
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs';
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap';
import { useRouter } from 'next/navigation';
import { useGameTypeStore } from '@/lib/stores/gameTypeStore';
import { GameTypeContextValue } from '@/lib/types/contexts/game-type';

// ---------------------------------------------------------------------------
// GameTypeProvider  seed-only, no React context
// ---------------------------------------------------------------------------
interface GameTypeProviderProps {
  children: ReactNode;
  initialGameType?: GameType | string;
}

export function GameTypeProvider({ children, initialGameType }: GameTypeProviderProps) {
  const setCurrentGameType = useGameTypeStore((s) => s.setCurrentGameType);

  useEffect(() => {
    if (initialGameType) {
      setCurrentGameType(initialGameType as GameType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGameType]);

  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// useGameType  reads Zustand store + useRouter for navigation
// ---------------------------------------------------------------------------
export function useGameType(): GameTypeContextValue {
  const router = useRouter();
  const currentGameType = useGameTypeStore((s) => s.currentGameType);
  const previousGameType = useGameTypeStore((s) => s.previousGameType);
  const gameHistory = useGameTypeStore((s) => s.gameHistory);
  const setCurrentGameType = useGameTypeStore((s) => s.setCurrentGameType);
  const clearGameHistory = useGameTypeStore((s) => s.clearGameHistory);

  const navigateToGame = useCallback(
    (gameType: GameType) => {
      setCurrentGameType(gameType);
      router.push('/games/' + gameType);
    },
    [setCurrentGameType, router],
  );

  const goToPreviousGame = useCallback(() => {
    if (previousGameType) navigateToGame(previousGameType);
  }, [previousGameType, navigateToGame]);

  const isGameSupported = useCallback(
    (gameType: string): boolean => gameType in GAME_UI_CONFIGS,
    [],
  );

  const getGameConfig = useCallback(
    (gameType: GameType) => GAME_UI_CONFIGS[gameType] || null,
    [],
  );

  const getGameItems = useCallback(
    (gameType: GameType) => GAME_ITEMS_MAP[gameType] || null,
    [],
  );

  const currentGameConfig = currentGameType ? getGameConfig(currentGameType) : null;
  const currentGameItems = currentGameType ? getGameItems(currentGameType) : null;

  return {
    gameState: { currentGameType, previousGameType, gameHistory },
    currentGameType,
    currentGameConfig,
    currentGameItems,
    setCurrentGameType,
    navigateToGame,
    goToPreviousGame,
    clearGameHistory,
    isGameSupported,
    getGameConfig,
    getGameItems,
  };
}

// Convenience shortcuts  read store directly, no hook overhead
export function useCurrentGameType(): GameType | null {
  return useGameTypeStore((s) => s.currentGameType);
}

export function useCurrentGameConfig() {
  const gameType = useGameTypeStore((s) => s.currentGameType);
  return gameType ? GAME_UI_CONFIGS[gameType] ?? null : null;
}
