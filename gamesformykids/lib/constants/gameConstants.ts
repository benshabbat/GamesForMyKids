/**
 * קבועים משותפים למשחקים
 */

/**
 * מצב משחק התחלתי גנרי
 */
export const INITIAL_GAME_STATE = {
  currentChallenge: null,
  score: 0,
  level: 1,
  isPlaying: false,
  showCelebration: false,
  options: [],
};

/**
 * קבועי צבעים למשחק
 */
export const COLOR_CONSTANTS = {
  RED: {
    name: "red",
    hebrew: "אדום",
    value: "bg-red-500",
    tailwindClass: "bg-gradient-to-br from-red-400 to-red-600",
    sound: [440, 550, 660],
  },
  BLUE: {
    name: "blue",
    hebrew: "כחול",
    value: "bg-blue-500",
    tailwindClass: "bg-gradient-to-br from-blue-400 to-blue-600",
    sound: [523, 659, 784],
  },
  GREEN: {
    name: "green",
    hebrew: "ירוק",
    value: "bg-green-500",
    tailwindClass: "bg-gradient-to-br from-green-400 to-green-600",
    sound: [349, 440, 523],
  },
  YELLOW: {
    name: "yellow",
    hebrew: "צהוב",
    value: "bg-yellow-500",
    tailwindClass: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    sound: [392, 494, 587],
  },
  PURPLE: {
    name: "purple",
    hebrew: "סגול",
    value: "bg-purple-500",
    tailwindClass: "bg-gradient-to-br from-purple-400 to-purple-600",
    sound: [294, 370, 440],
  },
  ORANGE: {
    name: "orange",
    hebrew: "כתום",
    value: "bg-orange-500",
    tailwindClass: "bg-gradient-to-br from-orange-400 to-orange-600",
    sound: [330, 415, 494],
  },
  PINK: {
    name: "pink",
    hebrew: "ורוד",
    value: "bg-pink-500",
    tailwindClass: "bg-gradient-to-br from-pink-400 to-pink-600",
    sound: [587, 698, 784],
  },
  BROWN: {
    name: "brown",
    hebrew: "חום",
    value: "bg-amber-600",
    tailwindClass: "bg-gradient-to-br from-amber-500 to-amber-700",
    sound: [220, 277, 330],
  },
  BLACK: {
    name: "black",
    hebrew: "שחור",
    value: "bg-gray-900",
    tailwindClass: "bg-gradient-to-br from-gray-800 to-gray-950",
    sound: [196, 247, 294],
  },
  WHITE: {
    name: "white",
    hebrew: "לבן",
    value: "bg-gray-100 border-2 border-gray-300",
    tailwindClass: "bg-gradient-to-br from-gray-50 to-gray-200 border-2 border-gray-300",
    sound: [659, 784, 880],
  },
};

// רשימת כל הצבעים
export const ALL_COLORS = Object.values(COLOR_CONSTANTS);

/**
 * קבועי אותיות למשחק
 */
export const LETTER_CONSTANTS = {
  ALEF: {
    name: "alef",
    hebrew: "א",
    english: "A",
    sound: [440, 550, 660],
  },
  BET: {
    name: "bet",
    hebrew: "ב",
    english: "B",
    sound: [494, 588, 740],
  },
  GIMEL: {
    name: "gimel",
    hebrew: "ג",
    english: "G",
    sound: [523, 659, 784],
  },
  DALET: {
    name: "dalet",
    hebrew: "ד",
    english: "D",
    sound: [587, 740, 880],
  },
  HEY: {
    name: "hey",
    hebrew: "ה",
    english: "H",
    sound: [659, 831, 988],
  },
  VAV: {
    name: "vav",
    hebrew: "ו",
    english: "V",
    sound: [392, 494, 622],
  },
  ZAYIN: {
    name: "zayin",
    hebrew: "ז",
    english: "Z",
    sound: [349, 440, 523],
  },
  HET: {
    name: "het",
    hebrew: "ח",
    english: "CH",
    sound: [330, 415, 494],
  },
  TET: {
    name: "tet",
    hebrew: "ט",
    english: "T",
    sound: [294, 370, 440],
  },
  YUD: {
    name: "yud",
    hebrew: "י",
    english: "Y",
    sound: [277, 349, 415],
  },
  KAF: {
    name: "kaf",
    hebrew: "כ",
    english: "K",
    sound: [262, 330, 392],
  },
  LAMED: {
    name: "lamed",
    hebrew: "ל",
    english: "L",
    sound: [247, 311, 370],
  },
  MEM: {
    name: "mem",
    hebrew: "מ",
    english: "M",
    sound: [233, 294, 349],
  },
  NUN: {
    name: "nun",
    hebrew: "נ",
    english: "N",
    sound: [220, 277, 330],
  },
  SAMECH: {
    name: "samech",
    hebrew: "ס",
    english: "S",
    sound: [208, 262, 311],
  },
  AYIN: {
    name: "ayin",
    hebrew: "ע",
    english: "A",
    sound: [196, 247, 294],
  },
  PEY: {
    name: "pey",
    hebrew: "פ",
    english: "P",
    sound: [185, 233, 277],
  },
  TZADI: {
    name: "tzadi",
    hebrew: "צ",
    english: "TZ",
    sound: [175, 220, 262],
  },
  KUF: {
    name: "kuf",
    hebrew: "ק",
    english: "K",
    sound: [165, 208, 247],
  },
  RESH: {
    name: "resh",
    hebrew: "ר",
    english: "R",
    sound: [156, 196, 233],
  },
  SHIN: {
    name: "shin",
    hebrew: "ש",
    english: "SH",
    sound: [147, 185, 220],
  },
  TAV: {
    name: "tav",
    hebrew: "ת",
    english: "T",
    sound: [139, 175, 208],
  },
};

// רשימת כל האותיות
export const ALL_LETTERS = Object.values(LETTER_CONSTANTS);

/**
 * קבועי צורות למשחק
 */
export const SHAPE_CONSTANTS = {
  CIRCLE: {
    name: "circle",
    hebrew: "עיגול",
    english: "Circle",
    color: "bg-blue-500",
    sound: [523, 659, 784],
    svg: "circle"
  },
  SQUARE: {
    name: "square",
    hebrew: "ריבוע",
    english: "Square",
    color: "bg-red-500",
    sound: [440, 550, 660],
    svg: "square"
  },
  TRIANGLE: {
    name: "triangle",
    hebrew: "משולש",
    english: "Triangle",
    color: "bg-green-500",
    sound: [349, 440, 523],
    svg: "triangle"
  },
  RECTANGLE: {
    name: "rectangle",
    hebrew: "מלבן",
    english: "Rectangle",
    color: "bg-purple-500",
    sound: [294, 370, 440],
    svg: "rectangle"
  },
  STAR: {
    name: "star",
    hebrew: "כוכב",
    english: "Star",
    color: "bg-yellow-500",
    sound: [392, 494, 587],
    svg: "star"
  },
  HEART: {
    name: "heart",
    hebrew: "לב",
    english: "Heart",
    color: "bg-pink-500",
    sound: [587, 698, 784],
    svg: "heart"
  },
  DIAMOND: {
    name: "diamond",
    hebrew: "מעויין",
    english: "Diamond",
    color: "bg-indigo-500",
    sound: [277, 349, 415],
    svg: "diamond"
  },
  OVAL: {
    name: "oval",
    hebrew: "אליפסה",
    english: "Oval",
    color: "bg-teal-500",
    sound: [220, 277, 330],
    svg: "oval"
  }
};

// רשימת כל הצורות
export const ALL_SHAPES = Object.values(SHAPE_CONSTANTS);

/**
 * קבועי מספרים למשחק
 */
export const NUMBER_CONSTANTS = {
  ZERO: {
    name: "zero",
    hebrew: "אפס",
    english: "Zero",
    digit: "0",
    sound: [261, 329, 392],
  },
  ONE: {
    name: "one",
    hebrew: "אחד",
    english: "One", 
    digit: "1",
    sound: [293, 369, 440],
  },
  TWO: {
    name: "two",
    hebrew: "שתיים",
    english: "Two",
    digit: "2", 
    sound: [329, 415, 494],
  },
  THREE: {
    name: "three",
    hebrew: "שלוש",
    english: "Three",
    digit: "3",
    sound: [349, 440, 523],
  },
  FOUR: {
    name: "four",
    hebrew: "ארבע",
    english: "Four",
    digit: "4",
    sound: [392, 494, 587],
  },
  FIVE: {
    name: "five",
    hebrew: "חמש",
    english: "Five",
    digit: "5",
    sound: [440, 554, 659],
  },
  SIX: {
    name: "six",
    hebrew: "שש",
    english: "Six",
    digit: "6",
    sound: [493, 622, 740],
  },
  SEVEN: {
    name: "seven",
    hebrew: "שבע",
    english: "Seven",
    digit: "7",
    sound: [523, 659, 784],
  },
  EIGHT: {
    name: "eight",
    hebrew: "שמונה",
    english: "Eight",
    digit: "8",
    sound: [587, 740, 880],
  },
  NINE: {
    name: "nine",
    hebrew: "תשע",
    english: "Nine",
    digit: "9",
    sound: [659, 831, 988],
  },
};

// רשימת כל המספרים
export const ALL_NUMBERS = Object.values(NUMBER_CONSTANTS);

/**
 * קבועי ניקוד ותצוגה
 */
export const GAME_CONSTANTS = {
  // ניקוד בסיסי לכל תשובה נכונה
  SCORE_INCREMENT: 10,
  
  // זמני השהייה
  DELAYS: {
    SPEAK_DELAY: 250,      // השהייה לפני דיבור
    SUCCESS_SPEAK_DELAY: 300,  // השהייה לפני דיבור לאחר הצלחה
    CELEBRATION_DURATION: 1500, // משך החגיגה
    START_GAME_DELAY: 300,  // השהייה לפני תחילת משחק
    NEXT_ITEM_DELAY: 1000,  // השהייה לפני הצגת פריט הבא
    WRONG_ANSWER_DELAY: 400, // השהייה לפני משוב על תשובה שגויה
    RETRY_DELAY: 600,       // השהייה לפני חזרה על פריט אחרי תשובה שגויה
  },
  
  // מספר אפשרויות בחירה במשחק
  OPTIONS_COUNT: 4,
  
  // קבועים ספציפיים למשחק האותיות
  LETTER_GAME: {
    BASE_LETTERS_COUNT: 6,
    LETTERS_INCREMENT: 2,
    LEVEL_THRESHOLD: 3
  },
  
  // קבועים ספציפיים למשחק הצורות
  SHAPE_GAME: {
    BASE_SHAPES_COUNT: 4,
    SHAPES_INCREMENT: 1,
    LEVEL_THRESHOLD: 3
  },
  
  // קבועים ספציפיים למשחק המספרים
  NUMBER_GAME: {
    BASE_NUMBERS_COUNT: 5,
    NUMBERS_INCREMENT: 1,
    LEVEL_THRESHOLD: 3
  },
  
  // קבועים ספציפיים למשחק הזיכרון
  MEMORY_GAME: {
    FLIP_DURATION: 1000,   // זמן השהייה בין הפיכת קלפים
    SUCCESS_SOUND_FREQUENCIES: [523, 659, 784, 1047], // תדרים לצליל הצלחה
  }
};

/**
 * קבועים של צלילים
 */
export const SOUND_CONSTANTS = {
  // תדרים של צלילי אקורד דו מז'ור (C5, E5, G5)
  CHORD_NOTES: [523, 659, 784],
};

/**
 * מילות עידוד וחיזוקים בעברית
 */
export const FEEDBACK_MESSAGES = {
  SUCCESS: [
    "כל הכבוד",
    "נהדר",
    "מצוין",
    "יופי",
    "נכון מאוד"
  ],
  WRONG: [
    "נסו שוב",
    "לא נורא, נסו שוב",
    "כמעט",
  ],
  START: [
    "בהצלחה",
    "מתחילים",
    "יאללה נתחיל"
  ]
};

/**
 * תרגומים לעברית של צבעים
 */
export const COLOR_TRANSLATIONS: Record<string, string> = {
  red: "אדום",
  blue: "כחול",
  green: "ירוק",
  yellow: "צהוב",
  purple: "סגול",
  orange: "כתום",
  pink: "ורוד",
  brown: "חום",
  black: "שחור",
  white: "לבן",
};

/**
 * הגיית אותיות בעברית
 */
export const HEBREW_PRONUNCIATIONS: Record<string, string> = {
  alef: "אָלֶף",
  bet: "בֵּית",
  gimel: "גִּימֶל",
  dalet: "דָּלֶת",
  hey: "הֵא",
  vav: "וָו",
  zayin: "זַיִן",
  het: "חֵית",
  tet: "טֵית",
  yud: "יוּד",
  kaf: "כַּף",
  lamed: "לָמֶד",
  mem: "מֵם",
  nun: "נוּן",
  samech: "סָמֶךְ",
  ayin: "עַיִן",
  pey: "פֵּא",
  tzadi: "צָדִי",
  kuf: "קוּף",
  resh: "רֵישׁ",
  shin: "שִׁין",
  tav: "תָּו",
};

/**
 * הגיית מספרים בעברית
 */
export const NUMBER_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  zero: "אפס",
  one: "אחד",
  two: "שתיים",
  three: "שלוש",
  four: "ארבע",
  five: "חמש",
  six: "שש",
  seven: "שבע",
  eight: "שמונה",
  nine: "תשע",
};

/**
 * נתוני חיות למשחק הזיכרון
 */
export const MEMORY_GAME_ANIMALS = [
  { emoji: "🐱", sound: "meow", name: "חתול" },
  { emoji: "🐶", sound: "woof", name: "כלב" },
  { emoji: "🐰", sound: "hop", name: "ארנב" },
  { emoji: "🦊", sound: "yip", name: "שועל" },
  { emoji: "🐻", sound: "growl", name: "דוב" },
  { emoji: "🐼", sound: "chirp", name: "פנדה" },
];

/**
 * תדרים לצלילי חיות במשחק הזיכרון
 */
export const ANIMAL_SOUND_FREQUENCIES: Record<string, number[]> = {
  "🐱": [800, 1000, 600],    // חתול
  "🐶": [200, 300, 150],     // כלב
  "🐰": [400, 500, 600],     // ארנב
  "🦊": [600, 800, 500],     // שועל
  "🐻": [100, 150, 80],      // דוב
  "🐼": [300, 400, 350],     // פנדה
  "default": [440, 550, 330] // ברירת מחדל
};


/**
 * קבועי פירות למשחק
 */
export const FRUIT_CONSTANTS = {
  APPLE: {
    name: "apple",
    hebrew: "תפוח",
    english: "Apple",
    emoji: "🍎",
    color: "bg-red-500",
    sound: [440, 550, 660],
  },
  BANANA: {
    name: "banana",
    hebrew: "בננה",
    english: "Banana",
    emoji: "🍌",
    color: "bg-yellow-500",
    sound: [392, 494, 587],
  },
  ORANGE: {
    name: "orange",
    hebrew: "תפוז",
    english: "Orange",
    emoji: "🍊",
    color: "bg-orange-500",
    sound: [330, 415, 494],
  },
  GRAPES: {
    name: "grapes",
    hebrew: "ענבים",
    english: "Grapes",
    emoji: "🍇",
    color: "bg-purple-500",
    sound: [294, 370, 440],
  },
  STRAWBERRY: {
    name: "strawberry",
    hebrew: "תות",
    english: "Strawberry",
    emoji: "🍓",
    color: "bg-pink-500",
    sound: [587, 698, 784],
  },
  WATERMELON: {
    name: "watermelon",
    hebrew: "אבטיח",
    english: "Watermelon",
    emoji: "🍉",
    color: "bg-green-500",
    sound: [349, 440, 523],
  },
  PEACH: {
    name: "peach",
    hebrew: "אפרסק",
    english: "Peach",
    emoji: "🍑",
    color: "bg-orange-400",
    sound: [277, 349, 415],
  },
  PEAR: {
    name: "pear",
    hebrew: "אגס",
    english: "Pear",
    emoji: "🍐",
    color: "bg-green-400",
    sound: [262, 330, 392],
  },
  PINEAPPLE: {
    name: "pineapple",
    hebrew: "אננס",
    english: "Pineapple",
    emoji: "🍍",
    color: "bg-yellow-600",
    sound: [233, 294, 349],
  },
  CHERRY: {
    name: "cherry",
    hebrew: "דובדבן",
    english: "Cherry",
    emoji: "🍒",
    color: "bg-red-600",
    sound: [523, 659, 784],
  },
};

// רשימת כל הפירות
export const ALL_FRUITS = Object.values(FRUIT_CONSTANTS);

/**
 * הגיית פירות בעברית
 */
export const FRUIT_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  apple: "תפוח",
  banana: "בננה",
  orange: "תפוז",
  grapes: "ענבים",
  strawberry: "תות",
  watermelon: "אבטיח",
  peach: "אפרסק",
  pear: "אגס",
  pineapple: "אננס",
  cherry: "דובדבן",
};

/**
 * קבועים ספציפיים למשחק הפירות
 */
export const FRUIT_GAME_CONSTANTS = {
  BASE_FRUITS_COUNT: 4,
  FRUITS_INCREMENT: 1,
  LEVEL_THRESHOLD: 3
};


/**
 * קבועי חיות למשחק
 */
export const ANIMAL_CONSTANTS = {
  DOG: {
    name: "dog",
    hebrew: "כלב",
    english: "Dog",
    emoji: "🐶",
    sound: [200, 300, 150],
    color: "bg-brown-500"
  },
  CAT: {
    name: "cat", 
    hebrew: "חתול",
    english: "Cat",
    emoji: "🐱",
    sound: [800, 1000, 600],
    color: "bg-gray-500"
  },
  COW: {
    name: "cow",
    hebrew: "פרה", 
    english: "Cow",
    emoji: "🐄",
    sound: [100, 200, 150],
    color: "bg-pink-300"
  },
  HORSE: {
    name: "horse",
    hebrew: "סוס",
    english: "Horse", 
    emoji: "🐴",
    sound: [300, 500, 400],
    color: "bg-amber-600"
  },
  SHEEP: {
    name: "sheep",
    hebrew: "כבש",
    english: "Sheep",
    emoji: "🐑", 
    sound: [400, 600, 500],
    color: "bg-gray-200"
  },
  PIG: {
    name: "pig",
    hebrew: "חזיר",
    english: "Pig",
    emoji: "🐷",
    sound: [250, 350, 200],
    color: "bg-pink-400"
  },
  CHICKEN: {
    name: "chicken",
    hebrew: "תרנגולת",
    english: "Chicken", 
    emoji: "🐔",
    sound: [600, 800, 700],
    color: "bg-yellow-400"
  },
  DUCK: {
    name: "duck",
    hebrew: "ברווז",
    english: "Duck",
    emoji: "🦆",
    sound: [500, 700, 600],
    color: "bg-blue-300"
  },
  RABBIT: {
    name: "rabbit",
    hebrew: "ארנב",
    english: "Rabbit",
    emoji: "🐰",
    sound: [400, 500, 600],
    color: "bg-gray-300"
  },
  FROG: {
    name: "frog",
    hebrew: "צפרדע", 
    english: "Frog",
    emoji: "🐸",
    sound: [200, 400, 300],
    color: "bg-green-400"
  }
};

// רשימת כל החיות
export const ALL_ANIMALS = Object.values(ANIMAL_CONSTANTS);

/**
 * הגיית חיות בעברית
 */
export const ANIMAL_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  dog: "כלב",
  cat: "חתול", 
  cow: "פרה",
  horse: "סוס",
  sheep: "כבש",
  pig: "חזיר",
  chicken: "תרנגולת",
  duck: "ברווז", 
  rabbit: "ארנב",
  frog: "צפרדע"
};

/**
 * קבועים ספציפיים למשחק החיות
 */
export const ANIMAL_GAME_CONSTANTS = {
  BASE_ANIMALS_COUNT: 4,
  ANIMALS_INCREMENT: 1,
  LEVEL_THRESHOLD: 3
};


export const COUNTING_GAME_CONSTANTS = {
  BASE_MAX_COUNT: 5,        // מספר מקסימלי לספירה ברמה הראשונה
  COUNT_INCREMENT: 2,       // כמה להוסיף בכל עליה ברמה
  LEVEL_THRESHOLD: 3,       // כמה רמות לפני הוספת מספרים
  ABSOLUTE_MAX_COUNT: 10,   // מספר מקסימלי אבסולוטי לספירה
};


/**
 * קבועי מזג אוויר למשחק
 */
export const WEATHER_CONSTANTS = {
  SUNNY: {
    name: "sunny",
    hebrew: "שמש",
    english: "Sunny",
    emoji: "☀️",
    color: "bg-yellow-500",
    sound: [392, 494, 587],
  },
  RAINY: {
    name: "rainy",
    hebrew: "גשום",
    english: "Rainy",
    emoji: "🌧️",
    color: "bg-blue-500",
    sound: [523, 659, 784],
  },
  CLOUDY: {
    name: "cloudy",
    hebrew: "מעונן",
    english: "Cloudy",
    emoji: "☁️",
    color: "bg-gray-500",
    sound: [294, 370, 440],
  },
  SNOWY: {
    name: "snowy",
    hebrew: "שלג",
    english: "Snowy",
    emoji: "❄️",
    color: "bg-cyan-500",
    sound: [659, 831, 988],
  },
  STORMY: {
    name: "stormy",
    hebrew: "סערה",
    english: "Stormy",
    emoji: "⛈️",
    color: "bg-purple-600",
    sound: [196, 247, 294],
  },
  WINDY: {
    name: "windy",
    hebrew: "רוח",
    english: "Windy",
    emoji: "💨",
    color: "bg-teal-500",
    sound: [349, 440, 523],
  },
  PARTLY_CLOUDY: {
    name: "partly_cloudy",
    hebrew: "חלקית מעונן",
    english: "Partly Cloudy",
    emoji: "⛅",
    color: "bg-orange-400",
    sound: [330, 415, 494],
  },
  FOGGY: {
    name: "foggy",
    hebrew: "ערפילי",
    english: "Foggy",
    emoji: "🌫️",
    color: "bg-gray-400",
    sound: [220, 277, 330],
  },
  HOT: {
    name: "hot",
    hebrew: "חם",
    english: "Hot",
    emoji: "🔥",
    color: "bg-red-600",
    sound: [440, 550, 660],
  },
  COLD: {
    name: "cold",
    hebrew: "קר",
    english: "Cold",
    emoji: "🧊",
    color: "bg-blue-300",
    sound: [262, 330, 392],
  },
};

// רשימת כל מזג האוויר
export const ALL_WEATHERS = Object.values(WEATHER_CONSTANTS);

/**
 * הגיית מזג אוויר בעברית
 */
export const WEATHER_HEBREW_PRONUNCIATIONS: Record<string, string> = {
  sunny: "שמש",
  rainy: "גשום", 
  cloudy: "מעונן",
  snowy: "שלג",
  stormy: "סערה",
  windy: "רוח",
  partly_cloudy: "חלקית מעונן",
  foggy: "ערפילי",
  hot: "חם",
  cold: "קר",
};

/**
 * קבועים ספציפיים למשחק מזג האוויר
 */
export const WEATHER_GAME_CONSTANTS = {
  BASE_WEATHERS_COUNT: 4,
  WEATHERS_INCREMENT: 1,
  LEVEL_THRESHOLD: 3
};
