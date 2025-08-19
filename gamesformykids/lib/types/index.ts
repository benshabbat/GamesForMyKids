/**
 * ===============================================
 * ייצוא מרכזי לכל הטיפוסים
 * ===============================================
 */

// טיפוסים בסיסיים
export * from './base';

// טיפוסים למשחקים
export * from './games';
export * from './game.types';
export * from './game-ui.types';

// טיפוסים לממשק המשתמש (רק הישנים לתאימות)
export * from './ui-legacy';
export * from './ui.types';

// טיפוסים לאירועים
export * from './events';

// טיפוסים חדשים מאורגנים (עם שמות מרחב למניעת התנגשויות)
import * as ComponentTypes from './components';
import * as HookTypes from './hooks';
import * as ContextTypes from './contexts';
import * as UtilTypes from './utils';
import * as EventTypes from './events';

export { ComponentTypes, HookTypes, ContextTypes, UtilTypes, EventTypes };
