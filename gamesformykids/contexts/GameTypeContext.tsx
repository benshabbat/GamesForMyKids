'use client';

/**
 * GameType Context
 * 
 * This context manages the current game type across the application.
 * It provides:
 * - Current game type state
 * - Game configuration access
 * - Game navigation utilities
 * - Game-specific settings and preferences
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { GameType } from "@/lib/types/core/base";
import { GAME_UI_CONFIGS } from '@/lib/constants/ui/gameConfigs';
import { GAME_ITEMS_MAP } from '@/lib/constants/gameItemsMap';
import { useRouter } from 'next/navigation';
import { 
  GameTypeState, 
  GameTypeContextValue, 
  GameTypeProviderProps 
} from '@/lib/types/contexts/game-type';

// Create context
const GameTypeContext = createContext<GameTypeContextValue | undefined>(undefined);

/**
 * GameType Provider Component
 * מנהל את המשחק הנוכחי ומספק גישה לכל המידע הקשור אליו
 */
export function GameTypeProvider({ children, initialGameType }: GameTypeProviderProps) {
  const router = useRouter();
  
  // State
  const [gameState, setGameState] = useState<GameTypeState>({
    currentGameType: initialGameType || null,
    previousGameType: null,
    gameHistory: initialGameType ? [initialGameType] : [],
  });

  // Set current game type
  const setCurrentGameType = useCallback((gameType: GameType) => {
    setGameState(prev => ({
      currentGameType: gameType,
      previousGameType: prev.currentGameType,
      gameHistory: prev.currentGameType 
        ? [...prev.gameHistory.filter(g => g !== gameType), gameType]
        : [gameType],
    }));
  }, []);

  // Navigate to game
  const navigateToGame = useCallback((gameType: GameType) => {
    setCurrentGameType(gameType);
    router.push(`/games/${gameType}`);
  }, [setCurrentGameType, router]);

  // Go to previous game
  const goToPreviousGame = useCallback(() => {
    if (gameState.previousGameType) {
      navigateToGame(gameState.previousGameType);
    }
  }, [gameState.previousGameType, navigateToGame]);

  // Clear game history
  const clearGameHistory = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameHistory: prev.currentGameType ? [prev.currentGameType] : [],
    }));
  }, []);

  // Check if game is supported
  const isGameSupported = useCallback((gameType: string): boolean => {
    return gameType in GAME_UI_CONFIGS;
  }, []);

  // Get game configuration
  const getGameConfig = useCallback((gameType: GameType) => {
    return GAME_UI_CONFIGS[gameType] || null;
  }, []);

  // Get game items
  const getGameItems = useCallback((gameType: GameType) => {
    return GAME_ITEMS_MAP[gameType] || null;
  }, []);

  // Current game derived values
  const currentGameType = gameState.currentGameType;
  const currentGameConfig = currentGameType ? getGameConfig(currentGameType) : null;
  const currentGameItems = currentGameType ? getGameItems(currentGameType) : null;

  const contextValue: GameTypeContextValue = {
    // State
    gameState,
    
    // Current game info
    currentGameType,
    currentGameConfig,
    currentGameItems,
    
    // Actions
    setCurrentGameType,
    navigateToGame,
    goToPreviousGame,
    clearGameHistory,
    
    // Utilities
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

/**
 * Hook to use GameType context
 * מספק גישה קלה לכל המידע על המשחק הנוכחי
 */
export function useGameType(): GameTypeContextValue {
  const context = useContext(GameTypeContext);
  
  if (context === undefined) {
    throw new Error('useGameType must be used within a GameTypeProvider');
  }
  
  return context;
}

/**
 * Hook to get current game type only
 * גרסה מקוצרת שמחזירה רק את סוג המשחק הנוכחי
 */
export function useCurrentGameType(): GameType | null {
  const { currentGameType } = useGameType();
  return currentGameType;
}

/**
 * Hook to get current game config only
 * גרסה מקוצרת שמחזירה רק את הקונפיגורציה של המשחק הנוכחי
 */
export function useCurrentGameConfig() {
  const { currentGameConfig } = useGameType();
  return currentGameConfig;
}
