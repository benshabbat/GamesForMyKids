/**
 * ===============================================
 * נתוני משחקים חדשניים ויוצאי דופן
 * משחקים עם מכניקות ייחודיות שונות מהמשחקים הקיימים
 * ===============================================
 */

import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

/**
 * ===============================================
 * משחק חיקוי קולות ורעשים - חדשני!
 * ===============================================
 */
export const SOUND_IMITATION_CONSTANTS: Record<string, BaseGameItem> = {
  // קולות חיות
  DOG_BARK: { 
    name: "dog_bark", 
    hebrew: "נביחת כלב", 
    english: "Dog Bark", 
    emoji: "🐕", 
    color: "bg-brown-500", 
    sound: [196, 261, 330] // תווים נמוכים
  },
  CAT_MEOW: { 
    name: "cat_meow", 
    hebrew: "מיאו של חתול", 
    english: "Cat Meow", 
    emoji: "🐱", 
    color: "bg-orange-400", 
    sound: [523, 622, 740] // תווים גבוהים
  },
  COW_MOO: { 
    name: "cow_moo", 
    hebrew: "געיית פרה", 
    english: "Cow Moo", 
    emoji: "🐄", 
    color: "bg-white", 
    sound: [131, 165, 196] // תווים עמוקים
  },
  ROOSTER_CROW: { 
    name: "rooster_crow", 
    hebrew: "קריאת תרנגול", 
    english: "Rooster Crow", 
    emoji: "🐓", 
    color: "bg-red-500", 
    sound: [440, 554, 659] // תווים בינוניים-גבוהים
  },
  SHEEP_BAA: { 
    name: "sheep_baa", 
    hebrew: "בעיית כבשה", 
    english: "Sheep Baa", 
    emoji: "🐑", 
    color: "bg-gray-200", 
    sound: [294, 370, 440] // תווים רכים
  },
  HORSE_NEIGH: { 
    name: "horse_neigh", 
    hebrew: "צהלת סוס", 
    english: "Horse Neigh", 
    emoji: "🐴", 
    color: "bg-amber-600", 
    sound: [247, 311, 392] // תווים ארוכים
  },

  // רעשי מכונות ותחבורה
  CAR_ENGINE: { 
    name: "car_engine", 
    hebrew: "מנוע מכונית", 
    english: "Car Engine", 
    emoji: "🚗", 
    color: "bg-blue-600", 
    sound: [110, 147, 196] // רעש נמוך
  },
  TRAIN_WHISTLE: { 
    name: "train_whistle", 
    hebrew: "שריקת רכבת", 
    english: "Train Whistle", 
    emoji: "🚂", 
    color: "bg-gray-700", 
    sound: [659, 784, 880] // שריקה גבוהה
  },
  AIRPLANE_ZOOM: { 
    name: "airplane_zoom", 
    hebrew: "זמזום מטוס", 
    english: "Airplane Zoom", 
    emoji: "✈️", 
    color: "bg-sky-500", 
    sound: [185, 247, 311] // זמזום
  },
  MOTORCYCLE_VROOM: { 
    name: "motorcycle_vroom", 
    hebrew: "שאגת אופנוע", 
    english: "Motorcycle Vroom", 
    emoji: "🏍️", 
    color: "bg-black", 
    sound: [147, 196, 262] // שאגה
  },

  // צלילי טבע
  RAIN_DROPS: { 
    name: "rain_drops", 
    hebrew: "טפטוף גשם", 
    english: "Rain Drops", 
    emoji: "🌧️", 
    color: "bg-blue-400", 
    sound: [1046, 1245, 1397] // טפטוף מהיר
  },
  THUNDER_ROAR: { 
    name: "thunder_roar", 
    hebrew: "רעם", 
    english: "Thunder Roar", 
    emoji: "⚡", 
    color: "bg-purple-800", 
    sound: [82, 110, 147] // רעם עמוק
  },
  WIND_WHOOSH: { 
    name: "wind_whoosh", 
    hebrew: "שאגת רוח", 
    english: "Wind Whoosh", 
    emoji: "💨", 
    color: "bg-gray-400", 
    sound: [165, 220, 294] // רוח
  },
  OCEAN_WAVES: { 
    name: "ocean_waves", 
    hebrew: "גלי ים", 
    english: "Ocean Waves", 
    emoji: "🌊", 
    color: "bg-blue-500", 
    sound: [131, 175, 233] // גלים
  },

  // רעשי בית
  DOOR_SLAM: { 
    name: "door_slam", 
    hebrew: "טריקת דלת", 
    english: "Door Slam", 
    emoji: "🚪", 
    color: "bg-brown-600", 
    sound: [196, 196, 196] // טריקה
  },
  CLOCK_TICK: { 
    name: "clock_tick", 
    hebrew: "תקתוק שעון", 
    english: "Clock Tick", 
    emoji: "🕐", 
    color: "bg-yellow-500", 
    sound: [698, 698, 698] // תקתוק
  },
  PHONE_RING: { 
    name: "phone_ring", 
    hebrew: "צלצול טלפון", 
    english: "Phone Ring", 
    emoji: "📞", 
    color: "bg-green-500", 
    sound: [440, 554, 440] // צלצול
  },
  MICROWAVE_BEEP: { 
    name: "microwave_beep", 
    hebrew: "ביפ מיקרוגל", 
    english: "Microwave Beep", 
    emoji: "📱", 
    color: "bg-gray-500", 
    sound: [880, 880, 880] // ביפ
  }
};

export const SOUND_IMITATION_ITEMS = createItemsList(SOUND_IMITATION_CONSTANTS);

export const SOUND_IMITATION_PRONUNCIATIONS = {
  'dog_bark': 'נְבִי-חַת כֶּלֶב',
  'cat_meow': 'מִיַּאו שֶׁל חָתוּל',
  'cow_moo': 'גְּעִיַּת פָּרָה',
  'rooster_crow': 'קְרִיאַת תַּרְנְגוֹל',
  'sheep_baa': 'בְּעִיַּת כַּבְשָׂה',
  'horse_neigh': 'צַהֲלַת סוּס',
  'car_engine': 'מָנוֹעַ מְכוֹנִית',
  'train_whistle': 'שְׁרִיקַת רַכֶּבֶת',
  'airplane_zoom': 'זַמְזוּם מָטוֹס',
  'motorcycle_vroom': 'שַׁאֲגַת אוֹפָנוֹעַ',
  'rain_drops': 'טַפְטוּף גֶּשֶׁם',
  'thunder_roar': 'רַעַם',
  'wind_whoosh': 'שַׁאֲגַת רוּחַ',
  'ocean_waves': 'גַּלֵּי יָם',
  'door_slam': 'טְרִיקַת דֶּלֶת',
  'clock_tick': 'תַּקְתּוּק שָׁעוֹן',
  'phone_ring': 'צִלְצוּל טֶלֶפוֹן',
  'microwave_beep': 'בִּיפ מִיקְרוֹגַל'
} as const;

export const SOUND_IMITATION_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 15,
    timePerRound: 10000, // 10 שניות - יותר זמן לחיקוי
    pointsPerCorrect: 20, // נקודות גבוהות יותר
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 3,
    specialMechanic: 'sound-imitation' // מכניקה מיוחדת
  },
  items: SOUND_IMITATION_ITEMS,
  pronunciations: SOUND_IMITATION_PRONUNCIATIONS
} as const;

/**
 * ===============================================
 * משחק תנועות גוף וריקוד - אינטראקטיבי!
 * ===============================================
 */
export const BODY_MOVEMENTS_CONSTANTS: Record<string, BaseGameItem> = {
  // תנועות בסיסיות
  JUMP_HIGH: { 
    name: "jump_high", 
    hebrew: "קפיצה גבוהה", 
    english: "Jump High", 
    emoji: "🤸", 
    color: "bg-yellow-400", 
    sound: [440, 554, 659] 
  },
  DANCE_SPIN: { 
    name: "dance_spin", 
    hebrew: "ריקוד וסיבוב", 
    english: "Dance Spin", 
    emoji: "💃", 
    color: "bg-pink-500", 
    sound: [523, 659, 784] 
  },
  MARCH_STEPS: { 
    name: "march_steps", 
    hebrew: "צעדי צעידה", 
    english: "March Steps", 
    emoji: "🚶", 
    color: "bg-green-600", 
    sound: [330, 392, 440] 
  },
  CLAP_HANDS: { 
    name: "clap_hands", 
    hebrew: "מחיאות כפיים", 
    english: "Clap Hands", 
    emoji: "👏", 
    color: "bg-blue-400", 
    sound: [698, 698, 698] 
  },

  // תנועות יוגה לילדים
  TREE_POSE: { 
    name: "tree_pose", 
    hebrew: "תנוחת עץ", 
    english: "Tree Pose", 
    emoji: "🌳", 
    color: "bg-green-500", 
    sound: [294, 349, 415] 
  },
  CAT_STRETCH: { 
    name: "cat_stretch", 
    hebrew: "מתיחת חתול", 
    english: "Cat Stretch", 
    emoji: "🐱", 
    color: "bg-orange-400", 
    sound: [370, 440, 523] 
  },
  BUTTERFLY_SIT: { 
    name: "butterfly_sit", 
    hebrew: "ישיבת פרפר", 
    english: "Butterfly Sit", 
    emoji: "🦋", 
    color: "bg-purple-400", 
    sound: [659, 784, 880] 
  },
  FROG_SQUAT: { 
    name: "frog_squat", 
    hebrew: "כריעת צפרדע", 
    english: "Frog Squat", 
    emoji: "🐸", 
    color: "bg-green-400", 
    sound: [247, 294, 349] 
  },

  // תנועות משחק
  MONKEY_SWING: { 
    name: "monkey_swing", 
    hebrew: "נדנוד קוף", 
    english: "Monkey Swing", 
    emoji: "🐵", 
    color: "bg-brown-400", 
    sound: [392, 494, 587] 
  },
  ELEPHANT_WALK: { 
    name: "elephant_walk", 
    hebrew: "הליכת פיל", 
    english: "Elephant Walk", 
    emoji: "🐘", 
    color: "bg-gray-500", 
    sound: [131, 165, 196] 
  },
  BIRD_FLY: { 
    name: "bird_fly", 
    hebrew: "טיסת ציפור", 
    english: "Bird Fly", 
    emoji: "🐦", 
    color: "bg-sky-400", 
    sound: [554, 659, 784] 
  },
  ROBOT_MOVE: { 
    name: "robot_move", 
    hebrew: "תנועת רובוט", 
    english: "Robot Move", 
    emoji: "🤖", 
    color: "bg-gray-600", 
    sound: [196, 247, 294] 
  }
};

export const BODY_MOVEMENTS_ITEMS = createItemsList(BODY_MOVEMENTS_CONSTANTS);

export const BODY_MOVEMENTS_PRONUNCIATIONS = {
  'jump_high': 'קְפִי-צָה גְּבוֹ-הָה',
  'dance_spin': 'רִי-קוּד וְסִי-בוּב',
  'march_steps': 'צַעֲ-דֵי צְעִי-דָה',
  'clap_hands': 'מְחִי-אוֹת כַּפַּיִם',
  'tree_pose': 'תְּנוּ-חַת עֵץ',
  'cat_stretch': 'מְתִי-חַת חָתוּל',
  'butterfly_sit': 'יְשִׁי-בַת פַּרְפַּר',
  'frog_squat': 'כְּרִי-עַת צְפַרְדֵעַ',
  'monkey_swing': 'נִדְנוּד קוֹף',
  'elephant_walk': 'הֲלִי-כַת פִּיל',
  'bird_fly': 'טִי-סַת צִי-פּוֹר',
  'robot_move': 'תְּנוּ-עַת רוֹ-בּוֹט'
} as const;

export const BODY_MOVEMENTS_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 15000, // 15 שניות - זמן לביצוע התנועה
    pointsPerCorrect: 25, // נקודות גבוהות
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 2,
    specialMechanic: 'body-movement' // מכניקה מיוחדת
  },
  items: BODY_MOVEMENTS_ITEMS,
  pronunciations: BODY_MOVEMENTS_PRONUNCIATIONS
} as const;

/**
 * ===============================================
 * משחק מגע וחושים - חוויתי!
 * ===============================================
 */
export const TOUCH_SENSES_CONSTANTS: Record<string, BaseGameItem> = {
  // מרקמים
  SOFT_COTTON: { 
    name: "soft_cotton", 
    hebrew: "כותנה רכה", 
    english: "Soft Cotton", 
    emoji: "🤍", 
    color: "bg-white", 
    sound: [698, 784, 880] 
  },
  ROUGH_SANDPAPER: { 
    name: "rough_sandpaper", 
    hebrew: "נייר זכוכית מחוספס", 
    english: "Rough Sandpaper", 
    emoji: "🟫", 
    color: "bg-yellow-700", 
    sound: [196, 220, 247] 
  },
  SMOOTH_GLASS: { 
    name: "smooth_glass", 
    hebrew: "זכוכית חלקה", 
    english: "Smooth Glass", 
    emoji: "✨", 
    color: "bg-blue-100", 
    sound: [1046, 1175, 1319] 
  },
  BUMPY_BUBBLE: { 
    name: "bumpy_bubble", 
    hebrew: "בועות פיצוץ", 
    english: "Bumpy Bubble Wrap", 
    emoji: "🫧", 
    color: "bg-cyan-300", 
    sound: [440, 523, 622] 
  },

  // טמפרטורות
  ICE_COLD: { 
    name: "ice_cold", 
    hebrew: "קרח קר", 
    english: "Ice Cold", 
    emoji: "🧊", 
    color: "bg-blue-200", 
    sound: [349, 415, 494] 
  },
  WARM_SUN: { 
    name: "warm_sun", 
    hebrew: "שמש חמה", 
    english: "Warm Sun", 
    emoji: "☀️", 
    color: "bg-yellow-400", 
    sound: [523, 622, 740] 
  },
  COOL_BREEZE: { 
    name: "cool_breeze", 
    hebrew: "רוח קרירה", 
    english: "Cool Breeze", 
    emoji: "🌬️", 
    color: "bg-blue-300", 
    sound: [415, 494, 587] 
  },
  HOT_FIRE: { 
    name: "hot_fire", 
    hebrew: "אש לוהטת", 
    english: "Hot Fire", 
    emoji: "🔥", 
    color: "bg-red-500", 
    sound: [294, 330, 370] 
  },

  // חושי גוף
  TICKLE_FEATHER: { 
    name: "tickle_feather", 
    hebrew: "נוצה מדגדגת", 
    english: "Tickle Feather", 
    emoji: "🪶", 
    color: "bg-pink-300", 
    sound: [784, 880, 988] 
  },
  HEAVY_WEIGHT: { 
    name: "heavy_weight", 
    hebrew: "משקל כבד", 
    english: "Heavy Weight", 
    emoji: "🏋️", 
    color: "bg-gray-700", 
    sound: [131, 147, 165] 
  },
  LIGHT_BALLOON: { 
    name: "light_balloon", 
    hebrew: "בלון קל", 
    english: "Light Balloon", 
    emoji: "🎈", 
    color: "bg-red-300", 
    sound: [659, 784, 931] 
  },
  VIBRATE_PHONE: { 
    name: "vibrate_phone", 
    hebrew: "רטט טלפון", 
    english: "Vibrate Phone", 
    emoji: "📳", 
    color: "bg-purple-400", 
    sound: [220, 220, 220] 
  }
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
  'vibrate_phone': 'רֶטֶט טֶלֶפוֹן'
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
    specialMechanic: 'touch-interaction' // מכניקה מיוחדת
  },
  items: TOUCH_SENSES_ITEMS,
  pronunciations: TOUCH_SENSES_PRONUNCIATIONS
} as const;

/**
 * ===============================================
 * משחק מציאות רגשית וחברתית - חדשני!
 * ===============================================
 */
export const EMOTIONAL_SOCIAL_CONSTANTS: Record<string, BaseGameItem> = {
  // רגשות מורכבים
  EXCITEMENT_JOY: { 
    name: "excitement_joy", 
    hebrew: "התרגשות ושמחה", 
    english: "Excitement Joy", 
    emoji: "🤩", 
    color: "bg-yellow-400", 
    sound: [523, 659, 784] 
  },
  NERVOUS_BUTTERFLY: { 
    name: "nervous_butterfly", 
    hebrew: "פרפרים בבטן", 
    english: "Nervous Butterflies", 
    emoji: "🦋", 
    color: "bg-purple-300", 
    sound: [415, 494, 587] 
  },
  PROUD_ACHIEVEMENT: { 
    name: "proud_achievement", 
    hebrew: "גאווה בהישג", 
    english: "Proud Achievement", 
    emoji: "🏆", 
    color: "bg-gold", 
    sound: [440, 554, 659] 
  },
  DISAPPOINTED_SAD: { 
    name: "disappointed_sad", 
    hebrew: "אכזבה ועצב", 
    english: "Disappointed Sad", 
    emoji: "😔", 
    color: "bg-blue-400", 
    sound: [247, 294, 349] 
  },

  // מצבי חברתיים
  SHY_HIDING: { 
    name: "shy_hiding", 
    hebrew: "ביישנות והתחבאות", 
    english: "Shy Hiding", 
    emoji: "🙈", 
    color: "bg-pink-300", 
    sound: [370, 440, 523] 
  },
  CONFIDENT_LEADER: { 
    name: "confident_leader", 
    hebrew: "ביטחון ומנהיגות", 
    english: "Confident Leader", 
    emoji: "💪", 
    color: "bg-orange-500", 
    sound: [392, 494, 587] 
  },
  HELPFUL_FRIEND: { 
    name: "helpful_friend", 
    hebrew: "חבר עוזר", 
    english: "Helpful Friend", 
    emoji: "🤝", 
    color: "bg-green-400", 
    sound: [349, 415, 494] 
  },
  CURIOUS_EXPLORER: { 
    name: "curious_explorer", 
    hebrew: "סקרן חוקר", 
    english: "Curious Explorer", 
    emoji: "🔍", 
    color: "bg-cyan-400", 
    sound: [554, 659, 784] 
  },

  // תקשורת רגשית
  ACTIVE_LISTENER: { 
    name: "active_listener", 
    hebrew: "מקשיב פעיל", 
    english: "Active Listener", 
    emoji: "👂", 
    color: "bg-blue-300", 
    sound: [330, 392, 440] 
  },
  PATIENT_WAITER: { 
    name: "patient_waiter", 
    hebrew: "סבלן ממתין", 
    english: "Patient Waiter", 
    emoji: "⏰", 
    color: "bg-gray-400", 
    sound: [262, 311, 370] 
  },
  EMPATHY_CARING: { 
    name: "empathy_caring", 
    hebrew: "אמפתיה ואכפתיות", 
    english: "Empathy Caring", 
    emoji: "💖", 
    color: "bg-pink-400", 
    sound: [494, 587, 698] 
  },
  GRATITUDE_THANKS: { 
    name: "gratitude_thanks", 
    hebrew: "הכרת טובה ותודה", 
    english: "Gratitude Thanks", 
    emoji: "🙏", 
    color: "bg-purple-400", 
    sound: [392, 466, 554] 
  }
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
  'gratitude_thanks': 'הַכָּרַת טוֹבָה וְתוֹדָה'
} as const;

export const EMOTIONAL_SOCIAL_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 10,
    timePerRound: 12000, // זמן יותר ארוך להבנה רגשית
    pointsPerCorrect: 30, // נקודות גבוהות מאוד
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 4,
    specialMechanic: 'emotional-learning' // מכניקה מיוחדת
  },
  items: EMOTIONAL_SOCIAL_ITEMS,
  pronunciations: EMOTIONAL_SOCIAL_PRONUNCIATIONS
} as const;

/**
 * ===============================================
 * משחק זמן ושעות היום - מעשי!
 * ===============================================
 */
export const TIME_CLOCK_CONSTANTS: Record<string, BaseGameItem> = {
  // שעות היום
  MORNING_SUNRISE: { 
    name: "morning_sunrise", 
    hebrew: "בוקר - זריחה", 
    english: "Morning Sunrise", 
    emoji: "🌅", 
    color: "bg-orange-300", 
    sound: [392, 440, 494] 
  },
  NOON_MIDDAY: { 
    name: "noon_midday", 
    hebrew: "צהריים - שיא היום", 
    english: "Noon Midday", 
    emoji: "☀️", 
    color: "bg-yellow-400", 
    sound: [523, 587, 659] 
  },
  EVENING_SUNSET: { 
    name: "evening_sunset", 
    hebrew: "ערב - שקיעה", 
    english: "Evening Sunset", 
    emoji: "🌇", 
    color: "bg-orange-500", 
    sound: [349, 392, 440] 
  },
  NIGHT_STARS: { 
    name: "night_stars", 
    hebrew: "לילה - כוכבים", 
    english: "Night Stars", 
    emoji: "🌙", 
    color: "bg-purple-800", 
    sound: [262, 311, 370] 
  },

  // ימי השבוע
  SUNDAY_REST: { 
    name: "sunday_rest", 
    hebrew: "יום ראשון", 
    english: "Sunday", 
    emoji: "1️⃣", 
    color: "bg-red-400", 
    sound: [440, 440, 440] 
  },
  MONDAY_START: { 
    name: "monday_start", 
    hebrew: "יום שני", 
    english: "Monday", 
    emoji: "2️⃣", 
    color: "bg-blue-400", 
    sound: [494, 494, 494] 
  },
  FRIDAY_SHABBAT: { 
    name: "friday_shabbat", 
    hebrew: "יום שישי - שבת", 
    english: "Friday Shabbat", 
    emoji: "🕯️", 
    color: "bg-yellow-600", 
    sound: [587, 659, 698] 
  },
  SATURDAY_FAMILY: { 
    name: "saturday_family", 
    hebrew: "יום שבת - משפחה", 
    english: "Saturday Family", 
    emoji: "👨‍👩‍👧‍👦", 
    color: "bg-green-400", 
    sound: [523, 587, 622] 
  },

  // חודשים ועונות
  SPRING_FLOWERS: { 
    name: "spring_flowers", 
    hebrew: "אביב - פרחים", 
    english: "Spring Flowers", 
    emoji: "🌸", 
    color: "bg-pink-300", 
    sound: [523, 622, 740] 
  },
  SUMMER_BEACH: { 
    name: "summer_beach", 
    hebrew: "קיץ - חוף", 
    english: "Summer Beach", 
    emoji: "🏖️", 
    color: "bg-blue-300", 
    sound: [659, 784, 880] 
  },
  AUTUMN_LEAVES: { 
    name: "autumn_leaves", 
    hebrew: "סתיו - עלים", 
    english: "Autumn Leaves", 
    emoji: "🍂", 
    color: "bg-orange-400", 
    sound: [415, 494, 587] 
  },
  WINTER_SNOW: { 
    name: "winter_snow", 
    hebrew: "חורף - שלג", 
    english: "Winter Snow", 
    emoji: "❄️", 
    color: "bg-blue-200", 
    sound: [349, 415, 494] 
  }
};

export const TIME_CLOCK_ITEMS = createItemsList(TIME_CLOCK_CONSTANTS);

export const TIME_CLOCK_PRONUNCIATIONS = {
  'morning_sunrise': 'בֹּקֶר - זְרִיחָה',
  'noon_midday': 'צָהֳרַיִם - שִׁיא הַיּוֹם',
  'evening_sunset': 'עֶרֶב - שְׁקִיעָה',
  'night_stars': 'לַיְלָה - כּוֹכָבִים',
  'sunday_rest': 'יוֹם רִאשׁוֹן',
  'monday_start': 'יוֹם שֵׁנִי',
  'friday_shabbat': 'יוֹם שִׁישִׁי - שַׁבָּת',
  'saturday_family': 'יוֹם שַׁבָּת - מִשְׁפָּחָה',
  'spring_flowers': 'אָבִיב - פְּרָחִים',
  'summer_beach': 'קַיִץ - חוֹף',
  'autumn_leaves': 'סְתָיו - עָלִים',
  'winter_snow': 'חֹרֶף - שֶׁלֶג'
} as const;

export const TIME_CLOCK_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 8000,
    pointsPerCorrect: 15,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 2,
    specialMechanic: 'time-learning' // מכניקה מיוחדת
  },
  items: TIME_CLOCK_ITEMS,
  pronunciations: TIME_CLOCK_PRONUNCIATIONS
} as const;

/**
 * ===============================================
 * משחק אקלים ופלנטה - סביבתי!
 * ===============================================
 */
export const CLIMATE_PLANET_CONSTANTS: Record<string, BaseGameItem> = {
  // אזורי אקלים
  DESERT_HOT: { 
    name: "desert_hot", 
    hebrew: "מדבר חם", 
    english: "Hot Desert", 
    emoji: "🏜️", 
    color: "bg-yellow-600", 
    sound: [294, 330, 370] 
  },
  RAINFOREST_WET: { 
    name: "rainforest_wet", 
    hebrew: "יער גשם רטוב", 
    english: "Wet Rainforest", 
    emoji: "🌳", 
    color: "bg-green-600", 
    sound: [392, 440, 494] 
  },
  ARCTIC_COLD: { 
    name: "arctic_cold", 
    hebrew: "ארקטיק קר", 
    english: "Cold Arctic", 
    emoji: "🧊", 
    color: "bg-blue-200", 
    sound: [220, 262, 311] 
  },
  GRASSLAND_MILD: { 
    name: "grassland_mild", 
    hebrew: "ערבות מתונות", 
    english: "Mild Grassland", 
    emoji: "🌾", 
    color: "bg-green-400", 
    sound: [349, 392, 440] 
  },

  // יבשות
  AFRICA_CONTINENT: { 
    name: "africa_continent", 
    hebrew: "יבשת אפריקה", 
    english: "Africa Continent", 
    emoji: "🌍", 
    color: "bg-orange-500", 
    sound: [440, 523, 622] 
  },
  ASIA_CONTINENT: { 
    name: "asia_continent", 
    hebrew: "יבשת אסיה", 
    english: "Asia Continent", 
    emoji: "🌏", 
    color: "bg-red-500", 
    sound: [494, 587, 698] 
  },
  EUROPE_CONTINENT: { 
    name: "europe_continent", 
    hebrew: "יבשת אירופה", 
    english: "Europe Continent", 
    emoji: "🏰", 
    color: "bg-blue-500", 
    sound: [370, 440, 523] 
  },
  AMERICA_CONTINENT: { 
    name: "america_continent", 
    hebrew: "יבשת אמריקה", 
    english: "America Continent", 
    emoji: "🗽", 
    color: "bg-purple-500", 
    sound: [415, 494, 587] 
  },

  // אוקיינוסים
  PACIFIC_OCEAN: { 
    name: "pacific_ocean", 
    hebrew: "האוקיינוס השקט", 
    english: "Pacific Ocean", 
    emoji: "🌊", 
    color: "bg-blue-600", 
    sound: [262, 311, 370] 
  },
  ATLANTIC_OCEAN: { 
    name: "atlantic_ocean", 
    hebrew: "האוקיינוס האטלנטי", 
    english: "Atlantic Ocean", 
    emoji: "🌊", 
    color: "bg-blue-700", 
    sound: [311, 370, 440] 
  },

  // סביבה ואקולוגיה
  CLEAN_AIR: { 
    name: "clean_air", 
    hebrew: "אוויר נקי", 
    english: "Clean Air", 
    emoji: "💨", 
    color: "bg-cyan-300", 
    sound: [523, 622, 740] 
  },
  RECYCLING_EARTH: { 
    name: "recycling_earth", 
    hebrew: "מחזור לכדור הארץ", 
    english: "Recycling Earth", 
    emoji: "♻️", 
    color: "bg-green-500", 
    sound: [440, 523, 587] 
  }
};

export const CLIMATE_PLANET_ITEMS = createItemsList(CLIMATE_PLANET_CONSTANTS);

export const CLIMATE_PLANET_PRONUNCIATIONS = {
  'desert_hot': 'מִדְבָּר חַם',
  'rainforest_wet': 'יַעַר גֶּשֶׁם רָטֹב',
  'arctic_cold': 'אַרְקְטִי קַר',
  'grassland_mild': 'עֲרָבוֹת מְתוּנוֹת',
  'africa_continent': 'יַבֶּשֶׁת אַפְרִיקָה',
  'asia_continent': 'יַבֶּשֶׁת אַסְיָה',
  'europe_continent': 'יַבֶּשֶׁת אֵירוֹפָּה',
  'america_continent': 'יַבֶּשֶׁת אַמֶרִיקָה',
  'pacific_ocean': 'הָאוֹקְיָנוֹס הַשָּׁקֵט',
  'atlantic_ocean': 'הָאוֹקְיָנוֹס הָאַטְלַנְטִי',
  'clean_air': 'אֲוִיר נָקִי',
  'recycling_earth': 'מַחְזוֹר לִכְדוּר הָאָרֶץ'
} as const;

export const CLIMATE_PLANET_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 9000,
    pointsPerCorrect: 18,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 3,
    specialMechanic: 'geography-learning' // מכניקה מיוחדת
  },
  items: CLIMATE_PLANET_ITEMS,
  pronunciations: CLIMATE_PLANET_PRONUNCIATIONS
} as const;