/**
 * נתוני משחקים נוספים - בריאות, טבע ובטיחות
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * נתוני מרקחת ותרופות
 * ===============================================
 */
export const MEDICINE_CONSTANTS: Record<string, BaseGameItem> = {
  STETHOSCOPE: { name: "stethoscope", hebrew: "סטטוסקופ", english: "Stethoscope", emoji: "🩺", color: "bg-blue-500", sound: [440, 550, 660] },
  THERMOMETER: { name: "thermometer", hebrew: "מד חום", english: "Thermometer", emoji: "🌡️", color: "bg-red-500", sound: [392, 494, 587] },
  BANDAGE: { name: "bandage", hebrew: "תחבושת", english: "Bandage", emoji: "🩹", color: "bg-pink-300", sound: [349, 440, 523] },
  SYRINGE: { name: "syringe", hebrew: "מזרק", english: "Syringe", emoji: "💉", color: "bg-gray-500", sound: [294, 370, 440] },
  PILLS: { name: "pills", hebrew: "כדורים", english: "Pills", emoji: "💊", color: "bg-purple-500", sound: [330, 415, 494] },
  FIRST_AID_KIT: { name: "first-aid-kit", hebrew: "ערכת עזרה ראשונה", english: "First Aid Kit", emoji: "🩹", color: "bg-red-600", sound: [262, 330, 392] },
  MASK: { name: "mask", hebrew: "מסכה", english: "Mask", emoji: "😷", color: "bg-white", sound: [523, 659, 784] },
  DOCTOR: { name: "doctor", hebrew: "רופא", english: "Doctor", emoji: "👨‍⚕️", color: "bg-blue-600", sound: [587, 698, 831] },
  NURSE: { name: "nurse", hebrew: "אחות", english: "Nurse", emoji: "👩‍⚕️", color: "bg-pink-500", sound: [196, 247, 294] },
  HOSPITAL: { name: "hospital", hebrew: "בית חולים", english: "Hospital", emoji: "🏥", color: "bg-blue-700", sound: [277, 349, 415] },
};

/**
 * ===============================================
 * נתוני צלילי הטבע
 * ===============================================
 */
export const NATURE_SOUNDS_CONSTANTS: Record<string, BaseGameItem> = {
  BIRD_SONG: { name: "bird-song", hebrew: "ציוץ ציפור", english: "Bird Song", emoji: "🐦", color: "bg-yellow-400", sound: [659, 831, 988] },
  RAIN: { name: "rain", hebrew: "גשם", english: "Rain", emoji: "🌧️", color: "bg-blue-400", sound: [220, 277, 330] },
  WIND: { name: "wind", hebrew: "רוח", english: "Wind", emoji: "💨", color: "bg-gray-300", sound: [196, 247, 294] },
  OCEAN_WAVES: { name: "ocean-waves", hebrew: "גלי ים", english: "Ocean Waves", emoji: "🌊", color: "bg-blue-500", sound: [123, 155, 185] },
  THUNDER: { name: "thunder", hebrew: "רעם", english: "Thunder", emoji: "⛈️", color: "bg-gray-700", sound: [98, 123, 147] },
  CRICKET: { name: "cricket", hebrew: "צרצר", english: "Cricket", emoji: "🦗", color: "bg-green-400", sound: [880, 1108, 1319] },
  FROG: { name: "frog", hebrew: "צפרדע", english: "Frog", emoji: "🐸", color: "bg-green-500", sound: [165, 208, 247] },
  WATERFALL: { name: "waterfall", hebrew: "מפל", english: "Waterfall", emoji: "💦", color: "bg-cyan-400", sound: [147, 185, 220] },
  OWL: { name: "owl", hebrew: "ינשוף", english: "Owl", emoji: "🦉", color: "bg-brown-500", sound: [131, 165, 196] },
  BEE: { name: "bee", hebrew: "דבורה", english: "Bee", emoji: "🐝", color: "bg-yellow-500", sound: [523, 659, 784] },
};

/**
 * ===============================================
 * נתוני עונות השנה ומועדים
 * ===============================================
 */
export const SEASONS_HOLIDAYS_CONSTANTS: Record<string, BaseGameItem> = {
  SPRING: { name: "spring", hebrew: "אביב", english: "Spring", emoji: "🌸", color: "bg-pink-400", sound: [440, 550, 660] },
  SUMMER: { name: "summer", hebrew: "קיץ", english: "Summer", emoji: "☀️", color: "bg-yellow-500", sound: [523, 659, 784] },
  AUTUMN: { name: "autumn", hebrew: "סתיו", english: "Autumn", emoji: "🍂", color: "bg-orange-500", sound: [392, 494, 587] },
  WINTER: { name: "winter", hebrew: "חורף", english: "Winter", emoji: "❄️", color: "bg-blue-300", sound: [294, 370, 440] },
  PASSOVER: { name: "passover", hebrew: "פסח", english: "Passover", emoji: "🍷", color: "bg-red-500", sound: [349, 440, 523] },
  ROSH_HASHANA: { name: "rosh-hashana", hebrew: "ראש השנה", english: "Rosh Hashana", emoji: "🍎", color: "bg-red-400", sound: [330, 415, 494] },
  YOM_KIPPUR: { name: "yom-kippur", hebrew: "יום כיפור", english: "Yom Kippur", emoji: "🕊️", color: "bg-white", sound: [262, 330, 392] },
  SUKKOT: { name: "sukkot", hebrew: "סוכות", english: "Sukkot", emoji: "🏠", color: "bg-green-500", sound: [587, 698, 831] },
  HANUKKAH: { name: "hanukkah", hebrew: "חנוכה", english: "Hanukkah", emoji: "🕎", color: "bg-blue-600", sound: [196, 247, 294] },
  PURIM: { name: "purim", hebrew: "פורים", english: "Purim", emoji: "🎭", color: "bg-purple-500", sound: [277, 349, 415] },
};

/**
 * ===============================================
 * נתוני ריגושים ותחושות
 * ===============================================
 */
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

/**
 * ===============================================
 * נתוני קניות וכסף
 * ===============================================
 */
export const SHOPPING_MONEY_CONSTANTS: Record<string, BaseGameItem> = {
  COIN_1: { name: "coin-1", hebrew: "אגורה", english: "Agora", emoji: "🪙", color: "bg-amber-600", sound: [440, 550, 660] },
  COIN_5: { name: "coin-5", hebrew: "5 אגורות", english: "5 Agorot", emoji: "🪙", color: "bg-amber-500", sound: [392, 494, 587] },
  COIN_10: { name: "coin-10", hebrew: "10 אגורות", english: "10 Agorot", emoji: "🪙", color: "bg-amber-400", sound: [349, 440, 523] },
  SHEKEL_1: { name: "shekel-1", hebrew: "שקל", english: "Shekel", emoji: "💰", color: "bg-yellow-500", sound: [294, 370, 440] },
  SHEKEL_5: { name: "shekel-5", hebrew: "5 שקלים", english: "5 Shekels", emoji: "💰", color: "bg-yellow-600", sound: [330, 415, 494] },
  SHEKEL_10: { name: "shekel-10", hebrew: "10 שקלים", english: "10 Shekels", emoji: "💵", color: "bg-green-500", sound: [262, 330, 392] },
  SHOPPING_CART: { name: "shopping-cart", hebrew: "עגלת קניות", english: "Shopping Cart", emoji: "🛒", color: "bg-blue-500", sound: [523, 659, 784] },
  CASHIER: { name: "cashier", hebrew: "קופאי", english: "Cashier", emoji: "👨‍💼", color: "bg-purple-500", sound: [587, 698, 831] },
  RECEIPT: { name: "receipt", hebrew: "קבלה", english: "Receipt", emoji: "🧾", color: "bg-white", sound: [196, 247, 294] },
  CREDIT_CARD: { name: "credit-card", hebrew: "כרטיס אשראי", english: "Credit Card", emoji: "💳", color: "bg-blue-600", sound: [277, 349, 415] },
};

/**
 * ===============================================
 * נתוני בטיחות בדרכים
 * ===============================================
 */
export const ROAD_SAFETY_CONSTANTS: Record<string, BaseGameItem> = {
  TRAFFIC_LIGHT_RED: { name: "traffic-light-red", hebrew: "רמזור אדום", english: "Red Light", emoji: "🔴", color: "bg-red-500", sound: [220, 277, 330] },
  TRAFFIC_LIGHT_YELLOW: { name: "traffic-light-yellow", hebrew: "רמזור צהוב", english: "Yellow Light", emoji: "🟡", color: "bg-yellow-500", sound: [294, 370, 440] },
  TRAFFIC_LIGHT_GREEN: { name: "traffic-light-green", hebrew: "רמזור ירוק", english: "Green Light", emoji: "🟢", color: "bg-green-500", sound: [349, 440, 523] },
  CROSSWALK: { name: "crosswalk", hebrew: "מעבר חצייה", english: "Crosswalk", emoji: "🚸", color: "bg-blue-500", sound: [392, 494, 587] },
  STOP_SIGN: { name: "stop-sign", hebrew: "תמרור עצור", english: "Stop Sign", emoji: "🛑", color: "bg-red-600", sound: [196, 247, 294] },
  HELMET: { name: "helmet", hebrew: "קסדה", english: "Helmet", emoji: "⛑️", color: "bg-yellow-600", sound: [440, 550, 660] },
  SEATBELT: { name: "seatbelt", hebrew: "חגורת בטיחות", english: "Seatbelt", emoji: "🔗", color: "bg-black", sound: [330, 415, 494] },
  PEDESTRIAN: { name: "pedestrian", hebrew: "הולך רגל", english: "Pedestrian", emoji: "🚶", color: "bg-blue-400", sound: [523, 659, 784] },
  SCHOOL_ZONE: { name: "school-zone", hebrew: "אזור בית ספר", english: "School Zone", emoji: "🏫", color: "bg-green-600", sound: [262, 330, 392] },
  SPEED_LIMIT: { name: "speed-limit", hebrew: "הגבלת מהירות", english: "Speed Limit", emoji: "⚠️", color: "bg-orange-500", sound: [587, 698, 831] },
};

// רשימות מוכנות לשימוש
export const MEDICINE_ITEMS = createItemsList(MEDICINE_CONSTANTS);
export const NATURE_SOUNDS_ITEMS = createItemsList(NATURE_SOUNDS_CONSTANTS);
export const SEASONS_HOLIDAYS_ITEMS = createItemsList(SEASONS_HOLIDAYS_CONSTANTS);
export const FEELINGS_ITEMS = createItemsList(FEELINGS_CONSTANTS);
export const SHOPPING_MONEY_ITEMS = createItemsList(SHOPPING_MONEY_CONSTANTS);
export const ROAD_SAFETY_ITEMS = createItemsList(ROAD_SAFETY_CONSTANTS);

// מילוני ביטוי
export const MEDICINE_PRONUNCIATIONS = createPronunciationDictionary(MEDICINE_CONSTANTS);
export const NATURE_SOUNDS_PRONUNCIATIONS = createPronunciationDictionary(NATURE_SOUNDS_CONSTANTS);
export const SEASONS_HOLIDAYS_PRONUNCIATIONS = createPronunciationDictionary(SEASONS_HOLIDAYS_CONSTANTS);
export const FEELINGS_PRONUNCIATIONS = createPronunciationDictionary(FEELINGS_CONSTANTS);
export const SHOPPING_MONEY_PRONUNCIATIONS = createPronunciationDictionary(SHOPPING_MONEY_CONSTANTS);
export const ROAD_SAFETY_PRONUNCIATIONS = createPronunciationDictionary(ROAD_SAFETY_CONSTANTS);

// קונפיגורציות משחק
export const MEDICINE_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק מרקחת ותרופות",
  subTitle: "הכר כלי רפואה ומתן עזרה ראשונה!",
  description: "למד על כלי רפואה בסיסיים ואיך לתת עזרה ראשונה!",
  instructions: "לחץ על הכלי הרפואי הנכון כשאתה שומע את השם שלו",
};

export const NATURE_SOUNDS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק צלילי הטבע",
  subTitle: "הקשב לקולות הטבע ובעלי החיים!",
  description: "גלה את הקולות המדהימים של הטבע!",
  instructions: "לחץ על המקור הנכון של הצליל שאתה שומע",
};

export const SEASONS_HOLIDAYS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק עונות השנה ומועדים",
  subTitle: "למד על עונות השנה והחגים היהודיים!",
  description: "גלה את עונות השנה והחגים המיוחדים!",
  instructions: "לחץ על העונה או החג הנכון",
};

export const FEELINGS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק ריגושים ותחושות",
  subTitle: "זהה ולמד על רגשות ותחושות שונות!",
  description: "פתח אינטליגנציה רגשית וזהה רגשות!",
  instructions: "לחץ על הרגש הנכון שאתה רואה או שומע",
};

export const SHOPPING_MONEY_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק קניות וכסף",
  subTitle: "למד על כסף, מחירים וקניות!",
  description: "הכן לעולם הכלכלי היומיומי!",
  instructions: "לחץ על המטבע או הפריט הנכון",
};

export const ROAD_SAFETY_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק בטיחות בדרכים",
  subTitle: "למד כללי בטיחות חשובים בדרכים!",
  description: "פתח מודעות לבטיחות בדרכים!",
  instructions: "לחץ על התמרור או הפעולה הנכונה",
};