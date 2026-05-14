import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const FEELINGS_CONSTANTS: Record<string, BaseGameItem> = {
  HAPPY: { name: "happy", hebrew: "שמח", english: "Happy", emoji: "😊", color: "bg-yellow-400", sound: [523, 659, 784] },
  SAD: { name: "sad", hebrew: "עצוב", english: "Sad", emoji: "😢", color: "bg-blue-400", sound: [294, 370, 440] },
  ANGRY: { name: "angry", hebrew: "כועס", english: "Angry", emoji: "😠", color: "bg-red-500", sound: [220, 277, 330] },
  SURPRISED: { name: "surprised", hebrew: "מופתע", english: "Surprised", emoji: "😲", color: "bg-orange-400", sound: [659, 831, 988] },
  SCARED: { name: "scared", hebrew: "מפוחד", english: "Scared", emoji: "😨", color: "bg-purple-400", sound: [196, 247, 294] },
  EXCITED: { name: "excited", hebrew: "נרגש", english: "Excited", emoji: "🤩", color: "bg-pink-400", sound: [698, 831, 988] },
  TIRED: { name: "tired", hebrew: "עייף", english: "Tired", emoji: "😴", color: "bg-gray-400", sound: [147, 185, 220] },
  CONFUSED: { name: "confused", hebrew: "מבולבל", english: "Confused", emoji: "😕", color: "bg-brown-400", sound: [262, 330, 392] },
  PROUD: { name: "proud", hebrew: "גאה", english: "Proud", emoji: "😌", color: "bg-green-400", sound: [440, 550, 660] },
  LOVING: { name: "loving", hebrew: "אוהב", english: "Loving", emoji: "🥰", color: "bg-pink-500", sound: [392, 494, 587] },
};

export const FEELINGS_ITEMS = createItemsList(FEELINGS_CONSTANTS);
export const FEELINGS_PRONUNCIATIONS = createPronunciationDictionary(FEELINGS_CONSTANTS);
export const FEELINGS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק ריגושים ותחושות",
  subTitle: "זהה ולמד על רגשות ותחושות שונות!",
  description: "פתח אינטליגנציה רגשית וזהה רגשות!",
  instructions: "לחץ על הרגש הנכון שאתה רואה או שומע",
};
