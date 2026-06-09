import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const TIME_CLOCK_CONSTANTS: Record<string, BaseGameItem> = {
  // שעות היום
  MORNING_SUNRISE: { name: "morning_sunrise", hebrew: "בוקר - זריחה", english: "Morning Sunrise", emoji: "🌅", color: "bg-orange-300", sound: [392, 440, 494] },
  NOON_MIDDAY: { name: "noon_midday", hebrew: "צהריים - שיא היום", english: "Noon Midday", emoji: "☀️", color: "bg-yellow-400", sound: [523, 587, 659] },
  EVENING_SUNSET: { name: "evening_sunset", hebrew: "ערב - שקיעה", english: "Evening Sunset", emoji: "🌇", color: "bg-orange-500", sound: [349, 392, 440] },
  NIGHT_STARS: { name: "night_stars", hebrew: "לילה - כוכבים", english: "Night Stars", emoji: "🌙", color: "bg-purple-800", sound: [262, 311, 370] },

  // ימי השבוע
  SUNDAY_REST: { name: "sunday_rest", hebrew: "יום ראשון", english: "Sunday", emoji: "1️⃣", color: "bg-red-400", sound: [440, 440, 440] },
  MONDAY_START: { name: "monday_start", hebrew: "יום שני", english: "Monday", emoji: "2️⃣", color: "bg-blue-400", sound: [494, 494, 494] },
  TUESDAY: { name: "tuesday", hebrew: "יום שלישי", english: "Tuesday", emoji: "3️⃣", color: "bg-green-400", sound: [523, 523, 523] },
  WEDNESDAY: { name: "wednesday", hebrew: "יום רביעי", english: "Wednesday", emoji: "4️⃣", color: "bg-purple-400", sound: [554, 554, 554] },
  THURSDAY: { name: "thursday", hebrew: "יום חמישי", english: "Thursday", emoji: "5️⃣", color: "bg-orange-400", sound: [587, 587, 587] },
  FRIDAY_SHABBAT: { name: "friday_shabbat", hebrew: "יום שישי - שבת", english: "Friday Shabbat", emoji: "🕯️", color: "bg-yellow-600", sound: [587, 659, 698] },
  SATURDAY_FAMILY: { name: "saturday_family", hebrew: "יום שבת - משפחה", english: "Saturday Family", emoji: "👨‍👩‍👧‍👦", color: "bg-green-400", sound: [523, 587, 622] },

  // חודשים ועונות
  SPRING_FLOWERS: { name: "spring_flowers", hebrew: "אביב - פרחים", english: "Spring Flowers", emoji: "🌸", color: "bg-pink-300", sound: [523, 622, 740] },
  SUMMER_BEACH: { name: "summer_beach", hebrew: "קיץ - חוף", english: "Summer Beach", emoji: "🏖️", color: "bg-blue-300", sound: [659, 784, 880] },
  AUTUMN_LEAVES: { name: "autumn_leaves", hebrew: "סתיו - עלים", english: "Autumn Leaves", emoji: "🍂", color: "bg-orange-400", sound: [415, 494, 587] },
  WINTER_SNOW: { name: "winter_snow", hebrew: "חורף - שלג", english: "Winter Snow", emoji: "❄️", color: "bg-blue-200", sound: [349, 415, 494] },
};

export const TIME_CLOCK_ITEMS = createItemsList(TIME_CLOCK_CONSTANTS);

export const TIME_CLOCK_PRONUNCIATIONS = {
  'morning_sunrise': 'בֹּקֶר - זְרִיחָה',
  'noon_midday': 'צָהֳרַיִם - שִׁיא הַיּוֹם',
  'evening_sunset': 'עֶרֶב - שְׁקִיעָה',
  'night_stars': 'לַיְלָה - כּוֹכָבִים',
  'sunday_rest': 'יוֹם רִאשׁוֹן',
  'monday_start': 'יוֹם שֵׁנִי',
  'tuesday': 'יוֹם שְׁלִישִׁי',
  'wednesday': 'יוֹם רְבִיעִי',
  'thursday': 'יוֹם חֲמִישִׁי',
  'friday_shabbat': 'יוֹם שִׁישִׁי - שַׁבָּת',
  'saturday_family': 'יוֹם שַׁבָּת - מִשְׁפָּחָה',
  'spring_flowers': 'אָבִיב - פְּרָחִים',
  'summer_beach': 'קַיִץ - חוֹף',
  'autumn_leaves': 'סְתָיו - עָלִים',
  'winter_snow': 'חֹרֶף - שֶׁלֶג',
} as const;

export const TIME_CLOCK_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 8000,
    pointsPerCorrect: 15,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 2,
    specialMechanic: 'time-learning',
  },
  items: TIME_CLOCK_ITEMS,
  pronunciations: TIME_CLOCK_PRONUNCIATIONS,
} as const;
