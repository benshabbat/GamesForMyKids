"use client";

import { ComponentTypes } from "@/lib/types";

export default function CategoryNavigation({
  selectedCategory,
  showAllGames,
  totalGamesCount,
  onShowCategories,
  onShowAllGames
}: ComponentTypes.CategoryNavigationProps) {
  return (
    <div className="flex justify-center gap-2 md:gap-4 mb-6 md:mb-8 flex-wrap">
      <button
        onClick={onShowCategories}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
          !selectedCategory && !showAllGames
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
        }`}
      >
        📚 קטגוריות
      </button>
      <button
        onClick={onShowAllGames}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
          showAllGames
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
        }`}
      >
        🎮 <span className="hidden sm:inline">כל המשחקים</span><span className="sm:hidden">הכל</span> ({totalGamesCount})
      </button>
    </div>
  );
}
