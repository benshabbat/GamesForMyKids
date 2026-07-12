/**
 * נתוני המשחקים - ספורט ופעילות גופנית
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני ספורט
 * ===============================================
 */
export const SPORTS_CONSTANTS: Record<string, BaseGameItem> = {
  SOCCER: { name: "soccer", hebrew: "כדורגל", hebrewNikud: "כַּדּוּרֶגֶל", english: "Soccer", emoji: "⚽", color: "bg-green-500", sound: [440, 550, 660] },
  BASKETBALL: { name: "basketball", hebrew: "כדורסל", hebrewNikud: "כַּדּוּרְסַל", english: "Basketball", emoji: "🏀", color: "bg-orange-500", sound: [392, 494, 587] },
  TENNIS: { name: "tennis", hebrew: "טניס", hebrewNikud: "טֶנִיס", english: "Tennis", emoji: "🎾", color: "bg-yellow-500", sound: [349, 440, 523] },
  SWIMMING: { name: "swimming", hebrew: "שחייה", hebrewNikud: "שְׂחִיָּה", english: "Swimming", emoji: "🏊", color: "bg-blue-500", sound: [523, 659, 784] },
  RUNNING: { name: "running", hebrew: "ריצה", hebrewNikud: "רִיצָה", english: "Running", emoji: "🏃", color: "bg-red-500", sound: [294, 370, 440] },
  CYCLING: { name: "cycling", hebrew: "רכיבה על אופניים", hebrewNikud: "רְכִיבָה עַל אוֹפַנַּיִים", english: "Cycling", emoji: "🚴", color: "bg-green-400", sound: [330, 415, 494] },
  VOLLEYBALL: { name: "volleyball", hebrew: "כדורעף", hebrewNikud: "כַּדּוּרְעָף", english: "Volleyball", emoji: "🏐", color: "bg-purple-500", sound: [587, 698, 784] },
  BADMINTON: { name: "badminton", hebrew: "בדמינטון", hebrewNikud: "בֶּדְמִינְטוֹן", english: "Badminton", emoji: "🏸", color: "bg-pink-500", sound: [196, 247, 294] },
  BOXING: { name: "boxing", hebrew: "אגרוף", hebrewNikud: "אִגְרוּף", english: "Boxing", emoji: "🥊", color: "bg-gray-700", sound: [659, 831, 988] },
  WRESTLING: { name: "wrestling", hebrew: "אבקות", hebrewNikud: "אֲבָקוּת", english: "Wrestling", emoji: "🤼", color: "bg-indigo-500", sound: [277, 349, 415] },
  GYMNASTICS: { name: "gymnastics", hebrew: "התעמלות", hebrewNikud: "הִתְעַמְּלוּת", english: "Gymnastics", emoji: "🤸", color: "bg-pink-400", sound: [415, 523, 622] },
  WEIGHTLIFTING: { name: "weightlifting", hebrew: "הרמת משקולות", hebrewNikud: "הֲרָמַת מִשְׁקוֹלוֹת", english: "Weightlifting", emoji: "🏋️", color: "bg-gray-600", sound: [220, 277, 330] },
};

/**
 * ===============================================
 * נתוני ציוד ספורט
 * ===============================================
 */
export const SPORTS_EQUIPMENT_CONSTANTS: Record<string, BaseGameItem> = {
  BALL: { name: "ball", hebrew: "כדור", hebrewNikud: "כַּדּוּר", english: "Ball", emoji: "⚽", color: "bg-white", sound: [440, 550, 660] },
  RACKET: { name: "racket", hebrew: "מחבט", hebrewNikud: "מַחְבֵּט", english: "Racket", emoji: "🎾", color: "bg-yellow-400", sound: [392, 494, 587] },
  HELMET: { name: "helmet", hebrew: "קסדה", hebrewNikud: "קַסְדָּה", english: "Helmet", emoji: "⛑️", color: "bg-red-600", sound: [349, 440, 523] },
  SHOES: { name: "shoes", hebrew: "נעלי ספורט", hebrewNikud: "נַעֲלֵי סְפּוֹרְט", english: "Sports Shoes", emoji: "👟", color: "bg-blue-400", sound: [523, 659, 784] },
  GLOVES: { name: "gloves", hebrew: "כפפות", hebrewNikud: "כְּפָפוֹת", english: "Gloves", emoji: "🥊", color: "bg-gray-700", sound: [294, 370, 440] },
  NET: { name: "net", hebrew: "רשת", hebrewNikud: "רֶשֶׁת", english: "Net", emoji: "🥅", color: "bg-green-300", sound: [330, 415, 494] },
  WHISTLE: { name: "whistle", hebrew: "שריקה", hebrewNikud: "שְׁרִיקָה", english: "Whistle", emoji: "📯", color: "bg-yellow-600", sound: [587, 698, 784] },
  MEDAL: { name: "medal", hebrew: "מדליה", hebrewNikud: "מֶדַלְיָה", english: "Medal", emoji: "🏅", color: "bg-yellow-500", sound: [196, 247, 294] },
  TROPHY: { name: "trophy", hebrew: "גביע", hebrewNikud: "גָּבִיעַ", english: "Trophy", emoji: "🏆", color: "bg-yellow-500", sound: [659, 831, 988] },
  STOPWATCH: { name: "stopwatch", hebrew: "שעון עצר", hebrewNikud: "שְׁעוֹן עֶצֶר", english: "Stopwatch", emoji: "⏱️", color: "bg-gray-500", sound: [277, 349, 415] },
};

// ייצוא רשימות והגדרות
export const SPORTS_ITEMS = createItemsList(SPORTS_CONSTANTS);
export const SPORTS_PRONUNCIATIONS = createPronunciationDictionary(SPORTS_CONSTANTS);
export const SPORTS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "ספורט ופעילות גופנית",
  description: "למד על ספורט ופעילות גופנית!"
};

export const SPORTS_EQUIPMENT_ITEMS = createItemsList(SPORTS_EQUIPMENT_CONSTANTS);
export const SPORTS_EQUIPMENT_PRONUNCIATIONS = createPronunciationDictionary(SPORTS_EQUIPMENT_CONSTANTS);
export const SPORTS_EQUIPMENT_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "ציוד ספורט",
  description: "למד על ציוד ספורט שונה!"
};