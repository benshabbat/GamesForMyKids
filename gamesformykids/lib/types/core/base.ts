/**
 * ===============================================
 * טיפוסים בסיסיים למערכת המשחקים
 * ===============================================
 */

import { ReactNode } from 'react';

interface Identifiable<TId = string> {
  readonly id: TId;
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
  funFact?: string; // עובדה מעניינת להצגה אחרי תשובה נכונה
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
  // Core learning games
  | 'colors' | 'letters' | 'shapes' | 'colored-shapes' | 'numbers'
  | 'fruits' | 'animals' | 'weather' | 'transport' | 'vegetables'
  | 'instruments' | 'space' | 'clothing' | 'smells-tastes' | 'house'
  | 'tools' | 'professions' | 'emotions' | 'vehicles'
  // Math & counting
  | 'counting' | 'math' | 'arithmetic' | 'multiplication' | 'emoji-math'
  | 'math-race' | 'number-bubbles' | 'skip-counting' | 'division'
  // Memory & puzzle
  | 'memory' | 'bubbles' | 'puzzles' | 'building' | 'tetris'
  | 'drawing' | 'coloring'
  // Expanded topic games
  | 'sports' | 'kitchen' | 'body-parts' | 'family' | 'dinosaurs'
  | 'world-food' | 'recycling' | 'medicine' | 'nature-sounds'
  | 'seasons-holidays' | 'shopping-money' | 'road-safety'
  | 'ocean-life' | 'garden-plants' | 'magic-fairy-tales'
  | 'circus-show'
  | 'virtual-reality' | 'new-professions' | 'advanced-weather'
  | 'advanced-colors' | 'jewish-holidays' | 'logic-games'
  | 'sound-imitation' | 'body-movements' | 'touch-senses'
  | 'emotional-social' | 'time-clock' | 'climate-planet'
  | 'birds' | 'bugs-insects' | 'superheroes' | 'art-craft'
  | 'camping' | 'fairy-tale-chars'
  // Geography & world
  | 'flags' | 'car-brands' | 'world-landmarks' | 'solar-system'
  | 'famous-paintings' | 'tech-logos' | 'dog-breeds' | 'cat-breeds'
  | 'nba-teams' | 'exotic-birds' | 'butterflies' | 'soccer-logos'
  // Quiz & educational
  | 'riddles' | 'capitals' | 'fractions' | 'spelling' | 'world-languages'
  | 'opposites' | 'sports-quiz' | 'trivia' | 'science'
  | 'continents' | 'israel' | 'nature' | 'healthy-food' | 'human-body'
  | 'sequences' | 'color-mix' | 'clock' | 'english-words' | 'shapes-3d'
  | 'holidays' | 'tzadikim' | 'life-cycles' | 'nikud'
  | 'days-of-week' | 'months-of-year'
  | 'geography-capitals' | 'geography-flags' | 'geography-continents'
  | 'singular-plural' | 'morning-routine'
  | 'ordinals'
  | 'phonics'
  | 'rhyming' | 'adjectives' | 'verbs'
  | 'spatial-concepts' | 'number-words'
  | 'visual-opposites' | 'english-cards'
  | 'gender' | 'final-letters' | 'alphabet-order'
  | 'personal-safety'
  | 'visual-addition'
  | 'gematria'
  // Arcade & action games
  | 'maze'
  | 'true-false' | 'flappy-bird' | 'snake' | 'pong' | 'frogger'
  | 'dino-runner' | 'brick-breaker' | 'balloon-pop' | 'catch-fruit'
  | 'whack-a-mole' | 'meteor-dodge' | 'space-defender' | 'reflex'
  | 'color-tap' | 'simon' | 'stack' | 'jumper'
  // Board & strategy games
  | 'chess' | 'checkers' | 'shesh-besh' | 'taki' | 'soccer'
  // Word games
  | 'word-builder' | 'word-scramble' | 'word-chain'
  // Special games
  | 'hebrew-letters' | 'tzedakah' | 'letter-defender'
  // Logic & patterns
  | 'sorting' | 'patterns';
