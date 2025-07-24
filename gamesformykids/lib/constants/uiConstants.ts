/**
 * קבועים הקשורים לממשק המשתמש של המשחקים
 */

import { GameStep } from "../types/uiTypes";



/**
 * שלבי משחק האותיות
 */
export const LETTER_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "איזו אות אני אומר" },
  { icon: "🤔", title: "2. תחשוב", description: "איך נראית האות" },
  { icon: "👆", title: "3. תלחץ", description: "על האות הנכונה" },
];

/**
 * שלבי משחק הצבעים
 */
export const COLOR_GAME_STEPS: GameStep[] = [
  { icon: "👀", title: "1. תראה", description: "איזה צבע אני מבקש" },
  { icon: "🎤", title: "2. תשמע", description: "את שם הצבע" },
  { icon: "👆", title: "3. תלחץ", description: "על הצבע הנכון" },
];

/**
 * שלבי משחק הצורות
 */
export const SHAPE_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "איזו צורה אני אומר" },
  { icon: "🤔", title: "2. תחשוב", description: "איך נראית הצורה" },
  { icon: "👆", title: "3. תלחץ", description: "על הצורה הנכונה" },
];

/**
 * שלבי משחק המספרים
 */
export const NUMBER_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "איזה מספר אני אומר" },
  { icon: "🤔", title: "2. תחשוב", description: "איך נראה המספר" },
  { icon: "👆", title: "3. תלחץ", description: "על המספר הנכון" },
];

/**
 * שלבי משחק הזיכרון
 */
export const MEMORY_GAME_STEPS: GameStep[] = [
  { icon: "👀", title: "1. תראה", description: "לחץ על קלף כדי לחשוף חיה" },
  { icon: "🧠", title: "2. תזכור", description: "איפה ראית כל חיה" },
  { icon: "🎯", title: "3. תמצא", description: "זוגות תואמים של חיות" },
];

/**
 * רקעים של משחקים
 */
export const GAME_BACKGROUNDS = {
  LETTERS: "linear-gradient(135deg, #fed7aa 0%, #fdba74 25%, #fb923c 50%, #f97316 75%, #ea580c 100%)",
  NUMBERS: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 25%, #a5b4fc 50%, #818cf8 75%, #6366f1 100%)",
  SHAPES: "linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 25%, #7dd87d 50%, #52c952 75%, #26b926 100%)",
  COLORS: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #a8e6cf 50%, #dcedc1 75%, #ffd3e1 100%)",
  MEMORY: "linear-gradient(135deg, #fce7f3 0%, #e879f9 25%, #a855f7 50%, #7c3aed 75%, #5b21b6 100%)",
};

/**
 * צבעים לכפתורי התחלה של משחקים
 */
export const START_BUTTON_COLORS = {
  LETTERS: { from: "yellow", to: "orange" },
  NUMBERS: { from: "indigo", to: "purple" },
  SHAPES: { from: "blue", to: "green" },
  COLORS: { from: "teal", to: "cyan" },
  MEMORY: { from: "fuchsia", to: "pink" },
};



/**
 * שלבי משחק הפירות
 */
export const FRUIT_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "איזה פרי אני אומר" },
  { icon: "🤔", title: "2. תחשוב", description: "איך הפרי נראה" },
  { icon: "👆", title: "3. תלחץ", description: "על הפרי הנכון" },
];

/**
 * שלבי משחק החיות
 */
export const ANIMAL_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "איזו חיה אני אומר" },
  { icon: "🤔", title: "2. תחשוב", description: "איך החיה נראית" },
  { icon: "👆", title: "3. תלחץ", description: "על החיה הנכונה" },
];

export const COUNTING_GAME_STEPS: GameStep[] = [
  { icon: "👀", title: "1. תראה", description: "כמה אימוג'ים יש" },
  { icon: "🧮", title: "2. תספור", description: "בקול רם או בלב" },
  { icon: "👆", title: "3. תלחץ", description: "על המספר הנכון" },
];


/**
 * שלבי משחק מזג האוויר
 */
export const WEATHER_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "איזה מזג אוויר אני אומר" },
  { icon: "🤔", title: "2. תחשוב", description: "איך מזג האוויר נראה" },
  { icon: "👆", title: "3. תלחץ", description: "על מזג האוויר הנכון" },
];

/**
 * שלבי משחק כלי התחבורה
 */
export const TRANSPORT_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "איזה כלי תחבורה אני אומר" },
  { icon: "🤔", title: "2. תחשוב", description: "איך כלי התחבורה נראה" },
  { icon: "👆", title: "3. תלחץ", description: "על כלי התחבורה הנכון" },
];

/**
 * שלבי משחק החשבון
 */
export const MATH_GAME_STEPS: GameStep[] = [
  { icon: "👀", title: "1. תראה", description: "את הבעיה במתמטיקה" },
  { icon: "🧮", title: "2. תחשב", description: "עם עזרת האימוג'ים" },
  { icon: "👆", title: "3. תלחץ", description: "על התשובה הנכונה" },
];

/**
 * שלבי משחק המקצועות
 */
export const PROFESSION_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "תיאור של המקצוע" },
  { icon: "🤔", title: "2. תחשוב", description: "איזה מקצוע זה יכול להיות" },
  { icon: "👆", title: "3. תלחץ", description: "על המקצוע הנכון" },
];

/**
 * שלבי משחק הירקות
 */
export const VEGETABLE_GAME_STEPS: GameStep[] = [
  { icon: "👂", title: "1. תשמע", description: "איזה ירק אני אומר" },
  { icon: "🤔", title: "2. תחשוב", description: "איך הירק נראה" },
  { icon: "👆", title: "3. תלחץ", description: "על הירק הנכון" },
];