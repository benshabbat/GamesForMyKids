/**
 * ===============================================
 * טיפוסים כלליים לContexts - Clean Code & SOLID
 * ===============================================
 */

import { ReactNode } from 'react';
import type { GameTyped } from '../core/base';

/**
 * Props בסיסיים לProvider - עקרון Single Responsibility
 */
export interface BaseProviderProps {
  readonly children: ReactNode;
}

/**
 * הגדרות בסיסיות למשחק - עקרון Single Responsibility
 */
export interface DefaultGameTypeConfig {
  readonly defaultGameType?: string;
}

// הוסר SpecificGameTypeConfig - השתמש ישירות ב-GameTyped עקרון DRY

// הערה: UniversalGameProviderProps מוגדר ב-contexts/universal-game.ts
// הערה: SimpleGameProgressProviderProps מוגדר ב-contexts/simple-game-progress.ts

/**
 * הגדרת סוג משחק אופציונלי - עקרון Single Responsibility
 */
export interface OptionalGameTypeConfig {
  readonly gameType?: string;
}

/**
 * Props ל-GameProgress Provider - עקרון Interface Segregation
 */
export interface GameProgressProviderProps extends 
  BaseProviderProps,
  OptionalGameTypeConfig {}

/**
 * Props ל-GameLogic Provider - עקרון Interface Segregation
 */
export interface GameLogicProviderProps extends 
  BaseProviderProps,
  GameTyped {}

// הערה: GameTypeProviderProps מוגדר ב-contexts/game-type.ts
// הערה: GameConfigProviderProps מוגדר ב-contexts/game-config.ts
