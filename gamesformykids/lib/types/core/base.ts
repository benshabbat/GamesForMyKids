/**
 * ===============================================
 * טיפוסים בסיסיים למערכת המשחקים
 * ===============================================
 */

import { ReactNode } from 'react';
import type { DifficultyLevel } from '../games/base';

interface Identifiable<TId = string> {
  readonly id: TId;
}

/**
 * שם בסיסי - עקרון Single Responsibility  
 */
interface Nameable {
  readonly name: string;
}

/**
 * מאפיינים בסיסיים עם כותרת ותיאור - עקרון DRY
 */
interface TitledEntity {
  readonly title: string;
  readonly description?: string;
}

/**
 * זיהוי סוג משחק - עקרון DRY
 */
interface GameTyped {
  readonly gameType: string;
}

/**
 * ממשק לניהול modal התקדמות - עקרון DRY
 */
interface ProgressModalState {
  readonly showProgressModal: boolean;
  readonly setShowProgressModal: (show: boolean) => void;
}

/**
 * תרגום רב-לשוני - עקרון Single Responsibility
 */
interface Translatable {
  readonly hebrew: string;
  readonly english: string;
  readonly plural?: string;
}

/**
 * מאפיינים ויזואליים - עקרון Single Responsibility
 */
interface Visualizable {
  readonly emoji: string;
  readonly color: string;
}

/**
 * מאפיינים קוליים - עקרון Single Responsibility
 */
interface Audioable {
  readonly sound?: number[];
}

/**
 * טייפ לנתוני משחקים ללא ID - לתמיכה בקבצי קבועים קיימים
 * SOLID Principle: Single Responsibility - אחראי רק על נתוני פריט בסיסיים ללא מזהה
 */
interface GameDataItem {
  readonly name: string;
  readonly hebrew: string;
  readonly english: string;
  readonly emoji?: string;
  readonly color?: string;
  readonly sound?: number[];
}

// טייפ בסיס לנתוני פריטי משחק
export type BaseGameItem = GameDataItem & { 
  id?: string;
  svg?: string; // לצורות
  digit?: string; // למספרים
  shape?: string; // לצורות צבועות
  colorName?: string; // לצורות צבועות
  svgPath?: string; // לצורות צבועות
  plural?: string; // לרבים
};

/**
 * מצב אתגר משחק בסיסי - עקרון Single Responsibility
 * מכיל רק מידע על מצב נוכחי
 */
interface GameChallengeState<T extends BaseGameItem = BaseGameItem> {
  readonly currentChallenge: T | null;
  readonly options: T[];
}

/**
 * מצב משחק עם ניקוד - עקרון Single Responsibility
 */
interface GameScoreState {
  readonly score: number;
  readonly level: number;
}

/**
 * מצב משחק עם סטטוס - עקרון Single Responsibility
 */
interface GamePlayState {
  readonly isPlaying: boolean;
  readonly showCelebration: boolean;
}

/**
 * מצב משחק מלא - עקרון Interface Segregation
 * יורש מכל הממשקים הנדרשים
 */
export interface BaseGameState<T extends BaseGameItem = BaseGameItem> extends 
  GameChallengeState<T>,
  GameScoreState,
  GamePlayState {}

/**
 * מאפיינים בסיסיים למשחק - עקרון Single Responsibility
 */
interface GameBasicInfo extends Identifiable, Translatable {
  readonly description: string;
  readonly href: string;
}

/**
 * מאפיינים ויזואליים למשחק - עקרון Single Responsibility
 */
interface GameVisualInfo {
  readonly icon: ReactNode;
  readonly color: string;
}

/**
 * משחק ברשימת המשחקים - עקרון Interface Segregation
 */
export interface Game extends 
  GameBasicInfo,
  GameVisualInfo {
  readonly available: boolean;
}

/**
 * מצב כרטיס זיכרון - עקרון Single Responsibility
 */
interface CardState {
  readonly isFlipped: boolean;
  readonly isMatched: boolean;
}

/**
 * מידע כרטיס זיכרון - עקרון Single Responsibility
 */
interface CardInfo {
  readonly id: number;
  readonly emoji: string;
}

/**
 * כרטיס זיכרון מלא - עקרון Interface Segregation
 */
export interface Card extends CardInfo, CardState {}

/**
 * טיפוסי משחקים נתמכים
 */
export type GameType = 
  | 'colors'
  | 'letters'
  | 'shapes'
  | 'colored-shapes'
  | 'numbers'
  | 'fruits'
  | 'animals'
  | 'weather'
  | 'transport'
  | 'vegetables'
  | 'instruments'
  | 'space'
  | 'clothing'
  | 'smells-tastes'
  | 'house'
  | 'tools'
  | 'counting'
  | 'math'
  | 'memory'
  | 'professions'
  | 'vehicles'
  | 'emotions'
  | 'bubbles'
  | 'puzzles'
  | 'building'
  | 'tetris'
  // משחקים חדשים
  | 'sports'
  | 'kitchen'
  | 'body-parts'
  | 'family'
  | 'dinosaurs'
  // משחקים נוספים חדשים
  | 'world-food'
  | 'recycling'
  | 'medicine'
  | 'nature-sounds'
  | 'seasons-holidays'
  | 'feelings'
  | 'shopping-money'
  | 'road-safety'
  // 6 משחקים חדשים נוספים
  | 'ocean-life'
  | 'garden-plants'
  | 'magic-fairy-tales'
  | 'space-adventure'
  | 'cooking-kitchen'
  | 'circus-show'
  // 6 משחקים חדשים נוספים 2
  | 'virtual-reality'
  | 'new-professions'
  | 'advanced-weather'
  | 'advanced-colors'
  | 'jewish-holidays'
  | 'logic-games'
  // 6 משחקים חדשניים יוצאי דופן
  | 'sound-imitation'
  | 'body-movements'
  | 'touch-senses'
  | 'emotional-social'
  | 'time-clock'
  | 'climate-planet'
  // 6 משחקים כיפיים חדשים
  | 'birds'
  | 'bugs-insects'
  | 'superheroes'
  | 'art-craft'
  | 'camping'
  | 'fairy-tale-chars'
  // משחקי גיאוגרפיה
  | 'flags'
  // משחקי ספורט
  | 'soccer-logos'
  // משחקי תחבורה וסמלים
  | 'car-brands'
  | 'world-landmarks'
  // משחקי מדע ותרבות
  | 'solar-system'
  | 'famous-paintings'
  // משחקי לוגואים וחיות
  | 'tech-logos'
  | 'dog-breeds'
  | 'cat-breeds'
  | 'nba-teams'
  // משחקי טבע וחרקים
  | 'exotic-birds'
  | 'butterflies'
  // משחקי חידון (quiz)
  | 'riddles'
  | 'capitals'
  | 'fractions'
  | 'spelling'
  | 'world-languages'
  | 'opposites'
  | 'sports-quiz'
  | 'geography'
  | 'trivia'
  | 'science'
  | 'continents'
  | 'israel'
  | 'nature'
  | 'healthy-food'
  | 'human-body'
  | 'sequences'
  | 'color-mix'
  | 'clock'
  | 'english-words'
  | 'shapes-3d'
  | 'holidays'
  | 'tzadikim';
