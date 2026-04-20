import type { GameType } from '@/lib/types/core/base';

// ─── רשימת משחקים תומכים ─────────────────────────────────────────────────────

export const SUPPORTED_GAMES = [
  'animals', 'colors', 'fruits', 'vegetables', 'clothing',
  'letters', 'shapes', 'numbers', 'smells-tastes', 'weather',
  'transport', 'vehicles', 'tools', 'space', 'house',
  'instruments', 'professions', 'emotions', 'colored-shapes',
  'sports', 'kitchen', 'body-parts', 'family', 'dinosaurs',
  'world-food', 'recycling', 'medicine', 'nature-sounds',
  'seasons-holidays', 'feelings', 'shopping-money', 'road-safety',
  'birds', 'bugs-insects', 'superheroes', 'art-craft', 'camping', 'fairy-tale-chars',
  'ocean-life', 'garden-plants', 'magic-fairy-tales', 'space-adventure', 'cooking-kitchen', 'circus-show',
  'virtual-reality', 'new-professions', 'advanced-weather', 'advanced-colors', 'jewish-holidays', 'logic-games',
  'sound-imitation', 'body-movements', 'touch-senses', 'emotional-social', 'time-clock', 'climate-planet',
  'flags',
  'soccer-logos',
  'car-brands',
  'world-landmarks',
  'solar-system',
  'famous-paintings',
  'tech-logos',
  'dog-breeds',
  'cat-breeds',
  'nba-teams',
  'exotic-birds',
  'butterflies',
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
