"use client";

import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import Link from "next/link";
import { useMemo } from "react";

// Small client component just for the dynamic CTA button
export function DynamicCallToAction() {
  // Memoize the expensive game registry operations
  const randomGame = useMemo(() => {
    const availableGames = GamesRegistry.getAllGameRegistrations().filter(
      (game) => game.available
    );
    if (availableGames.length === 0) return null;
    
    return availableGames[Math.floor(Math.random() * availableGames.length)];
  }, []);

  if (!randomGame) return null;

  return (
    <div className="mt-6">
      <Link href={randomGame.href} prefetch={true}>
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          ✨ התחילו לשחק עכשיו! ✨
        </div>
      </Link>
    </div>
  );
}
