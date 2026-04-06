'use client';

import { useMemo, useCallback } from "react";
import { useHomePageStore } from "@/lib/stores";
import {
  Book,
  Palette,
  Calculator,
  Car,
  Home,
  Gamepad2,
  Apple,
  Heart,
  Microscope,
  Calendar,
  Sparkles,
  Joystick,
} from "lucide-react";
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import { ComponentType } from "react";

// ── קטגוריות — נתון טהור, אינו state ——————————————————————
export interface GameCategory {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  gameIds: string[];
}

export const GAME_CATEGORIES: Record<string, GameCategory> = {
  basic: {
    title: "למידה בסיסית",
    description: "אותיות, מספרים, צבעים וצורות",
    icon: Book,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600",
    gameIds: ["letters","hebrew-letters","numbers","shapes","colored-shapes","colors","advanced-colors"],
  },
  creative: {
    title: "יצירתיות ואומנות",
    description: "מוזיקה, כלי נגינה, פאזלים וציור",
    icon: Palette,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-600",
    gameIds: ["instruments","puzzles","drawing","building","tetris","magic-fairy-tales","circus-show","logic-games","art-craft","superheroes","fairy-tale-chars"],
  },
  nature: {
    title: "טבע ואוכל",
    description: "חיות, פירות, ירקות וטבע",
    icon: Apple,
    color: "bg-green-500",
    gradient: "from-green-400 to-green-600",
    gameIds: ["animals","fruits","vegetables","ocean-life","garden-plants","smells-tastes","nature-sounds","dinosaurs","birds","bugs-insects"],
  },
  world: {
    title: "עולם ותחבורה",
    description: "כלי תחבורה, מזג אוויר וחלל",
    icon: Car,
    color: "bg-orange-500",
    gradient: "from-orange-400 to-orange-600",
    gameIds: ["transport","vehicles","weather","space","space-adventure","world-food","advanced-weather","road-safety","camping"],
  },
  home: {
    title: "בית וחיים",
    description: "חפצי בית, בגדים, מקצועות ומטבח",
    icon: Home,
    color: "bg-pink-500",
    gradient: "from-pink-400 to-pink-600",
    gameIds: ["house","clothing","professions","tools","tzedakah","kitchen","cooking-kitchen","family","body-parts","new-professions"],
  },
  math: {
    title: "מתמטיקה וחשיבה",
    description: "ספירה וחשבון מתמטי",
    icon: Calculator,
    color: "bg-indigo-500",
    gradient: "from-indigo-400 to-indigo-600",
    gameIds: ["counting","math","shopping-money"],
  },
  games: {
    title: "משחקים מיוחדים",
    description: "זיכרון, בועות ורגשות",
    icon: Gamepad2,
    color: "bg-teal-500",
    gradient: "from-teal-400 to-teal-600",
    gameIds: ["memory","bubbles","emotions","feelings","sports","circus-show"],
  },
  health: {
    title: "בריאות ובטיחות",
    description: "תרופות, בטיחות בדרכים ובריאות",
    icon: Heart,
    color: "bg-red-500",
    gradient: "from-red-400 to-red-600",
    gameIds: ["medicine","road-safety","body-parts","body-movements","touch-senses"],
  },
  science: {
    title: "מדע וטכנולוגיה",
    description: "מחזור, דינוזאורים ומדע",
    icon: Microscope,
    color: "bg-cyan-500",
    gradient: "from-cyan-400 to-cyan-600",
    gameIds: ["recycling","dinosaurs","space-adventure","virtual-reality","new-professions","climate-planet"],
  },
  holidays: {
    title: "חגים ועונות",
    description: "חגים, עונות השנה ומסורות",
    icon: Calendar,
    color: "bg-yellow-500",
    gradient: "from-yellow-400 to-yellow-600",
    gameIds: ["seasons-holidays","jewish-holidays","time-clock"],
  },
  innovative: {
    title: "משחקים חדשניים",
    description: "משחקים אינטראקטיביים ויוצאי דופן",
    icon: Sparkles,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    gradient: "from-purple-400 to-pink-600",
    gameIds: ["sound-imitation","emotional-social","advanced-weather","advanced-colors","logic-games"],
  },
  arcade: {
    title: "🕹️ ארקייד",
    description: "משחקי פעולה וארקייד כיפיים",
    icon: Joystick,
    color: "bg-rose-500",
    gradient: "from-rose-400 to-red-600",
    gameIds: [
      "flappy-bird","snake","dino-runner","catch-fruit","space-defender",
      "whack-a-mole","brick-breaker","balloon-pop","pong","meteor-dodge",
      "frogger","stack","color-tap","jumper","simon",
    ],
  },
  educational: {
    title: "📚 משחקים חינוכיים",
    description: "מתמטיקה, שפה וידע כללי לילדים",
    icon: Book,
    color: "bg-teal-500",
    gradient: "from-teal-400 to-cyan-600",
    gameIds: ["true-false","emoji-math","math-race","number-bubbles","word-scramble"],
  },
};

// ── Hook ————————————————————————————————————————————————————
export interface UseCategorizedGamesReturn {
  selectedCategory: string | null;
  showAllGames: boolean;
  allGameRegistrations: GameRegistration[];
  totalGamesCount: number;
  categories: Record<string, GameCategory>;
  handleShowCategories: () => void;
  handleShowAllGames: () => void;
  handleCategorySelect: (key: string) => void;
  handleBackToCategories: () => void;
}

export function useCategorizedGames(): UseCategorizedGamesReturn {
  const selectedCategory = useHomePageStore((s) => s.selectedCategory);
  const showAllGames = useHomePageStore((s) => s.showAllGames);
  const { selectCategory, showAllGamesView, showCategoriesView, backToCategories } = useHomePageStore();

  const allGameRegistrations = useMemo(
    () => GamesRegistry.getAllGameRegistrations(),
    []
  );

  const handleShowCategories = useCallback(() => {
    showCategoriesView();
  }, [showCategoriesView]);

  const handleShowAllGames = useCallback(() => {
    showAllGamesView();
  }, [showAllGamesView]);

  const handleCategorySelect = useCallback((key: string) => {
    selectCategory(key);
  }, [selectCategory]);

  const handleBackToCategories = useCallback(() => {
    backToCategories();
  }, [backToCategories]);

  return {
    selectedCategory,
    showAllGames,
    allGameRegistrations,
    totalGamesCount: allGameRegistrations.length,
    categories: GAME_CATEGORIES,
    handleShowCategories,
    handleShowAllGames,
    handleCategorySelect,
    handleBackToCategories,
  };
}
