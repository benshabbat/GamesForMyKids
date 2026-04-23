/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי משחקים
 * ===============================================
 */

// ייצוא הטייפים מהקבצים השונים
export * from './base';
export * from './items';
export * from './ui';
export * from './phase';
export * from './shared';

// ייצוא טיפוסי הבסיס מ-core
export type {
  BaseGameItem,
  BaseGameItemLegacy,
  GameType
} from '../core/base';

// הערה: טיפוסים נוספים מוגדרים בקבצים נפרדים לפי עקרון Single Responsibility