"use client";

import { useEffect } from "react";
import { GameRegistration } from "@/lib/registry/gamesRegistry";
import { useFeaturedGameStore } from "@/lib/stores/featuredGameStore";

export interface UseFeaturedGameReturn {
  featuredGame: GameRegistration | null;
  isClient: boolean;
}

export function useFeaturedGame(): UseFeaturedGameReturn {
  const featuredGame = useFeaturedGameStore((s) => s.featuredGame);
  const isInitialized = useFeaturedGameStore((s) => s.isInitialized);
  const initialize = useFeaturedGameStore((s) => s.initialize);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return { featuredGame, isClient: isInitialized };
}
