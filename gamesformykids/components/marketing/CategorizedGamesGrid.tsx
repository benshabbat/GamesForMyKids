"use client";

import CategoryNavigation from '../game/CategoryNavigation';
import CategoriesView from '../game/CategoriesView';
import CategoryGamesView from '../game/CategoryGamesView';
import AllGamesView from '../game/AllGamesView';
import { useHomePageStore } from '@/lib/stores';

const CategorizedGamesGrid = () => {
  const selectedCategory = useHomePageStore((s) => s.selectedCategory);
  const showAllGames = useHomePageStore((s) => s.showAllGames);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <CategoryNavigation />
      {!selectedCategory && !showAllGames && <CategoriesView />}
      {selectedCategory && <CategoryGamesView />}
      {showAllGames && <AllGamesView />}
    </div>
  );
};

export default CategorizedGamesGrid;
