/**
 * Server-side async loader for game items.
 * Uses dynamic import() so only the data file for the requested game type is
 * included in that game's static-generation output — not all 27 files at once.
 *
 * Keep this file SERVER-ONLY (no 'use client').
 */

import type { GameType, BaseGameItem } from '@/lib/types/core/base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataModule = Record<string, any>;

async function fromNature(key: string): Promise<BaseGameItem[]> {
  const m: DataModule = await import('./gameData/nature');
  return (m[key] ?? []) as BaseGameItem[];
}

async function fromBasic(key: string): Promise<BaseGameItem[]> {
  const m: DataModule = await import('./gameData/basic');
  return (m[key] ?? []) as BaseGameItem[];
}

async function fromWorld(key: string): Promise<BaseGameItem[]> {
  const m: DataModule = await import('./gameData/world');
  return (m[key] ?? []) as BaseGameItem[];
}

async function fromLifestyle(key: string): Promise<BaseGameItem[]> {
  const m: DataModule = await import('./gameData/lifestyle');
  return (m[key] ?? []) as BaseGameItem[];
}

async function fromAdditional(key: string): Promise<BaseGameItem[]> {
  const m: DataModule = await import('./gameData/additionalGames');
  return (m[key] ?? []) as BaseGameItem[];
}

async function fromInnovative(key: string): Promise<BaseGameItem[]> {
  const m: DataModule = await import('./gameData/innovative');
  return (m[key] ?? []) as BaseGameItem[];
}

async function fromTechnology(key: string): Promise<BaseGameItem[]> {
  const m: DataModule = await import('./gameData/technology');
  return (m[key] ?? []) as BaseGameItem[];
}

async function fromFunGames(key: string): Promise<BaseGameItem[]> {
  const m: DataModule = await import('./gameData/funGames');
  return (m[key] ?? []) as BaseGameItem[];
}

export async function loadGameItems(gameType: GameType): Promise<BaseGameItem[]> {
  switch (gameType) {
    // nature.ts
    case 'animals':       return fromNature('ALL_ANIMALS');
    case 'fruits':        return fromNature('ALL_FRUITS');
    case 'vegetables':    return fromNature('ALL_VEGETABLES');
    case 'smells-tastes': return fromNature('ALL_SMELLS_TASTES');
    case 'ocean-life':    return fromNature('OCEAN_LIFE_ITEMS');
    case 'garden-plants': return fromNature('GARDEN_PLANTS_ITEMS');
    case 'memory':        return fromNature('ALL_ANIMALS');

    // basic.ts
    case 'colors':         return fromBasic('ALL_COLORS');
    case 'letters':        return fromBasic('ALL_LETTERS');
    case 'shapes':         return fromBasic('ALL_SHAPES');
    case 'numbers':        return fromBasic('ALL_NUMBERS');
    case 'colored-shapes': return fromBasic('ALL_COLORED_SHAPES');
    case 'advanced-colors':return fromBasic('ADVANCED_COLORS_ITEMS');
    case 'counting':       return fromBasic('ALL_NUMBERS');
    case 'math':           return fromBasic('ALL_NUMBERS');
    case 'bubbles':        return fromBasic('ALL_COLORS');
    case 'puzzles':        return fromBasic('ALL_SHAPES');
    case 'building':       return fromBasic('ALL_SHAPES');
    case 'tetris':         return fromBasic('ALL_SHAPES');

    // world.ts
    case 'transport':        return fromWorld('ALL_TRANSPORTS');
    case 'vehicles':         return fromWorld('ALL_VEHICLES');
    case 'tools':            return fromWorld('ALL_TOOLS');
    case 'space':            return fromWorld('ALL_SPACE_OBJECTS');
    case 'space-adventure':  return fromWorld('ALL_SPACE_OBJECTS');
    case 'weather':          return fromWorld('ALL_WEATHERS');
    case 'advanced-weather': return fromWorld('ADVANCED_WEATHER_ITEMS');

    // lifestyle.ts
    case 'house':        return fromLifestyle('ALL_HOUSE_ITEMS');
    case 'clothing':     return fromLifestyle('ALL_CLOTHING');
    case 'instruments':  return fromLifestyle('ALL_INSTRUMENTS');
    case 'professions':  return fromLifestyle('ALL_PROFESSIONS');
    case 'emotions':     return fromLifestyle('ALL_EMOTIONS');

    // special.ts
    case 'magic-fairy-tales': {
      const m: DataModule = await import('./gameData/special');
      return m['MAGIC_FAIRY_TALES_ITEMS'] as BaseGameItem[];
    }
    case 'circus-show': {
      const m: DataModule = await import('./gameData/special');
      return m['CIRCUS_SHOW_ITEMS'] as BaseGameItem[];
    }

    // single-export files
    case 'sports':     return (await import('./gameData/sports')).SPORTS_ITEMS as BaseGameItem[];
    case 'kitchen':
    case 'cooking-kitchen':
                       return (await import('./gameData/cooking')).KITCHEN_ITEMS as BaseGameItem[];
    case 'body-parts': return (await import('./gameData/body')).BODY_PARTS_ITEMS as BaseGameItem[];
    case 'family':     return (await import('./gameData/family')).FAMILY_ITEMS as BaseGameItem[];
    case 'dinosaurs':  return (await import('./gameData/dinosaurs')).DINOSAURS_ITEMS as BaseGameItem[];
    case 'flags':      return (await import('./gameData/flags')).FLAGS_ITEMS as BaseGameItem[];
    case 'soccer-logos':     return (await import('./gameData/soccerLogos')).SOCCER_LOGOS_ITEMS as BaseGameItem[];
    case 'car-brands':       return (await import('./gameData/carBrands')).CAR_BRANDS_ITEMS as BaseGameItem[];
    case 'world-landmarks':  return (await import('./gameData/worldLandmarks')).WORLD_LANDMARKS_ITEMS as BaseGameItem[];
    case 'solar-system':     return (await import('./gameData/solarSystem')).SOLAR_SYSTEM_ITEMS as BaseGameItem[];
    case 'famous-paintings': return (await import('./gameData/famousPaintings')).FAMOUS_PAINTINGS_ITEMS as BaseGameItem[];
    case 'tech-logos':       return (await import('./gameData/techLogos')).TECH_LOGOS_ITEMS as BaseGameItem[];
    case 'dog-breeds':       return (await import('./gameData/dogBreeds')).DOG_BREEDS_ITEMS as BaseGameItem[];
    case 'cat-breeds':       return (await import('./gameData/catBreeds')).CAT_BREEDS_ITEMS as BaseGameItem[];
    case 'nba-teams':        return (await import('./gameData/nbaTeams')).NBA_TEAMS_ITEMS as BaseGameItem[];
    case 'exotic-birds':     return (await import('./gameData/exoticBirds')).EXOTIC_BIRDS_ITEMS as BaseGameItem[];
    case 'butterflies':      return (await import('./gameData/butterflies')).BUTTERFLIES_ITEMS as BaseGameItem[];

    // newGames.ts
    case 'world-food': {
      const m: DataModule = await import('./gameData/newGames');
      return m['WORLD_FOOD_ITEMS'] as BaseGameItem[];
    }
    case 'recycling': {
      const m: DataModule = await import('./gameData/newGames');
      return m['RECYCLING_ITEMS'] as BaseGameItem[];
    }

    // additionalGames.ts
    case 'medicine':          return fromAdditional('MEDICINE_ITEMS');
    case 'nature-sounds':     return fromAdditional('NATURE_SOUNDS_ITEMS');
    case 'seasons-holidays':  return fromAdditional('SEASONS_HOLIDAYS_ITEMS');
    case 'feelings':          return fromAdditional('FEELINGS_ITEMS');
    case 'shopping-money':    return fromAdditional('SHOPPING_MONEY_ITEMS');
    case 'road-safety':       return fromAdditional('ROAD_SAFETY_ITEMS');

    // technology.ts
    case 'virtual-reality':   return fromTechnology('VIRTUAL_REALITY_ITEMS');
    case 'new-professions':   return fromTechnology('NEW_PROFESSIONS_ITEMS');
    case 'jewish-holidays':   return fromTechnology('JEWISH_HOLIDAYS_ITEMS');
    case 'logic-games':       return fromTechnology('LOGIC_GAMES_ITEMS');

    // innovative.ts
    case 'sound-imitation':   return fromInnovative('SOUND_IMITATION_ITEMS');
    case 'body-movements':    return fromInnovative('BODY_MOVEMENTS_ITEMS');
    case 'touch-senses':      return fromInnovative('TOUCH_SENSES_ITEMS');
    case 'emotional-social':  return fromInnovative('EMOTIONAL_SOCIAL_ITEMS');
    case 'time-clock':        return fromInnovative('TIME_CLOCK_ITEMS');
    case 'climate-planet':    return fromInnovative('CLIMATE_PLANET_ITEMS');

    // funGames.ts
    case 'birds':             return fromFunGames('BIRDS_ITEMS');
    case 'bugs-insects':      return fromFunGames('BUGS_INSECTS_ITEMS');
    case 'superheroes':       return fromFunGames('SUPERHEROES_ITEMS');
    case 'art-craft':         return fromFunGames('ART_CRAFT_ITEMS');
    case 'camping':           return fromFunGames('CAMPING_ITEMS');
    case 'fairy-tale-chars':  return fromFunGames('FAIRY_TALE_CHARS_ITEMS');

    default:
      return [];
  }
}
