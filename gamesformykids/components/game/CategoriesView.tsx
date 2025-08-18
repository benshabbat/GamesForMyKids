"use client";

import CategoryCard from "./CategoryCard";

interface Category {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  gradient: string;
  gameIds: string[];
}

interface GameRegistration {
  id: string;
  title: string;
  description: string;
  href: string;
  available: boolean;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface CategoriesViewProps {
  categories: Record<string, Category>;
  allGameRegistrations: GameRegistration[];
  onCategorySelect: (categoryKey: string) => void;
}

export default function CategoriesView({
  categories,
  allGameRegistrations,
  onCategorySelect
}: CategoriesViewProps) {
  const getGamesByCategory = (categoryKey: string) => {
    const category = categories[categoryKey];
    if (!category) return [];
    
    return allGameRegistrations.filter(game => category.gameIds.includes(game.id));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        בחר קטגוריה 📚
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categories).map(([key, category]) => {
          const categoryGames = getGamesByCategory(key);
          const gamesCount = categoryGames.length;
          const availableCount = categoryGames.filter(g => g.available).length;
          
          return (
            <CategoryCard
              key={key}
              categoryKey={key}
              category={category}
              gamesCount={gamesCount}
              availableCount={availableCount}
              onClick={() => onCategorySelect(key)}
            />
          );
        })}
      </div>
    </div>
  );
}
