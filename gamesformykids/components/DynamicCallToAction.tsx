"use client";

import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import { useState, useEffect } from "react";

// Small client component just for the dynamic CTA button
export function DynamicCallToAction() {
  const [randomGame, setRandomGame] = useState<GameRegistration | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const availableGames = GamesRegistry.getAllGameRegistrations().filter(
      (game) => game.available
    );
    if (availableGames.length > 0) {
      const selectedGame = availableGames[Math.floor(Math.random() * availableGames.length)];
      setRandomGame(selectedGame);
    }
  }, []);

  // Always render the same structure to prevent hydration mismatch
  // Only change the onClick behavior after client hydration
  return (
    <div className="mt-6">
      <div 
        className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 cursor-pointer"
        onClick={() => {
          if (isClient && randomGame) {
            window.location.href = randomGame.href;
          }
        }}
      >
        ✨ התחילו לשחק עכשיו! ✨
      </div>
    </div>
  );
}
