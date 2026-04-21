"use client";

import { useMemo } from "react";
import { useHomePageStore } from "@/lib/stores";
import { useFavoritesStore } from "@/lib/stores";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

export default function CategoryNavigation() {
  const selectedCategory = useHomePageStore((s) => s.selectedCategory);
  const showAllGames = useHomePageStore((s) => s.showAllGames);
  const showFavorites = useHomePageStore((s) => s.showFavorites);
  const showCategoriesView = useHomePageStore((s) => s.showCategoriesView);
  const showAllGamesView = useHomePageStore((s) => s.showAllGamesView);
  const showFavoritesView = useHomePageStore((s) => s.showFavoritesView);
  const totalGamesCount = useMemo(() => GamesRegistry.getAllGameRegistrations().length, []);
  const favCount = useFavoritesStore((s) => s.favoriteIds.length);
  return (
    <div className="flex justify-center gap-2 md:gap-4 mb-6 md:mb-8 flex-wrap">
      <button
        onClick={showCategoriesView}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
          !selectedCategory && !showAllGames && !showFavorites
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
        }`}
      >
        📚 קטגוריות
      </button>
      <button
        onClick={showAllGamesView}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
          showAllGames
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
        }`}
      >
        🎮 <span className="hidden sm:inline">כל המשחקים</span><span className="sm:hidden">הכל</span> ({totalGamesCount})
      </button>
      <button
        onClick={showFavoritesView}
        className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 relative ${
          showFavorites
            ? 'bg-yellow-400 text-white shadow-lg'
            : 'bg-white text-yellow-500 hover:bg-yellow-50 shadow-md'
        }`}
      >
        ⭐ <span className="hidden sm:inline">מועדפים</span><span className="sm:hidden">מועדפים</span>
        {favCount > 0 && (
          <span className={`ml-1 md:ml-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full font-bold ${
            showFavorites ? 'bg-white text-yellow-500' : 'bg-yellow-400 text-white'
          }`}>
            {favCount}
          </span>
        )}
      </button>
    </div>
  );
}
