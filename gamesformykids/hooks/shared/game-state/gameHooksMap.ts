/**
 * ===============================================
 * מפת Hooks למשחקים - אוטומציה מלאה
 * ===============================================
 */

import { useGenericGame } from "@/hooks/games/useGenericGame";
import { useGameTypeStore } from "@/lib/stores/gameTypeStore";
import { useMathGame } from "@/app/games/math/hooks/useMathGame";
import { useCountingGame } from "@/app/games/counting/useCountingGame";
import { useNatureSoundsGame } from "@/app/games/nature-sounds/useNatureSoundsGame";
import { useGeographyCapitalsGame } from "@/hooks/games/useGeographyCapitalsGame";
import { useGeographyContinentsGame } from "@/hooks/games/useGeographyContinentsGame";
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
  | 'counting'
  | 'days-of-week'
  | 'months-of-year'
  | 'ordinals'
  | 'spatial-concepts'
  | 'number-words'
  | 'geography-flags'
  | 'geography-capitals'
  | 'geography-continents'
  | 'visual-opposites'
  | 'english-cards';

// Reads items from the store at hook-call time — no static game data imported here.
const g = (type: AutoGameType): AnyGameHookFn =>
  () => {
    const items = useGameTypeStore((s) => s.gameItems) as BaseGameItem[];
    return useGenericGame(items ?? [], type);
  };

export const GAME_HOOKS_MAP: Record<AutoGameType, AnyGameHookFn> = {
  animals:            g('animals'),
  colors:             g('colors'),
  fruits:             g('fruits'),
  vegetables:         g('vegetables'),
  clothing:           g('clothing'),
  letters:            g('letters'),
  shapes:             g('shapes'),
  'colored-shapes':   g('colored-shapes'),
  numbers:            g('numbers'),
  'smells-tastes':    g('smells-tastes'),
  weather:            g('weather'),
  transport:          g('transport'),
  vehicles:           g('vehicles'),
  tools:              g('tools'),
  space:              g('space'),
  house:              g('house'),
  instruments:        g('instruments'),
  professions:        g('professions'),
  emotions:           g('emotions'),
  sports:             g('sports'),
  kitchen:            g('kitchen'),
  'body-parts':       g('body-parts'),
  family:             g('family'),
  dinosaurs:          g('dinosaurs'),
  'world-food':       g('world-food'),
  recycling:          g('recycling'),
  medicine:           g('medicine'),
  'nature-sounds':    useNatureSoundsGame,
  'seasons-holidays': g('seasons-holidays'),
  feelings:           g('feelings'),
  'shopping-money':   g('shopping-money'),
  'road-safety':      g('road-safety'),
  'ocean-life':       g('ocean-life'),
  'garden-plants':    g('garden-plants'),
  'magic-fairy-tales':g('magic-fairy-tales'),
  'space-adventure':  g('space-adventure'),
  'cooking-kitchen':  g('cooking-kitchen'),
  'circus-show':      g('circus-show'),
  'virtual-reality':  g('virtual-reality'),
  'new-professions':  g('new-professions'),
  'advanced-weather': g('advanced-weather'),
  'advanced-colors':  g('advanced-colors'),
  'jewish-holidays':  g('jewish-holidays'),
  'logic-games':      g('logic-games'),
  'sound-imitation':  g('sound-imitation'),
  'body-movements':   g('body-movements'),
  'touch-senses':     g('touch-senses'),
  'emotional-social': g('emotional-social'),
  'time-clock':       g('time-clock'),
  'climate-planet':   g('climate-planet'),
  birds:              g('birds'),
  'bugs-insects':     g('bugs-insects'),
  superheroes:        g('superheroes'),
  'art-craft':        g('art-craft'),
  camping:            g('camping'),
  'fairy-tale-chars': g('fairy-tale-chars'),
  flags:              g('flags'),
  'soccer-logos':     g('soccer-logos'),
  'car-brands':       g('car-brands'),
  'world-landmarks':  g('world-landmarks'),
  'solar-system':     g('solar-system'),
  'famous-paintings': g('famous-paintings'),
  'tech-logos':       g('tech-logos'),
  'dog-breeds':       g('dog-breeds'),
  'cat-breeds':       g('cat-breeds'),
  'nba-teams':        g('nba-teams'),
  'exotic-birds':     g('exotic-birds'),
  butterflies:            g('butterflies'),
  counting:               useCountingGame,
  'days-of-week':         g('days-of-week'),
  'months-of-year':       g('months-of-year'),
  ordinals:               g('ordinals'),
  'spatial-concepts':     g('spatial-concepts'),
  'number-words':         g('number-words'),
  math:                   useMathGame,
  'geography-flags':      g('geography-flags'),
  'geography-capitals':   useGeographyCapitalsGame,
  'geography-continents': useGeographyContinentsGame,
  'visual-opposites':     g('visual-opposites'),
  'english-cards':        g('english-cards'),
};

export type GameHookType = AnyGameHookFn;
