import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const SOUND_IMITATION_CONSTANTS: Record<string, BaseGameItem> = {
  // קולות חיות
  DOG_BARK: { name: "dog_bark", hebrew: "נביחת כלב", english: "Dog Bark", emoji: "🐕", color: "bg-brown-500", sound: [196, 261, 330] },
  CAT_MEOW: { name: "cat_meow", hebrew: "מיאו של חתול", english: "Cat Meow", emoji: "🐱", color: "bg-orange-400", sound: [523, 622, 740] },
  COW_MOO: { name: "cow_moo", hebrew: "געיית פרה", english: "Cow Moo", emoji: "🐄", color: "bg-white", sound: [131, 165, 196] },
  ROOSTER_CROW: { name: "rooster_crow", hebrew: "קריאת תרנגול", english: "Rooster Crow", emoji: "🐓", color: "bg-red-500", sound: [440, 554, 659] },
  SHEEP_BAA: { name: "sheep_baa", hebrew: "בעיית כבשה", english: "Sheep Baa", emoji: "🐑", color: "bg-gray-200", sound: [294, 370, 440] },
  HORSE_NEIGH: { name: "horse_neigh", hebrew: "צהלת סוס", english: "Horse Neigh", emoji: "🐴", color: "bg-amber-600", sound: [247, 311, 392] },

  // רעשי מכונות ותחבורה
  CAR_ENGINE: { name: "car_engine", hebrew: "מנוע מכונית", english: "Car Engine", emoji: "🚗", color: "bg-blue-600", sound: [110, 147, 196] },
  TRAIN_WHISTLE: { name: "train_whistle", hebrew: "שריקת רכבת", english: "Train Whistle", emoji: "🚂", color: "bg-gray-700", sound: [659, 784, 880] },
  AIRPLANE_ZOOM: { name: "airplane_zoom", hebrew: "זמזום מטוס", english: "Airplane Zoom", emoji: "✈️", color: "bg-sky-500", sound: [185, 247, 311] },
  MOTORCYCLE_VROOM: { name: "motorcycle_vroom", hebrew: "שאגת אופנוע", english: "Motorcycle Vroom", emoji: "🏍️", color: "bg-black", sound: [147, 196, 262] },

  // צלילי טבע
  RAIN_DROPS: { name: "rain_drops", hebrew: "טפטוף גשם", english: "Rain Drops", emoji: "🌧️", color: "bg-blue-400", sound: [1046, 1245, 1397] },
  THUNDER_ROAR: { name: "thunder_roar", hebrew: "רעם", english: "Thunder Roar", emoji: "⚡", color: "bg-purple-800", sound: [82, 110, 147] },
  WIND_WHOOSH: { name: "wind_whoosh", hebrew: "שאגת רוח", english: "Wind Whoosh", emoji: "💨", color: "bg-gray-400", sound: [165, 220, 294] },
  OCEAN_WAVES: { name: "ocean_waves", hebrew: "גלי ים", english: "Ocean Waves", emoji: "🌊", color: "bg-blue-500", sound: [131, 175, 233] },

  // רעשי בית
  DOOR_SLAM: { name: "door_slam", hebrew: "טריקת דלת", english: "Door Slam", emoji: "🚪", color: "bg-brown-600", sound: [196, 196, 196] },
  CLOCK_TICK: { name: "clock_tick", hebrew: "תקתוק שעון", english: "Clock Tick", emoji: "🕐", color: "bg-yellow-500", sound: [698, 698, 698] },
  PHONE_RING: { name: "phone_ring", hebrew: "צלצול טלפון", english: "Phone Ring", emoji: "📞", color: "bg-green-500", sound: [440, 554, 440] },
  MICROWAVE_BEEP: { name: "microwave_beep", hebrew: "ביפ מיקרוגל", english: "Microwave Beep", emoji: "📱", color: "bg-gray-500", sound: [880, 880, 880] },
};

export const SOUND_IMITATION_ITEMS = createItemsList(SOUND_IMITATION_CONSTANTS);

export const SOUND_IMITATION_PRONUNCIATIONS = {
  'dog_bark': 'נְבִי-חַת כֶּלֶב',
  'cat_meow': 'מִיַּאו שֶׁל חָתוּל',
  'cow_moo': 'גְּעִיַּת פָּרָה',
  'rooster_crow': 'קְרִיאַת תַּרְנְגוֹל',
  'sheep_baa': 'בְּעִיַּת כַּבְשָׂה',
  'horse_neigh': 'צַהֲלַת סוּס',
  'car_engine': 'מָנוֹעַ מְכוֹנִית',
  'train_whistle': 'שְׁרִיקַת רַכֶּבֶת',
  'airplane_zoom': 'זַמְזוּם מָטוֹס',
  'motorcycle_vroom': 'שַׁאֲגַת אוֹפָנוֹעַ',
  'rain_drops': 'טַפְטוּף גֶּשֶׁם',
  'thunder_roar': 'רַעַם',
  'wind_whoosh': 'שַׁאֲגַת רוּחַ',
  'ocean_waves': 'גַּלֵּי יָם',
  'door_slam': 'טְרִיקַת דֶּלֶת',
  'clock_tick': 'תַּקְתּוּק שָׁעוֹן',
  'phone_ring': 'צִלְצוּל טֶלֶפוֹן',
  'microwave_beep': 'בִּיפ מִיקְרוֹגַל',
} as const;

export const SOUND_IMITATION_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 15,
    timePerRound: 10000,
    pointsPerCorrect: 20,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 3,
    specialMechanic: 'sound-imitation',
  },
  items: SOUND_IMITATION_ITEMS,
  pronunciations: SOUND_IMITATION_PRONUNCIATIONS,
} as const;
