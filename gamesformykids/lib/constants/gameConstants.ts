/**
 * ===============================================
 * קבועים מיועלים למשחקים - גרסה ללא דופליקייטים
 * ===============================================
 */

import { BaseGameState, BaseGameItem } from '../types';
import { createItemsList, createPronunciationDictionary } from '../utils/gameHelpers';

/**
 * טיפוסים מקומיים לקבועים
 */
interface ShapeConstant extends BaseGameItem {
  svg: string;
}

interface NumberConstant extends BaseGameItem {
  digit: string;
}

interface ProfessionConstant extends BaseGameItem {
  id: string;
  description: string;
}

/**
 * ===============================================
 * קבועים בסיסיים משותפים
 * ===============================================
 */

/**
 * מצב משחק התחלתי גנרי
 */
export const INITIAL_GAME_STATE: BaseGameState = {
  currentChallenge: null,
  score: 0,
  level: 1,
  isPlaying: false,
  showCelebration: false,
  options: [],
};

/**
 * קבועי המשחק הכלליים
 */
export const GAME_CONSTANTS = {
  SCORE_INCREMENT: 10,
  OPTIONS_COUNT: 4,
  DELAYS: {
    SPEAK_DELAY: 250,
    SUCCESS_SPEAK_DELAY: 300,
    CELEBRATION_DURATION: 1500,
    START_GAME_DELAY: 300,
    NEXT_ITEM_DELAY: 1000,
    WRONG_ANSWER_DELAY: 400,
    RETRY_DELAY: 600,
  },
};

/**
 * הודעות המשוב
 */
export const FEEDBACK_MESSAGES = {
  SUCCESS: ["כל הכבוד", "נהדר", "מצוין", "יופי", "נכון מאוד"],
  WRONG: ["נסו שוב", "לא נורא, נסו שוב", "כמעט"],
  START: ["בהצלחה", "מתחילים", "יאללה נתחיל"]
};

/**
 * ===============================================
 * נתוני המשחקים
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

export const SHAPE_CONSTANTS: Record<string, ShapeConstant> = {
  CIRCLE: { name: "circle", hebrew: "עיגול", english: "Circle", emoji: "⭕", color: "bg-blue-500", sound: [523, 659, 784], svg: "circle" },
  SQUARE: { name: "square", hebrew: "ריבוע", english: "Square", emoji: "⬜", color: "bg-red-500", sound: [440, 550, 660], svg: "square" },
  TRIANGLE: { name: "triangle", hebrew: "משולש", english: "Triangle", emoji: "🔺", color: "bg-green-500", sound: [349, 440, 523], svg: "triangle" },
  RECTANGLE: { name: "rectangle", hebrew: "מלבן", english: "Rectangle", emoji: "▬", color: "bg-purple-500", sound: [294, 370, 440], svg: "rectangle" },
  STAR: { name: "star", hebrew: "כוכב", english: "Star", emoji: "⭐", color: "bg-yellow-500", sound: [392, 494, 587], svg: "star" },
  HEART: { name: "heart", hebrew: "לב", english: "Heart", emoji: "❤️", color: "bg-pink-500", sound: [587, 698, 784], svg: "heart" },
  DIAMOND: { name: "diamond", hebrew: "מעויין", english: "Diamond", emoji: "💎", color: "bg-indigo-500", sound: [277, 349, 415], svg: "diamond" },
  OVAL: { name: "oval", hebrew: "אליפסה", english: "Oval", emoji: "⭕", color: "bg-teal-500", sound: [220, 277, 330], svg: "oval" }
};

export const NUMBER_CONSTANTS: Record<string, NumberConstant> = {
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

export const FRUIT_CONSTANTS: Record<string, BaseGameItem> = {
  APPLE: { name: "apple", hebrew: "תפוח", english: "Apple", emoji: "🍎", color: "bg-red-500", sound: [440, 550, 660] },
  BANANA: { name: "banana", hebrew: "בננה", english: "Banana", emoji: "🍌", color: "bg-yellow-500", sound: [392, 494, 587] },
  ORANGE: { name: "orange", hebrew: "תפוز", english: "Orange", emoji: "🍊", color: "bg-orange-500", sound: [330, 415, 494] },
  GRAPES: { name: "grapes", hebrew: "ענבים", english: "Grapes", emoji: "🍇", color: "bg-purple-500", sound: [294, 370, 440] },
  STRAWBERRY: { name: "strawberry", hebrew: "תות", english: "Strawberry", emoji: "🍓", color: "bg-pink-500", sound: [587, 698, 784] },
  WATERMELON: { name: "watermelon", hebrew: "אבטיח", english: "Watermelon", emoji: "🍉", color: "bg-green-500", sound: [349, 440, 523] },
  PEACH: { name: "peach", hebrew: "אפרסק", english: "Peach", emoji: "🍑", color: "bg-orange-400", sound: [277, 349, 415] },
  PEAR: { name: "pear", hebrew: "אגס", english: "Pear", emoji: "🍐", color: "bg-green-400", sound: [262, 330, 392] },
  PINEAPPLE: { name: "pineapple", hebrew: "אננס", english: "Pineapple", emoji: "🍍", color: "bg-yellow-600", sound: [233, 294, 349] },
  CHERRY: { name: "cherry", hebrew: "דובדבן", english: "Cherry", emoji: "🍒", color: "bg-red-600", sound: [523, 659, 784] },
};

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

export const WEATHER_CONSTANTS: Record<string, BaseGameItem> = {
  SUNNY: { name: "sunny", hebrew: "שמש", english: "Sunny", emoji: "☀️", color: "bg-yellow-500", sound: [392, 494, 587] },
  RAINY: { name: "rainy", hebrew: "גשום", english: "Rainy", emoji: "🌧️", color: "bg-blue-500", sound: [523, 659, 784] },
  CLOUDY: { name: "cloudy", hebrew: "מעונן", english: "Cloudy", emoji: "☁️", color: "bg-gray-500", sound: [294, 370, 440] },
  SNOWY: { name: "snowy", hebrew: "שלג", english: "Snowy", emoji: "❄️", color: "bg-cyan-500", sound: [659, 831, 988] },
  STORMY: { name: "stormy", hebrew: "סערה", english: "Stormy", emoji: "⛈️", color: "bg-purple-600", sound: [196, 247, 294] },
  WINDY: { name: "windy", hebrew: "רוח", english: "Windy", emoji: "💨", color: "bg-teal-500", sound: [349, 440, 523] },
  PARTLY_CLOUDY: { name: "partly_cloudy", hebrew: "חלקית מעונן", english: "Partly Cloudy", emoji: "⛅", color: "bg-orange-400", sound: [330, 415, 494] },
  FOGGY: { name: "foggy", hebrew: "ערפילי", english: "Foggy", emoji: "🌫️", color: "bg-gray-400", sound: [220, 277, 330] },
  HOT: { name: "hot", hebrew: "חם", english: "Hot", emoji: "🔥", color: "bg-red-600", sound: [440, 550, 660] },
  COLD: { name: "cold", hebrew: "קר", english: "Cold", emoji: "🧊", color: "bg-blue-300", sound: [262, 330, 392] },
};

export const TRANSPORT_CONSTANTS: Record<string, BaseGameItem> = {
  CAR: { name: "car", hebrew: "מכונית", english: "Car", emoji: "🚗", color: "bg-red-500", sound: [440, 550, 660] },
  BUS: { name: "bus", hebrew: "אוטובוס", english: "Bus", emoji: "🚌", color: "bg-orange-500", sound: [392, 494, 587] },
  TRAIN: { name: "train", hebrew: "רכבת", english: "Train", emoji: "🚂", color: "bg-green-500", sound: [349, 440, 523] },
  AIRPLANE: { name: "airplane", hebrew: "מטוס", english: "Airplane", emoji: "✈️", color: "bg-blue-500", sound: [523, 659, 784] },
  SHIP: { name: "ship", hebrew: "ספינה", english: "Ship", emoji: "🚢", color: "bg-cyan-500", sound: [294, 370, 440] },
  BICYCLE: { name: "bicycle", hebrew: "אופניים", english: "Bicycle", emoji: "🚲", color: "bg-green-400", sound: [330, 415, 494] },
  MOTORCYCLE: { name: "motorcycle", hebrew: "אופנוע", english: "Motorcycle", emoji: "🏍️", color: "bg-black", sound: [587, 698, 784] },
  TRUCK: { name: "truck", hebrew: "משאית", english: "Truck", emoji: "🚚", color: "bg-gray-600", sound: [196, 247, 294] },
  HELICOPTER: { name: "helicopter", hebrew: "מסוק", english: "Helicopter", emoji: "🚁", color: "bg-purple-500", sound: [659, 831, 988] },
  TAXI: { name: "taxi", hebrew: "מונית", english: "Taxi", emoji: "🚕", color: "bg-yellow-500", sound: [277, 349, 415] },
};

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

export const INSTRUMENT_CONSTANTS: Record<string, BaseGameItem> = {
  PIANO: { name: "piano", hebrew: "פסנתר", english: "Piano", emoji: "🎹", color: "bg-black", sound: [523, 659, 784] },
  GUITAR: { name: "guitar", hebrew: "גיטרה", english: "Guitar", emoji: "🎸", color: "bg-amber-600", sound: [330, 415, 494] },
  VIOLIN: { name: "violin", hebrew: "כינור", english: "Violin", emoji: "🎻", color: "bg-amber-800", sound: [440, 554, 659] },
  DRUMS: { name: "drums", hebrew: "תופים", english: "Drums", emoji: "🥁", color: "bg-red-600", sound: [196, 247, 294] },
  TRUMPET: { name: "trumpet", hebrew: "חצוצרה", english: "Trumpet", emoji: "🎺", color: "bg-yellow-500", sound: [587, 740, 880] },
  FLUTE: { name: "flute", hebrew: "חליל", english: "Flute", emoji: "🪈", color: "bg-gray-400", sound: [659, 831, 988] },
};

export const SPACE_CONSTANTS: Record<string, BaseGameItem> = {
  SUN: { name: "sun", hebrew: "שמש", english: "Sun", emoji: "☀️", color: "bg-yellow-500", sound: [523, 659, 784] },
  MOON: { name: "moon", hebrew: "ירח", english: "Moon", emoji: "🌙", color: "bg-gray-300", sound: [392, 494, 587] },
  STAR: { name: "star", hebrew: "כוכב", english: "Star", emoji: "⭐", color: "bg-yellow-400", sound: [659, 831, 988] },
  EARTH: { name: "earth", hebrew: "כדור הארץ", english: "Earth", emoji: "🌍", color: "bg-blue-500", sound: [349, 440, 523] },
  ROCKET: { name: "rocket", hebrew: "חללית", english: "Rocket", emoji: "🚀", color: "bg-red-500", sound: [440, 554, 659] },
  PLANET: { name: "planet", hebrew: "כוכב לכת", english: "Planet", emoji: "🪐", color: "bg-purple-500", sound: [330, 415, 494] },
};

export const CLOTHING_CONSTANTS: Record<string, BaseGameItem> = {
  SHIRT: { name: "shirt", hebrew: "חולצה", english: "Shirt", emoji: "👕", color: "bg-blue-500", sound: [440, 550, 660] },
  PANTS: { name: "pants", hebrew: "מכנסיים", english: "Pants", emoji: "👖", color: "bg-indigo-600", sound: [392, 494, 587] },
  DRESS: { name: "dress", hebrew: "שמלה", english: "Dress", emoji: "👗", color: "bg-pink-500", sound: [523, 659, 784] },
  SHOES: { name: "shoes", hebrew: "נעליים", english: "Shoes", emoji: "👟", color: "bg-gray-600", sound: [349, 440, 523] },
  HAT: { name: "hat", hebrew: "כובע", english: "Hat", emoji: "🧢", color: "bg-red-500", sound: [330, 415, 494] },
  JACKET: { name: "jacket", hebrew: "מעיל", english: "Jacket", emoji: "🧥", color: "bg-brown-600", sound: [262, 330, 392] },
};

export const SMELL_TASTE_CONSTANTS: Record<string, BaseGameItem> = {
  SWEET: { name: "sweet", hebrew: "מתוק", english: "Sweet", emoji: "🍯", color: "bg-yellow-400", sound: [523, 659, 784] },
  SOUR: { name: "sour", hebrew: "חמוץ", english: "Sour", emoji: "🍋", color: "bg-yellow-500", sound: [659, 831, 988] },
  SALTY: { name: "salty", hebrew: "מלוח", english: "Salty", emoji: "🧂", color: "bg-gray-400", sound: [440, 554, 659] },
  BITTER: { name: "bitter", hebrew: "מר", english: "Bitter", emoji: "☕", color: "bg-amber-800", sound: [330, 415, 494] },
  SPICY: { name: "spicy", hebrew: "חריף", english: "Spicy", emoji: "🌶️", color: "bg-red-500", sound: [392, 494, 587] },
  MINT: { name: "mint", hebrew: "נענע", english: "Mint", emoji: "🌿", color: "bg-green-400", sound: [587, 740, 880] },
};

export const HOUSE_CONSTANTS: Record<string, BaseGameItem> = {
  CHAIR: { name: "chair", hebrew: "כיסא", english: "Chair", emoji: "🪑", color: "bg-brown-500", sound: [440, 550, 660] },
  TABLE: { name: "table", hebrew: "שולחן", english: "Table", emoji: "🏓", color: "bg-amber-600", sound: [392, 494, 587] },
  BED: { name: "bed", hebrew: "מיטה", english: "Bed", emoji: "🛏️", color: "bg-blue-500", sound: [349, 440, 523] },
  SOFA: { name: "sofa", hebrew: "ספה", english: "Sofa", emoji: "🛋️", color: "bg-red-500", sound: [330, 415, 494] },
  LAMP: { name: "lamp", hebrew: "מנורה", english: "Lamp", emoji: "💡", color: "bg-yellow-500", sound: [294, 370, 440] },
};

export const TOOL_CONSTANTS: Record<string, BaseGameItem> = {
  HAMMER: { name: "hammer", hebrew: "פטיש", english: "Hammer", emoji: "🔨", color: "bg-gray-600", sound: [440, 550, 660] },
  SCREWDRIVER: { name: "screwdriver", hebrew: "מברג", english: "Screwdriver", emoji: "🪛", color: "bg-blue-500", sound: [392, 494, 587] },
  SAW: { name: "saw", hebrew: "מסור", english: "Saw", emoji: "🪚", color: "bg-yellow-600", sound: [349, 440, 523] },
  SCISSORS: { name: "scissors", hebrew: "מספריים", english: "Scissors", emoji: "✂️", color: "bg-purple-500", sound: [294, 370, 440] },
};

export const VEHICLE_CONSTANTS: Record<string, BaseGameItem> = {
  CAR: { name: "car", hebrew: "מכונית", english: "Car", emoji: "🚗", color: "bg-red-500", sound: [440, 550, 660] },
  BUS: { name: "bus", hebrew: "אוטובוס", english: "Bus", emoji: "🚌", color: "bg-yellow-500", sound: [392, 494, 587] },
  TRAIN: { name: "train", hebrew: "רכבת", english: "Train", emoji: "🚂", color: "bg-green-500", sound: [349, 440, 523] },
  AIRPLANE: { name: "airplane", hebrew: "מטוס", english: "Airplane", emoji: "✈️", color: "bg-blue-500", sound: [523, 659, 784] },
  BICYCLE: { name: "bicycle", hebrew: "אופניים", english: "Bicycle", emoji: "🚲", color: "bg-purple-500", sound: [294, 370, 440] },
  MOTORCYCLE: { name: "motorcycle", hebrew: "אופנוע", english: "Motorcycle", emoji: "🏍️", color: "bg-orange-500", sound: [330, 415, 494] },
};

/**
 * ===============================================
 * רשימות וקבועים נוספים
 * ===============================================
 */

export const PROFESSION_CONSTANTS: Record<string, ProfessionConstant> = {
  DOCTOR: {
    id: "doctor", emoji: "👩‍⚕️", name: "doctor", hebrew: "רופאה", english: "Doctor",
    description: "מטפלת בחולים ועוזרת להם להרגיש טוב",
    sound: [523, 659, 784], color: "bg-gradient-to-br from-blue-200 to-blue-300"
  },
  TEACHER: {
    id: "teacher", emoji: "👩‍🏫", name: "teacher", hebrew: "מורה", english: "Teacher",
    description: "מלמדת ילדים ועוזרת להם ללמוד", 
    sound: [440, 554, 659], color: "bg-gradient-to-br from-green-200 to-green-300"
  },
  FIREFIGHTER: {
    id: "firefighter", emoji: "👩‍🚒", name: "firefighter", hebrew: "כבאית", english: "Firefighter",
    description: "מכבה שרפות ומצילה אנשים",
    sound: [330, 415, 523], color: "bg-gradient-to-br from-red-200 to-red-300"
  },
};

export const MEMORY_GAME_ANIMALS = [
  { emoji: "🐱", sound: "meow", name: "חתול" },
  { emoji: "🐶", sound: "woof", name: "כלב" },
  { emoji: "🐰", sound: "hop", name: "ארנב" },
  { emoji: "🦊", sound: "yip", name: "שועל" },
  { emoji: "🐻", sound: "growl", name: "דוב" },
  { emoji: "🐼", sound: "chirp", name: "פנדה" },
];

/**
 * ===============================================
 * יצוא רשימות אוטומטיות (ללא דופליקייטים)
 * ===============================================
 */

export const ALL_COLORS = createItemsList(COLOR_CONSTANTS);
export const ALL_LETTERS = createItemsList(LETTER_CONSTANTS);
export const ALL_SHAPES = createItemsList(SHAPE_CONSTANTS);
export const ALL_NUMBERS = Object.values(NUMBER_CONSTANTS);
export const ALL_FRUITS = createItemsList(FRUIT_CONSTANTS);
export const ALL_ANIMALS = createItemsList(ANIMAL_CONSTANTS);
export const ALL_WEATHERS = createItemsList(WEATHER_CONSTANTS);
export const ALL_TRANSPORTS = createItemsList(TRANSPORT_CONSTANTS);
export const ALL_VEGETABLES = createItemsList(VEGETABLE_CONSTANTS);
export const ALL_INSTRUMENTS = createItemsList(INSTRUMENT_CONSTANTS);
export const ALL_SPACE_OBJECTS = createItemsList(SPACE_CONSTANTS);
export const ALL_CLOTHING = createItemsList(CLOTHING_CONSTANTS);
export const ALL_SMELLS_TASTES = createItemsList(SMELL_TASTE_CONSTANTS);
export const ALL_HOUSE_ITEMS = createItemsList(HOUSE_CONSTANTS);
export const ALL_TOOLS = createItemsList(TOOL_CONSTANTS);
export const ALL_VEHICLES = createItemsList(VEHICLE_CONSTANTS);
export const ALL_PROFESSIONS = Object.values(PROFESSION_CONSTANTS);

export const COLOR_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(COLOR_CONSTANTS);
export const COLOR_TRANSLATIONS = COLOR_HEBREW_PRONUNCIATIONS;
export const LETTER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(LETTER_CONSTANTS);
export const SHAPE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SHAPE_CONSTANTS);
export const NUMBER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(NUMBER_CONSTANTS);
export const FRUIT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(FRUIT_CONSTANTS);
export const ANIMAL_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(ANIMAL_CONSTANTS);
export const WEATHER_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(WEATHER_CONSTANTS);
export const TRANSPORT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(TRANSPORT_CONSTANTS);
export const VEGETABLE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(VEGETABLE_CONSTANTS);
export const INSTRUMENT_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(INSTRUMENT_CONSTANTS);
export const SPACE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SPACE_CONSTANTS);
export const CLOTHING_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(CLOTHING_CONSTANTS);
export const SMELL_TASTE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(SMELL_TASTE_CONSTANTS);
export const HOUSE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(HOUSE_CONSTANTS);
export const TOOL_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(TOOL_CONSTANTS);
export const VEHICLE_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(VEHICLE_CONSTANTS);

/**
 * ===============================================
 * קבועים נוספים
 * ===============================================
 */

export const SOUND_CONSTANTS = {
  CHORD_NOTES: [523, 659, 784],
};

export const MEMORY_GAME_CONSTANTS = {
  FLIP_DURATION: 1000,
  SUCCESS_SOUND_FREQUENCIES: [523, 659, 784, 1047],
};

export const ANIMAL_SOUND_FREQUENCIES: Record<string, number[]> = {
  "🐱": [800, 1000, 600],
  "🐶": [200, 300, 150],
  "🐰": [400, 500, 600],
  "🦊": [600, 800, 500],
  "🐻": [100, 150, 80],
  "🐼": [300, 400, 350],
  "default": [440, 550, 330]
};

export const PROFESSION_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  doctor: "רופאה",
  teacher: "מורה",
  firefighter: "כבאית",
};

/**
 * ===============================================
 * קונפיגורציות המשחקים
 * ===============================================
 */

// פונקציה ליצירת קונפיגורציית משחק
const createGameConfig = (baseCount: number, increment: number = 1, levelThreshold: number = 3) => ({
  BASE_COUNT: baseCount,
  INCREMENT: increment, 
  LEVEL_THRESHOLD: levelThreshold
});

// קונפיגורציות כל המשחקים
export const CLOTHING_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const FRUIT_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const ANIMAL_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const WEATHER_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const TRANSPORT_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const VEGETABLE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const INSTRUMENT_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const SPACE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const SMELL_TASTE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const HOUSE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const TOOL_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const COLOR_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const LETTER_GAME_CONSTANTS = createGameConfig(6, 2, 3);
export const SHAPE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const NUMBER_GAME_CONSTANTS = createGameConfig(5, 1, 3);
export const VEHICLE_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const COUNTING_GAME_CONSTANTS = createGameConfig(4, 1, 3);
export const MATH_GAME_CONSTANTS = {
  BASE_COUNT: 4,
  INCREMENT: 1,
  LEVEL_THRESHOLD: 3,
  BASE_MAX_NUMBER: 5,
  NUMBER_INCREMENT: 2,
  ABSOLUTE_MAX_NUMBER: 20
};
export const PROFESSION_GAME_CONSTANTS = createGameConfig(4, 1, 3);
