/**
 * נתוני המשחקים - תחבורה, כלי עבודה, חלל ומזג אוויר
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני כלי תחבורה
 * ===============================================
 */
export const TRANSPORT_CONSTANTS: Record<string, BaseGameItem> = {
  CAR: { name: "car", hebrew: "מכונית", english: "Car", emoji: "🚗", color: "bg-red-500", sound: [440, 550, 660] },
  BUS: { name: "bus", hebrew: "אוטובוס", english: "Bus", emoji: "🚌", color: "bg-orange-500", sound: [392, 494, 587] },
  TRAIN: { name: "train", hebrew: "רכבת", english: "Train", emoji: "🚂", color: "bg-green-500", sound: [349, 440, 523] },
  AIRPLANE: { name: "airplane", hebrew: "מטוס", english: "Airplane", emoji: "✈️", color: "bg-blue-500", sound: [523, 659, 784] },
  SHIP: { name: "ship", hebrew: "ספינה", english: "Ship", emoji: "🚢", color: "bg-cyan-500", sound: [294, 370, 440] },
  BICYCLE: { name: "bicycle", hebrew: "אופניים", english: "Bicycle", emoji: "🚲", color: "bg-green-400", sound: [330, 415, 494] },
  MOTORCYCLE: { name: "motorcycle", hebrew: "אופנוע", english: "Motorcycle", emoji: "🏍️", color: "bg-black", sound: [587, 698, 784] },
  TRUCK: { name: "truck", hebrew: "משאית", english: "Truck", emoji: "🚚", color: "bg-gray-600", sound: [196, 247, 294] },
  HELICOPTER: { name: "helicopter", hebrew: "מסוק", english: "Helicopter", emoji: "🚁", color: "bg-purple-500", sound: [659, 831, 988] },
  TAXI: { name: "taxi", hebrew: "מונית", english: "Taxi", emoji: "🚕", color: "bg-yellow-500", sound: [277, 349, 415] },
};

/**
 * ===============================================
 * נתוני כלי רכב (דופליקט מתחבורה לתאימות)
 * ===============================================
 */
export const VEHICLE_CONSTANTS: Record<string, BaseGameItem> = {
  CAR: { name: "car", hebrew: "מכונית", english: "Car", emoji: "🚗", color: "bg-red-500", sound: [440, 550, 660] },
  BUS: { name: "bus", hebrew: "אוטובוס", english: "Bus", emoji: "🚌", color: "bg-yellow-500", sound: [392, 494, 587] },
  TRAIN: { name: "train", hebrew: "רכבת", english: "Train", emoji: "🚂", color: "bg-green-500", sound: [349, 440, 523] },
  AIRPLANE: { name: "airplane", hebrew: "מטוס", english: "Airplane", emoji: "✈️", color: "bg-blue-500", sound: [523, 659, 784] },
  BICYCLE: { name: "bicycle", hebrew: "אופניים", english: "Bicycle", emoji: "🚲", color: "bg-purple-500", sound: [294, 370, 440] },
  MOTORCYCLE: { name: "motorcycle", hebrew: "אופנוע", english: "Motorcycle", emoji: "🏍️", color: "bg-orange-500", sound: [330, 415, 494] },
};

/**
 * ===============================================
 * נתוני כלי עבודה
 * ===============================================
 */
export const TOOL_CONSTANTS: Record<string, BaseGameItem> = {
  HAMMER: { name: "hammer", hebrew: "פטיש", english: "Hammer", emoji: "🔨", color: "bg-gray-600", sound: [440, 550, 660] },
  SCREWDRIVER: { name: "screwdriver", hebrew: "מברג", english: "Screwdriver", emoji: "🪛", color: "bg-blue-500", sound: [392, 494, 587] },
  SAW: { name: "saw", hebrew: "מסור", english: "Saw", emoji: "🪚", color: "bg-yellow-600", sound: [349, 440, 523] },
  SCISSORS: { name: "scissors", hebrew: "מספריים", english: "Scissors", emoji: "✂️", color: "bg-purple-500", sound: [294, 370, 440] },
};

/**
 * ===============================================
 * נתוני חלל
 * ===============================================
 */
export const SPACE_CONSTANTS: Record<string, BaseGameItem> = {
  SUN: { name: "sun", hebrew: "שמש", english: "Sun", emoji: "☀️", color: "bg-yellow-500", sound: [523, 659, 784] },
  MOON: { name: "moon", hebrew: "ירח", english: "Moon", emoji: "🌙", color: "bg-gray-300", sound: [392, 494, 587] },
  STAR: { name: "star", hebrew: "כוכב", english: "Star", emoji: "⭐", color: "bg-yellow-400", sound: [659, 831, 988] },
  EARTH: { name: "earth", hebrew: "כדור הארץ", english: "Earth", emoji: "🌍", color: "bg-blue-500", sound: [349, 440, 523] },
  ROCKET: { name: "rocket", hebrew: "חללית", english: "Rocket", emoji: "🚀", color: "bg-red-500", sound: [440, 554, 659] },
  PLANET: { name: "planet", hebrew: "כוכב לכת", english: "Planet", emoji: "🪐", color: "bg-purple-500", sound: [330, 415, 494] },
};

/**
 * ===============================================
 * נתוני מזג אוויר
 * ===============================================
 */
export const WEATHER_CONSTANTS: Record<string, BaseGameItem> = {
  SUNNY: { name: "sunny", hebrew: "שמש", english: "Sunny", emoji: "☀️", color: "bg-yellow-500", sound: [392, 494, 587] },
  RAINY: { name: "rainy", hebrew: "גשום", english: "Rainy", emoji: "🌧️", color: "bg-blue-500", sound: [523, 659, 784] },
  CLOUDY: { name: "cloudy", hebrew: "מעונן", english: "Cloudy", emoji: "☁️", color: "bg-gray-500", sound: [294, 370, 440] },
  SNOWY: { name: "snowy", hebrew: "שלג", english: "Snowy", emoji: "❄️", color: "bg-cyan-500", sound: [659, 831, 988] },
  STORMY: { name: "stormy", hebrew: "סערה", english: "Stormy", emoji: "⛈️", color: "bg-purple-600", sound: [196, 247, 294] },
  WINDY: { name: "windy", hebrew: "רוח", english: "Windy", emoji: "💨", color: "bg-teal-500", sound: [349, 440, 523] },
  PARTLY_CLOUDY: { name: "partly_cloudy", hebrew: "חלקית מעונן", english: "Partly Cloudy", emoji: "⛅", color: "bg-orange-400", sound: [330, 415, 494] },
  FOGGY: { name: "foggy", hebrew: "ערפילי", english: "Foggy", emoji: "🌫️", color: "bg-gray-400", sound: [220, 277, 330] },
  HOT: { name: "hot", hebrew: "חם", english: "Hot", emoji: "🔥", color: "bg-red-600", sound: [440, 550, 660] },
  COLD: { name: "cold", hebrew: "קר", english: "Cold", emoji: "🧊", color: "bg-blue-300", sound: [262, 330, 392] },
};

/**
 * ===============================================
 * רשימות ויצוא אוטומטי
 * ===============================================
 */
export const ALL_TRANSPORTS = createItemsList(TRANSPORT_CONSTANTS);
export const ALL_VEHICLES = createItemsList(VEHICLE_CONSTANTS);
export const ALL_TOOLS = createItemsList(TOOL_CONSTANTS);
export const ALL_SPACE_OBJECTS = createItemsList(SPACE_CONSTANTS);
export const ALL_WEATHERS = createItemsList(WEATHER_CONSTANTS);

export const TRANSPORT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(TRANSPORT_CONSTANTS);
export const VEHICLE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(VEHICLE_CONSTANTS);
export const TOOL_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(TOOL_CONSTANTS);
export const SPACE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SPACE_CONSTANTS);
export const WEATHER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(WEATHER_CONSTANTS);

/**
 * ===============================================
 * משחק מזג אוויר מתקדם - תופעות מזג אוויר מורכבות
 * ===============================================
 */
export const ADVANCED_WEATHER_CONSTANTS: Record<string, BaseGameItem> = {
  TORNADO: { name: "tornado", hebrew: "סופת טורנדו", english: "Tornado", emoji: "🌪️", color: "bg-gray-600", sound: [220, 330, 440] },
  AURORA: { name: "aurora", hebrew: "זוהר צפוני", english: "Aurora", emoji: "🌌", color: "bg-purple-500", sound: [523, 659, 784] },
  TYPHOON: { name: "typhoon", hebrew: "סופת טייפון", english: "Typhoon", emoji: "🌀", color: "bg-blue-700", sound: [196, 294, 392] },
  HAIL: { name: "hail", hebrew: "ברד", english: "Hail", emoji: "🧊", color: "bg-cyan-400", sound: [659, 784, 880] },
  MONSOON: { name: "monsoon", hebrew: "מונסון", english: "Monsoon", emoji: "🌧️", color: "bg-blue-500", sound: [330, 415, 523] },
  BLIZZARD: { name: "blizzard", hebrew: "סופת שלגים", english: "Blizzard", emoji: "❄️", color: "bg-white", sound: [440, 554, 659] },
  SANDSTORM: { name: "sandstorm", hebrew: "סופת חול", english: "Sandstorm", emoji: "🌪️", color: "bg-yellow-600", sound: [247, 311, 370] },
  CYCLONE: { name: "cyclone", hebrew: "ציקלון", english: "Cyclone", emoji: "🌀", color: "bg-gray-500", sound: [185, 247, 311] },
  DROUGHT: { name: "drought", hebrew: "בצורת", english: "Drought", emoji: "🏜️", color: "bg-orange-400", sound: [294, 370, 440] },
  HUMIDITY: { name: "humidity", hebrew: "לחות גבוהה", english: "High Humidity", emoji: "💧", color: "bg-blue-300", sound: [415, 523, 622] },
  FROST: { name: "frost", hebrew: "כפור", english: "Frost", emoji: "❄️", color: "bg-blue-100", sound: [622, 740, 831] },
  LIGHTNING: { name: "lightning", hebrew: "ברק", english: "Lightning", emoji: "⚡", color: "bg-yellow-400", sound: [740, 831, 988] }
};

export const ADVANCED_WEATHER_ITEMS = createItemsList(ADVANCED_WEATHER_CONSTANTS);

export const ADVANCED_WEATHER_PRONUNCIATIONS = {
  'tornado': 'טוֹר-נָ-דוֹ',
  'aurora': 'אַו-רוֹ-רָה',
  'typhoon': 'טַיי-פוּן',
  'hail': 'בָּרָד',
  'monsoon': 'מוֹן-סוּן',
  'blizzard': 'בְּלִי-זַרד',
  'sandstorm': 'סוּ-פַת חוֹל',
  'cyclone': 'צִי-קְלוֹן',
  'drought': 'בְּצוֹ-רֶת',
  'humidity': 'לַח-פַּנִי',
  'frost': 'כְּפוֹר',
  'lightning': 'בָּרָק'
} as const;

export const ADVANCED_WEATHER_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 8000,
    pointsPerCorrect: 15,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 2
  },
  items: ADVANCED_WEATHER_ITEMS,
  pronunciations: ADVANCED_WEATHER_PRONUNCIATIONS
} as const;

/**
 * ===============================================
 * קונפיגורציות משחקים
 * ===============================================
 */
export const TRANSPORT_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
export const VEHICLE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
export const TOOL_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
export const SPACE_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
export const WEATHER_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
