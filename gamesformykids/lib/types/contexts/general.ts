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

/**
 * הגדרת סוג משחק ספציפי - עקרון DRY, שימוש ב-GameTyped
 */
export interface SpecificGameTypeConfig extends GameTyped {}

/**
 * Props ל-Universal Game Provider - עקרון Interface Segregation
 */
export interface UniversalGameProviderProps extends 
  BaseProviderProps,
  DefaultGameTypeConfig {}

/**
 * Props ל-Simple Game Progress Provider - עקרון Interface Segregation
 */
export interface SimpleGameProgressProviderProps extends 
  BaseProviderProps,
  SpecificGameTypeConfig {}

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
