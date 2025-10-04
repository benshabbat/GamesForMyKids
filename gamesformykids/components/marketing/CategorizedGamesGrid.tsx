"use client";

import { useState } from 'react';
import { Book, Palette, Calculator, Car, Home, Gamepad2, Apple, Heart, Microscope, Calendar, Sparkles } from 'lucide-react';
import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import CategoryNavigation from '../game/CategoryNavigation';
import CategoriesView from '../game/CategoriesView';
import CategoryGamesView from '../game/CategoryGamesView';
import AllGamesView from '../game/AllGamesView';

// הגדרת קטגוריות המשחקים
const GAME_CATEGORIES = {
  basic: {
    title: "למידה בסיסית",
    description: "אותיות, מספרים, צבעים וצורות",
    icon: Book,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600",
    gameIds: ["letters", "hebrew-letters", "numbers", "shapes", "colored-shapes", "colors", "advanced-colors"]
  },
  creative: {
    title: "יצירתיות ואומנות",
    description: "מוזיקה, כלי נגינה, פאזלים וציור",
    icon: Palette,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-600",
    gameIds: ["instruments", "puzzles", "drawing", "building", "tetris", "magic-fairy-tales", "circus-show", "logic-games"]
  },
  nature: {
    title: "טבע ואוכל",
    description: "חיות, פירות, ירקות וטבע",
    icon: Apple,
    color: "bg-green-500",
    gradient: "from-green-400 to-green-600",
    gameIds: ["animals", "fruits", "vegetables", "ocean-life", "garden-plants", "smells-tastes", "nature-sounds", "dinosaurs"]
  },
  world: {
    title: "עולם ותחבורה",
    description: "כלי תחבורה, מזג אוויר וחלל",
    icon: Car,
    color: "bg-orange-500",
    gradient: "from-orange-400 to-orange-600",
    gameIds: ["transport", "vehicles", "weather", "space", "space-adventure", "world-food", "advanced-weather", "road-safety"]
  },
  home: {
    title: "בית וחיים",
    description: "חפצי בית, בגדים, מקצועות ומטבח",
    icon: Home,
    color: "bg-pink-500",
    gradient: "from-pink-400 to-pink-600",
    gameIds: ["house", "clothing", "professions", "tools", "tzedakah", "kitchen", "cooking-kitchen", "family", "body-parts", "new-professions"]
  },
  math: {
    title: "מתמטיקה וחשיבה",
    description: "ספירה וחשבון מתמטי",
    icon: Calculator,
    color: "bg-indigo-500",
    gradient: "from-indigo-400 to-indigo-600",
    gameIds: ["counting", "math", "shopping-money"]
  },
  games: {
    title: "משחקים מיוחדים",
    description: "זיכרון, בועות ורגשות",
    icon: Gamepad2,
    color: "bg-teal-500",
    gradient: "from-teal-400 to-teal-600",
    gameIds: ["memory", "bubbles", "emotions", "feelings", "sports", "circus-show"]
  },
  health: {
    title: "בריאות ובטיחות",
    description: "תרופות, בטיחות בדרכים ובריאות",
    icon: Heart,
    color: "bg-red-500",
    gradient: "from-red-400 to-red-600",
    gameIds: ["medicine", "road-safety", "body-parts", "body-movements", "touch-senses"]
  },
  science: {
    title: "מדע וטכנולוגיה",
    description: "מחזור, דינוזאורים ומדע",
    icon: Microscope,
    color: "bg-cyan-500",
    gradient: "from-cyan-400 to-cyan-600",
    gameIds: ["recycling", "dinosaurs", "space-adventure", "virtual-reality", "new-professions", "climate-planet"]
  },
  holidays: {
    title: "חגים ועונות",
    description: "חגים, עונות השנה ומסורות",
    icon: Calendar,
    color: "bg-yellow-500",
    gradient: "from-yellow-400 to-yellow-600",
    gameIds: ["seasons-holidays", "jewish-holidays", "time-clock"]
  },
  innovative: {
    title: "משחקים חדשניים",
    description: "משחקים אינטראקטיביים ויוצאי דופן",
    icon: Sparkles,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    gradient: "from-purple-400 to-pink-600",
    gameIds: ["sound-imitation", "emotional-social", "advanced-weather", "advanced-colors", "logic-games"]
  }
};

const CategorizedGamesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllGames, setShowAllGames] = useState(false);

  // קבלת כל המשחקים מהרישום - נקבל את הרישומים המקוריים
  const allGameRegistrations = GamesRegistry.getAllGameRegistrations();
  const totalGamesCount = allGameRegistrations.length;

  const handleShowCategories = () => {
    setSelectedCategory(null);
    setShowAllGames(false);
  };

  const handleShowAllGames = () => {
    setSelectedCategory(null);
    setShowAllGames(true);
  };

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <CategoryNavigation
        selectedCategory={selectedCategory}
        showAllGames={showAllGames}
        totalGamesCount={totalGamesCount}
        onShowCategories={handleShowCategories}
        onShowAllGames={handleShowAllGames}
      />

      {!selectedCategory && !showAllGames && (
        <CategoriesView
          categories={GAME_CATEGORIES}
          allGameRegistrations={allGameRegistrations}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {selectedCategory && (
        <CategoryGamesView
          selectedCategory={selectedCategory}
          categories={GAME_CATEGORIES}
          allGameRegistrations={allGameRegistrations}
          onBackToCategories={handleBackToCategories}
        />
      )}

      {showAllGames && (
        <AllGamesView
          allGameRegistrations={allGameRegistrations}
          totalGamesCount={totalGamesCount}
        />
      )}
    </div>
  );
};

export default CategorizedGamesGrid;
