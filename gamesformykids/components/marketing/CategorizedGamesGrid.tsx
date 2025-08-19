"use client";

import { useState } from 'react';
import { Book, Palette, Calculator, Car, Home, Gamepad2, Apple } from 'lucide-react';
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
    gameIds: ["letters", "hebrew-letters", "numbers", "shapes", "colored-shapes", "colors"]
  },
  creative: {
    title: "יצירתיות ואומנות",
    description: "מוזיקה, כלי נגינה, פאזלים וציור",
    icon: Palette,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-purple-600",
    gameIds: ["instruments", "puzzles", "drawing", "building"]
  },
  nature: {
    title: "טבע ואוכל",
    description: "חיות, פירות וירקות",
    icon: Apple,
    color: "bg-green-500",
    gradient: "from-green-400 to-green-600",
    gameIds: ["animals", "fruits", "vegetables"]
  },
  world: {
    title: "עולם ותחבורה",
    description: "כלי תחבורה, מזג אוויר וחלל",
    icon: Car,
    color: "bg-orange-500",
    gradient: "from-orange-400 to-orange-600",
    gameIds: ["transport", "weather", "space"]
  },
  home: {
    title: "בית וחיים",
    description: "חפצי בית, בגדים, מקצועות וצדקה",
    icon: Home,
    color: "bg-pink-500",
    gradient: "from-pink-400 to-pink-600",
    gameIds: ["house", "clothing", "professions", "tools", "tzedakah"]
  },
  math: {
    title: "מתמטיקה וחשיבה",
    description: "ספירה וחשבון מתמטי",
    icon: Calculator,
    color: "bg-indigo-500",
    gradient: "from-indigo-400 to-indigo-600",
    gameIds: ["counting", "math"]
  },
  games: {
    title: "משחקים מיוחדים",
    description: "זיכרון, בועות ורגשות",
    icon: Gamepad2,
    color: "bg-teal-500",
    gradient: "from-teal-400 to-teal-600",
    gameIds: ["memory", "bubbles", "emotions", "smelltaste"]
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
