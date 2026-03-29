"use client";

import { useState, useEffect, useMemo } from "react";
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";

export interface AgeGroup {
  title: string;
  icon: string;
  description: string;
  recommendedGames: GameRegistration[];
}

export interface UseGameRecommendationsReturn {
  featuredGame: GameRegistration | null;
  allGames: GameRegistration[];
  ageGroups: Record<string, AgeGroup>;
}

export function useGameRecommendations(): UseGameRecommendationsReturn {
  const [featuredGame, setFeaturedGame] = useState<GameRegistration | null>(null);

  const allGames = useMemo(
    () => GamesRegistry.getAllGameRegistrations().filter((game) => game.available),
    []
  );

  useEffect(() => {
    if (allGames.length === 0) return;
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
    setFeaturedGame(allGames[dayOfYear % allGames.length]);
  }, [allGames]);

  const ageGroups = useMemo<Record<string, AgeGroup>>(
    () => ({
      "2-3": {
        title: "גיל 2-3",
        icon: "👶",
        description: "משחקים פשוטים ובסיסיים",
        recommendedGames: allGames
          .filter(
            (g) =>
              g.id.includes("colors") ||
              g.id.includes("shapes") ||
              g.id.includes("bubbles")
          )
          .slice(0, 3),
      },
      "3-4": {
        title: "גיל 3-4",
        icon: "🧒",
        description: "למידה והכרת מושגים",
        recommendedGames: allGames
          .filter(
            (g) =>
              g.id.includes("hebrew-letters") ||
              g.id.includes("counting") ||
              g.id.includes("memory")
          )
          .slice(0, 3),
      },
      "4-5": {
        title: "גיל 4-5",
        icon: "👦",
        description: "אתגרים וחשיבה מתקדמת",
        recommendedGames: allGames
          .filter(
            (g) =>
              g.id.includes("math") ||
              g.id.includes("puzzles") ||
              g.id.includes("building")
          )
          .slice(0, 3),
      },
    }),
    [allGames]
  );

  return { featuredGame, allGames, ageGroups };
}
