"use client";

import { useEffect } from "react";
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import { useFeaturedGameStore } from "@/lib/stores/featuredGameStore";

/**
 * בוחר את "משחק היום" על בסיס התאריך.
 * הפעלה רק בצד הקליינט למניעת hydration mismatch.
 */
function getDailyFeaturedGame(): GameRegistration {
  const availableGames = GamesRegistry.getAllGameRegistrations().filter(
    (game) => game.available
  );

  if (availableGames.length === 0) {
    return {
      id: "colors",
      title: "🎨 משחק צבעים 🎨",
      description: "למד צבעים דרך משחק מהנה ואינטראקטיבי!",
      icon: () => null,
      color: "bg-blue-400",
      href: "/games/colors",
      available: true,
      order: 1,
    };
  }

  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
  return availableGames[dayOfYear % availableGames.length];
}

export interface UseFeaturedGameReturn {
  featuredGame: GameRegistration | null;
  isClient: boolean;
}

export function useFeaturedGame(): UseFeaturedGameReturn {
  const featuredGame = useFeaturedGameStore((s) => s.featuredGame);
  const isClient = useFeaturedGameStore((s) => s.isClient);
  const setFeaturedGame = useFeaturedGameStore((s) => s.setFeaturedGame);
  const setIsClient = useFeaturedGameStore((s) => s.setIsClient);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
      setFeaturedGame(getDailyFeaturedGame());
    }
  }, [isClient, setIsClient, setFeaturedGame]);

  return { featuredGame, isClient };
}
