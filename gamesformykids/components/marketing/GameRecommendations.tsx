"use client";

import { useEffect } from 'react';
import RecommendationsHeader from '../game/RecommendationsHeader';
import AgeGroupCard from '../game/AgeGroupCard';
import FeaturedGameCallToAction from '../game/FeaturedGameCallToAction';
import { useFeaturedGameStore } from '@/lib/stores/featuredGameStore';

const GameRecommendations = () => {
  const initialize = useFeaturedGameStore((s) => s.initialize);
  const ageGroupKeys = useFeaturedGameStore((s) => s.ageGroupKeys);
  const hasFeaturedGame = useFeaturedGameStore((s) => s.featuredGame !== null);

  useEffect(() => { initialize(); }, [initialize]);

  if (ageGroupKeys.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mb-8 md:mb-12">
      <RecommendationsHeader 
        title="🎯 המלצות לפי גיל" 
        description="משחקים מותאמים לרמת הפיתוח של הילד" 
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {ageGroupKeys.map((ageKey) => (
          <AgeGroupCard key={ageKey} ageKey={ageKey} />
        ))}
      </div>

      {hasFeaturedGame && <FeaturedGameCallToAction />}
    </div>
  );
};

export default GameRecommendations;
