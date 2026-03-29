"use client";

import { useDailyGame } from "./useDailyGame";
import Link from "next/link";

// Small client component just for the dynamic CTA button
export function DynamicCallToAction() {
  const { dailyGame, isClient } = useDailyGame();

  // Show loading state while client is initializing
  if (!isClient || !dailyGame) {
    return (
      <div className="mt-6">
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md opacity-50 animate-pulse cursor-not-allowed">
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
