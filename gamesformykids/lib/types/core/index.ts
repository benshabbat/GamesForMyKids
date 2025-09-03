/**
 * ===============================================
 * טיפוסים בסיסיים - Core Types
 * ===============================================
 */

/**
 * ===============================================
 * ייצוא מרכזי לטיפוסים בסיסיים
 * ===============================================
 */

// טיפוסים בסיסיים
export * from './base';

// מחלקות אבסטרקטיות ופאטרנים (עם ייצוא מפורש)
export { BaseEntity, BaseGame } from './abstracts';

export type {
  GameStateManager,
  EventManager,
  ScoreCalculator,
  ScoreParams,
  BonusParams,
  Observer,
  Subject,
  GameStrategy,
  GameFactory,
  // ייצוא עם שם חדש למניעת קונפליקט
  Identifiable as AbstractIdentifiable,
  Serializable,
  Validatable,
  Timestamped
} from './abstracts';

// Functional Programming Types
export type * from './functional';
