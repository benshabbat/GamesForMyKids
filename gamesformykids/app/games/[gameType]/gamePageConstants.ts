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
  'seasons-holidays', 'feelings', 'shopping-money', 'road-safety',
  'birds', 'bugs-insects', 'superheroes', 'art-craft', 'camping', 'fairy-tale-chars',
  'ocean-life', 'garden-plants', 'magic-fairy-tales', 'space-adventure', 'cooking-kitchen', 'circus-show',
  'virtual-reality', 'new-professions', 'advanced-weather', 'advanced-colors', 'jewish-holidays', 'logic-games',
  'sound-imitation', 'body-movements', 'touch-senses', 'emotional-social', 'time-clock', 'climate-planet',
  'flags', 'soccer-logos', 'car-brands', 'world-landmarks', 'solar-system', 'famous-paintings',
  'tech-logos', 'dog-breeds', 'cat-breeds', 'nba-teams', 'exotic-birds', 'butterflies',
  'counting',

  // ── משחקי חידון (QuizGameRouter) ──────────────────────────────────────────
  'riddles', 'capitals', 'fractions', 'spelling',
  'emotions', 'instruments', 'world-languages', 'opposites', 'sports-quiz',
  'geography', 'trivia', 'science', 'continents',
  'israel', 'nature', 'healthy-food', 'family', 'human-body',
  'sequences', 'color-mix', 'clock', 'english-words', 'shapes-3d',
  'transport', 'holidays', 'tzadikim',
] as const;

export type SupportedGameType = typeof SUPPORTED_GAMES[number];

// ─── מיפוי URL → GameType ──────────────────────────────────────────────────────

export const URL_TO_GAME_TYPE_MAP: Record<string, GameType> = {
  smelltaste: 'smells-tastes',
};

// ─── טייפים ───────────────────────────────────────────────────────────────────

export interface GamePageParams {
  gameType: string;
}
