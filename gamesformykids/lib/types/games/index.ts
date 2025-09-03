/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי משחקים
 * ===============================================
 */

// ייצוא הטייפים מהקבצים השונים
export * from './base';
export * from './items';
export * from './ui';

// ייצוא לתאימות לאחור - משתמש בגרסה הישנה שלא דורשת id
export type {
  BaseGameItemLegacy as BaseGameItem,
  BaseGameItem as BaseGameItemWithId,
  GameType
} from '../core/base';

// הערה: טיפוסים נוספים מוגדרים בקבצים נפרדים לפי עקרון Single Responsibility
// הערה: טיפוסים נוספים מוגדרים בקבצים נפרדים לפי עקרון Single Responsibility