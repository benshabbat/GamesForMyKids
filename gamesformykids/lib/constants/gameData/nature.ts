/**
 * נתוני המשחקים - פירות, ירקות, חיות ואוכל
 */

import { BaseGameItem } from "@/lib/types/base";
import { createGameConfig, createItemsList, createPronunciationDictionary } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני פירות
 * ===============================================
 */
export const FRUIT_CONSTANTS: Record<string, BaseGameItem> = {
  APPLE: { name: "apple", hebrew: "תפוח", english: "Apple", emoji: "🍎", color: "bg-red-500", sound: [440, 550, 660] },
  BANANA: { name: "banana", hebrew: "בננה", english: "Banana", emoji: "🍌", color: "bg-yellow-500", sound: [392, 494, 587] },
  ORANGE: { name: "orange", hebrew: "תפוז", english: "Orange", emoji: "🍊", color: "bg-orange-500", sound: [330, 415, 494] },
  GRAPES: { name: "grapes", hebrew: "ענבים", english: "Grapes", emoji: "🍇", color: "bg-purple-500", sound: [294, 370, 440] },
  STRAWBERRY: { name: "strawberry", hebrew: "תות", english: "Strawberry", emoji: "🍓", color: "bg-pink-500", sound: [587, 698, 784] },
  WATERMELON: { name: "watermelon", hebrew: "אבטיח", english: "Watermelon", emoji: "🍉", color: "bg-green-500", sound: [349, 440, 523] },
  PEACH: { name: "peach", hebrew: "אפרסק", english: "Peach", emoji: "🍑", color: "bg-orange-400", sound: [277, 349, 415] },
  PEAR: { name: "pear", hebrew: "אגס", english: "Pear", emoji: "🍐", color: "bg-green-400", sound: [262, 330, 392] },
  PINEAPPLE: { name: "pineapple", hebrew: "אננס", english: "Pineapple", emoji: "🍍", color: "bg-yellow-600", sound: [233, 294, 349] },
  CHERRY: { name: "cherry", hebrew: "דובדבן", english: "Cherry", emoji: "🍒", color: "bg-red-600", sound: [523, 659, 784] },
};

/**
 * ===============================================
 * נתוני ירקות
 * ===============================================
 */
export const VEGETABLE_CONSTANTS: Record<string, BaseGameItem> = {
  CARROT: { name: "carrot", hebrew: "גזר", english: "Carrot", emoji: "🥕", color: "bg-orange-500", sound: [440, 550, 660] },
  TOMATO: { name: "tomato", hebrew: "עגבנייה", english: "Tomato", emoji: "🍅", color: "bg-red-500", sound: [392, 494, 587] },
  CUCUMBER: { name: "cucumber", hebrew: "מלפפון", english: "Cucumber", emoji: "🥒", color: "bg-green-500", sound: [349, 440, 523] },
  PEPPER: { name: "pepper", hebrew: "פלפל", english: "Pepper", emoji: "🫑", color: "bg-green-600", sound: [330, 415, 494] },
  ONION: { name: "onion", hebrew: "בצל", english: "Onion", emoji: "🧅", color: "bg-yellow-600", sound: [294, 370, 440] },
  LETTUCE: { name: "lettuce", hebrew: "חסה", english: "Lettuce", emoji: "🥬", color: "bg-green-400", sound: [262, 330, 392] },
  POTATO: { name: "potato", hebrew: "תפוח אדמה", english: "Potato", emoji: "🥔", color: "bg-amber-600", sound: [220, 277, 330] },
  CORN: { name: "corn", hebrew: "תירס", english: "Corn", emoji: "🌽", color: "bg-yellow-500", sound: [494, 587, 698] },
};

/**
 * ===============================================
 * נתוני חיות
 * ===============================================
 */
export const ANIMAL_CONSTANTS: Record<string, BaseGameItem> = {
  DOG: { name: "dog", hebrew: "כלב", english: "Dog", emoji: "🐶", color: "bg-brown-500", sound: [200, 300, 150] },
  CAT: { name: "cat", hebrew: "חתול", english: "Cat", emoji: "🐱", color: "bg-gray-500", sound: [800, 1000, 600] },
  COW: { name: "cow", hebrew: "פרה", english: "Cow", emoji: "🐄", color: "bg-pink-300", sound: [100, 200, 150] },
  HORSE: { name: "horse", hebrew: "סוס", english: "Horse", emoji: "🐴", color: "bg-amber-600", sound: [300, 500, 400] },
  SHEEP: { name: "sheep", hebrew: "כבש", english: "Sheep", emoji: "🐑", color: "bg-gray-200", sound: [400, 600, 500] },
  PIG: { name: "pig", hebrew: "חזיר", english: "Pig", emoji: "🐷", color: "bg-pink-400", sound: [250, 350, 200] },
  CHICKEN: { name: "chicken", hebrew: "תרנגולת", english: "Chicken", emoji: "🐔", color: "bg-yellow-400", sound: [600, 800, 700] },
  DUCK: { name: "duck", hebrew: "ברווז", english: "Duck", emoji: "🦆", color: "bg-blue-300", sound: [500, 700, 600] },
  RABBIT: { name: "rabbit", hebrew: "ארנב", english: "Rabbit", emoji: "🐰", color: "bg-gray-300", sound: [400, 500, 600] },
  FROG: { name: "frog", hebrew: "צפרדע", english: "Frog", emoji: "🐸", color: "bg-green-400", sound: [200, 400, 300] },
};

/**
 * ===============================================
 * נתוני ריחות וטעמים
 * ===============================================
 */
export const SMELL_TASTE_CONSTANTS: Record<string, BaseGameItem> = {
  SWEET: { name: "sweet", hebrew: "מתוק", english: "Sweet", emoji: "🍯", color: "bg-yellow-400", sound: [523, 659, 784] },
  SOUR: { name: "sour", hebrew: "חמוץ", english: "Sour", emoji: "🍋", color: "bg-yellow-500", sound: [659, 831, 988] },
  SALTY: { name: "salty", hebrew: "מלוח", english: "Salty", emoji: "🧂", color: "bg-gray-400", sound: [440, 554, 659] },
  BITTER: { name: "bitter", hebrew: "מר", english: "Bitter", emoji: "☕", color: "bg-amber-800", sound: [330, 415, 494] },
  SPICY: { name: "spicy", hebrew: "חריף", english: "Spicy", emoji: "🌶️", color: "bg-red-500", sound: [392, 494, 587] },
  MINT: { name: "mint", hebrew: "נענע", english: "Mint", emoji: "🌿", color: "bg-green-400", sound: [587, 740, 880] },
};

/**
 * ===============================================
 * רשימות ויצוא אוטומטי
 * ===============================================
 */
export const ALL_FRUITS = createItemsList(FRUIT_CONSTANTS);
export const ALL_VEGETABLES = createItemsList(VEGETABLE_CONSTANTS);
export const ALL_ANIMALS = createItemsList(ANIMAL_CONSTANTS);
export const ALL_SMELLS_TASTES = createItemsList(SMELL_TASTE_CONSTANTS);

export const FRUIT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(FRUIT_CONSTANTS);
export const VEGETABLE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(VEGETABLE_CONSTANTS);
export const ANIMAL_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(ANIMAL_CONSTANTS);
export const SMELL_TASTE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SMELL_TASTE_CONSTANTS);

/**
 * ===============================================
 * קונפיגורציות משחקים
 * ===============================================
 */
export const FRUIT_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const VEGETABLE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const ANIMAL_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const SMELL_TASTE_GAME_CONSTANTS = createGameConfig(4, 1, 3);

/**
 * ===============================================
 * נתונים ספציפיים למשחק זיכרון
 * ===============================================
 */
export const MEMORY_GAME_ANIMALS = [
  { emoji: "🐱", sound: "meow", name: "חתול" },
  { emoji: "🐶", sound: "woof", name: "כלב" },
  { emoji: "🐰", sound: "hop", name: "ארנב" },
  { emoji: "🦊", sound: "yip", name: "שועל" },
  { emoji: "🐻", sound: "growl", name: "דוב" },
  { emoji: "🐼", sound: "chirp", name: "פנדה" },
  { emoji: "🐯", sound: "roar", name: "נמר" },
  { emoji: "🦁", sound: "roar", name: "אריה" },
  { emoji: "🐸", sound: "ribbit", name: "צפרדע" },
  { emoji: "🐷", sound: "oink", name: "חזיר" },
  { emoji: "🐵", sound: "ooh", name: "קוף" },
  { emoji: "🐨", sound: "growl", name: "קואלה" },
  { emoji: "🦒", sound: "bleat", name: "ג'ירפה" },
  { emoji: "🐘", sound: "trumpet", name: "פיל" },
  { emoji: "🦓", sound: "neigh", name: "זברה" },
  { emoji: "🦏", sound: "snort", name: "קרנף" },
  { emoji: "🐄", sound: "moo", name: "פרה" },
  { emoji: "🐎", sound: "neigh", name: "סוס" },
];

export const ANIMAL_SOUND_FREQUENCIES: Record<string, number[]> = {
  "🐱": [800, 1000, 600],
  "🐶": [200, 300, 150],
  "🐰": [400, 500, 600],
  "🦊": [600, 800, 500],
  "🐻": [100, 150, 80],
  "🐼": [300, 400, 350],
  "🐯": [150, 250, 100],
  "🦁": [120, 200, 90],
  "🐸": [500, 700, 400],
  "🐷": [250, 350, 200],
  "🐵": [450, 550, 350],
  "🐨": [180, 280, 120],
  "🦒": [350, 450, 250],
  "🐘": [80, 120, 60],
  "🦓": [220, 320, 180],
  "🦏": [110, 180, 70],
  "🐄": [160, 240, 100],
  "🐎": [200, 300, 150],
  "default": [440, 550, 330]
};
