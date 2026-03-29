"use client";

import RecommendationsHeader from '../game/RecommendationsHeader';
import AgeGroupCard from '../game/AgeGroupCard';
import FeaturedGameCallToAction from '../game/FeaturedGameCallToAction';
import { useGameRecommendations } from './useGameRecommendations';

const GameRecommendations = () => {
  const { featuredGame, allGames, ageGroups } = useGameRecommendations();

  if (allGames.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mb-8 md:mb-12">
      <RecommendationsHeader 
        title="🎯 המלצות לפי גיל" 
        description="משחקים מותאמים לרמת הפיתוח של הילד" 
      />

      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {Object.entries(ageGroups).map(([ageKey, ageGroup]) => (
          <AgeGroupCard key={ageKey} ageGroup={ageGroup} />
        ))}
      </div>

      {featuredGame && <FeaturedGameCallToAction featuredGame={featuredGame} />}
    </div>
  );
};

export default GameRecommendations;
