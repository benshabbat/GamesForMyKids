// ======================================
// Components/Shared Index
// ======================================
// מייצא את כל הקומפוננטים המשותפים

// Universal Game Components moved to game/universal
export { default as UniversalGameNavigation } from '../game/universal/UniversalGameNavigation';

// Main Game Components

export { default as AutoStartScreen } from './AutoStartScreen';
export { UltimateGamePage } from '../game/universal/UltimateGamePage';

// Game UI Components
export { GameCardGrid } from './GameCardGrid';
export { default as GameHeader } from './GameHeader';
export { default as ChallengeBox } from './ChallengeBox';
export { default as CelebrationBox } from './CelebrationBox';
export { default as TipsBox } from './TipsBox';
export { GameHints } from './GameHints';
export { ProgressDisplay } from './ProgressDisplay';
export { GameProgressDisplay } from './GameProgressDisplay';

// Card Components
export { GameCardMap } from './CardPresets';

// Other Shared Components
export { default as BaseGameCard } from './BaseGameCard';
export { default as ButtonCheckAudio } from './ButtonCheckAudio';
export { default as ColoredShapeCard } from './ColoredShapeCard';
export { default as GameInstructions } from './GameInstructions';
export { default as GameItem } from './GameItem';
export { default as GameStartButton } from './GameStartButton';
export { default as GenericBox } from './GenericBox';
export { default as GenericStartScreen } from './GenericStartScreen';
export { default as OptimizedImage } from './OptimizedImage';
export { default as UnifiedCard } from './UnifiedCard';
export { default as UnifiedHeader } from './UnifiedHeader';
