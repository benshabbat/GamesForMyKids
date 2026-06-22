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
  hebrewNikud?: string; // טקסט עברי עם ניקוד (לילדים בגיל K-2)
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
  | 'sorting' | 'patterns' | 'visual-logic'
  // Story games
  | 'puppet-story'
  // Language & wisdom
  | 'proverbs'
  // Money & economy
  | 'coins-match'
  // Jewish tradition
  | 'blessings'
  // Number games
  | 'number-slide'
  // Math story problems
  | 'math-stories'
  // Board games
  | 'snakes-ladders'
  // Story & creative games
  | 'story-builder'
  // Escape & adventure games
  | 'escape-room'
  // Coding & logic games
  | 'robot-coder'
  // Hidden object games
  | 'find-in-scene'
  // Word puzzle games
  | 'hangman'
  // Interactive story games
  | 'choose-adventure'
  // Visual dictionary
  | 'picture-dictionary'

  // Word search games
  | 'word-search'

  // Interactive map
  | 'israel-map'

  // Music & songs
  | 'kids-songs'
  // Music & creativity
  | 'melody-maker'
  // Kids encyclopedia
  | 'kids-encyclopedia'
  // Fun tools
  | 'age-calculator'
  // Craft guide
  | 'craft-guide'
  // Jokes browser
  | 'jokes-browser'
  // Word maze
  | 'word-maze'
  // Progressive riddles
  | 'riddles-pro'
  // Categorised trivia with difficulty picker
  | 'trivia-categories'
  // Hebrew avatar character builder
  | 'avatar-maker'
  // Identify Hebrew sounds game
  | 'sound-quiz'
  // Educational spinning wheel
  | 'spinner'
  // Random team picker classroom tool
  | 'team-picker'
  // Digital dice roller classroom tool
  | 'dice'
  // Classroom countdown timer
  | 'timer'
  // Hebrew first-letter racing game
  | 'letter-race'
  // City builder quiz game
  | 'city-builder'
  // Drag-and-drop sorting game
  | 'drag-sort'
  // Hebrew spin-the-wheel first-letter quiz
  | 'word-wheel'
  // Answer cannon — aim and shoot the correct answer bubble
  | 'answer-cannon'
  // Hebrew typing speed game
  | 'typing-race'
  // Word fishing — catch the correct fish by animal characteristic
  | 'word-fishing'
  // Letter grow — catch falling letters to evolve them into words
  | 'letter-grow'
  // Letter slingshot — physics puzzle: aim at the box with the matching word
  | 'letter-slingshot'
  // Syllable drums — tap the beat for each Hebrew letter in a word
  | 'syllable-drums'
  // Dress-up — clothe the character with Hebrew vocabulary items
  | 'dress-up'
  // Letter bubble shooter — shoot letter bubbles to match 3+
  | 'letter-bubble-shooter'
  // Letter slicer — tap flying Hebrew word bubbles to slice the target
  | 'letter-slicer'
  // Cooking game — follow Hebrew recipe steps, tap correct ingredients
  | 'cooking-game'
  // Spot the difference — find 5 differences between two emoji scenes
  | 'spot-the-difference';
