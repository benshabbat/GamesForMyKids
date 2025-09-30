/**
 * נתוני המשחקים - חלקי הגוף
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני חלקי הגוף הבסיסיים
 * ===============================================
 */
export const BODY_PARTS_CONSTANTS: Record<string, BaseGameItem> = {
  HEAD: { name: "head", hebrew: "ראש", english: "Head", emoji: "🗣️", color: "bg-pink-400", sound: [440, 550, 660] },
  FACE: { name: "face", hebrew: "פנים", english: "Face", emoji: "😊", color: "bg-yellow-400", sound: [392, 494, 587] },
  EYE: { name: "eye", hebrew: "עין", english: "Eye", emoji: "👁️", color: "bg-blue-500", sound: [349, 440, 523] },
  NOSE: { name: "nose", hebrew: "אף", english: "Nose", emoji: "👃", color: "bg-pink-300", sound: [523, 659, 784] },
  MOUTH: { name: "mouth", hebrew: "פה", english: "Mouth", emoji: "👄", color: "bg-red-400", sound: [294, 370, 440] },
  EAR: { name: "ear", hebrew: "אוזן", english: "Ear", emoji: "👂", color: "bg-orange-400", sound: [330, 415, 494] },
  HAIR: { name: "hair", hebrew: "שיער", english: "Hair", emoji: "💇", color: "bg-yellow-600", sound: [587, 698, 784] },
  NECK: { name: "neck", hebrew: "צוואר", english: "Neck", emoji: "🦒", color: "bg-brown-400", sound: [196, 247, 294] },
  SHOULDER: { name: "shoulder", hebrew: "כתף", english: "Shoulder", emoji: "🤷", color: "bg-gray-500", sound: [659, 831, 988] },
  ARM: { name: "arm", hebrew: "זרוע", english: "Arm", emoji: "💪", color: "bg-orange-500", sound: [277, 349, 415] },
  HAND: { name: "hand", hebrew: "יד", english: "Hand", emoji: "✋", color: "bg-yellow-500", sound: [415, 523, 622] },
  FINGER: { name: "finger", hebrew: "אצבע", english: "Finger", emoji: "👆", color: "bg-pink-500", sound: [220, 277, 330] },
  CHEST: { name: "chest", hebrew: "חזה", english: "Chest", emoji: "🫁", color: "bg-red-300", sound: [311, 392, 466] },
  BACK: { name: "back", hebrew: "גב", english: "Back", emoji: "🔙", color: "bg-green-400", sound: [247, 311, 370] },
  STOMACH: { name: "stomach", hebrew: "בטן", english: "Stomach", emoji: "🤰", color: "bg-yellow-300", sound: [466, 587, 698] },
  LEG: { name: "leg", hebrew: "רגל", english: "Leg", emoji: "🦵", color: "bg-blue-400", sound: [185, 233, 277] },
  KNEE: { name: "knee", hebrew: "ברך", english: "Knee", emoji: "🦴", color: "bg-gray-400", sound: [698, 831, 932] },
  FOOT: { name: "foot", hebrew: "כף רגל", english: "Foot", emoji: "🦶", color: "bg-brown-500", sound: [156, 196, 233] },
  TOE: { name: "toe", hebrew: "אצבע רגל", english: "Toe", emoji: "🦶", color: "bg-pink-600", sound: [831, 988, 1175] },
};

/**
 * ===============================================
 * נתוני חושים
 * ===============================================
 */
export const SENSES_CONSTANTS: Record<string, BaseGameItem> = {
  SIGHT: { name: "sight", hebrew: "ראייה", english: "Sight", emoji: "👀", color: "bg-blue-500", sound: [440, 550, 660] },
  HEARING: { name: "hearing", hebrew: "שמיעה", english: "Hearing", emoji: "👂", color: "bg-orange-400", sound: [392, 494, 587] },
  SMELL: { name: "smell", hebrew: "ריח", english: "Smell", emoji: "👃", color: "bg-pink-300", sound: [349, 440, 523] },
  TASTE: { name: "taste", hebrew: "טעם", english: "Taste", emoji: "👅", color: "bg-red-400", sound: [523, 659, 784] },
  TOUCH: { name: "touch", hebrew: "מגע", english: "Touch", emoji: "✋", color: "bg-yellow-500", sound: [294, 370, 440] },
};

/**
 * ===============================================
 * נתוני פעולות גוף
 * ===============================================
 */
export const BODY_ACTIONS_CONSTANTS: Record<string, BaseGameItem> = {
  WALK: { name: "walk", hebrew: "ללכת", english: "Walk", emoji: "🚶", color: "bg-green-500", sound: [440, 550, 660] },
  RUN: { name: "run", hebrew: "לרוץ", english: "Run", emoji: "🏃", color: "bg-red-500", sound: [392, 494, 587] },
  JUMP: { name: "jump", hebrew: "לקפץ", english: "Jump", emoji: "🤸", color: "bg-purple-500", sound: [349, 440, 523] },
  SIT: { name: "sit", hebrew: "לשבת", english: "Sit", emoji: "🪑", color: "bg-brown-500", sound: [523, 659, 784] },
  STAND: { name: "stand", hebrew: "לעמוד", english: "Stand", emoji: "🧍", color: "bg-blue-400", sound: [294, 370, 440] },
  SLEEP: { name: "sleep", hebrew: "לישון", english: "Sleep", emoji: "😴", color: "bg-purple-300", sound: [330, 415, 494] },
  EAT: { name: "eat", hebrew: "לאכול", english: "Eat", emoji: "🍽️", color: "bg-orange-400", sound: [587, 698, 784] },
  DRINK: { name: "drink", hebrew: "לשתות", english: "Drink", emoji: "🥤", color: "bg-blue-300", sound: [196, 247, 294] },
  SMILE: { name: "smile", hebrew: "לחייך", english: "Smile", emoji: "😊", color: "bg-yellow-400", sound: [659, 831, 988] },
  CRY: { name: "cry", hebrew: "לבכות", english: "Cry", emoji: "😢", color: "bg-blue-600", sound: [277, 349, 415] },
};

// ייצוא רשימות והגדרות
export const BODY_PARTS_ITEMS = createItemsList(BODY_PARTS_CONSTANTS);
export const BODY_PARTS_PRONUNCIATIONS = createPronunciationDictionary(BODY_PARTS_CONSTANTS);
export const BODY_PARTS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "חלקי הגוף",
  description: "למד על חלקי הגוף השונים!"
};

export const SENSES_ITEMS = createItemsList(SENSES_CONSTANTS);
export const SENSES_PRONUNCIATIONS = createPronunciationDictionary(SENSES_CONSTANTS);
export const SENSES_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "החושים",
  description: "למד על חמשת החושים!"
};

export const BODY_ACTIONS_ITEMS = createItemsList(BODY_ACTIONS_CONSTANTS);
export const BODY_ACTIONS_PRONUNCIATIONS = createPronunciationDictionary(BODY_ACTIONS_CONSTANTS);
export const BODY_ACTIONS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "פעולות גוף",
  description: "למד על פעולות שאנחנו עושים עם הגוף!"
};