/**
 * ===============================================
 * מערכת Hooks DRY למשחקים
 * ===============================================
 * 
 * מערכת חדשה ונקייה ליצירת משחקים עם פחות קוד
 * וקלות תחזוקה וטיפול בבאגים.
 */

// Game State Hooks
export * from './shared/game-state';

// Shared game logic hooks
export { useTimedQuizGame } from './games/useTimedQuizGame';

// Progress & Achievements
export * from './shared/progress';

// Analytics & Performance  
export * from './shared/analytics';

// User & Profile
export * from './shared/user';

// UI & Events
export * from './shared/ui';

// Games Hooks
export { useGenericGame } from "./games/useGenericGame";
