/**
 * ===============================================
 * Game Base Types - Clean Code & SOLID
 * ===============================================
 */

import type { ComponentType } from 'react';

/**
 * רישום משחק בסיסי - עקרון Single Responsibility
 */
export interface GameRegistrationBase {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

/**
 * מאפיינים ויזואליים למשחק - עקרון Single Responsibility
 */
export interface GameVisuals {
  readonly color: string;
  readonly icon: ComponentType<{ className?: string }>;
}

/**
 * זמינות משחק - עקרון Single Responsibility
 */
export interface GameAvailability {
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
export interface CategoryInfo {
  readonly title: string;
  readonly description: string;
}

/**
 * מאפיינים ויזואליים לקטגוריה - עקרון Single Responsibility
 */
export interface CategoryVisuals {
  readonly icon: ComponentType<{ size?: number }>;
  readonly gradient: string;
}

/**
 * משחקים בקטגוריה - עקרון Single Responsibility
 */
export interface CategoryGames {
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
 * מידע בסיסי לקבוצת גיל - עקרון Single Responsibility
 */
export interface AgeGroupInfo {
  readonly title: string;
  readonly icon: string;
  readonly description: string;
}

/**
 * משחקים מומלצים לקבוצת גיל - עקרון Single Responsibility
 */
export interface AgeGroupRecommendations {
  readonly recommendedGames: ReadonlyArray<GameRegistration>;
}

/**
 * קבוצת גיל מלאה - עקרון Interface Segregation
 */
export interface AgeGroup extends 
  AgeGroupInfo,
  AgeGroupRecommendations {}

/**
 * רמות קושי - עקרון Open/Closed
 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/**
 * מידע אתגר במשחק - עקרון Single Responsibility
 */
export interface ChallengeInfo {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

/**
 * מאפיינים לאתגר - עקרון Single Responsibility
 */
export interface ChallengeProperties {
  readonly difficulty: DifficultyLevel;
  readonly points: number;
}

/**
 * מצב אתגר - עקרון Single Responsibility
 */
export interface ChallengeState {
  readonly completed: boolean;
}

/**
 * אתגר במשחק - עקרון Interface Segregation
 */
export interface GameChallenge extends 
  ChallengeInfo,
  ChallengeProperties,
  ChallengeState {}

/**
 * סטטיסטיקות בסיסיות - עקרון Single Responsibility
 */
export interface BasicGameStats {
  readonly totalPlayed: number;
  readonly totalWins: number;
}

/**
 * סטטיסטיקות ניקוד - עקרון Single Responsibility
 */
export interface ScoreStats {
  readonly bestScore: number;
  readonly averageScore: number;
}

/**
 * סטטיסטיקות זמן - עקרון Single Responsibility
 */
export interface TimeStats {
  readonly totalTime: number;
}

/**
 * סטטיסטיקות משחק מלאות - עקרון Interface Segregation
 */
export interface GameStats extends 
  BasicGameStats,
  ScoreStats,
  TimeStats {}
