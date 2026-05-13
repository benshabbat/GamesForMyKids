import { BaseGameItem } from "@/lib/types/core/base";
import { createItemsList, DEFAULT_GAME_CONFIG } from "@/lib/constants/core";

export const BODY_MOVEMENTS_CONSTANTS: Record<string, BaseGameItem> = {
  // תנועות בסיסיות
  JUMP_HIGH: { name: "jump_high", hebrew: "קפיצה גבוהה", english: "Jump High", emoji: "🤸", color: "bg-yellow-400", sound: [440, 554, 659] },
  DANCE_SPIN: { name: "dance_spin", hebrew: "ריקוד וסיבוב", english: "Dance Spin", emoji: "💃", color: "bg-pink-500", sound: [523, 659, 784] },
  MARCH_STEPS: { name: "march_steps", hebrew: "צעדי צעידה", english: "March Steps", emoji: "🚶", color: "bg-green-600", sound: [330, 392, 440] },
  CLAP_HANDS: { name: "clap_hands", hebrew: "מחיאות כפיים", english: "Clap Hands", emoji: "👏", color: "bg-blue-400", sound: [698, 698, 698] },

  // תנועות יוגה לילדים
  TREE_POSE: { name: "tree_pose", hebrew: "תנוחת עץ", english: "Tree Pose", emoji: "🌳", color: "bg-green-500", sound: [294, 349, 415] },
  CAT_STRETCH: { name: "cat_stretch", hebrew: "מתיחת חתול", english: "Cat Stretch", emoji: "🐱", color: "bg-orange-400", sound: [370, 440, 523] },
  BUTTERFLY_SIT: { name: "butterfly_sit", hebrew: "ישיבת פרפר", english: "Butterfly Sit", emoji: "🦋", color: "bg-purple-400", sound: [659, 784, 880] },
  FROG_SQUAT: { name: "frog_squat", hebrew: "כריעת צפרדע", english: "Frog Squat", emoji: "🐸", color: "bg-green-400", sound: [247, 294, 349] },

  // תנועות משחק
  MONKEY_SWING: { name: "monkey_swing", hebrew: "נדנוד קוף", english: "Monkey Swing", emoji: "🐵", color: "bg-brown-400", sound: [392, 494, 587] },
  ELEPHANT_WALK: { name: "elephant_walk", hebrew: "הליכת פיל", english: "Elephant Walk", emoji: "🐘", color: "bg-gray-500", sound: [131, 165, 196] },
  BIRD_FLY: { name: "bird_fly", hebrew: "טיסת ציפור", english: "Bird Fly", emoji: "🐦", color: "bg-sky-400", sound: [554, 659, 784] },
  ROBOT_MOVE: { name: "robot_move", hebrew: "תנועת רובוט", english: "Robot Move", emoji: "🤖", color: "bg-gray-600", sound: [196, 247, 294] },
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
  'robot_move': 'תְּנוּ-עַת רוֹ-בּוֹט',
} as const;

export const BODY_MOVEMENTS_GAME_CONSTANTS = {
  gameConfig: {
    ...DEFAULT_GAME_CONFIG,
    rounds: 12,
    timePerRound: 15000,
    pointsPerCorrect: 25,
    hintsEnabled: true,
    pronunciationEnabled: true,
    maxHints: 2,
    specialMechanic: 'body-movement',
  },
  items: BODY_MOVEMENTS_ITEMS,
  pronunciations: BODY_MOVEMENTS_PRONUNCIATIONS,
} as const;
