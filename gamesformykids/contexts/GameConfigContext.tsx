'use client';

/**
 * ===============================================
 * GameConfig Context - הקונטקסט הכולל למשחק 🎯
 * ===============================================
 * 
 * מכיל את כל הקונפיגורציות הדרושות למשחק:
 * - UI Configuration
 * - Game Items  
 * - Game Hooks
 * - Card Components
 * 
 * מחליף את כל ה-imports ב-AutoGamePage!
 */

import { createContext, useContext, useMemo, ReactNode } from 'react';
import { GameType, BaseGameItem } from "@/lib/types/base";
import { GAME_UI_CONFIGS, GameUIConfig } from "@/lib/constants/ui/gameConfigs";
import { GAME_HOOKS_MAP, AutoGameType } from "@/lib/constants/gameHooksMap";
import { GAME_ITEMS_MAP } from "@/lib/constants/gameItemsMap";
import { GameCardMap } from "@/components/shared/CardPresets";
import { useGameType } from './GameTypeContext';

// Types
interface GameCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
}

export interface GameConfigContextValue {
  // Current game info
  gameType: AutoGameType | GameType | null;
  config: GameUIConfig | null;
  items: BaseGameItem[] | null;
  CardComponent: React.ComponentType<GameCardProps> | null;
  useGameHook: unknown | null;
  
  // Validation
  isSupported: boolean;
  isReady: boolean;
  
  // Error handling
  error: string | null;
}

// Create context
const GameConfigContext = createContext<GameConfigContextValue | undefined>(undefined);

// Provider Props
interface GameConfigProviderProps {
  children: ReactNode;
  gameType?: AutoGameType | GameType;
}

/**
 * 🎯 GameConfig Provider - מספק את כל הקונפיגורציה למשחק
 */
export function GameConfigProvider({ children, gameType: propGameType }: GameConfigProviderProps) {
  const { currentGameType } = useGameType();
  
  // הגדרת סוג המשחק - מ-props או מהקונטקסט
  const gameType = propGameType || currentGameType;
  
  const contextValue = useMemo((): GameConfigContextValue => {
    // אם אין סוג משחק
    if (!gameType) {
      return {
        gameType: null,
        config: null,
        items: null,
        CardComponent: null,
        useGameHook: null,
        isSupported: false,
        isReady: false,
        error: null,
      };
    }

    try {
      // קבלת כל הקונפיגורציות
      const config = GAME_UI_CONFIGS[gameType];
      const useGameHook = GAME_HOOKS_MAP[gameType as AutoGameType];
      const items = GAME_ITEMS_MAP[gameType] as BaseGameItem[];
      const CardComponent = GameCardMap[gameType];
      
      // בדיקות תקינות
      const hasConfig = !!config;
      const hasHook = !!useGameHook;
      const hasItems = !!(items && items.length > 0);
      const hasComponent = !!CardComponent;
      
      const isSupported = hasConfig && hasHook && hasItems && hasComponent;
      const isReady = isSupported;
      
      let error: string | null = null;
      if (!config) error = `Config not found for game type: ${gameType}`;
      else if (!useGameHook) error = `Hook not found for game type: ${gameType}`;
      else if (!items) error = `Items not found for game type: ${gameType}`;
      else if (!CardComponent) error = `Card component not found for game type: ${gameType}`;

      return {
        gameType,
        config,
        items,
        CardComponent,
        useGameHook,
        isSupported,
        isReady,
        error,
      };
    } catch (err) {
      return {
        gameType,
        config: null,
        items: null,
        CardComponent: null,
        useGameHook: null,
        isSupported: false,
        isReady: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }, [gameType]);

  return (
    <GameConfigContext.Provider value={contextValue}>
      {children}
    </GameConfigContext.Provider>
  );
}

/**
 * 🎮 Hook לשימוש בקונפיגורציה של המשחק
 */
export function useGameConfig(): GameConfigContextValue {
  const context = useContext(GameConfigContext);
  
  if (context === undefined) {
    throw new Error('useGameConfig must be used within a GameConfigProvider');
  }
  
  return context;
}

/**
 * 🎯 Hook מותאם עבור AutoGamePage
 * מחזיר את כל מה שצריך במקום אחד
 */
export function useAutoGameConfig(gameType: AutoGameType | GameType) {
  const { 
    config, 
    items, 
    CardComponent, 
    isReady, 
    error 
  } = useGameConfig();
  
  // אם המשחק לא נתמך
  if (!isReady || error) {
    throw new Error(error || `Game type ${gameType} is not supported by AutoGamePage`);
  }
  
  // הפעלת ה-hook עם טיפוס המתאים
  const gameHook = GAME_HOOKS_MAP[gameType as AutoGameType];
  if (!gameHook) {
    throw new Error(`Game hook not found for ${gameType}`);
  }
  
  return {
    config: config!,
    items: items!,
    CardComponent: CardComponent!,
    useGameHook: gameHook,
  };
}

/**
 * 🎨 Hook לקבלת UI Configuration בלבד
 */
export function useGameUIConfig(): GameUIConfig | null {
  const { config } = useGameConfig();
  return config;
}

/**
 * 🎯 Hook לקבלת Game Items בלבד
 */
export function useGameItems(): BaseGameItem[] | null {
  const { items } = useGameConfig();
  return items;
}

/**
 * 🃏 Hook לקבלת Card Component בלבד
 */
export function useGameCardComponent(): React.ComponentType<GameCardProps> | null {
  const { CardComponent } = useGameConfig();
  return CardComponent;
}
