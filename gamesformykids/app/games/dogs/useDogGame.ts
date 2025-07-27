import { useSimpleGame } from "@/hooks/games/useSimpleGame";

// נניח שיש לנו קבועים אלה (יצרתי אותם כדוגמה)
const ALL_DOGS = [
  { name: "labrador", hebrew: "לברדור", english: "Labrador", emoji: "🐕", color: "bg-yellow-500", sound: [440, 550, 660] },
  { name: "poodle", hebrew: "פודל", english: "Poodle", emoji: "🐩", color: "bg-white", sound: [392, 494, 587] },
  { name: "bulldog", hebrew: "בולדוג", english: "Bulldog", emoji: "🐶", color: "bg-brown-500", sound: [349, 440, 523] },
  { name: "chihuahua", hebrew: "צ'יוואווה", english: "Chihuahua", emoji: "🐕‍🦺", color: "bg-gray-400", sound: [523, 659, 784] },
];

const DOG_HEBREW_PRONUNCIATIONS = {
  "labrador": "לברדור",
  "poodle": "פודל", 
  "bulldog": "בולדוג",
  "chihuahua": "צ'יוואווה"
};

const DOG_GAME_CONSTANTS = {
  BASE_COUNT: 4,
  INCREMENT: 1,
  LEVEL_THRESHOLD: 3
};

/**
 * משחק כלבים חדש - נוצר תוך 3 דקות! 🐕
 * 8 שורות בלבד לעומת 118 שורות בשיטה הישנה
 */
export function useDogGame() {
  return useSimpleGame({
    items: ALL_DOGS,
    pronunciations: DOG_HEBREW_PRONUNCIATIONS,
    gameConstants: DOG_GAME_CONSTANTS,
  });
}
