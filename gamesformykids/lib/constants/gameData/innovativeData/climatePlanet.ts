import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const CLIMATE_PLANET_CONSTANTS: Record<string, BaseGameItem> = {
  // אזורי אקלים
  DESERT_HOT: { name: "desert_hot", hebrew: "מדבר חם", english: "Hot Desert", emoji: "🏜️", color: "bg-yellow-600", sound: [294, 330, 370] },
  RAINFOREST_WET: { name: "rainforest_wet", hebrew: "יער גשם רטוב", english: "Wet Rainforest", emoji: "🌳", color: "bg-green-600", sound: [392, 440, 494] },
  ARCTIC_COLD: { name: "arctic_cold", hebrew: "ארקטיק קר", english: "Cold Arctic", emoji: "🧊", color: "bg-blue-200", sound: [220, 262, 311] },
  GRASSLAND_MILD: { name: "grassland_mild", hebrew: "ערבות מתונות", english: "Mild Grassland", emoji: "🌾", color: "bg-green-400", sound: [349, 392, 440] },

  // יבשות
  AFRICA_CONTINENT: { name: "africa_continent", hebrew: "יבשת אפריקה", english: "Africa Continent", emoji: "🌍", color: "bg-orange-500", sound: [440, 523, 622] },
  ASIA_CONTINENT: { name: "asia_continent", hebrew: "יבשת אסיה", english: "Asia Continent", emoji: "🌏", color: "bg-red-500", sound: [494, 587, 698] },
  EUROPE_CONTINENT: { name: "europe_continent", hebrew: "יבשת אירופה", english: "Europe Continent", emoji: "🏰", color: "bg-blue-500", sound: [370, 440, 523] },
  AMERICA_CONTINENT: { name: "america_continent", hebrew: "יבשת אמריקה", english: "America Continent", emoji: "🗽", color: "bg-purple-500", sound: [415, 494, 587] },

  // אוקיינוסים
  PACIFIC_OCEAN: { name: "pacific_ocean", hebrew: "האוקיינוס השקט", english: "Pacific Ocean", emoji: "🌊", color: "bg-blue-600", sound: [262, 311, 370] },
  ATLANTIC_OCEAN: { name: "atlantic_ocean", hebrew: "האוקיינוס האטלנטי", english: "Atlantic Ocean", emoji: "🌊", color: "bg-blue-700", sound: [311, 370, 440] },

  // סביבה ואקולוגיה
  CLEAN_AIR: { name: "clean_air", hebrew: "אוויר נקי", english: "Clean Air", emoji: "💨", color: "bg-cyan-300", sound: [523, 622, 740] },
  RECYCLING_EARTH: { name: "recycling_earth", hebrew: "מחזור לכדור הארץ", english: "Recycling Earth", emoji: "♻️", color: "bg-green-500", sound: [440, 523, 587] },
};

export const CLIMATE_PLANET_ITEMS = createItemsList(CLIMATE_PLANET_CONSTANTS);

export const CLIMATE_PLANET_PRONUNCIATIONS = {
  'desert_hot': 'מִדְבָּר חַם',
  'rainforest_wet': 'יַעַר גֶּשֶׁם רָטֹב',
  'arctic_cold': 'אַרְקְטִי קַר',
  'grassland_mild': 'עֲרָבוֹת מְתוּנוֹת',
  'africa_continent': 'יַבֶּשֶׁת אַפְרִיקָה',
  'asia_continent': 'יַבֶּשֶׁת אַסְיָה',
  'europe_continent': 'יַבֶּשֶׁת אֵירוֹפָּה',
  'america_continent': 'יַבֶּשֶׁת אַמֶרִיקָה',
  'pacific_ocean': 'הָאוֹקְיָנוֹס הַשָּׁקֵט',
  'atlantic_ocean': 'הָאוֹקְיָנוֹס הָאַטְלַנְטִי',
  'clean_air': 'אֲוִיר נָקִי',
  'recycling_earth': 'מַחְזוֹר לִכְדוּר הָאָרֶץ',
} as const;

export const CLIMATE_PLANET_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 9000,
    pointsPerCorrect: 18,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 3,
    specialMechanic: 'geography-learning',
  },
  items: CLIMATE_PLANET_ITEMS,
  pronunciations: CLIMATE_PLANET_PRONUNCIATIONS,
} as const;
