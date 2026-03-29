"use client";

import GameCard from "./GameCard";
import { ComponentTypes } from "@/lib/types";

export default function CategoryGamesView({
  selectedCategory,
  categories,
  allGameRegistrations,
  onBackToCategories
}: ComponentTypes.CategoryGamesViewProps) {
  const category = categories[selectedCategory];
  
  const getGamesByCategory = (categoryKey: string) => {
    const cat = categories[categoryKey];
    if (!cat) return [];
    
    return allGameRegistrations.filter(game => cat.gameIds.includes(game.id));
  };

  const categoryGames = getGamesByCategory(selectedCategory);

  if (!category) return null;

  return (
    <div>
      <div className="text-center mb-4 md:mb-6">
        <button
          onClick={onBackToCategories}
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
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {categoryGames.length > 0 ? (
          categoryGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
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
