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
    id: "puzzles",
    title: "משחק פאזלים",
    description: "הרכב תמונות יפות!",
    icon: Puzzle,
    color: "bg-purple-400 hover:bg-purple-500",
    href: "/games/puzzles",
    available: true,
    order: 22,
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
