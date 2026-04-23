"use client";

import { useMemo } from "react";
import { useHomePageStore } from "@/lib/stores";
import { useFavoritesStore } from "@/lib/stores";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

const TAB_BASE = "px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105";
const TAB_ACTIVE = "bg-purple-600 text-white shadow-lg";
const TAB_INACTIVE = "bg-white text-purple-600 hover:bg-purple-50 shadow-md";
const FAV_ACTIVE = "bg-yellow-400 text-white shadow-lg";
const FAV_INACTIVE = "bg-white text-yellow-500 hover:bg-yellow-50 shadow-md";

export default function CategoryNavigation() {
  const selectedCategory = useHomePageStore((s) => s.selectedCategory);
  const showAllGames = useHomePageStore((s) => s.showAllGames);
  const showFavorites = useHomePageStore((s) => s.showFavorites);
  const showCategoriesView = useHomePageStore((s) => s.showCategoriesView);
  const showAllGamesView = useHomePageStore((s) => s.showAllGamesView);
  const showFavoritesView = useHomePageStore((s) => s.showFavoritesView);

  const totalGamesCount = useMemo(
    () => GamesRegistry.getAllGameRegistrations().length,
    []
  );
  const favCount = useFavoritesStore((s) => s.favoriteIds.length);

  const isCategoriesActive = !selectedCategory && !showAllGames && !showFavorites;

  return (
    <nav aria-label="ניווט קטגוריות משחקים" dir="rtl">
      <div className="flex justify-center gap-2 md:gap-4 mb-6 md:mb-8 flex-wrap" role="tablist">
        <button
          role="tab"
          aria-selected={isCategoriesActive}
          onClick={showCategoriesView}
          className={`${TAB_BASE} ${isCategoriesActive ? TAB_ACTIVE : TAB_INACTIVE}`}
        >
          📚 קטגוריות
        </button>

        <button
          role="tab"
          aria-selected={showAllGames}
          onClick={showAllGamesView}
          className={`${TAB_BASE} ${showAllGames ? TAB_ACTIVE : TAB_INACTIVE}`}
        >
          🎮{" "}
          <span className="hidden sm:inline">כל המשחקים</span>
          <span className="sm:hidden">הכל</span>
          {" "}({totalGamesCount})
        </button>

        <button
          role="tab"
          aria-selected={showFavorites}
          onClick={showFavoritesView}
          className={`${TAB_BASE} ${showFavorites ? FAV_ACTIVE : FAV_INACTIVE} relative`}
        >
          ⭐ מועדפים
          {favCount > 0 && (
            <span
              aria-label={`${favCount} משחקים מועדפים`}
              className={`mr-1 md:mr-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full font-bold ${
                showFavorites ? "bg-white text-yellow-500" : "bg-yellow-400 text-white"
              }`}
            >
              {favCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

