// ======================================
// Components/Shared Index
// ======================================
// מייצא את כל הקומפוננטים המשותפים

// Universal Game Components moved to game/universal
export { default as UniversalGameNavigation } from '../game/universal/navigation/UniversalGameNavigation';
export { UltimateGamePage } from '../game/universal/ultimate-game/UltimateGamePage';

// Cards
export * from './cards';

// Screens
export * from './screens';

// Buttons
export * from './buttons';

// Displays
export * from './displays';

// Headers
export * from './headers';

// Feedback
export * from './feedback';

// Remaining components
export { default as GameChallengeSection } from './GameChallengeSection';
export { default as GameMainContent } from './GameMainContent';
export { GameCardMap } from './GameCardMap';
