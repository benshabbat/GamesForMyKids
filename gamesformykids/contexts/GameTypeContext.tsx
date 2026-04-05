'use client';

/**
 * GameType Context
 *
 * State (currentGameType, previousGameType, gameHistory) lives in useGameTypeStore (Zustand).
 * This provider adds only what requires React context: useRouter-based navigation actions.
 */

import { createContext, useContext, useCallback, useEffect } from 'react';
import { GameType } from '@/lib/types/core/base';
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs';
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap';
import { useRouter } from 'next/navigation';
import {
  GameTypeContextValue,
  GameTypeProviderProps,
} from '@/lib/types/contexts/game-type';
import { useGameTypeStore } from '@/lib/stores/gameTypeStore';

const GameTypeContext = createContext<GameTypeContextValue | undefined>(undefined);

export function GameTypeProvider({ children, initialGameType }: GameTypeProviderProps) {
  const router = useRouter();
  const { currentGameType, previousGameType, gameHistory, setCurrentGameType, clearGameHistory } =
    useGameTypeStore();

  // Seed the store with the game type received from the server component
  useEffect(() => {
    if (initialGameType) {
      setCurrentGameType(initialGameType as GameType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGameType]);

  const navigateToGame = useCallback(
    (gameType: GameType) => {
      setCurrentGameType(gameType);
      router.push(`/games/${gameType}`);
    },
    [setCurrentGameType, router],
  );

  const goToPreviousGame = useCallback(() => {
    if (previousGameType) {
      navigateToGame(previousGameType);
    }
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

  const contextValue: GameTypeContextValue = {
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

  return (
    <GameTypeContext.Provider value={contextValue}>
      {children}
    </GameTypeContext.Provider>
  );
}

export function useGameType(): GameTypeContextValue {
  const context = useContext(GameTypeContext);
  if (context === undefined) {
    throw new Error('useGameType must be used within a GameTypeProvider');
  }
  return context;
}

/** Reads only currentGameType  directly from the store, no context needed. */
export function useCurrentGameType(): GameType | null {
  return useGameTypeStore((s) => s.currentGameType);
}

/** Reads currentGameConfig  directly from the store, no context needed. */
export function useCurrentGameConfig() {
  const currentGameType = useGameTypeStore((s) => s.currentGameType);
  return currentGameType ? GAME_UI_CONFIGS[currentGameType] ?? null : null;
}
