import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

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

export const ALL_WEATHERS = createItemsList(WEATHER_CONSTANTS);
export const WEATHER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(WEATHER_CONSTANTS);
export const WEATHER_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;

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
  LIGHTNING: { name: "lightning", hebrew: "ברק", english: "Lightning", emoji: "⚡", color: "bg-yellow-400", sound: [740, 831, 988] },
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
  'lightning': 'בָּרָק',
} as const;

export const ADVANCED_WEATHER_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 8000,
    pointsPerCorrect: 15,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 2,
  },
  items: ADVANCED_WEATHER_ITEMS,
  pronunciations: ADVANCED_WEATHER_PRONUNCIATIONS,
} as const;
