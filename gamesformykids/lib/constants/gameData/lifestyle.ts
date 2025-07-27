/**
 * נתוני המשחקים - בית, בגדים, כלי נגינה, מקצועות ורגשות
 */

import { BaseGameItem } from "@/lib/types/base";
import { ProfessionItem } from "@/lib/types/games";
import { createGameConfig, createItemsList, createPronunciationDictionary } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני חפצי בית
 * ===============================================
 */
export const HOUSE_CONSTANTS: Record<string, BaseGameItem> = {
  CHAIR: { name: "chair", hebrew: "כיסא", english: "Chair", emoji: "🪑", color: "bg-brown-500", sound: [440, 550, 660] },
  TABLE: { name: "table", hebrew: "שולחן", english: "Table", emoji: "🏓", color: "bg-amber-600", sound: [392, 494, 587] },
  BED: { name: "bed", hebrew: "מיטה", english: "Bed", emoji: "🛏️", color: "bg-blue-500", sound: [349, 440, 523] },
  SOFA: { name: "sofa", hebrew: "ספה", english: "Sofa", emoji: "🛋️", color: "bg-red-500", sound: [330, 415, 494] },
  LAMP: { name: "lamp", hebrew: "מנורה", english: "Lamp", emoji: "💡", color: "bg-yellow-500", sound: [294, 370, 440] },
};

/**
 * ===============================================
 * נתוני בגדים
 * ===============================================
 */
export const CLOTHING_CONSTANTS: Record<string, BaseGameItem> = {
  SHIRT: { name: "shirt", hebrew: "חולצה", english: "Shirt", emoji: "👕", color: "bg-blue-500", sound: [440, 550, 660] },
  PANTS: { name: "pants", hebrew: "מכנסיים", english: "Pants", emoji: "👖", color: "bg-indigo-600", sound: [392, 494, 587] },
  DRESS: { name: "dress", hebrew: "שמלה", english: "Dress", emoji: "👗", color: "bg-pink-500", sound: [523, 659, 784] },
  SHOES: { name: "shoes", hebrew: "נעליים", english: "Shoes", emoji: "👟", color: "bg-gray-600", sound: [349, 440, 523] },
  HAT: { name: "hat", hebrew: "כובע", english: "Hat", emoji: "🧢", color: "bg-red-500", sound: [330, 415, 494] },
  JACKET: { name: "jacket", hebrew: "מעיל", english: "Jacket", emoji: "🧥", color: "bg-brown-600", sound: [262, 330, 392] },
};

/**
 * ===============================================
 * נתוני כלי נגינה
 * ===============================================
 */
export const INSTRUMENT_CONSTANTS: Record<string, BaseGameItem> = {
  PIANO: { name: "piano", hebrew: "פסנתר", english: "Piano", emoji: "🎹", color: "bg-black", sound: [523, 659, 784] },
  GUITAR: { name: "guitar", hebrew: "גיטרה", english: "Guitar", emoji: "🎸", color: "bg-amber-600", sound: [330, 415, 494] },
  VIOLIN: { name: "violin", hebrew: "כינור", english: "Violin", emoji: "🎻", color: "bg-amber-800", sound: [440, 554, 659] },
  DRUMS: { name: "drums", hebrew: "תופים", english: "Drums", emoji: "🥁", color: "bg-red-600", sound: [196, 247, 294] },
  TRUMPET: { name: "trumpet", hebrew: "חצוצרה", english: "Trumpet", emoji: "🎺", color: "bg-yellow-500", sound: [587, 740, 880] },
  FLUTE: { name: "flute", hebrew: "חליל", english: "Flute", emoji: "🪈", color: "bg-gray-400", sound: [659, 831, 988] },
};

/**
 * ===============================================
 * נתוני מקצועות
 * ===============================================
 */
export const PROFESSION_CONSTANTS: Record<string, ProfessionItem> = {
  DOCTOR: {
    id: "doctor", 
    emoji: "👩‍⚕️", 
    name: "doctor", 
    hebrew: "רופאה", 
    english: "Doctor",
    description: "מטפלת בחולים ועוזרת להם להרגיש טוב",
    sound: [523, 659, 784], 
    color: "bg-gradient-to-br from-blue-200 to-blue-300"
  },
  TEACHER: {
    id: "teacher", 
    emoji: "👩‍🏫", 
    name: "teacher", 
    hebrew: "מורה", 
    english: "Teacher",
    description: "מלמדת ילדים ועוזרת להם ללמוד", 
    sound: [440, 554, 659], 
    color: "bg-gradient-to-br from-green-200 to-green-300"
  },
  FIREFIGHTER: {
    id: "firefighter", 
    emoji: "👩‍🚒", 
    name: "firefighter", 
    hebrew: "כבאית", 
    english: "Firefighter",
    description: "מכבה שרפות ומצילה אנשים",
    sound: [330, 415, 523], 
    color: "bg-gradient-to-br from-red-200 to-red-300"
  },
};

/**
 * ===============================================
 * נתוני רגשות
 * ===============================================
 */
export const EMOTION_CONSTANTS: Record<string, BaseGameItem> = {
  HAPPY: { name: "happy", hebrew: "שמח", english: "Happy", emoji: "😊", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", sound: [523, 659, 784], plural: "שמחים" },
  SAD: { name: "sad", hebrew: "עצוב", english: "Sad", emoji: "😢", color: "bg-gradient-to-br from-blue-400 to-blue-600", sound: [294, 370, 440], plural: "עצובים" },
  ANGRY: { name: "angry", hebrew: "כועס", english: "Angry", emoji: "😠", color: "bg-gradient-to-br from-red-400 to-red-600", sound: [220, 277, 330], plural: "כועסים" },
  SURPRISED: { name: "surprised", hebrew: "מופתע", english: "Surprised", emoji: "😲", color: "bg-gradient-to-br from-orange-400 to-orange-600", sound: [440, 554, 659], plural: "מופתעים" },
  SCARED: { name: "scared", hebrew: "מפוחד", english: "Scared", emoji: "😨", color: "bg-gradient-to-br from-purple-400 to-purple-600", sound: [196, 247, 294], plural: "מפוחדים" },
  EXCITED: { name: "excited", hebrew: "נרגש", english: "Excited", emoji: "🤩", color: "bg-gradient-to-br from-pink-400 to-pink-600", sound: [587, 698, 784], plural: "נרגשים" },
  TIRED: { name: "tired", hebrew: "עייף", english: "Tired", emoji: "😴", color: "bg-gradient-to-br from-gray-400 to-gray-600", sound: [262, 330, 392], plural: "עייפים" },
  CONFUSED: { name: "confused", hebrew: "מבולבל", english: "Confused", emoji: "😕", color: "bg-gradient-to-br from-amber-400 to-amber-600", sound: [349, 440, 523], plural: "מבולבלים" },
  PROUD: { name: "proud", hebrew: "גאה", english: "Proud", emoji: "😌", color: "bg-gradient-to-br from-green-400 to-green-600", sound: [392, 494, 587], plural: "גאים" },
  LAUGHING: { name: "laughing", hebrew: "צוחק", english: "Laughing", emoji: "😂", color: "bg-gradient-to-br from-teal-400 to-teal-600", sound: [659, 784, 880], plural: "צוחקים" },
};

/**
 * ===============================================
 * רשימות ויצוא אוטומטי
 * ===============================================
 */
export const ALL_HOUSE_ITEMS = createItemsList(HOUSE_CONSTANTS);
export const ALL_CLOTHING = createItemsList(CLOTHING_CONSTANTS);
export const ALL_INSTRUMENTS = createItemsList(INSTRUMENT_CONSTANTS);
export const ALL_PROFESSIONS = Object.values(PROFESSION_CONSTANTS);
export const ALL_EMOTIONS = createItemsList(EMOTION_CONSTANTS);

export const HOUSE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(HOUSE_CONSTANTS);
export const CLOTHING_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(CLOTHING_CONSTANTS);
export const INSTRUMENT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(INSTRUMENT_CONSTANTS);
export const EMOTION_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(EMOTION_CONSTANTS);

export const PROFESSION_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  doctor: "רופאה",
  teacher: "מורה",
  firefighter: "כבאית",
};

/**
 * ===============================================
 * קונפיגורציות משחקים
 * ===============================================
 */
export const HOUSE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const CLOTHING_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const INSTRUMENT_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const PROFESSION_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const EMOTION_GAME_CONSTANTS = createGameConfig(4, 1, 3);
