/**
 * Server-side async loader for game items.
 * Uses dynamic import() so only the data file for the requested game type is
 * included in that game's static-generation output — not all 27 files at once.
 *
 * Keep this file SERVER-ONLY (no 'use client').
 */

import type { GameType, BaseGameItem } from '@/lib/types/core/base';

/** Each data module exports named `BaseGameItem[]` arrays alongside non-array constants.
 *  We type-narrow at the boundary instead of using `any`. */
type DataModule = Record<string, unknown>;

function extractItems(m: DataModule, key: string): BaseGameItem[] {
  const val = m[key];
  return Array.isArray(val) ? (val as BaseGameItem[]) : [];
}

async function fromNature(key: string): Promise<BaseGameItem[]> {
  return extractItems(await import('./gameData/nature'), key);
}

async function fromBasic(key: string): Promise<BaseGameItem[]> {
  return extractItems(await import('./gameData/basic'), key);
}

async function fromWorld(key: string): Promise<BaseGameItem[]> {
  return extractItems(await import('./gameData/world'), key);
}

async function fromLifestyle(key: string): Promise<BaseGameItem[]> {
  return extractItems(await import('./gameData/lifestyle'), key);
}

async function fromAdditional(key: string): Promise<BaseGameItem[]> {
  return extractItems(await import('./gameData/additionalGames'), key);
}

async function fromInnovative(key: string): Promise<BaseGameItem[]> {
  return extractItems(await import('./gameData/innovative'), key);
}

async function fromTechnology(key: string): Promise<BaseGameItem[]> {
  return extractItems(await import('./gameData/technology'), key);
}

async function fromFunGames(key: string): Promise<BaseGameItem[]> {
  return extractItems(await import('./gameData/funGames'), key);
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

    // special.ts (mixed exports — use extractItems boundary)
    case 'magic-fairy-tales': return extractItems(await import('./gameData/special'), 'MAGIC_FAIRY_TALES_ITEMS');
    case 'circus-show':       return extractItems(await import('./gameData/special'), 'CIRCUS_SHOW_ITEMS');

    // single-export files (each module exports exactly one BaseGameItem[] constant)
    case 'sports':     return (await import('./gameData/sports')).SPORTS_ITEMS;
    case 'kitchen':
    case 'cooking-kitchen':
                       return (await import('./gameData/cooking')).KITCHEN_ITEMS;
    case 'body-parts': return (await import('./gameData/body')).BODY_PARTS_ITEMS;
    case 'family':     return (await import('./gameData/family')).FAMILY_ITEMS;
    case 'dinosaurs':  return (await import('./gameData/dinosaurs')).DINOSAURS_ITEMS;
    case 'flags':               return (await import('./gameData/flags')).FLAGS_ITEMS;
    case 'geography-flags':     return (await import('./gameData/geographyItems')).GEOGRAPHY_FLAGS_ITEMS;
    case 'geography-capitals':  return (await import('./gameData/geographyItems')).GEOGRAPHY_CAPITALS_ITEMS;
    case 'geography-continents':return (await import('./gameData/geographyItems')).GEOGRAPHY_CONTINENTS_ITEMS;
    case 'soccer-logos':     return (await import('./gameData/soccerLogos')).SOCCER_LOGOS_ITEMS;
    case 'car-brands':       return (await import('./gameData/carBrands')).CAR_BRANDS_ITEMS;
    case 'world-landmarks':  return (await import('./gameData/worldLandmarks')).WORLD_LANDMARKS_ITEMS;
    case 'solar-system':     return (await import('./gameData/solarSystem')).SOLAR_SYSTEM_ITEMS;
    case 'famous-paintings': return (await import('./gameData/famousPaintings')).FAMOUS_PAINTINGS_ITEMS;
    case 'tech-logos':       return (await import('./gameData/techLogos')).TECH_LOGOS_ITEMS;
    case 'dog-breeds':       return (await import('./gameData/dogBreeds')).DOG_BREEDS_ITEMS;
    case 'cat-breeds':       return (await import('./gameData/catBreeds')).CAT_BREEDS_ITEMS;
    case 'nba-teams':        return (await import('./gameData/nbaTeams')).NBA_TEAMS_ITEMS;
    case 'exotic-birds':     return (await import('./gameData/exoticBirds')).EXOTIC_BIRDS_ITEMS;
    case 'butterflies':      return (await import('./gameData/butterflies')).BUTTERFLIES_ITEMS;

    // newGames.ts (mixed exports — use extractItems boundary)
    case 'world-food': return extractItems(await import('./gameData/newGames'), 'WORLD_FOOD_ITEMS');
    case 'recycling':  return extractItems(await import('./gameData/newGames'), 'RECYCLING_ITEMS');

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
