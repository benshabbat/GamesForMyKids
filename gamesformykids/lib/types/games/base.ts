/**
 * ===============================================
 * Game Base Types - Clean Code & SOLID
 * ===============================================
 */

import type { ComponentType } from 'react';

/**
 * רישום משחק בסיסי - עקרון Single Responsibility
 */
interface GameRegistrationBase {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

/**
 * מאפיינים ויזואליים למשחק - עקרון Single Responsibility
 */
interface GameVisuals {
  readonly color: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly emoji?: string;
}

/**
 * זמינות משחק - עקרון Single Responsibility
 */
interface GameAvailability {
  readonly available: boolean;
}

/**
 * רישום משחק מלא - עקרון Interface Segregation
 */
export interface GameRegistration extends 
  GameRegistrationBase,
  GameVisuals,
  GameAvailability {}

/**
 * מידע בסיסי לקטגוריה - עקרון Single Responsibility
 */
interface CategoryInfo {
  readonly title: string;
  readonly description: string;
}

/**
 * מאפיינים ויזואליים לקטגוריה - עקרון Single Responsibility
 */
interface CategoryVisuals {
  readonly icon: ComponentType<{ size?: number; className?: string }>;
  readonly gradient: string;
}

/**
 * משחקים בקטגוריה - עקרון Single Responsibility
 */
interface CategoryGames {
  readonly gameIds: ReadonlyArray<string>;
}

/**
 * קטגוריה מלאה - עקרון Interface Segregation
 */
export interface Category extends 
  CategoryInfo,
  CategoryVisuals,
  CategoryGames {}

/**
 * רמות קושי - עקרון Open/Closed
 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
