"use client";

import CategoryNavigation from '../game/CategoryNavigation';
import CategoriesView from '../game/CategoriesView';
import CategoryGamesView from '../game/CategoryGamesView';
import AllGamesView from '../game/AllGamesView';
import { useCategorizedGames } from './useCategorizedGames';

const CategorizedGamesGrid = () => {
  const {
    selectedCategory,
    showAllGames,
    allGameRegistrations,
    totalGamesCount,
    categories,
    handleShowCategories,
    handleShowAllGames,
    handleCategorySelect,
    handleBackToCategories,
  } = useCategorizedGames();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <CategoryNavigation
        selectedCategory={selectedCategory}
        showAllGames={showAllGames}
        totalGamesCount={totalGamesCount}
        onShowCategories={handleShowCategories}
        onShowAllGames={handleShowAllGames}
      />

      {!selectedCategory && !showAllGames && (
        <CategoriesView
          categories={categories}
          allGameRegistrations={allGameRegistrations}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {selectedCategory && (
        <CategoryGamesView
          selectedCategory={selectedCategory}
          categories={categories}
          allGameRegistrations={allGameRegistrations}
          onBackToCategories={handleBackToCategories}
        />
      )}

      {showAllGames && (
        <AllGamesView
          allGameRegistrations={allGameRegistrations}
          totalGamesCount={totalGamesCount}
        />
      )}
    </div>
  );
};

export default CategorizedGamesGrid;
