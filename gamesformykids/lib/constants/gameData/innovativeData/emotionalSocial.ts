import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const EMOTIONAL_SOCIAL_CONSTANTS: Record<string, BaseGameItem> = {
  // רגשות מורכבים
  EXCITEMENT_JOY: { name: "excitement_joy", hebrew: "התרגשות ושמחה", english: "Excitement Joy", emoji: "🤩", color: "bg-yellow-400", sound: [523, 659, 784] },
  NERVOUS_BUTTERFLY: { name: "nervous_butterfly", hebrew: "פרפרים בבטן", english: "Nervous Butterflies", emoji: "🦋", color: "bg-purple-300", sound: [415, 494, 587] },
  PROUD_ACHIEVEMENT: { name: "proud_achievement", hebrew: "גאווה בהישג", english: "Proud Achievement", emoji: "🏆", color: "bg-gold", sound: [440, 554, 659] },
  DISAPPOINTED_SAD: { name: "disappointed_sad", hebrew: "אכזבה ועצב", english: "Disappointed Sad", emoji: "😔", color: "bg-blue-400", sound: [247, 294, 349] },

  // מצבים חברתיים
  SHY_HIDING: { name: "shy_hiding", hebrew: "ביישנות והתחבאות", english: "Shy Hiding", emoji: "🙈", color: "bg-pink-300", sound: [370, 440, 523] },
  CONFIDENT_LEADER: { name: "confident_leader", hebrew: "ביטחון ומנהיגות", english: "Confident Leader", emoji: "💪", color: "bg-orange-500", sound: [392, 494, 587] },
  HELPFUL_FRIEND: { name: "helpful_friend", hebrew: "חבר עוזר", english: "Helpful Friend", emoji: "🤝", color: "bg-green-400", sound: [349, 415, 494] },
  CURIOUS_EXPLORER: { name: "curious_explorer", hebrew: "סקרן חוקר", english: "Curious Explorer", emoji: "🔍", color: "bg-cyan-400", sound: [554, 659, 784] },

  // תקשורת רגשית
  ACTIVE_LISTENER: { name: "active_listener", hebrew: "מקשיב פעיל", english: "Active Listener", emoji: "👂", color: "bg-blue-300", sound: [330, 392, 440] },
  PATIENT_WAITER: { name: "patient_waiter", hebrew: "סבלן ממתין", english: "Patient Waiter", emoji: "⏰", color: "bg-gray-400", sound: [262, 311, 370] },
  EMPATHY_CARING: { name: "empathy_caring", hebrew: "אמפתיה ואכפתיות", english: "Empathy Caring", emoji: "💖", color: "bg-pink-400", sound: [494, 587, 698] },
  GRATITUDE_THANKS: { name: "gratitude_thanks", hebrew: "הכרת טובה ותודה", english: "Gratitude Thanks", emoji: "🙏", color: "bg-purple-400", sound: [392, 466, 554] },
};

export const EMOTIONAL_SOCIAL_ITEMS = createItemsList(EMOTIONAL_SOCIAL_CONSTANTS);

export const EMOTIONAL_SOCIAL_PRONUNCIATIONS = {
  'excitement_joy': 'הִתְרַגְּשׁוּת וְשִׂמְחָה',
  'nervous_butterfly': 'פַּרְפַּרִים בַּבֶּטֶן',
  'proud_achievement': 'גַּאֲוָה בְּהִישַׁג',
  'disappointed_sad': 'אַכְזָבָה וְעֶצֶב',
  'shy_hiding': 'בַּיְשָׁנוּת וְהִתְחַבְּאוּת',
  'confident_leader': 'בִּטָּחוֹן וּמַנְהִיגוּת',
  'helpful_friend': 'חָבֵר עוֹזֵר',
  'curious_explorer': 'סַקְרָן חוֹקֵר',
  'active_listener': 'מַקְשִׁיב פָּעִיל',
  'patient_waiter': 'סַבְלָן מַמְתִּין',
  'empathy_caring': 'אֶמְפַּתְיָה וְאַכְפַּתִיּוּת',
  'gratitude_thanks': 'הַכָּרַת טוֹבָה וְתוֹדָה',
} as const;

export const EMOTIONAL_SOCIAL_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 10,
    timePerRound: 12000,
    pointsPerCorrect: 30,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 4,
    specialMechanic: 'emotional-learning',
  },
  items: EMOTIONAL_SOCIAL_ITEMS,
  pronunciations: EMOTIONAL_SOCIAL_PRONUNCIATIONS,
} as const;
