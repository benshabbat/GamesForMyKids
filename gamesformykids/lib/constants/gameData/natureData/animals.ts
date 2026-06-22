import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const ANIMALS: Record<string, BaseGameItem> = {
  DOG: { name: "dog", hebrew: "כלב", hebrewNikud: "כֶּלֶב", english: "Dog", emoji: "🐶", color: "bg-brown-500", sound: [200, 300, 150], funFact: "לכלבים יש חוש ריח חזק פי 100,000 מהאדם!" },
  CAT: { name: "cat", hebrew: "חתול", hebrewNikud: "חָתוּל", english: "Cat", emoji: "🐱", color: "bg-gray-500", sound: [800, 1000, 600], funFact: "חתולים ישנים כ-16 שעות ביום!" },
  COW: { name: "cow", hebrew: "פרה", hebrewNikud: "פָּרָה", english: "Cow", emoji: "🐄", color: "bg-pink-300", sound: [100, 200, 150], funFact: "פרה אחת נותנת כ-25 ליטר חלב ביום!" },
  HORSE: { name: "horse", hebrew: "סוס", hebrewNikud: "סוּס", english: "Horse", emoji: "🐴", color: "bg-amber-600", sound: [300, 500, 400], funFact: "סוסים יכולים לישון עומדים על רגליהם!" },
  SHEEP: { name: "sheep", hebrew: "כבש", hebrewNikud: "כֶּבֶשׂ", english: "Sheep", emoji: "🐑", color: "bg-gray-200", sound: [400, 600, 500], funFact: "צמר של כבש אחת מספיק לסריגת 3 סוודרים!" },
  PIG: { name: "pig", hebrew: "חזיר", hebrewNikud: "חֲזִיר", english: "Pig", emoji: "🐷", color: "bg-pink-400", sound: [250, 350, 200], funFact: "חזירים חכמים מאוד — חכמים יותר מכלבים!" },
  CHICKEN: { name: "chicken", hebrew: "תרנגולת", hebrewNikud: "תַּרְנְגֹלֶת", english: "Chicken", emoji: "🐔", color: "bg-yellow-400", sound: [600, 800, 700], funFact: "תרנגולת מטילה כ-300 ביצים בשנה!" },
  DUCK: { name: "duck", hebrew: "ברווז", hebrewNikud: "בַּרְוָז", english: "Duck", emoji: "🦆", color: "bg-blue-300", sound: [500, 700, 600], funFact: "נוצות הברווז עמידות למים לגמרי!" },
  RABBIT: { name: "rabbit", hebrew: "ארנב", hebrewNikud: "אַרְנָב", english: "Rabbit", emoji: "🐰", color: "bg-gray-300", sound: [400, 500, 600], funFact: "ארנבים יכולים לקפוץ יותר ממטר לגובה!" },
  FROG: { name: "frog", hebrew: "צפרדע", hebrewNikud: "צְפַרְדֵּעַ", english: "Frog", emoji: "🐸", color: "bg-green-400", sound: [200, 400, 300], funFact: "צפרדעים שותות מים דרך העור שלהן!" },
};

export const ALL_ANIMALS = createItemsList(ANIMALS);
export const ANIMAL_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(ANIMALS);
export const ANIMAL_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;

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
  "default": [440, 550, 330],
};
