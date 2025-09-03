/**
 * ===============================================
 * טיפוסים כלליים לContexts - Clean Code & SOLID
 * ===============================================
 */

import { ReactNode } from 'react';

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

/**
 * הגדרת סוג משחק ספציפי - עקרון Single Responsibility
 */
export interface SpecificGameTypeConfig {
  readonly gameType: string;
}

/**
 * הגדרת סוג משחק אופציונלי - עקרון Single Responsibility
 */
export interface OptionalGameTypeConfig {
  readonly gameType?: string;
}

/**
 * Props ל-GameType Provider - עקרון Interface Segregation
 */
export interface GameTypeProviderProps extends 
  BaseProviderProps,
  DefaultGameTypeConfig {}

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
  SpecificGameTypeConfig {}

/**
 * Props ל-GameConfig Provider - עקרון Interface Segregation
 */
export interface GameConfigProviderProps extends 
  BaseProviderProps,
  SpecificGameTypeConfig {}
