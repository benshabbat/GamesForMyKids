import type { GameType } from '@/lib/types/core/base';

// ─── רשימת משחקים תומכים ─────────────────────────────────────────────────────

export const SUPPORTED_GAMES = [
  // ── משחקי כרטיסים (UltimateGamePage) ──────────────────────────────────────
  'animals', 'colors', 'fruits', 'vegetables', 'clothing',
  'letters', 'shapes', 'numbers', 'smells-tastes', 'weather',
  'vehicles', 'tools', 'space', 'house',
  'professions', 'math', 'colored-shapes',
  'sports', 'kitchen', 'body-parts', 'dinosaurs',
  'world-food', 'recycling', 'medicine', 'nature-sounds',
  'seasons-holidays', 'shopping-money', 'road-safety',
  'birds', 'bugs-insects', 'superheroes', 'art-craft', 'camping', 'fairy-tale-chars',
  'ocean-life', 'garden-plants', 'magic-fairy-tales', 'circus-show',
  'virtual-reality', 'new-professions', 'advanced-weather', 'advanced-colors', 'jewish-holidays', 'logic-games',
  'sound-imitation', 'body-movements', 'touch-senses', 'emotional-social', 'time-clock', 'climate-planet',
  'flags', 'soccer-logos', 'car-brands', 'world-landmarks', 'solar-system', 'famous-paintings',
  'tech-logos', 'dog-breeds', 'cat-breeds', 'nba-teams', 'exotic-birds', 'butterflies',
  'counting',
  'days-of-week', 'months-of-year',
  'geography-flags', 'geography-capitals', 'geography-continents',
  'ordinals',
  'spatial-concepts', 'number-words',
  'visual-opposites', 'english-cards',
  'coins-match',

  // ── משחקים מותאמים (CustomGameRenderer) ──────────────────────────────────
  'arithmetic', 'balloon-pop', 'brick-breaker', 'bubbles', 'building',
  'catch-fruit', 'checkers', 'chess', 'color-tap', 'coloring', 'dino-runner',
  'drawing', 'emoji-math', 'flappy-bird', 'frogger', 'hebrew-letters', 'jumper',
  'math-race', 'memory', 'meteor-dodge', 'multiplication', 'number-bubbles', 'pong',
  'puzzles', 'reflex', 'shesh-besh', 'simon', 'snake', 'space-defender',
  'stack', 'taki', 'tetris', 'true-false', 'tzedakah', 'whack-a-mole',
  'word-builder', 'word-scramble', 'snakes-ladders',

  // ── משחקי חידון (QuizGameRouter) ──────────────────────────────────────────
  'riddles', 'capitals', 'fractions', 'spelling',
  'emotions', 'instruments', 'world-languages', 'opposites', 'sports-quiz',
  'trivia', 'science', 'continents',
  'israel', 'nature', 'healthy-food', 'family', 'human-body',
  'sequences', 'color-mix', 'clock', 'english-words', 'shapes-3d',
  'transport', 'holidays', 'tzadikim',
  'singular-plural', 'morning-routine',
  'phonics',
  'rhyming', 'adjectives',
  'verbs',
  'soccer',
  'sorting', 'patterns',
  'skip-counting',
  'life-cycles',
  'maze',
  'nikud',
  'division',
  // New language & safety games
  'gender', 'final-letters', 'alphabet-order',
  'personal-safety',
  'visual-addition',
  'gematria',
  'word-chain',
  'letter-defender',
  'visual-logic',
  'puppet-story',
  'proverbs',
  'blessings',
  'number-slide',
  'math-stories',
  'story-builder',
  'escape-room',
  'robot-coder',
  'find-in-scene',
  'hangman',
  'choose-adventure',
  'picture-dictionary',

  'word-search',

  'israel-map',

  'kids-songs',
  'melody-maker',
  'kids-encyclopedia',
  'age-calculator',
  'craft-guide',
  'jokes-browser',
  'word-maze',
  'riddles-pro',
  'trivia-categories',
  'avatar-maker',
  'sound-quiz',
  'spinner',
  'team-picker',
  'dice',
  'timer',
  'letter-race',
  'city-builder',
  'drag-sort',
  'word-wheel',
  'answer-cannon',
  'typing-race',
  'word-fishing',
  'letter-grow',
  'letter-slingshot',
  'syllable-drums',
] as const;

export type SupportedGameType = typeof SUPPORTED_GAMES[number];

export const CUSTOM_GAME_TYPES = new Set([
  'arithmetic', 'balloon-pop', 'brick-breaker', 'bubbles', 'building',
  'catch-fruit', 'checkers', 'chess', 'color-tap', 'coloring', 'dino-runner',
  'drawing', 'emoji-math', 'flappy-bird', 'frogger', 'hebrew-letters', 'jumper',
  'math-race', 'memory', 'meteor-dodge', 'multiplication', 'number-bubbles', 'pong',
  'puzzles', 'reflex', 'shesh-besh', 'simon', 'snake', 'space-defender',
  'stack', 'taki', 'tetris', 'true-false', 'tzedakah', 'whack-a-mole',
  'word-builder', 'word-scramble', 'maze', 'letter-defender', 'puppet-story', 'number-slide', 'snakes-ladders',


  'escape-room', 'robot-coder', 'find-in-scene', 'hangman', 'choose-adventure', 'picture-dictionary', 'word-search', 'israel-map', 'kids-songs', 'melody-maker', 'kids-encyclopedia', 'age-calculator', 'craft-guide', 'jokes-browser', 'word-maze', 'avatar-maker', 'sound-quiz', 'spinner', 'team-picker', 'dice', 'timer', 'letter-race', 'drag-sort', 'answer-cannon', 'typing-race', 'word-fishing', 'letter-grow', 'letter-slingshot', 'syllable-drums',
  
  
]);

// ─── מיפוי URL → GameType ──────────────────────────────────────────────────────

export const URL_TO_GAME_TYPE_MAP: Record<string, GameType> = {
  smelltaste: 'smells-tastes',
};

// ─── טייפים ───────────────────────────────────────────────────────────────────

export interface GamePageParams {
  gameType: string;
}
