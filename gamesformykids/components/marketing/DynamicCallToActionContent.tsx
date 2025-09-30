"use client";

import { useState, useEffect } from "react";
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import Link from "next/link";

// Function to get a consistent game based on date
function getDailyGame(): GameRegistration {
  const availableGames = GamesRegistry.getAllGameRegistrations().filter(
    (game) => game.available
  );
  
  if (availableGames.length === 0) {
    // Fallback game
    return {
      id: "colors",
      title: "🎨 משחק צבעים 🎨", 
      description: "למד צבעים!",
      icon: () => null,
      color: "bg-blue-400",
      href: "/games/colors",
      available: true,
      order: 1
    };
  }
  
  // Use current date to select consistent game across server and client
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return availableGames[dayOfYear % availableGames.length];
}

// Small client component just for the dynamic CTA button
export default function DynamicCallToActionContent() {
  const [dailyGame, setDailyGame] = useState<GameRegistration | null>(null);

  useEffect(() => {
    // This will only run on client side since this component is loaded with ssr: false
    setDailyGame(getDailyGame());
  }, []);

  // Show loading state while client is initializing
  if (!dailyGame) {
    return (
      <div className="mt-6">
        <div className="inline-block bg-gradient-to-r from-gray-300 to-gray-300 text-gray-500 px-8 py-3 rounded-full font-bold text-lg shadow-md animate-pulse cursor-not-allowed">
          ✨ טוען... ✨
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <Link href={dailyGame.href} className="inline-block">
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 cursor-pointer">
          ✨ התחילו לשחק עכשיו! ✨
        </div>
      </Link>
    </div>
  );
}