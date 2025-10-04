import {
  Heart,
  Circle,
  Square,
  Music,
  Hash,
  Apple,
  Dog,
  Cloud,
  Car,
  Calculator,
  User,
  Salad,
  Sparkles,
  Shirt,
  Coffee,
  Home,
  Wrench,
  Smile,
  Puzzle,
  Paintbrush,
  Building,
  // משחקים חדשים
  Zap,
  ChefHat,
  Hand,
  Users,
  Bone,
  // משחקים נוספים חדשים
  Globe,
  Recycle,
  Pill,
  Volume2,
  Calendar,
  ShoppingCart,
  Shield,
  // משחקים חדשים נוספים
  Waves,
  Flower,
  Rocket,
  PartyPopper,
  // משחקים חדשים נוספים 2
  Briefcase,
  CloudRain,
  Rainbow,
  Star,
  BookOpen,
  // משחקים חדשניים
  Mic,
  Activity,
  TouchpadIcon as Touch,
  Brain,
  Clock,
  Earth,
} from "lucide-react";
import { HebrewLettersIcon } from "@/public/icons/HebrewIcons";
import { Game } from "@/lib/types";
import { createElement } from "react";

export interface GameRegistration {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
  available: boolean;
  order: number; // לקביעת סדר התצוגה
}

// רישום כל המשחקים במקום אחד
const GAMES_REGISTRY: GameRegistration[] = [
  {
    id: "memory",
    title: "משחק זיכרון",
    description: "מצא את הזוגות!",
    icon: Heart,
    color: "bg-pink-400 hover:bg-pink-500",
    href: "/games/memory",
    available: true,
    order: 1,
  },
  {
    id: "colors",
    title: "משחק צבעים",
    description: "למד צבעים!",
    icon: Circle,
    color: "bg-blue-400 hover:bg-blue-500",
    href: "/games/colors",
    available: true,
    order: 2,
  },
  {
    id: "letters",
    title: "משחק אותיות",
    description: "למד אותיות!",
    icon: HebrewLettersIcon,
    color: "bg-orange-400 hover:bg-orange-500",
    href: "/games/letters",
    available: true,
    order: 3,
  },
  {
    id: "hebrew-letters",
    title: "תרגול כתיבה בעברית",
    description: "תרגל כתיבת כל האותיות!",
    icon: HebrewLettersIcon,
    color: "bg-green-400 hover:bg-green-500",
    href: "/games/hebrew-letters",
    available: true,
    order: 3.5,
  },
  {
    id: "shapes",
    title: "משחק צורות",
    description: "למד צורות!",
    icon: Square,
    color: "bg-green-400 hover:bg-green-500",
    href: "/games/shapes",
    available: true,
    order: 4,
  },
  {
    id: "colored-shapes",
    title: "משחק צורות צבעוניות",
    description: "בחר צורה בצבע הנכון!",
    icon: Circle,
    color: "bg-gradient-to-r from-orange-400 to-green-400 hover:from-orange-500 hover:to-green-500",
    href: "/games/colored-shapes",
    available: true,
    order: 4.5,
  },
  {
    id: "numbers",
    title: "משחק מספרים",
    description: "למד מספרים!",
    icon: Hash,
    color: "bg-indigo-400 hover:bg-indigo-500",
    href: "/games/numbers",
    available: true,
    order: 5,
  },
  {
    id: "fruits",
    title: "משחק פירות",
    description: "למד פירות!",
    icon: Apple,
    color: "bg-red-400 hover:bg-red-500",
    href: "/games/fruits",
    available: true,
    order: 6,
  },

  {
    id: "animals",
    title: "משחק חיות",
    description: "למד חיות!",
    icon: Dog, // או אייקון חיה אחר מ-lucide-react
    color: "bg-green-400 hover:bg-green-500",
    href: "/games/animals",
    available: true,
    order: 7,
  },
  {
    id: "bubbles",
    title: "בועות מוזיקליות",
    description: "פוצץ בועות ושמע צלילים!",
    icon: Music,
    color: "bg-blue-400 hover:bg-blue-500",
    href: "/games/bubbles",
    available: true,
    order: 8,
  },
  {
    id: "counting",
    title: "משחק ספירה",
    description: "ספור אימוג'ים!",
    icon: Hash, // או Calculator אם זמין
    color: "bg-cyan-400 hover:bg-cyan-500",
    href: "/games/counting",
    available: true,
    order: 9,
  },
  {
    id: "weather",
    title: "משחק מזג אוויר",
    description: "למד על מזג האוויר!",
    icon: Cloud,
    color: "bg-sky-400 hover:bg-sky-500",
    href: "/games/weather",
    available: true,
    order: 10,
  },
  {
    id: "transport",
    title: "משחק כלי תחבורה",
    description: "למד על כלי תחבורה!",
    icon: Car,
    color: "bg-blue-400 hover:bg-blue-500",
    href: "/games/transport",
    available: true,
    order: 11,
  },
  {
    id: "math",
    title: "משחק חשבון",
    description: "למד חיבור וחיסור!",
    icon: Calculator, // צריך להוסיף import: Calculator מ lucide-react
    color: "bg-yellow-400 hover:bg-yellow-500",
    href: "/games/math",
    available: true,
    order: 12,
  },
  {
    id: "professions",
    title: "משחק מקצועות",
    description: "למד על מקצועות שונים!",
    icon: User,
    color: "bg-purple-400 hover:bg-purple-500",
    href: "/games/professions",
    available: true,
    order: 13,
  },
  {
    id: "vegetables",
    title: "משחק ירקות",
    description: "למד ירקות בריאים!",
    icon: Salad,
    color: "bg-green-400 hover:bg-green-500",
    href: "/games/vegetables",
    available: true,
    order: 14,
  },
  {
    id: "instruments",
    title: "משחק כלי נגינה",
    description: "למד כלי נגינה מוזיקליים!",
    icon: Music,
    color: "bg-yellow-400 hover:bg-yellow-500",
    href: "/games/instruments",
    available: true,
    order: 15,
  },
  {
    id: "space",
    title: "משחק גופי השמים",
    description: "חקור את החלל והכוכבים!",
    icon: Sparkles,
    color: "bg-indigo-400 hover:bg-indigo-500",
    href: "/games/space",
    available: true,
    order: 16,
  },
  {
    id: "clothing",
    title: "משחק בגדים ואביזרים",
    description: "למד על פריטי לבוש שונים!",
    icon: Shirt,
    color: "bg-pink-400 hover:bg-pink-500",
    href: "/games/clothing",
    available: true,
    order: 17,
  },
  {
    id: "smelltaste",
    title: "משחק ריחות וטעמים",
    description: "זהה ריחות וטעמים שונים!",
    icon: Coffee,
    color: "bg-amber-400 hover:bg-amber-500",
    href: "/games/smelltaste",
    available: true,
    order: 18,
  },
  {
    id: "house",
    title: "משחק חפצי הבית",
    description: "למד חפצים בבית!",
    icon: Home,
    color: "bg-sky-400 hover:bg-sky-500",
    href: "/games/house",
    available: true,
    order: 19,
  },
  {
    id: "tools",
    title: "משחק כלי עבודה",
    description: "למד כלי עבודה שונים!",
    icon: Wrench,
    color: "bg-orange-400 hover:bg-orange-500",
    href: "/games/tools",
    available: true,
    order: 20,
  },
  {
    id: "emotions",
    title: "משחק רגשות",
    description: "למד רגשות שונים!",
    icon: Smile,
    color: "bg-yellow-400 hover:bg-yellow-500",
    href: "/games/emotions",
    available: true,
    order: 21,
  },
  {
    id: "tzedakah",
    title: "משחק קופת הצדקה",
    description: "תפוס מטבעות לצדקה!",
    icon: Heart,
    color: "bg-pink-400 hover:bg-pink-500",
    href: "/games/tzedakah",
    available: true,
    order: 22,
  },
  {
    id: "puzzles",
    title: "משחק פאזלים",
    description: "הרכב תמונות יפות!",
    icon: Puzzle,
    color: "bg-purple-400 hover:bg-purple-500",
    href: "/games/puzzles",
    available: true,
    order: 23,
  },
  {
    id: "drawing",
    title: "משחק ציורים",
    description: "צייר יצירות אמנות!",
    icon: Paintbrush,
    color: "bg-orange-400 hover:bg-orange-500",
    href: "/games/drawing",
    available: true,
    order: 24,
  },
  {
    id: "building",
    title: "סטודיו הבנייה הקסום",
    description: "בנה יצירות עם צורות צבעוניות!",
    icon: Building,
    color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    href: "/games/building",
    available: true,
    order: 25,
  },
  {
    id: "tetris",
    title: "טטריס לילדים",
    description: "המשחק הכי כיפי בעולם!",
    icon: Puzzle,
    color: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
    href: "/games/tetris",
    available: true,
    order: 26,
  },
  // משחקים חדשים
  {
    id: "sports",
    title: "משחק ספורט",
    description: "למד על ספורט ופעילות גופנית!",
    icon: Zap,
    color: "bg-green-500 hover:bg-green-600",
    href: "/games/sports",
    available: true,
    order: 27,
  },
  {
    id: "kitchen",
    title: "משחק כלי מטבח",
    description: "למד על כלי מטבח ובישול!",
    icon: ChefHat,
    color: "bg-orange-500 hover:bg-orange-600",
    href: "/games/kitchen",
    available: true,
    order: 28,
  },
  {
    id: "body-parts",
    title: "משחק חלקי הגוף",
    description: "למד על חלקי הגוף השונים!",
    icon: Hand,
    color: "bg-pink-500 hover:bg-pink-600",
    href: "/games/body-parts",
    available: true,
    order: 29,
  },
  {
    id: "family",
    title: "משחק בני המשפחה",
    description: "למד על בני המשפחה השונים!",
    icon: Users,
    color: "bg-blue-500 hover:bg-blue-600",
    href: "/games/family",
    available: true,
    order: 30,
  },
  {
    id: "dinosaurs",
    title: "משחק דינוזאורים",
    description: "למד על דינוזאורים מדהימים מהעבר!",
    icon: Bone,
    color: "bg-green-600 hover:bg-green-700",
    href: "/games/dinosaurs",
    available: true,
    order: 31,
  },
  {
    id: "world-food",
    title: "משחק מזון מסביב לעולם",
    description: "הכר מתאכלים מתרבויות שונות!",
    icon: Globe,
    color: "bg-purple-500 hover:bg-purple-600",
    href: "/games/world-food",
    available: true,
    order: 32,
  },
  {
    id: "recycling",
    title: "משחק מחזור וקיימות",
    description: "למד על מחזור וחשיבות שמירה על הסביבה!",
    icon: Recycle,
    color: "bg-green-500 hover:bg-green-600",
    href: "/games/recycling",
    available: true,
    order: 33,
  },
  {
    id: "medicine",
    title: "משחק מרקחת ותרופות",
    description: "הכר כלי רפואה ומתן עזרה ראשונה!",
    icon: Pill,
    color: "bg-red-500 hover:bg-red-600",
    href: "/games/medicine",
    available: true,
    order: 34,
  },
  {
    id: "nature-sounds",
    title: "משחק צלילי הטבע",
    description: "הקשב לקולות הטבע ובעלי החיים!",
    icon: Volume2,
    color: "bg-teal-500 hover:bg-teal-600",
    href: "/games/nature-sounds",
    available: true,
    order: 35,
  },
  {
    id: "seasons-holidays",
    title: "משחק תחנות שנה ומועדים",
    description: "למד על עונות השנה והחגים היהודיים!",
    icon: Calendar,
    color: "bg-amber-500 hover:bg-amber-600",
    href: "/games/seasons-holidays",
    available: true,
    order: 36,
  },
  {
    id: "feelings",
    title: "משחק ריגושים ותחושות",
    description: "זהה ולמד על רגשות ותחושות שונות!",
    icon: Smile,
    color: "bg-yellow-500 hover:bg-yellow-600",
    href: "/games/feelings",
    available: true,
    order: 37,
  },
  {
    id: "shopping-money",
    title: "משחק קניות וכסף",
    description: "למד על כסף, מחירים וקניות!",
    icon: ShoppingCart,
    color: "bg-indigo-500 hover:bg-indigo-600",
    href: "/games/shopping-money",
    available: true,
    order: 38,
  },
  {
    id: "road-safety",
    title: "משחק בטיחות בדרכים",
    description: "למד כללי בטיחות חשובים בדרכים!",
    icon: Shield,
    color: "bg-orange-500 hover:bg-orange-600",
    href: "/games/road-safety",
    available: true,
    order: 39,
  },
  {
    id: "ocean-life",
    title: "🐋 משחק חיי הים 🐠",
    description: "גלה את עולם הים הקסום וחיותיו המרהיבות!",
    icon: Waves,
    color: "bg-blue-600 hover:bg-blue-700",
    href: "/games/ocean-life",
    available: true,
    order: 40,
  },
  {
    id: "garden-plants",
    title: "🌱 משחק הגינה והצמחים 🌺",
    description: "למד על צמחים, פרחים וגידול בגינה!",
    icon: Flower,
    color: "bg-green-500 hover:bg-green-600",
    href: "/games/garden-plants",
    available: true,
    order: 41,
  },
  {
    id: "magic-fairy-tales",
    title: "🧚‍♀️ משחק אגדות וקסמים ✨",
    description: "היכנס לעולם הקסמים והאגדות הקלאסיות!",
    icon: Sparkles,
    color: "bg-purple-500 hover:bg-purple-600",
    href: "/games/magic-fairy-tales",
    available: true,
    order: 42,
  },
  {
    id: "space-adventure",
    title: "🚀 משחק הרפתקת החלל 🌟",
    description: "טוס לחלל וגלה כוכבי לכת וחללים רחוקים!",
    icon: Rocket,
    color: "bg-indigo-600 hover:bg-indigo-700",
    href: "/games/space-adventure",
    available: true,
    order: 43,
  },
  {
    id: "cooking-kitchen",
    title: "👨‍🍳 משחק בישול ומטבח 🍰",
    description: "למד לבשל ולהכין מאכלים טעימים!",
    icon: ChefHat,
    color: "bg-red-500 hover:bg-red-600",
    href: "/games/cooking-kitchen",
    available: true,
    order: 44,
  },
  {
    id: "circus-show",
    title: "🎪 משחק הקרקס והמופע 🤹‍♂️",
    description: "הצטרף למופע הקרקס המרהיב ולמשחקי כושר!",
    icon: PartyPopper,
    color: "bg-pink-500 hover:bg-pink-600",
    href: "/games/circus-show",
    available: true,
    order: 45,
  },
  // 6 משחקים חדשים נוספים
  {
    id: "virtual-reality",
    title: "🥽 משחק מציאות מדומה 🌐",
    description: "גלה עולמות חדשים במציאות מדומה!",
    icon: Star,
    color: "bg-purple-600 hover:bg-purple-700",
    href: "/games/virtual-reality",
    available: true,
    order: 46,
  },
  {
    id: "new-professions",
    title: "💼 מקצועות מודרניים 💻",
    description: "למד על מקצועות חדשים וטכנולוגיים!",
    icon: Briefcase,
    color: "bg-gray-600 hover:bg-gray-700",
    href: "/games/new-professions",
    available: true,
    order: 47,
  },
  {
    id: "advanced-weather",
    title: "⛈️ מזג אוויר מתקדם 🌈",
    description: "למד על תופעות מזג אוויר מיוחדות!",
    icon: CloudRain,
    color: "bg-blue-700 hover:bg-blue-800",
    href: "/games/advanced-weather",
    available: true,
    order: 48,
  },
  {
    id: "advanced-colors",
    title: "🎨 צבעים מתקדמים 🌈",
    description: "גלה צבעים מיוחדים וערבובי צבעים!",
    icon: Rainbow,
    color: "bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400",
    href: "/games/advanced-colors",
    available: true,
    order: 49,
  },
  {
    id: "jewish-holidays",
    title: "🕎 חגים יהודיים 🎉",
    description: "למד על חגי ישראל ומסורותיהם!",
    icon: Star,
    color: "bg-yellow-600 hover:bg-yellow-700",
    href: "/games/jewish-holidays",
    available: true,
    order: 50,
  },
  {
    id: "logic-games",
    title: "🧩 משחקי חשיבה ולוגיקה 🤔",
    description: "פתח את יכולות החשיבה והלוגיקה!",
    icon: BookOpen,
    color: "bg-indigo-700 hover:bg-indigo-800",
    href: "/games/logic-games",
    available: true,
    order: 51,
  },
  // 6 משחקים חדשניים יוצאי דופן
  {
    id: "sound-imitation",
    title: "🎤 חיקוי קולות ורעשים 🔊",
    description: "חקה קולות של חיות, מכונות וטבע!",
    icon: Mic,
    color: "bg-green-600 hover:bg-green-700",
    href: "/games/sound-imitation",
    available: true,
    order: 52,
  },
  {
    id: "body-movements",
    title: "🤸 תנועות גוף וריקוד 💃",
    description: "תרגל תנועות, יוגה וריקוד אינטראקטיבי!",
    icon: Activity,
    color: "bg-pink-600 hover:bg-pink-700",
    href: "/games/body-movements",
    available: true,
    order: 53,
  },
  {
    id: "touch-senses",
    title: "🤚 מגע וחושים 🌡️",
    description: "חקור מרקמים, טמפרטורות וחושי גוף!",
    icon: Touch,
    color: "bg-orange-600 hover:bg-orange-700",
    href: "/games/touch-senses",
    available: true,
    order: 54,
  },
  {
    id: "emotional-social",
    title: "💖 מציאות רגשית וחברתית 🤝",
    description: "פתח אינטליגנציה רגשית וחברתית!",
    icon: Brain,
    color: "bg-purple-700 hover:bg-purple-800",
    href: "/games/emotional-social",
    available: true,
    order: 55,
  },
  {
    id: "time-clock",
    title: "⏰ זמן ושעות היום 📅",
    description: "למד על זמן, שעות, ימים ועונות!",
    icon: Clock,
    color: "bg-blue-800 hover:bg-blue-900",
    href: "/games/time-clock",
    available: true,
    order: 56,
  },
  {
    id: "climate-planet",
    title: "🌍 אקלים וכדור הארץ 🌿",
    description: "גלה יבשות, אוקיינוסים ואזורי אקלים!",
    icon: Earth,
    color: "bg-teal-700 hover:bg-teal-800",
    href: "/games/climate-planet",
    available: true,
    order: 57,
  },
];

// פונקציות עזר לעבודה עם המשחקים
export class GamesRegistry {
  // קבלת כל הרישומים המקוריים
  static getAllGameRegistrations(): GameRegistration[] {
    return GAMES_REGISTRY.sort((a, b) => a.order - b.order);
  }

  // קבלת כל המשחקים ממוינים לפי סדר
  static getAllGames(): Game[] {
    return GAMES_REGISTRY.sort((a, b) => a.order - b.order).map((game) => ({
      id: game.id,
      title: game.title,
      hebrew: game.title, // Same as title for now
      english: game.id, // Use id as English name
      description: game.description,
      icon: createElement(game.icon, { className: "w-8 h-8" }),
      color: game.color,
      href: game.href,
      available: game.available,
    }));
  }

  // קבלת רק המשחקים הזמינים
  static getAvailableGames(): Game[] {
    return this.getAllGames().filter((game) => game.available);
  }

  // קבלת מספר המשחקים הזמינים
  static getAvailableGamesCount(): number {
    return GAMES_REGISTRY.filter((game) => game.available).length;
  }

  // קבלת מספר כל המשחקים
  static getTotalGamesCount(): number {
    return GAMES_REGISTRY.length;
  }

  // הוספת משחק חדש
  static registerGame(game: GameRegistration): void {
    // בדיקה שהמשחק לא קיים כבר
    const existingGame = GAMES_REGISTRY.find((g) => g.id === game.id);
    if (existingGame) {
      console.warn(`משחק עם ID ${game.id} כבר קיים`);
      return;
    }

    GAMES_REGISTRY.push(game);
    console.log(`משחק ${game.title} נרשם בהצלחה`);
  }

  // עדכון סטטוס זמינות משחק
  static updateGameAvailability(gameId: string, available: boolean): void {
    const game = GAMES_REGISTRY.find((g) => g.id === gameId);
    if (game) {
      game.available = available;
      console.log(`משחק ${game.title} עודכן לזמינות: ${available}`);
    }
  }

  // קבלת משחק לפי ID
  static getGameById(gameId: string): GameRegistration | undefined {
    return GAMES_REGISTRY.find((g) => g.id === gameId);
  }
}
