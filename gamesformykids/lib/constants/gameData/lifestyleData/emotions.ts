import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

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
  LOVING: { name: "loving", hebrew: "אוהב", english: "Loving", emoji: "🥰", color: "bg-gradient-to-br from-pink-400 to-pink-600", sound: [392, 494, 587], plural: "אוהבים" },
};

export const ALL_EMOTIONS = createItemsList(EMOTION_CONSTANTS);
export const EMOTION_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(EMOTION_CONSTANTS);
export const EMOTION_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
