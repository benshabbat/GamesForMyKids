"use client";

import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import Link from "next/link";
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

  if (!isClient || !randomGame) {
    return (
      <div className="mt-6">
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
          ✨ התחילו לשחק עכשיו! ✨
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Link href={randomGame.href} prefetch={true} className="inline-block">
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
          ✨ התחילו לשחק עכשיו! ✨
        </div>
      </Link>
    </div>
  );
}
