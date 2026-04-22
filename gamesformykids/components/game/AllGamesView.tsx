"use client";

import { useMemo } from "react";
import GameCard from "./GameCard";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import { useGridFillers } from "@/hooks";

export default function AllGamesView() {
  const allGameRegistrations = useMemo(() => GamesRegistry.getAllGameRegistrations(), []);
  const totalGamesCount = allGameRegistrations.length;
  const fillerCount = useGridFillers(totalGamesCount);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-5 md:mb-8">
        כל המשחקים ({totalGamesCount})
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {allGameRegistrations.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`filler-${i}`} aria-hidden="true" className="invisible" />
        ))}
      </div>
    </div>
  );
}
