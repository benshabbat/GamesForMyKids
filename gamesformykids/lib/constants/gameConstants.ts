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
