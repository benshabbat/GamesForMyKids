"use client";

interface CategoryNavigationProps {
  selectedCategory: string | null;
  showAllGames: boolean;
  totalGamesCount: number;
  onShowCategories: () => void;
  onShowAllGames: () => void;
}

export default function CategoryNavigation({
  selectedCategory,
  showAllGames,
  totalGamesCount,
  onShowCategories,
  onShowAllGames
}: CategoryNavigationProps) {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      <button
        onClick={onShowCategories}
        className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
          !selectedCategory && !showAllGames
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
        }`}
      >
        📚 קטגוריות
      </button>
      <button
        onClick={onShowAllGames}
        className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
          showAllGames
            ? 'bg-purple-600 text-white shadow-lg'
            : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
        }`}
      >
        🎮 כל המשחקים ({totalGamesCount})
      </button>
    </div>
  );
}
