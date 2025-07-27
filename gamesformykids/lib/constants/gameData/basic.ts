/**
 * נתוני המשחקים - צבעים, אותיות, מספרים, צורות
 */

import { BaseGameItem } from "@/lib/types/base";
import { NumberItem, ShapeItem } from "@/lib/types/games";
import { createGameConfig, createItemsList, createPronunciationDictionary } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני צבעים
 * ===============================================
 */
export const COLOR_CONSTANTS: Record<string, BaseGameItem> = {
  RED: { name: "red", hebrew: "אדום", english: "Red", emoji: "🔴", color: "bg-gradient-to-br from-red-400 to-red-600", sound: [440, 550, 660] },
  BLUE: { name: "blue", hebrew: "כחול", english: "Blue", emoji: "🔵", color: "bg-gradient-to-br from-blue-400 to-blue-600", sound: [523, 659, 784] },
  GREEN: { name: "green", hebrew: "ירוק", english: "Green", emoji: "🟢", color: "bg-gradient-to-br from-green-400 to-green-600", sound: [349, 440, 523] },
  YELLOW: { name: "yellow", hebrew: "צהוב", english: "Yellow", emoji: "🟡", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", sound: [392, 494, 587] },
  PURPLE: { name: "purple", hebrew: "סגול", english: "Purple", emoji: "🟣", color: "bg-gradient-to-br from-purple-400 to-purple-600", sound: [294, 370, 440] },
  ORANGE: { name: "orange", hebrew: "כתום", english: "Orange", emoji: "🟠", color: "bg-gradient-to-br from-orange-400 to-orange-600", sound: [330, 415, 494] },
  PINK: { name: "pink", hebrew: "ורוד", english: "Pink", emoji: "🩷", color: "bg-gradient-to-br from-pink-400 to-pink-600", sound: [587, 698, 784] },
  BROWN: { name: "brown", hebrew: "חום", english: "Brown", emoji: "🤎", color: "bg-gradient-to-br from-amber-500 to-amber-700", sound: [220, 277, 330] },
  BLACK: { name: "black", hebrew: "שחור", english: "Black", emoji: "⚫", color: "bg-gradient-to-br from-gray-800 to-gray-950", sound: [196, 247, 294] },
  WHITE: { name: "white", hebrew: "לבן", english: "White", emoji: "⚪", color: "bg-gradient-to-br from-gray-50 to-gray-200 border-2 border-gray-300", sound: [659, 784, 880] },
};

/**
 * ===============================================
 * נתוני אותיות
 * ===============================================
 */
export const LETTER_CONSTANTS: Record<string, BaseGameItem> = {
  ALEF: { name: "alef", hebrew: "א", english: "A", emoji: "א", color: "", sound: [440, 550, 660] },
  BET: { name: "bet", hebrew: "ב", english: "B", emoji: "ב", color: "", sound: [494, 588, 740] },
  GIMEL: { name: "gimel", hebrew: "ג", english: "G", emoji: "ג", color: "", sound: [523, 659, 784] },
  DALET: { name: "dalet", hebrew: "ד", english: "D", emoji: "ד", color: "", sound: [587, 740, 880] },
  HEY: { name: "hey", hebrew: "ה", english: "H", emoji: "ה", color: "", sound: [659, 831, 988] },
  VAV: { name: "vav", hebrew: "ו", english: "V", emoji: "ו", color: "", sound: [392, 494, 622] },
  ZAYIN: { name: "zayin", hebrew: "ז", english: "Z", emoji: "ז", color: "", sound: [349, 440, 523] },
  HET: { name: "het", hebrew: "ח", english: "CH", emoji: "ח", color: "", sound: [330, 415, 494] },
  TET: { name: "tet", hebrew: "ט", english: "T", emoji: "ט", color: "", sound: [294, 370, 440] },
  YUD: { name: "yud", hebrew: "י", english: "Y", emoji: "י", color: "", sound: [277, 349, 415] },
  KAF: { name: "kaf", hebrew: "כ", english: "K", emoji: "כ", color: "", sound: [262, 330, 392] },
  LAMED: { name: "lamed", hebrew: "ל", english: "L", emoji: "ל", color: "", sound: [247, 311, 370] },
  MEM: { name: "mem", hebrew: "מ", english: "M", emoji: "מ", color: "", sound: [233, 294, 349] },
  NUN: { name: "nun", hebrew: "נ", english: "N", emoji: "נ", color: "", sound: [220, 277, 330] },
  SAMECH: { name: "samech", hebrew: "ס", english: "S", emoji: "ס", color: "", sound: [208, 262, 311] },
  AYIN: { name: "ayin", hebrew: "ע", english: "A", emoji: "ע", color: "", sound: [196, 247, 294] },
  PEY: { name: "pey", hebrew: "פ", english: "P", emoji: "פ", color: "", sound: [185, 233, 277] },
  TZADI: { name: "tzadi", hebrew: "צ", english: "TZ", emoji: "צ", color: "", sound: [175, 220, 262] },
  KUF: { name: "kuf", hebrew: "ק", english: "K", emoji: "ק", color: "", sound: [165, 208, 247] },
  RESH: { name: "resh", hebrew: "ר", english: "R", emoji: "ר", color: "", sound: [156, 196, 233] },
  SHIN: { name: "shin", hebrew: "ש", english: "SH", emoji: "ש", color: "", sound: [147, 185, 220] },
  TAV: { name: "tav", hebrew: "ת", english: "T", emoji: "ת", color: "", sound: [139, 175, 208] },
};

/**
 * ===============================================
 * נתוני צורות
 * ===============================================
 */
export const SHAPE_CONSTANTS: Record<string, ShapeItem> = {
  CIRCLE: { name: "circle", hebrew: "עיגול", english: "Circle", emoji: "⭕", color: "bg-blue-500", sound: [523, 659, 784], svg: "circle" },
  SQUARE: { name: "square", hebrew: "ריבוע", english: "Square", emoji: "⬜", color: "bg-red-500", sound: [440, 550, 660], svg: "square" },
  TRIANGLE: { name: "triangle", hebrew: "משולש", english: "Triangle", emoji: "🔺", color: "bg-green-500", sound: [349, 440, 523], svg: "triangle" },
  RECTANGLE: { name: "rectangle", hebrew: "מלבן", english: "Rectangle", emoji: "▬", color: "bg-purple-500", sound: [294, 370, 440], svg: "rectangle" },
  STAR: { name: "star", hebrew: "כוכב", english: "Star", emoji: "⭐", color: "bg-yellow-500", sound: [392, 494, 587], svg: "star" },
  HEART: { name: "heart", hebrew: "לב", english: "Heart", emoji: "❤️", color: "bg-pink-500", sound: [587, 698, 784], svg: "heart" },
  DIAMOND: { name: "diamond", hebrew: "מעויין", english: "Diamond", emoji: "💎", color: "bg-indigo-500", sound: [277, 349, 415], svg: "diamond" },
  OVAL: { name: "oval", hebrew: "אליפסה", english: "Oval", emoji: "⭕", color: "bg-teal-500", sound: [220, 277, 330], svg: "oval" }
};

/**
 * ===============================================
 * נתוני מספרים
 * ===============================================
 */
export const NUMBER_CONSTANTS: Record<string, NumberItem> = {
  ZERO: { name: "zero", hebrew: "אפס", english: "Zero", emoji: "0️⃣", digit: "0", color: "", sound: [261, 329, 392] },
  ONE: { name: "one", hebrew: "אחד", english: "One", emoji: "1️⃣", digit: "1", color: "", sound: [293, 369, 440] },
  TWO: { name: "two", hebrew: "שתיים", english: "Two", emoji: "2️⃣", digit: "2", color: "", sound: [329, 415, 494] },
  THREE: { name: "three", hebrew: "שלוש", english: "Three", emoji: "3️⃣", digit: "3", color: "", sound: [349, 440, 523] },
  FOUR: { name: "four", hebrew: "ארבע", english: "Four", emoji: "4️⃣", digit: "4", color: "", sound: [392, 494, 587] },
  FIVE: { name: "five", hebrew: "חמש", english: "Five", emoji: "5️⃣", digit: "5", color: "", sound: [440, 554, 659] },
  SIX: { name: "six", hebrew: "שש", english: "Six", emoji: "6️⃣", digit: "6", color: "", sound: [493, 622, 740] },
  SEVEN: { name: "seven", hebrew: "שבע", english: "Seven", emoji: "7️⃣", digit: "7", color: "", sound: [523, 659, 784] },
  EIGHT: { name: "eight", hebrew: "שמונה", english: "Eight", emoji: "8️⃣", digit: "8", color: "", sound: [587, 740, 880] },
  NINE: { name: "nine", hebrew: "תשע", english: "Nine", emoji: "9️⃣", digit: "9", color: "", sound: [659, 831, 988] },
};

/**
 * ===============================================
 * רשימות ויצוא אוטומטי
 * ===============================================
 */
export const ALL_COLORS = createItemsList(COLOR_CONSTANTS);
export const ALL_LETTERS = createItemsList(LETTER_CONSTANTS);
export const ALL_SHAPES = createItemsList(SHAPE_CONSTANTS);
export const ALL_NUMBERS = Object.values(NUMBER_CONSTANTS);

export const COLOR_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(COLOR_CONSTANTS);
export const LETTER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(LETTER_CONSTANTS);
export const SHAPE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SHAPE_CONSTANTS);
export const NUMBER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(NUMBER_CONSTANTS);

/**
 * ===============================================
 * קונפיגורציות משחקים
 * ===============================================
 */
export const COLOR_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const LETTER_GAME_CONSTANTS = createGameConfig(6, 2, 3);
export const SHAPE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const NUMBER_GAME_CONSTANTS = createGameConfig(5, 1, 3);
