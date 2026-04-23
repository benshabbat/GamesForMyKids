/**
 * ===============================================
 * מפת פרטי משחקים - אוטומציה מלאה
 * ===============================================
 */

import { ALL_COLORS, ALL_LETTERS, ALL_SHAPES, ALL_NUMBERS, ALL_COLORED_SHAPES, ADVANCED_COLORS_ITEMS } from "@/lib/constants/gameData/basic";
import { ALL_ANIMALS, ALL_FRUITS, ALL_VEGETABLES, ALL_SMELLS_TASTES, OCEAN_LIFE_ITEMS, GARDEN_PLANTS_ITEMS } from "@/lib/constants/gameData/nature";
import { ALL_TRANSPORTS, ALL_VEHICLES, ALL_TOOLS, ALL_SPACE_OBJECTS, ALL_WEATHERS, ADVANCED_WEATHER_ITEMS } from "@/lib/constants/gameData/world";
import { ALL_HOUSE_ITEMS, ALL_CLOTHING, ALL_INSTRUMENTS, ALL_PROFESSIONS, ALL_EMOTIONS } from "@/lib/constants/gameData/lifestyle";
import { MAGIC_FAIRY_TALES_ITEMS, CIRCUS_SHOW_ITEMS } from "@/lib/constants/gameData/special";
import { SPORTS_ITEMS } from "@/lib/constants/gameData/sports";
import { KITCHEN_ITEMS } from "@/lib/constants/gameData/cooking";
import { BODY_PARTS_ITEMS } from "@/lib/constants/gameData/body";
import { FAMILY_ITEMS } from "@/lib/constants/gameData/family";
import { DINOSAURS_ITEMS } from "@/lib/constants/gameData/dinosaurs";
import { WORLD_FOOD_ITEMS, RECYCLING_ITEMS } from "@/lib/constants/gameData/newGames";
import {
  MEDICINE_ITEMS,
  NATURE_SOUNDS_ITEMS,
  SEASONS_HOLIDAYS_ITEMS,
  FEELINGS_ITEMS,
  SHOPPING_MONEY_ITEMS,
  ROAD_SAFETY_ITEMS,
} from "@/lib/constants/gameData/additionalGames";
import {
  VIRTUAL_REALITY_ITEMS,
  NEW_PROFESSIONS_ITEMS,
  JEWISH_HOLIDAYS_ITEMS,
  LOGIC_GAMES_ITEMS,
} from "@/lib/constants/gameData/technology";
import {
  SOUND_IMITATION_ITEMS,
  BODY_MOVEMENTS_ITEMS,
  TOUCH_SENSES_ITEMS,
  EMOTIONAL_SOCIAL_ITEMS,
  TIME_CLOCK_ITEMS,
  CLIMATE_PLANET_ITEMS,
} from "@/lib/constants/gameData/innovative";
import {
  BIRDS_ITEMS,
  BUGS_INSECTS_ITEMS,
  SUPERHEROES_ITEMS,
  ART_CRAFT_ITEMS,
  CAMPING_ITEMS,
  FAIRY_TALE_CHARS_ITEMS,
} from "@/lib/constants/gameData/funGames";
import { FLAGS_ITEMS } from "@/lib/constants/gameData/flags";
import { SOCCER_LOGOS_ITEMS } from "@/lib/constants/gameData/soccerLogos";
import { CAR_BRANDS_ITEMS } from "@/lib/constants/gameData/carBrands";
import { WORLD_LANDMARKS_ITEMS } from "@/lib/constants/gameData/worldLandmarks";
import { SOLAR_SYSTEM_ITEMS } from "@/lib/constants/gameData/solarSystem";
import { FAMOUS_PAINTINGS_ITEMS } from "@/lib/constants/gameData/famousPaintings";
import { TECH_LOGOS_ITEMS } from "@/lib/constants/gameData/techLogos";
import { DOG_BREEDS_ITEMS } from "@/lib/constants/gameData/dogBreeds";
import { CAT_BREEDS_ITEMS } from "@/lib/constants/gameData/catBreeds";
import { NBA_TEAMS_ITEMS } from "@/lib/constants/gameData/nbaTeams";
import { EXOTIC_BIRDS_ITEMS } from "@/lib/constants/gameData/exoticBirds";
import { BUTTERFLIES_ITEMS } from "@/lib/constants/gameData/butterflies";

import { GameType, BaseGameItem } from "@/lib/types/core/base";

/**
 * 🎯 מפה מרכזית של כל פרטי המשחקים
 * כל רשימת פרטים מוכנה לשימוש
 */
export const GAME_ITEMS_MAP: Partial<Record<GameType, BaseGameItem[]>> = {
  animals: ALL_ANIMALS,
  colors: ALL_COLORS,
  fruits: ALL_FRUITS,
  vegetables: ALL_VEGETABLES,
  clothing: ALL_CLOTHING,
  letters: ALL_LETTERS,
  shapes: ALL_SHAPES,
  numbers: ALL_NUMBERS,
  weather: ALL_WEATHERS,
  "colored-shapes": ALL_COLORED_SHAPES, // ✅ חדש! משחק צורות צבעוניות
  
  // עודכן עם הקבועים הנכונים:
  "smells-tastes": ALL_SMELLS_TASTES, // ✅ עודכן!
  transport: ALL_TRANSPORTS, // ✅ עודכן!
  vehicles: ALL_VEHICLES, // ✅ עודכן!
  tools: ALL_TOOLS, // ✅ עודכן!
  space: ALL_SPACE_OBJECTS, // ✅ עודכן!
  house: ALL_HOUSE_ITEMS, // ✅ עודכן!
  instruments: ALL_INSTRUMENTS, // ✅ עודכן!
  professions: ALL_PROFESSIONS, // ✅ עודכן!
  emotions: ALL_EMOTIONS, // ✅ עודכן!
  memory: ALL_ANIMALS, // נשאר בעלי חיים - יש לוגיקה מיוחדת במשחק
  counting: ALL_NUMBERS, // ✅ עודכן!
  math: ALL_NUMBERS, // ✅ עודכן!
  bubbles: ALL_COLORS, // ✅ עודכן!
  puzzles: ALL_SHAPES, // ✅ עודכן! (זמני - צריך נתוני פאזלים ייעודיים)
  building: ALL_SHAPES, // ✅ עודכן! משחק בנייה יצירתי
  tetris: ALL_SHAPES, // ✅ טטריס עם צורות
  // משחקים חדשים
  sports: SPORTS_ITEMS, // ✅ משחק ספורט
  kitchen: KITCHEN_ITEMS, // ✅ משחק כלי מטבח
  "body-parts": BODY_PARTS_ITEMS, // ✅ משחק חלקי גוף
  family: FAMILY_ITEMS, // ✅ משחק בני משפחה
  dinosaurs: DINOSAURS_ITEMS, // ✅ משחק דינוזאורים
  // משחקים נוספים חדשים
  "world-food": WORLD_FOOD_ITEMS, // ✅ משחק מזון מסביב לעולם
  recycling: RECYCLING_ITEMS, // ✅ משחק מחזור וקיימות
  medicine: MEDICINE_ITEMS, // ✅ משחק מרקחת ותרופות
  "nature-sounds": NATURE_SOUNDS_ITEMS, // ✅ משחק צלילי הטבע
  "seasons-holidays": SEASONS_HOLIDAYS_ITEMS, // ✅ משחק עונות השנה ומועדים
  feelings: FEELINGS_ITEMS, // ✅ משחק ריגושים ותחושות
  "shopping-money": SHOPPING_MONEY_ITEMS, // ✅ משחק קניות וכסף
  "road-safety": ROAD_SAFETY_ITEMS, // ✅ משחק בטיחות בדרכים
  // 6 משחקים חדשים
  "ocean-life": OCEAN_LIFE_ITEMS, // ✅ משחק חיי ים
  "garden-plants": GARDEN_PLANTS_ITEMS, // ✅ משחק צמחי גן
  "magic-fairy-tales": MAGIC_FAIRY_TALES_ITEMS, // ✅ משחק אגדות קסם
  "space-adventure": ALL_SPACE_OBJECTS, // ✅ משחק הרפתקאות בחלל
  "cooking-kitchen": KITCHEN_ITEMS, // ✅ משחק בישול במטבח
  "circus-show": CIRCUS_SHOW_ITEMS, // ✅ משחק מופע קרקס
  // 6 משחקים טכנולוגיים חדשים
  "virtual-reality": VIRTUAL_REALITY_ITEMS, // ✅ משחק מציאות מדומה
  "new-professions": NEW_PROFESSIONS_ITEMS, // ✅ משחק מקצועות חדשים
  "advanced-weather": ADVANCED_WEATHER_ITEMS, // ✅ משחק מזג אוויר מתקדם
  "advanced-colors": ADVANCED_COLORS_ITEMS, // ✅ משחק צבעים מתקדם
  "jewish-holidays": JEWISH_HOLIDAYS_ITEMS, // ✅ משחק חגים יהודיים
  "logic-games": LOGIC_GAMES_ITEMS, // ✅ משחק משחקי לוגיקה
  // 6 משחקים חדשניים יוצאי דופן
  "sound-imitation": SOUND_IMITATION_ITEMS, // ✅ משחק חיקוי קולות ורעשים
  "body-movements": BODY_MOVEMENTS_ITEMS, // ✅ משחק תנועות גוף וריקוד
  "touch-senses": TOUCH_SENSES_ITEMS, // ✅ משחק מגע וחושים
  "emotional-social": EMOTIONAL_SOCIAL_ITEMS, // ✅ משחק מציאות רגשית וחברתית
  "time-clock": TIME_CLOCK_ITEMS, // ✅ משחק זמן ושעות היום
  "climate-planet": CLIMATE_PLANET_ITEMS, // ✅ משחק אקלים וכדור הארץ
  // 6 משחקים כיפיים חדשים
  "birds": BIRDS_ITEMS, // ✅ משחק ציפורים
  "bugs-insects": BUGS_INSECTS_ITEMS, // ✅ משחק חרקים ופרפרים
  "superheroes": SUPERHEROES_ITEMS, // ✅ משחק גיבורי על
  "art-craft": ART_CRAFT_ITEMS, // ✅ משחק אמנות ויצירה
  "camping": CAMPING_ITEMS, // ✅ משחק טיול ושטח
  "fairy-tale-chars": FAIRY_TALE_CHARS_ITEMS, // ✅ משחק דמויות מאגדות
  // משחקי גיאוגרפיה
  "flags": FLAGS_ITEMS, // ✅ משחק דגלי מדינות
  // משחקי ספורט
  "soccer-logos": SOCCER_LOGOS_ITEMS, // ✅ משחק סמלי כדורגל
  // משחקי תחבורה וסמלים
  "car-brands": CAR_BRANDS_ITEMS, // ✅ משחק לוגואים של מכוניות
  "world-landmarks": WORLD_LANDMARKS_ITEMS, // ✅ משחק אתרים מפורסמים
  // משחקי מדע ותרבות
  "solar-system": SOLAR_SYSTEM_ITEMS, // ✅ משחק מערכת השמש
  "famous-paintings": FAMOUS_PAINTINGS_ITEMS, // ✅ משחק ציורים מפורסמים
  // משחקי לוגואים וחיות
  "tech-logos": TECH_LOGOS_ITEMS, // ✅ משחק לוגואים טכנולוגיה
  "dog-breeds": DOG_BREEDS_ITEMS, // ✅ משחק גזעי כלבים
  "cat-breeds": CAT_BREEDS_ITEMS, // ✅ משחק גזעי חתולים
  "nba-teams": NBA_TEAMS_ITEMS, // ✅ משחק קבוצות NBA
  // משחקי טבע וחרקים
  "exotic-birds": EXOTIC_BIRDS_ITEMS, // ✅ משחק ציפורים אקזוטיות
  "butterflies": BUTTERFLIES_ITEMS, // ✅ משחק פרפרים
} as const;
