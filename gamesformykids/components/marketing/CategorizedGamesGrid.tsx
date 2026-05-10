"use client";

import CategoryNavigation from '../game/CategoryNavigation';
import CategoriesView from '../game/CategoriesView';
import CategoryGamesView from '../game/CategoryGamesView';
import AllGamesView from '../game/AllGamesView';
import FavoritesView from '../game/FavoritesView';
import { GameSearchBar } from '../game/GameSearchBar';
import { useHomePageStore } from '@/lib/stores';
import { useGameSearch } from '@/hooks/shared/search/useGameSearch';

const CategorizedGamesGrid = () => {
  const selectedCategory = useHomePageStore((s) => s.selectedCategory);
  const showAllGames = useHomePageStore((s) => s.showAllGames);
  const showFavorites = useHomePageStore((s) => s.showFavorites);
  const { query, setQuery, activeCat, setActiveCat, filteredGames, hasFilter, clearFilters } =
    useGameSearch();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <GameSearchBar
        query={query}
        onQueryChange={setQuery}
        activeCat={activeCat}
        onCatChange={setActiveCat}
        hasFilter={hasFilter}
        onClear={clearFilters}
      />
      <CategoryNavigation />
      {!selectedCategory && !showAllGames && !showFavorites && <CategoriesView />}
      {selectedCategory && <CategoryGamesView />}
      {showAllGames && <AllGamesView games={filteredGames} isFiltered={hasFilter} />}
      {showFavorites && <FavoritesView />}
    </div>
  );
};

export default CategorizedGamesGrid;
