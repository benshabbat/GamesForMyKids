/**
 * ===============================================
 * מפת Hooks למשחקים - אוטומציה מלאה
 * ===============================================
 */

import { useGenericGame } from "@/hooks/games/useGenericGame";
import { GAME_ITEMS_MAP } from "./gameItemsMap";

import { useMathGame } from "@/app/games/math/hooks/useMathGame";
import { useCountingGame } from "@/app/games/counting/useCountingGame";
import type { BaseGameItem } from "@/lib/types/core/base";

type AnyGameHookFn = () => {
  startGame?: () => void | Promise<void>;
  resetGame?: () => void;
  handleItemClick?: (item: BaseGameItem) => void | Promise<void>;
  speakItemName?: (name: string) => void | Promise<void>;
  hints?: unknown[];
  hasMoreHints?: boolean;
  showNextHint?: () => void;
  currentAccuracy?: number;
  progressStats?: unknown;
  [key: string]: unknown;
};

// טיפוס עבור משחקים שתומכים ב-AutoGamePage בלבד
export type AutoGameType =
  | 'animals' | 'colors' | 'fruits' | 'vegetables' | 'clothing'
  | 'letters' | 'shapes' | 'colored-shapes' | 'numbers' | 'smells-tastes' | 'weather'
  | 'transport' | 'vehicles' | 'tools' | 'space' | 'house'
  | 'instruments' | 'professions' | 'emotions' | 'math'
  | 'sports' | 'kitchen' | 'body-parts' | 'family' | 'dinosaurs'
  | 'world-food' | 'recycling' | 'medicine' | 'nature-sounds'
  | 'seasons-holidays' | 'feelings' | 'shopping-money' | 'road-safety'
  | 'ocean-life' | 'garden-plants' | 'magic-fairy-tales'
  | 'space-adventure' | 'cooking-kitchen' | 'circus-show'
  | 'virtual-reality' | 'new-professions' | 'advanced-weather'
  | 'advanced-colors' | 'jewish-holidays' | 'logic-games'
  | 'sound-imitation' | 'body-movements' | 'touch-senses'
  | 'emotional-social' | 'time-clock' | 'climate-planet'
  | 'birds' | 'bugs-insects' | 'superheroes'
  | 'art-craft' | 'camping' | 'fairy-tale-chars'
  | 'flags'
  | 'soccer-logos'
  | 'car-brands'
  | 'world-landmarks'
  | 'solar-system'
  | 'famous-paintings'
  | 'tech-logos'
  | 'dog-breeds'
  | 'cat-breeds'
  | 'nba-teams'
  | 'exotic-birds'
  | 'butterflies'
  | 'counting';

const g = (key: keyof typeof GAME_ITEMS_MAP, type: AutoGameType): AnyGameHookFn =>
  () => useGenericGame(GAME_ITEMS_MAP[key]!, type);

export const GAME_HOOKS_MAP: Record<AutoGameType, AnyGameHookFn> = {
  animals:           g('animals', 'animals'),
  colors:            g('colors', 'colors'),
  fruits:            g('fruits', 'fruits'),
  vegetables:        g('vegetables', 'vegetables'),
  clothing:          g('clothing', 'clothing'),
  letters:           g('letters', 'letters'),
  shapes:            g('shapes', 'shapes'),
  'colored-shapes':  g('colored-shapes', 'colored-shapes'),
  numbers:           g('numbers', 'numbers'),
  'smells-tastes':   g('smells-tastes', 'smells-tastes'),
  weather:           g('weather', 'weather'),
  transport:         g('transport', 'transport'),
  vehicles:          g('vehicles', 'vehicles'),
  tools:             g('tools', 'tools'),
  space:             g('space', 'space'),
  house:             g('house', 'house'),
  instruments:       g('instruments', 'instruments'),
  professions:       g('professions', 'professions'),
  emotions:          g('emotions', 'emotions'),
  sports:            g('sports', 'sports'),
  kitchen:           g('kitchen', 'kitchen'),
  'body-parts':      g('body-parts', 'body-parts'),
  family:            g('family', 'family'),
  dinosaurs:         g('dinosaurs', 'dinosaurs'),
  'world-food':      g('world-food', 'world-food'),
  recycling:         g('recycling', 'recycling'),
  medicine:          g('medicine', 'medicine'),
  'nature-sounds':   g('nature-sounds', 'nature-sounds'),
  'seasons-holidays': g('seasons-holidays', 'seasons-holidays'),
  feelings:          g('feelings', 'feelings'),
  'shopping-money':  g('shopping-money', 'shopping-money'),
  'road-safety':     g('road-safety', 'road-safety'),
  'ocean-life':      g('ocean-life', 'ocean-life'),
  'garden-plants':   g('garden-plants', 'garden-plants'),
  'magic-fairy-tales': g('magic-fairy-tales', 'magic-fairy-tales'),
  'space-adventure': g('space-adventure', 'space-adventure'),
  'cooking-kitchen': g('cooking-kitchen', 'cooking-kitchen'),
  'circus-show':     g('circus-show', 'circus-show'),
  'virtual-reality': g('virtual-reality', 'virtual-reality'),
  'new-professions': g('new-professions', 'new-professions'),
  'advanced-weather': g('advanced-weather', 'advanced-weather'),
  'advanced-colors': g('advanced-colors', 'advanced-colors'),
  'jewish-holidays': g('jewish-holidays', 'jewish-holidays'),
  'logic-games':     g('logic-games', 'logic-games'),
  'sound-imitation': g('sound-imitation', 'sound-imitation'),
  'body-movements':  g('body-movements', 'body-movements'),
  'touch-senses':    g('touch-senses', 'touch-senses'),
  'emotional-social': g('emotional-social', 'emotional-social'),
  'time-clock':      g('time-clock', 'time-clock'),
  'climate-planet':  g('climate-planet', 'climate-planet'),
  birds:             g('birds', 'birds'),
  'bugs-insects':    g('bugs-insects', 'bugs-insects'),
  superheroes:       g('superheroes', 'superheroes'),
  'art-craft':       g('art-craft', 'art-craft'),
  camping:           g('camping', 'camping'),
  'fairy-tale-chars': g('fairy-tale-chars', 'fairy-tale-chars'),
  flags:             g('flags', 'flags'),
  'soccer-logos':    g('soccer-logos', 'soccer-logos'),
  'car-brands':      g('car-brands', 'car-brands'),
  'world-landmarks': g('world-landmarks', 'world-landmarks'),
  'solar-system':    g('solar-system', 'solar-system'),
  'famous-paintings': g('famous-paintings', 'famous-paintings'),
  'tech-logos':      g('tech-logos', 'tech-logos'),
  'dog-breeds':      g('dog-breeds', 'dog-breeds'),
  'cat-breeds':      g('cat-breeds', 'cat-breeds'),
  'nba-teams':       g('nba-teams', 'nba-teams'),
  'exotic-birds':    g('exotic-birds', 'exotic-birds'),
  butterflies:       g('butterflies', 'butterflies'),
  counting:          useCountingGame,
  math:              useMathGame,
};

export type GameHookType = AnyGameHookFn;
