"use client";

import GameCard from "./GameCard";
import { Category, GameRegistration } from "@/lib/types";

interface CategoryGamesViewProps {
  selectedCategory: string;
  categories: Record<string, Category>;
  allGameRegistrations: GameRegistration[];
  onBackToCategories: () => void;
}

export default function CategoryGamesView({
  selectedCategory,
  categories,
  allGameRegistrations,
  onBackToCategories
}: CategoryGamesViewProps) {
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
      <div className="text-center mb-6">
        <button
          onClick={onBackToCategories}
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-colors"
        >
          → חזור לקטגוריות
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {category.title}
        </h2>
        <p className="text-lg text-gray-600 mb-3">
          {category.description}
        </p>
        <div className="inline-block bg-blue-100 rounded-full px-4 py-2">
          <span className="text-blue-800 font-semibold">
            {categoryGames.length} משחקים 
            ({categoryGames.filter(g => g.available).length} זמינים)
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryGames.length > 0 ? (
          categoryGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">אין עדיין משחקים בקטגוריה זו</h3>
            <p className="text-gray-500">המשחקים בקטגוריה זו עדיין בפיתוח</p>
          </div>
        )}
      </div>
    </div>
  );
}
