"use client";

import CategoryCard from "./CategoryCard";
import { ComponentTypes } from "@/lib/types";

export default function CategoriesView({
  categories,
  allGameRegistrations,
  onCategorySelect
}: ComponentTypes.CategoriesViewProps) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-5 md:mb-8">
        בחר קטגוריה 📚
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {Object.entries(categories).map(([key, category]) => {
          const gamesCount = allGameRegistrations.filter(game =>
            category.gameIds.includes(game.id)
          ).length;

          return (
            <CategoryCard
              key={key}
              category={category}
              gamesCount={gamesCount}
              onClick={() => onCategorySelect(key)}
            />
          );
        })}
      </div>
    </div>
  );
}
