import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const TOUCH_SENSES_CONSTANTS: Record<string, BaseGameItem> = {
  // מרקמים
  SOFT_COTTON: { name: "soft_cotton", hebrew: "כותנה רכה", english: "Soft Cotton", emoji: "🤍", color: "bg-white", sound: [698, 784, 880] },
  ROUGH_SANDPAPER: { name: "rough_sandpaper", hebrew: "נייר זכוכית מחוספס", english: "Rough Sandpaper", emoji: "🟫", color: "bg-yellow-700", sound: [196, 220, 247] },
  SMOOTH_GLASS: { name: "smooth_glass", hebrew: "זכוכית חלקה", english: "Smooth Glass", emoji: "✨", color: "bg-blue-100", sound: [1046, 1175, 1319] },
  BUMPY_BUBBLE: { name: "bumpy_bubble", hebrew: "בועות פיצוץ", english: "Bumpy Bubble Wrap", emoji: "🫧", color: "bg-cyan-300", sound: [440, 523, 622] },

  // טמפרטורות
  ICE_COLD: { name: "ice_cold", hebrew: "קרח קר", english: "Ice Cold", emoji: "🧊", color: "bg-blue-200", sound: [349, 415, 494] },
  WARM_SUN: { name: "warm_sun", hebrew: "שמש חמה", english: "Warm Sun", emoji: "☀️", color: "bg-yellow-400", sound: [523, 622, 740] },
  COOL_BREEZE: { name: "cool_breeze", hebrew: "רוח קרירה", english: "Cool Breeze", emoji: "🌬️", color: "bg-blue-300", sound: [415, 494, 587] },
  HOT_FIRE: { name: "hot_fire", hebrew: "אש לוהטת", english: "Hot Fire", emoji: "🔥", color: "bg-red-500", sound: [294, 330, 370] },

  // חושי גוף
  TICKLE_FEATHER: { name: "tickle_feather", hebrew: "נוצה מדגדגת", english: "Tickle Feather", emoji: "🪶", color: "bg-pink-300", sound: [784, 880, 988] },
  HEAVY_WEIGHT: { name: "heavy_weight", hebrew: "משקל כבד", english: "Heavy Weight", emoji: "🏋️", color: "bg-gray-700", sound: [131, 147, 165] },
  LIGHT_BALLOON: { name: "light_balloon", hebrew: "בלון קל", english: "Light Balloon", emoji: "🎈", color: "bg-red-300", sound: [659, 784, 931] },
  VIBRATE_PHONE: { name: "vibrate_phone", hebrew: "רטט טלפון", english: "Vibrate Phone", emoji: "📳", color: "bg-purple-400", sound: [220, 220, 220] },
};

export const TOUCH_SENSES_ITEMS = createItemsList(TOUCH_SENSES_CONSTANTS);

export const TOUCH_SENSES_PRONUNCIATIONS = {
  'soft_cotton': 'כֻּתְנָה רַכָּה',
  'rough_sandpaper': 'נְיַר זְכוּכִית מְחֻסְפָּס',
  'smooth_glass': 'זְכוּכִית חֲלַקָּה',
  'bumpy_bubble': 'בּוּעוֹת פִּצּוּץ',
  'ice_cold': 'קֶרַח קַר',
  'warm_sun': 'שֶׁמֶשׁ חַמָּה',
  'cool_breeze': 'רוּחַ קְרִירָה',
  'hot_fire': 'אֵשׁ לוֹהֶטֶת',
  'tickle_feather': 'נוֹצָה מְדַגְדֶּגֶת',
  'heavy_weight': 'מִשְׁקָל כָּבֵד',
  'light_balloon': 'בַּלּוֹן קַל',
  'vibrate_phone': 'רֶטֶט טֶלֶפוֹן',
} as const;

export const TOUCH_SENSES_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 8000,
    pointsPerCorrect: 15,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 3,
    specialMechanic: 'touch-interaction',
  },
  items: TOUCH_SENSES_ITEMS,
  pronunciations: TOUCH_SENSES_PRONUNCIATIONS,
} as const;
