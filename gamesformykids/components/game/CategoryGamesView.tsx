"use client";

import { useMemo } from "react";
import GameCard from "./GameCard";
import { useHomePageStore } from "@/lib/stores";
import { GAME_CATEGORIES } from "@/lib/constants/gameCategories";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import { useGridFillers } from "@/hooks";

export default function CategoryGamesView() {
  const selectedCategory = useHomePageStore((s) => s.selectedCategory);
  const backToCategories = useHomePageStore((s) => s.backToCategories);
  const allGameRegistrations = useMemo(() => GamesRegistry.getAllGameRegistrations(), []);

  const category = selectedCategory ? GAME_CATEGORIES[selectedCategory] : null;
  const categoryGames = useMemo(
    () => (category ? allGameRegistrations.filter(game => category.gameIds.includes(game.id)) : []),
    [category, allGameRegistrations]
  );
  const fillerCount = useGridFillers(categoryGames.length);

  if (!selectedCategory || !category) return null;

  return (
    <div>
      <div className="text-center mb-4 md:mb-6">
        <button
          onClick={backToCategories}
          className="mb-3 md:mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-colors text-sm md:text-base"
        >
          → חזור לקטגוריות
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
          {category.title}
        </h2>
        <p className="text-sm md:text-lg text-gray-600 mb-2 md:mb-3 hidden sm:block">
          {category.description}
        </p>
        <div className="inline-block bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-2">
          <span className="text-blue-800 font-semibold text-sm md:text-base">
            {categoryGames.length} משחקים 
            ({categoryGames.filter(g => g.available).length} זמינים)
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {categoryGames.length > 0 ? (
          <>
            {categoryGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
            {Array.from({ length: fillerCount }).map((_, i) => (
              <div key={`filler-${i}`} aria-hidden="true" className="invisible" />
            ))}
          </>
        ) : (
          <div className="col-span-full text-center py-8 md:py-12">
            <div className="text-5xl md:text-6xl mb-3 md:mb-4">🎮</div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">אין עדיין משחקים בקטגוריה זו</h3>
            <p className="text-gray-500 text-sm md:text-base">המשחקים בקטגוריה זו עדיין בפיתוח</p>
          </div>
        )}
      </div>
    </div>
  );
}
