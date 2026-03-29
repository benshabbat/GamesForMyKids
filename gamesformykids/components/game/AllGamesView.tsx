"use client";

import GameCard from "./GameCard";
import { ComponentTypes } from "@/lib/types";

export default function AllGamesView({
  allGameRegistrations,
  totalGamesCount
}: ComponentTypes.AllGamesViewProps) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-5 md:mb-8">
        כל המשחקים ({totalGamesCount})
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {allGameRegistrations.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
