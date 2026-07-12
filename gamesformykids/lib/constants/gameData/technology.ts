/**
 * נתוני משחקים - טכנולוגיה ומציאות מדומה
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני מציאות מדומה
 * ===============================================
 */
export const VIRTUAL_REALITY_CONSTANTS: Record<string, BaseGameItem> = {
  VR_HEADSET: { name: "vr_headset", hebrew: "קסדת VR", hebrewNikud: "קַסְדַּת VR", english: "VR Headset", emoji: "🥽", color: "bg-purple-500", sound: [440, 554, 659] },
  CONTROLLER: { name: "controller", hebrew: "בקר", hebrewNikud: "בַּקָּר", english: "Controller", emoji: "🎮", color: "bg-blue-500", sound: [392, 494, 587] },
  VIRTUAL_WORLD: { name: "virtual_world", hebrew: "עולם וירטואלי", hebrewNikud: "עוֹלָם וִירְטוּאָלִי", english: "Virtual World", emoji: "🌐", color: "bg-green-500", sound: [523, 659, 784] },
  AVATAR: { name: "avatar", hebrew: "דמות וירטואלית", hebrewNikud: "דְּמוּת וִירְטוּאָלִית", english: "Avatar", emoji: "👤", color: "bg-orange-500", sound: [330, 415, 494] },
  SIMULATION: { name: "simulation", hebrew: "סימולציה", hebrewNikud: "סִימוּלַצְיָה", english: "Simulation", emoji: "💻", color: "bg-cyan-500", sound: [294, 370, 440] },
  HOLOGRAM: { name: "hologram", hebrew: "הולוגרמה", hebrewNikud: "הוֹלוֹגְרָמָה", english: "Hologram", emoji: "✨", color: "bg-purple-400", sound: [587, 740, 880] },
  DIGITAL_ART: { name: "digital_art", hebrew: "אמנות דיגיטלית", hebrewNikud: "אָמָּנוּת דִּיגִיטָלִית", english: "Digital Art", emoji: "🎨", color: "bg-pink-500", sound: [262, 330, 392] },
  VIRTUAL_TRAVEL: { name: "virtual_travel", hebrew: "טיול וירטואלי", hebrewNikud: "טִיּוּל וִירְטוּאָלִי", english: "Virtual Travel", emoji: "🚀", color: "bg-indigo-500", sound: [220, 277, 330] },
  AUGMENTED_REALITY: { name: "augmented_reality", hebrew: "מציאות רבודה", hebrewNikud: "מְצִיאוּת רְבוּדָה", english: "Augmented Reality", emoji: "📱", color: "bg-teal-500", sound: [196, 247, 294] },
  VIRTUAL_MEETING: { name: "virtual_meeting", hebrew: "פגישה וירטואלית", hebrewNikud: "פְּגִישָׁה וִירְטוּאָלִית", english: "Virtual Meeting", emoji: "💬", color: "bg-yellow-500", sound: [659, 831, 988] },
};

/**
 * ===============================================
 * נתוני מקצועות מודרניים
 * ===============================================
 */
export const NEW_PROFESSIONS_CONSTANTS: Record<string, BaseGameItem> = {
  SOFTWARE_DEVELOPER: { name: "software_developer", hebrew: "מפתח תוכנה", hebrewNikud: "מְפַתֵּחַ תּוֹכְנָה", english: "Software Developer", emoji: "👨‍💻", color: "bg-blue-600", sound: [440, 554, 659] },
  DATA_SCIENTIST: { name: "data_scientist", hebrew: "מדען נתונים", hebrewNikud: "מַדְעָן נְתוּנִים", english: "Data Scientist", emoji: "📊", color: "bg-green-600", sound: [392, 494, 587] },
  UX_DESIGNER: { name: "ux_designer", hebrew: "מעצב חוויית משתמש", hebrewNikud: "מְעַצֵּב חֲוָיַּת מִשְׁתַּמֵּשׁ", english: "UX Designer", emoji: "🎨", color: "bg-purple-600", sound: [523, 659, 784] },
  YOUTUBER: { name: "youtuber", hebrew: "יוטיובר", hebrewNikud: "יוּטְיוּבֶּר", english: "YouTuber", emoji: "📹", color: "bg-red-600", sound: [330, 415, 494] },
  APP_DEVELOPER: { name: "app_developer", hebrew: "מפתח אפליקציות", hebrewNikud: "מְפַתֵּחַ אַפְּלִיקַצְיוֹת", english: "App Developer", emoji: "📱", color: "bg-indigo-600", sound: [294, 370, 440] },
  SOCIAL_MEDIA_MANAGER: { name: "social_media_manager", hebrew: "מנהל רשתות חברתיות", hebrewNikud: "מְנַהֵל רְשָׁתוֹת חֶבְרָתִיּוֹת", english: "Social Media Manager", emoji: "📲", color: "bg-pink-600", sound: [587, 740, 880] },
  DRONE_PILOT: { name: "drone_pilot", hebrew: "טייס רחפנים", hebrewNikud: "טַיָּס רַחֲפָנִים", english: "Drone Pilot", emoji: "🚁", color: "bg-orange-600", sound: [262, 330, 392] },
  CYBERSECURITY_EXPERT: { name: "cybersecurity_expert", hebrew: "מומחה אבטחת מידע", hebrewNikud: "מֻמְחֶה אַבְטָחַת מֵידָע", english: "Cybersecurity Expert", emoji: "🔒", color: "bg-gray-600", sound: [220, 277, 330] },
  AI_ENGINEER: { name: "ai_engineer", hebrew: "מהנדס בינה מלאכותית", hebrewNikud: "מְהַנְדֵּס בִּינָה מְלָאכוּתִית", english: "AI Engineer", emoji: "🤖", color: "bg-cyan-600", sound: [196, 247, 294] },
  GAME_DEVELOPER: { name: "game_developer", hebrew: "מפתח משחקים", hebrewNikud: "מְפַתֵּחַ מִשְׂחָקִים", english: "Game Developer", emoji: "🎮", color: "bg-teal-600", sound: [659, 831, 988] },
};

/**
 * ===============================================
 * נתוני חגים יהודיים
 * ===============================================
 */
export const JEWISH_HOLIDAYS_CONSTANTS: Record<string, BaseGameItem> = {
  ROSH_HASHANA: { name: "rosh_hashana", hebrew: "ראש השנה", hebrewNikud: "רֹאשׁ הַשָּׁנָה", english: "Rosh Hashanah", emoji: "🍎", color: "bg-red-500", sound: [440, 554, 659] },
  YOM_KIPPUR: { name: "yom_kippur", hebrew: "יום כיפור", hebrewNikud: "יוֹם כִּפּוּר", english: "Yom Kippur", emoji: "🕊️", color: "bg-white", sound: [392, 494, 587] },
  SUKKOT: { name: "sukkot", hebrew: "סוכות", hebrewNikud: "סֻכּוֹת", english: "Sukkot", emoji: "🏠", color: "bg-green-500", sound: [523, 659, 784] },
  HANUKKAH: { name: "hanukkah", hebrew: "חנוכה", hebrewNikud: "חֲנֻכָּה", english: "Hanukkah", emoji: "🕎", color: "bg-blue-500", sound: [330, 415, 494] },
  PURIM: { name: "purim", hebrew: "פורים", hebrewNikud: "פּוּרִים", english: "Purim", emoji: "🎭", color: "bg-purple-500", sound: [294, 370, 440] },
  PASSOVER: { name: "passover", hebrew: "פסח", hebrewNikud: "פֶּסַח", english: "Passover", emoji: "🍷", color: "bg-red-600", sound: [587, 740, 880] },
  SHAVOT: { name: "shavot", hebrew: "שבועות", hebrewNikud: "שָׁבוּעוֹת", english: "Shavot", emoji: "🌾", color: "bg-yellow-500", sound: [262, 330, 392] },
  SHABBAT: { name: "shabbat", hebrew: "שבת", hebrewNikud: "שַׁבָּת", english: "Shabbat", emoji: "🕯️", color: "bg-orange-400", sound: [220, 277, 330] },
  TU_BISHVAT: { name: "tu_bishvat", hebrew: "ט״ו בשבט", hebrewNikud: "ט״וּ בִּשְׁבָט", english: "Tu BiShvat", emoji: "🌳", color: "bg-green-400", sound: [196, 247, 294] },
  LAG_BAOMER: { name: "lag_baomer", hebrew: "ל״ג בעומר", hebrewNikud: "ל״ג בָּעוֹמֶר", english: "Lag BaOmer", emoji: "🔥", color: "bg-orange-500", sound: [659, 831, 988] },
};

/**
 * ===============================================
 * נתוני משחקי לוגיקה
 * ===============================================
 */
export const LOGIC_GAMES_CONSTANTS: Record<string, BaseGameItem> = {
  PATTERN: { name: "pattern", hebrew: "תבנית", hebrewNikud: "תַּבְנִית", english: "Pattern", emoji: "🔄", color: "bg-blue-500", sound: [440, 554, 659] },
  SEQUENCE: { name: "sequence", hebrew: "רצף", hebrewNikud: "רֶצֶף", english: "Sequence", emoji: "🔢", color: "bg-green-500", sound: [392, 494, 587] },
  MATCHING: { name: "matching", hebrew: "התאמה", hebrewNikud: "הַתְאָמָה", english: "Matching", emoji: "🔗", color: "bg-purple-500", sound: [523, 659, 784] },
  SORTING: { name: "sorting", hebrew: "מיון", hebrewNikud: "מִיּוּן", english: "Sorting", emoji: "📊", color: "bg-orange-500", sound: [330, 415, 494] },
  CLASSIFICATION: { name: "classification", hebrew: "סיווג", hebrewNikud: "סִוּוּג", english: "Classification", emoji: "📋", color: "bg-cyan-500", sound: [294, 370, 440] },
  COMPARISON: { name: "comparison", hebrew: "השוואה", hebrewNikud: "הַשְׁוָאָה", english: "Comparison", emoji: "⚖️", color: "bg-yellow-500", sound: [587, 740, 880] },
  PROBLEM_SOLVING: { name: "problem_solving", hebrew: "פתרון בעיות", hebrewNikud: "פִּתְרוֹן בְּעָיוֹת", english: "Problem Solving", emoji: "🧩", color: "bg-indigo-500", sound: [262, 330, 392] },
  CRITICAL_THINKING: { name: "critical_thinking", hebrew: "חשיבה ביקורתית", hebrewNikud: "חֲשִׁיבָה בִּיקוֹרְתִּית", english: "Critical Thinking", emoji: "🤔", color: "bg-pink-500", sound: [220, 277, 330] },
  DEDUCTION: { name: "deduction", hebrew: "הסקת מסקנות", hebrewNikud: "הַסָּקַת מַסְקָנוֹת", english: "Deduction", emoji: "🔍", color: "bg-gray-500", sound: [196, 247, 294] },
  ANALYSIS: { name: "analysis", hebrew: "ניתוח", hebrewNikud: "נִתּוּחַ", english: "Analysis", emoji: "🔬", color: "bg-teal-500", sound: [659, 831, 988] },
};

/**
 * ===============================================
 * רשימות ויצוא אוטומטי
 * ===============================================
 */
export const VIRTUAL_REALITY_ITEMS = createItemsList(VIRTUAL_REALITY_CONSTANTS);
export const NEW_PROFESSIONS_ITEMS = createItemsList(NEW_PROFESSIONS_CONSTANTS);
export const JEWISH_HOLIDAYS_ITEMS = createItemsList(JEWISH_HOLIDAYS_CONSTANTS);
export const LOGIC_GAMES_ITEMS = createItemsList(LOGIC_GAMES_CONSTANTS);

export const VIRTUAL_REALITY_PRONUNCIATIONS = createPronunciationDictionary(VIRTUAL_REALITY_CONSTANTS);
export const NEW_PROFESSIONS_PRONUNCIATIONS = createPronunciationDictionary(NEW_PROFESSIONS_CONSTANTS);
export const JEWISH_HOLIDAYS_PRONUNCIATIONS = createPronunciationDictionary(JEWISH_HOLIDAYS_CONSTANTS);
export const LOGIC_GAMES_PRONUNCIATIONS = createPronunciationDictionary(LOGIC_GAMES_CONSTANTS);

export const VIRTUAL_REALITY_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "מציאות מדומה",
  description: "גלה עולמות חדשים במציאות מדומה!"
};

export const NEW_PROFESSIONS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "מקצועות מודרניים",
  description: "למד על מקצועות חדשים וטכנולוגיים!"
};

export const JEWISH_HOLIDAYS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "חגים יהודיים",
  description: "למד על חגי ישראל ומסורותיהם!"
};

export const LOGIC_GAMES_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחקי לוגיקה",
  description: "פתח את יכולות החשיבה והלוגיקה!"
};