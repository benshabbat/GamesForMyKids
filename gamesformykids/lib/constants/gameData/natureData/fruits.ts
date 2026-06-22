import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const FRUITS: Record<string, BaseGameItem> = {
  APPLE: { name: "apple", hebrew: "תפוח", hebrewNikud: "תַּפּוּחַ", english: "Apple", emoji: "🍎", color: "bg-red-500", sound: [440, 550, 660], funFact: "יש יותר מ-7,500 זנים של תפוחים בעולם!" },
  BANANA: { name: "banana", hebrew: "בננה", hebrewNikud: "בַּנָנָה", english: "Banana", emoji: "🍌", color: "bg-yellow-500", sound: [392, 494, 587], funFact: "בננה מכילה אשלגן שעוזר לשרירים שלנו!" },
  ORANGE: { name: "orange", hebrew: "תפוז", hebrewNikud: "תַּפּוּז", english: "Orange", emoji: "🍊", color: "bg-orange-500", sound: [330, 415, 494], funFact: "תפוז אחד מכיל את כל הויטמין C שאנו צריכים ביום!" },
  GRAPES: { name: "grapes", hebrew: "ענבים", hebrewNikud: "עֲנָבִים", english: "Grapes", emoji: "🍇", color: "bg-purple-500", sound: [294, 370, 440], funFact: "מאשכול ענבים אחד אפשר להכין כ-20 צימוקים!" },
  STRAWBERRY: { name: "strawberry", hebrew: "תות", hebrewNikud: "תּוּת", english: "Strawberry", emoji: "🍓", color: "bg-pink-500", sound: [587, 698, 784], funFact: "תות שדה הוא הפרי היחיד שהזרעים שלו נמצאים מבחוץ!" },
  WATERMELON: { name: "watermelon", hebrew: "אבטיח", hebrewNikud: "אֲבַטִּיחַ", english: "Watermelon", emoji: "🍉", color: "bg-green-500", sound: [349, 440, 523], funFact: "אבטיח מורכב מ-92% מים — אידיאלי לקיץ!" },
  PEACH: { name: "peach", hebrew: "אפרסק", hebrewNikud: "אֲפַרְסֵק", english: "Peach", emoji: "🍑", color: "bg-orange-400", sound: [277, 349, 415], funFact: "אפרסק קרוב משפחה של השקד והשזיף!" },
  PEAR: { name: "pear", hebrew: "אגס", hebrewNikud: "אַגָּס", english: "Pear", emoji: "🍐", color: "bg-green-400", sound: [262, 330, 392], funFact: "אגס מבשיל מהחוץ לפנים, לא מהפנים לחוץ!" },
  PINEAPPLE: { name: "pineapple", hebrew: "אננס", hebrewNikud: "אֲנָנָס", english: "Pineapple", emoji: "🍍", color: "bg-yellow-600", sound: [233, 294, 349], funFact: "אננס לוקח שנתיים לגדול מזרע לפרי!" },
  CHERRY: { name: "cherry", hebrew: "דובדבן", hebrewNikud: "דֻּבְדְּבָן", english: "Cherry", emoji: "🍒", color: "bg-red-600", sound: [523, 659, 784], funFact: "עץ דובדבן יכול לחיות 100 שנה ויותר!" },
};

export const ALL_FRUITS = createItemsList(FRUITS);
export const FRUIT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(FRUITS);
export const FRUIT_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;
