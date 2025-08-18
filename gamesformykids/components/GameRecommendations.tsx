"use client";

import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import RecommendationsHeader from './game/RecommendationsHeader';
import AgeGroupCard from './game/AgeGroupCard';
import FeaturedGameCallToAction from './game/FeaturedGameCallToAction';

const GameRecommendations = () => {
  const allGames = GamesRegistry.getAllGameRegistrations().filter(game => game.available);
    // יצירת "משחק היום" על בסיס התאריך
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const featuredGame = allGames[dayOfYear % allGames.length];
  // קטגוריזציה לפי גיל (דמה - אפשר להוסיף מאפיין age למשחקים)
  const ageGroups = {
    "2-3": {
      title: "גיל 2-3",
      icon: "👶",
      description: "משחקים פשוטים ובסיסיים",
      recommendedGames: allGames.filter(game => 
        game.id.includes('colors') || 
        game.id.includes('shapes') || 
        game.id.includes('bubbles')
      ).slice(0, 3)
    },
    "3-4": {
      title: "גיל 3-4", 
      icon: "🧒",
      description: "למידה והכרת מושגים",
      recommendedGames: allGames.filter(game => 
        game.id.includes('hebrew-letters') || 
        game.id.includes('counting') || 
        game.id.includes('memory')
      ).slice(0, 3)
    },
    "4-5": {
      title: "גיל 4-5",
      icon: "👦",
      description: "אתגרים וחשיבה מתקדמת", 
      recommendedGames: allGames.filter(game => 
        game.id.includes('math') || 
        game.id.includes('puzzles') || 
        game.id.includes('building')
      ).slice(0, 3)
    }
  };

  if (allGames.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mb-12">
      <RecommendationsHeader 
        title="🎯 המלצות לפי גיל" 
        description="משחקים מותאמים לרמת הפיתוח של הילד" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(ageGroups).map(([ageKey, ageGroup]) => (
          <AgeGroupCard key={ageKey} ageGroup={ageGroup} />
        ))}
      </div>

      <FeaturedGameCallToAction featuredGame={featuredGame} />
    </div>
  );
};

export default GameRecommendations;
