import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, createPronunciationDictionary, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const COLOR_CONSTANTS: Record<string, BaseGameItem> = {
  RED: { name: "red", hebrew: "אדום", hebrewNikud: "אָדֹם", english: "Red", emoji: "🔴", color: "bg-gradient-to-br from-red-400 to-red-600", sound: [440, 550, 660] },
  BLUE: { name: "blue", hebrew: "כחול", hebrewNikud: "כָּחֹל", english: "Blue", emoji: "🔵", color: "bg-gradient-to-br from-blue-400 to-blue-600", sound: [523, 659, 784] },
  GREEN: { name: "green", hebrew: "ירוק", hebrewNikud: "יָרֹק", english: "Green", emoji: "🟢", color: "bg-gradient-to-br from-green-400 to-green-600", sound: [349, 440, 523] },
  YELLOW: { name: "yellow", hebrew: "צהוב", hebrewNikud: "צָהֹב", english: "Yellow", emoji: "🟡", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", sound: [392, 494, 587] },
  PURPLE: { name: "purple", hebrew: "סגול", hebrewNikud: "סָגֹל", english: "Purple", emoji: "🟣", color: "bg-gradient-to-br from-purple-400 to-purple-600", sound: [294, 370, 440] },
  ORANGE: { name: "orange", hebrew: "כתום", hebrewNikud: "כָּתֹם", english: "Orange", emoji: "🟠", color: "bg-gradient-to-br from-orange-400 to-orange-600", sound: [330, 415, 494] },
  PINK: { name: "pink", hebrew: "ורוד", hebrewNikud: "וָרֹד", english: "Pink", emoji: "🩷", color: "bg-gradient-to-br from-pink-400 to-pink-600", sound: [587, 698, 784] },
  BROWN: { name: "brown", hebrew: "חום", hebrewNikud: "חוּם", english: "Brown", emoji: "🤎", color: "bg-gradient-to-br from-amber-500 to-amber-700", sound: [220, 277, 330] },
  BLACK: { name: "black", hebrew: "שחור", hebrewNikud: "שָׁחֹר", english: "Black", emoji: "⚫", color: "bg-gradient-to-br from-gray-800 to-gray-950", sound: [196, 247, 294] },
  WHITE: { name: "white", hebrew: "לבן", hebrewNikud: "לָבָן", english: "White", emoji: "⚪", color: "bg-gradient-to-br from-gray-50 to-gray-200 border-2 border-gray-300", sound: [659, 784, 880] },
};

export const ALL_COLORS = createItemsList(COLOR_CONSTANTS);
export const COLOR_HEBREW_PRONUNCIATIONS = createPronunciationDictionary(COLOR_CONSTANTS);
export const COLOR_GAME_CONSTANTS = DEFAULT_GAME_CONFIG;

// Advanced colors — gוunים and special colors

export const ADVANCED_COLORS_CONSTANTS: Record<string, BaseGameItem> = {
  TURQUOISE: { name: "turquoise", hebrew: "טורקיז", english: "Turquoise", emoji: "🟡", color: "bg-cyan-400", sound: [659, 784, 831] },
  MAGENTA: { name: "magenta", hebrew: "מגנטה", english: "Magenta", emoji: "🟣", color: "bg-fuchsia-500", sound: [554, 659, 740] },
  CORAL: { name: "coral", hebrew: "אלמוג", english: "Coral", emoji: "🪸", color: "bg-orange-300", sound: [494, 554, 622] },
  AMBER: { name: "amber", hebrew: "ענבר", english: "Amber", emoji: "🟨", color: "bg-yellow-600", sound: [440, 523, 587] },
  EMERALD: { name: "emerald", hebrew: "אמרלד", english: "Emerald", emoji: "🟢", color: "bg-emerald-500", sound: [392, 440, 494] },
  RUBY: { name: "ruby", hebrew: "רובי", english: "Ruby", emoji: "🔴", color: "bg-red-600", sound: [740, 831, 880] },
  SAPPHIRE: { name: "sapphire", hebrew: "ספיר", english: "Sapphire", emoji: "🔵", color: "bg-blue-600", sound: [349, 392, 440] },
  LAVENDER: { name: "lavender", hebrew: "לבנדר", english: "Lavender", emoji: "🟣", color: "bg-purple-300", sound: [622, 698, 784] },
  BURGUNDY: { name: "burgundy", hebrew: "בורגונדי", english: "Burgundy", emoji: "🍷", color: "bg-red-800", sound: [311, 349, 392] },
  OLIVE: { name: "olive", hebrew: "זית", english: "Olive", emoji: "🫒", color: "bg-green-600", sound: [277, 311, 349] },
  IVORY: { name: "ivory", hebrew: "שנהב", english: "Ivory", emoji: "🤍", color: "bg-yellow-50", sound: [831, 880, 988] },
  PLATINUM: { name: "platinum", hebrew: "פלטינום", english: "Platinum", emoji: "⚪", color: "bg-gray-300", sound: [247, 277, 311] }
};

export const ADVANCED_COLORS_ITEMS = createItemsList(ADVANCED_COLORS_CONSTANTS);

export const ADVANCED_COLORS_PRONUNCIATIONS = {
  'turquoise': 'טוּר-קִיז',
  'magenta': 'מַ-גֶ-נְטָה',
  'coral': 'אַל-מוֹג',
  'amber': 'עַנְ-בָר',
  'emerald': 'אַמְ-רַלד',
  'ruby': 'רוּ-בִי',
  'sapphire': 'סַ-פִּיר',
  'lavender': 'לַ-בֶנְ-דֶר',
  'burgundy': 'בּוּר-גוּן-דִי',
  'olive': 'זַ-יִת',
  'ivory': 'שֶׁן-הָב',
  'platinum': 'פְּלַ-טִי-נוּם'
} as const;

export const ADVANCED_COLORS_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 7000,
    pointsPerCorrect: 12,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 2
  },
  items: ADVANCED_COLORS_ITEMS,
  pronunciations: ADVANCED_COLORS_PRONUNCIATIONS
} as const;
