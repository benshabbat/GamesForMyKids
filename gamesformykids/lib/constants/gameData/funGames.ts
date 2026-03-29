/**
 * ===============================================
 * נתוני משחקים כיפיים חדשים
 * ===============================================
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * ציפורים - Birds
 * ===============================================
 */
export const BIRDS_CONSTANTS: Record<string, BaseGameItem> = {
  EAGLE: { name: "eagle", hebrew: "נשר", english: "Eagle", emoji: "🦅", color: "bg-amber-700", sound: [440, 550, 660] },
  OWL: { name: "owl", hebrew: "ינשוף", english: "Owl", emoji: "🦉", color: "bg-amber-800", sound: [294, 370, 440] },
  PARROT: { name: "parrot", hebrew: "תוכי", english: "Parrot", emoji: "🦜", color: "bg-green-500", sound: [523, 659, 784] },
  PENGUIN: { name: "penguin", hebrew: "פינגווין", english: "Penguin", emoji: "🐧", color: "bg-slate-700", sound: [349, 440, 523] },
  FLAMINGO: { name: "flamingo", hebrew: "פלמינגו", english: "Flamingo", emoji: "🦩", color: "bg-pink-400", sound: [392, 494, 587] },
  PEACOCK: { name: "peacock", hebrew: "טווס", english: "Peacock", emoji: "🦚", color: "bg-teal-500", sound: [330, 415, 494] },
  DUCK: { name: "duck", hebrew: "ברווז", english: "Duck", emoji: "🦆", color: "bg-yellow-500", sound: [262, 330, 392] },
  ROOSTER: { name: "rooster", hebrew: "תרנגול", english: "Rooster", emoji: "🐓", color: "bg-red-500", sound: [587, 698, 831] },
  SWAN: { name: "swan", hebrew: "ברבור", english: "Swan", emoji: "🦢", color: "bg-white", sound: [659, 784, 932] },
  TOUCAN: { name: "toucan", hebrew: "טוקן", english: "Toucan", emoji: "🦜", color: "bg-orange-500", sound: [220, 277, 330] },
  HUMMINGBIRD: { name: "hummingbird", hebrew: "יונק דבש", english: "Hummingbird", emoji: "🐦", color: "bg-emerald-500", sound: [698, 880, 1047] },
  CROW: { name: "crow", hebrew: "עורב", english: "Crow", emoji: "🐦‍⬛", color: "bg-gray-900", sound: [196, 247, 294] },
};

/**
 * ===============================================
 * חרקים ופרפרים - Bugs & Insects
 * ===============================================
 */
export const BUGS_INSECTS_CONSTANTS: Record<string, BaseGameItem> = {
  BUTTERFLY: { name: "butterfly", hebrew: "פרפר", english: "Butterfly", emoji: "🦋", color: "bg-purple-400", sound: [523, 659, 784] },
  LADYBUG: { name: "ladybug", hebrew: "פרת משה רבנו", english: "Ladybug", emoji: "🐞", color: "bg-red-500", sound: [440, 554, 659] },
  BEE: { name: "bee", hebrew: "דבורה", english: "Bee", emoji: "🐝", color: "bg-yellow-400", sound: [392, 494, 587] },
  ANT: { name: "ant", hebrew: "נמלה", english: "Ant", emoji: "🐜", color: "bg-red-700", sound: [220, 277, 330] },
  CATERPILLAR: { name: "caterpillar", hebrew: "זחל", english: "Caterpillar", emoji: "🐛", color: "bg-green-500", sound: [294, 370, 440] },
  GRASSHOPPER: { name: "grasshopper", hebrew: "חגב", english: "Grasshopper", emoji: "🦗", color: "bg-lime-600", sound: [330, 415, 494] },
  SPIDER: { name: "spider", hebrew: "עכביש", english: "Spider", emoji: "🕷️", color: "bg-gray-700", sound: [196, 247, 294] },
  BEETLE: { name: "beetle", hebrew: "חיפושית", english: "Beetle", emoji: "🪲", color: "bg-teal-700", sound: [262, 330, 392] },
  DRAGONFLY: { name: "dragonfly", hebrew: "שפירית", english: "Dragonfly", emoji: "🪰", color: "bg-cyan-400", sound: [587, 698, 831] },
  SNAIL: { name: "snail", hebrew: "חילזון", english: "Snail", emoji: "🐌", color: "bg-orange-700", sound: [131, 165, 196] },
  FIREFLY: { name: "firefly", hebrew: "גחלילית", english: "Firefly", emoji: "✨", color: "bg-yellow-300", sound: [698, 880, 1047] },
  MOSQUITO: { name: "mosquito", hebrew: "יתוש", english: "Mosquito", emoji: "🦟", color: "bg-slate-500", sound: [880, 988, 1109] },
};

/**
 * ===============================================
 * גיבורי על - Superheroes
 * ===============================================
 */
export const SUPERHEROES_CONSTANTS: Record<string, BaseGameItem> = {
  FLYING: { name: "flying", hebrew: "טיסה", english: "Flying", emoji: "🦸", color: "bg-blue-600", sound: [523, 659, 784] },
  STRENGTH: { name: "strength", hebrew: "כוח", english: "Strength", emoji: "💪", color: "bg-red-600", sound: [294, 370, 440] },
  SPEED: { name: "speed", hebrew: "מהירות", english: "Speed", emoji: "⚡", color: "bg-yellow-400", sound: [698, 880, 1047] },
  INVISIBILITY: { name: "invisibility", hebrew: "אי-ראות", english: "Invisibility", emoji: "👻", color: "bg-gray-300", sound: [175, 220, 262] },
  LASER_EYES: { name: "laser-eyes", hebrew: "עיני לייזר", english: "Laser Eyes", emoji: "👁️", color: "bg-red-500", sound: [880, 988, 1109] },
  SHIELD: { name: "shield", hebrew: "מגן", english: "Shield", emoji: "🛡️", color: "bg-indigo-600", sound: [330, 415, 494] },
  WEB: { name: "web", hebrew: "רשת עכביש", english: "Spider Web", emoji: "🕸️", color: "bg-slate-600", sound: [392, 494, 587] },
  CAPE: { name: "cape", hebrew: "גלימה", english: "Cape", emoji: "🦸‍♂️", color: "bg-purple-700", sound: [440, 554, 659] },
  ICE: { name: "ice", hebrew: "קרח", english: "Ice Powers", emoji: "🧊", color: "bg-cyan-500", sound: [196, 247, 294] },
  FIRE: { name: "fire", hebrew: "אש", english: "Fire Powers", emoji: "🔥", color: "bg-orange-500", sound: [587, 698, 831] },
  HEALING: { name: "healing", hebrew: "ריפוי", english: "Healing", emoji: "💚", color: "bg-green-500", sound: [523, 659, 784] },
  TELEPATHY: { name: "telepathy", hebrew: "טלפתיה", english: "Telepathy", emoji: "🧠", color: "bg-violet-600", sound: [262, 330, 392] },
};

/**
 * ===============================================
 * אמנות ויצירה - Arts & Crafts
 * ===============================================
 */
export const ART_CRAFT_CONSTANTS: Record<string, BaseGameItem> = {
  PAINTBRUSH: { name: "paintbrush", hebrew: "מכחול", english: "Paintbrush", emoji: "🖌️", color: "bg-red-400", sound: [440, 550, 660] },
  PENCIL: { name: "pencil", hebrew: "עיפרון", english: "Pencil", emoji: "✏️", color: "bg-yellow-400", sound: [294, 370, 440] },
  SCISSORS: { name: "scissors", hebrew: "מספרים", english: "Scissors", emoji: "✂️", color: "bg-gray-500", sound: [330, 415, 494] },
  GLUE: { name: "glue", hebrew: "דבק", english: "Glue", emoji: "🫙", color: "bg-amber-300", sound: [220, 277, 330] },
  CLAY: { name: "clay", hebrew: "חימר", english: "Clay", emoji: "🏺", color: "bg-orange-600", sound: [196, 247, 294] },
  ORIGAMI: { name: "origami", hebrew: "אוריגמי", english: "Origami", emoji: "🦢", color: "bg-pink-400", sound: [523, 622, 740] },
  STICKERS: { name: "stickers", hebrew: "מדבקות", english: "Stickers", emoji: "⭐", color: "bg-yellow-300", sound: [659, 784, 932] },
  PALETTE: { name: "palette", hebrew: "לוח צבעים", english: "Palette", emoji: "🎨", color: "bg-gradient-to-br from-red-400 to-blue-400", sound: [587, 698, 831] },
  CRAYON: { name: "crayon", hebrew: "צבע שעווה", english: "Crayon", emoji: "🖍️", color: "bg-orange-400", sound: [392, 494, 587] },
  CANVAS: { name: "canvas", hebrew: "בד ציור", english: "Canvas", emoji: "🖼️", color: "bg-amber-100", sound: [349, 440, 523] },
  STAMP: { name: "stamp", hebrew: "חותמת", english: "Stamp", emoji: "📮", color: "bg-blue-500", sound: [262, 330, 392] },
  RULER: { name: "ruler", hebrew: "סרגל", english: "Ruler", emoji: "📏", color: "bg-yellow-600", sound: [277, 349, 415] },
};

/**
 * ===============================================
 * טיול ושטח - Camping & Outdoors
 * ===============================================
 */
export const CAMPING_CONSTANTS: Record<string, BaseGameItem> = {
  TENT: { name: "tent", hebrew: "אוהל", english: "Tent", emoji: "⛺", color: "bg-green-600", sound: [262, 330, 392] },
  CAMPFIRE: { name: "campfire", hebrew: "מדורה", english: "Campfire", emoji: "🔥", color: "bg-orange-500", sound: [196, 247, 294] },
  BACKPACK: { name: "backpack", hebrew: "תרמיל", english: "Backpack", emoji: "🎒", color: "bg-amber-700", sound: [330, 415, 494] },
  FLASHLIGHT: { name: "flashlight", hebrew: "פנס", english: "Flashlight", emoji: "🔦", color: "bg-yellow-400", sound: [440, 554, 659] },
  COMPASS: { name: "compass", hebrew: "מצפן", english: "Compass", emoji: "🧭", color: "bg-red-500", sound: [523, 659, 784] },
  SLEEPING_BAG: { name: "sleeping-bag", hebrew: "שק שינה", english: "Sleeping Bag", emoji: "🛏️", color: "bg-blue-500", sound: [294, 370, 440] },
  BINOCULARS: { name: "binoculars", hebrew: "משקפת", english: "Binoculars", emoji: "🔭", color: "bg-gray-700", sound: [392, 494, 587] },
  CANTEEN: { name: "canteen", hebrew: "קנטינת מים", english: "Water Canteen", emoji: "🫙", color: "bg-cyan-600", sound: [349, 440, 523] },
  MAP: { name: "map", hebrew: "מפה", english: "Map", emoji: "🗺️", color: "bg-amber-400", sound: [587, 698, 831] },
  HIKING_BOOTS: { name: "hiking-boots", hebrew: "נעלי הליכה", english: "Hiking Boots", emoji: "🥾", color: "bg-brown-600", sound: [220, 277, 330] },
  FISHING_ROD: { name: "fishing-rod", hebrew: "חכה", english: "Fishing Rod", emoji: "🎣", color: "bg-teal-600", sound: [659, 784, 932] },
  NATURE_BOOK: { name: "nature-book", hebrew: "ספר טבע", english: "Nature Book", emoji: "📚", color: "bg-green-500", sound: [262, 330, 392] },
};

/**
 * ===============================================
 * דמויות מאגדות - Fairy Tale Characters
 * ===============================================
 */
export const FAIRY_TALE_CHARS_CONSTANTS: Record<string, BaseGameItem> = {
  PRINCESS: { name: "princess", hebrew: "נסיכה", english: "Princess", emoji: "👸", color: "bg-pink-500", sound: [659, 784, 932] },
  PRINCE: { name: "prince", hebrew: "נסיך", english: "Prince", emoji: "🤴", color: "bg-blue-500", sound: [523, 659, 784] },
  DRAGON: { name: "dragon", hebrew: "דרקון", english: "Dragon", emoji: "🐉", color: "bg-red-600", sound: [196, 247, 294] },
  WITCH: { name: "witch", hebrew: "מכשפה", english: "Witch", emoji: "🧙‍♀️", color: "bg-purple-700", sound: [220, 277, 330] },
  WIZARD: { name: "wizard", hebrew: "קוסם", english: "Wizard", emoji: "🧙‍♂️", color: "bg-indigo-700", sound: [330, 415, 494] },
  FAIRY: { name: "fairy", hebrew: "פיה", english: "Fairy", emoji: "🧚", color: "bg-pink-300", sound: [784, 932, 1047] },
  UNICORN: { name: "unicorn", hebrew: "חד קרן", english: "Unicorn", emoji: "🦄", color: "bg-gradient-to-br from-pink-400 to-purple-400", sound: [880, 988, 1109] },
  GIANT: { name: "giant", hebrew: "ענק", english: "Giant", emoji: "🧌", color: "bg-green-700", sound: [131, 165, 196] },
  ELF: { name: "elf", hebrew: "אלף", english: "Elf", emoji: "🧝", color: "bg-emerald-500", sound: [587, 698, 831] },
  MERMAID: { name: "mermaid", hebrew: "בת ים", english: "Mermaid", emoji: "🧜", color: "bg-cyan-500", sound: [440, 554, 659] },
  KNIGHT: { name: "knight", hebrew: "אביר", english: "Knight", emoji: "🪖", color: "bg-gray-600", sound: [392, 494, 587] },
  GENIE: { name: "genie", hebrew: "ג'יני קסם", english: "Genie", emoji: "🧞", color: "bg-blue-600", sound: [698, 880, 1047] },
};

// ===============================================
// רשימות מוכנות לשימוש
// ===============================================
export const BIRDS_ITEMS = createItemsList(BIRDS_CONSTANTS);
export const BUGS_INSECTS_ITEMS = createItemsList(BUGS_INSECTS_CONSTANTS);
export const SUPERHEROES_ITEMS = createItemsList(SUPERHEROES_CONSTANTS);
export const ART_CRAFT_ITEMS = createItemsList(ART_CRAFT_CONSTANTS);
export const CAMPING_ITEMS = createItemsList(CAMPING_CONSTANTS);
export const FAIRY_TALE_CHARS_ITEMS = createItemsList(FAIRY_TALE_CHARS_CONSTANTS);

// ===============================================
// מילוני ביטוי
// ===============================================
export const BIRDS_PRONUNCIATIONS = createPronunciationDictionary(BIRDS_CONSTANTS);
export const BUGS_INSECTS_PRONUNCIATIONS = createPronunciationDictionary(BUGS_INSECTS_CONSTANTS);
export const SUPERHEROES_PRONUNCIATIONS = createPronunciationDictionary(SUPERHEROES_CONSTANTS);
export const ART_CRAFT_PRONUNCIATIONS = createPronunciationDictionary(ART_CRAFT_CONSTANTS);
export const CAMPING_PRONUNCIATIONS = createPronunciationDictionary(CAMPING_CONSTANTS);
export const FAIRY_TALE_CHARS_PRONUNCIATIONS = createPronunciationDictionary(FAIRY_TALE_CHARS_CONSTANTS);

// ===============================================
// קונפיגורציות משחק
// ===============================================
export const BIRDS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק ציפורים",
  subTitle: "הכר ציפורים מרחבי העולם!",
  description: "גלה ציפורים מדהימות מכל קצות תבל ולמד את שמותיהן!",
  instructions: "לחץ על הציפור הנכונה כשאתה שומע את שמה",
};

export const BUGS_INSECTS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק חרקים ופרפרים",
  subTitle: "עולם זעיר ומרתק!",
  description: "הכר חרקים מעניינים ולמד מה מייחד כל אחד מהם!",
  instructions: "לחץ על החרק הנכון כשאתה שומע את שמו",
};

export const SUPERHEROES_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק גיבורי על",
  subTitle: "למד על כוחות על מדהימים!",
  description: "גלה עולם גיבורי העל ולמד על כוחות וסמלים מרתקים!",
  instructions: "לחץ על הכוח הנכון כשאתה שומע את שמו",
};

export const ART_CRAFT_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק אמנות ויצירה",
  subTitle: "הכר כלי אמנות ויצירה!",
  description: "למד על כלי אמנות מגניבים ויצר יצירות מדהימות!",
  instructions: "לחץ על כלי האמנות הנכון כשאתה שומע את שמו",
};

export const CAMPING_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק טיול ושטח",
  subTitle: "הכן את הציוד לטיול!",
  description: "קח את הציוד הנכון לטיול ולמד מה נחוץ להרפתקאה בטבע!",
  instructions: "לחץ על פריט הציוד הנכון כשאתה שומע את שמו",
};

export const FAIRY_TALE_CHARS_CONFIG = {
  ...DEFAULT_GAME_CONFIG,
  title: "משחק דמויות מאגדות",
  subTitle: "הכר דמויות קסומות מאגדות!",
  description: "גלה דמויות קסומות מאגדות שמחוז ילדותך ולמד את שמותיהן!",
  instructions: "לחץ על הדמות הנכונה כשאתה שומע את שמה",
};
