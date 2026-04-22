"use client";

import { useMemo } from "react";
import GameCard from "./GameCard";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import { useFavoritesStore } from "@/lib/stores";
import { useGridFillers } from "@/hooks";

export default function FavoritesView() {
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const allGames = useMemo(() => GamesRegistry.getAllGameRegistrations(), []);
  const favoriteGames = useMemo(
    () => allGames.filter((g) => favoriteIds.includes(g.id)),
    [allGames, favoriteIds],
  );
  const fillerCount = useGridFillers(favoriteGames.length);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-5 md:mb-8">
        ⭐ המשחקים המועדפים שלי ({favoriteGames.length})
      </h2>
      {favoriteGames.length === 0 ? (
        <div className="text-center py-12 md:py-16">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">עדיין אין משחקים מועדפים</h3>
          <p className="text-gray-500 text-sm md:text-base">
            לחץ על הכוכב ⭐ על משחק כלשהו כדי להוסיף אותו לכאן
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {favoriteGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
          {Array.from({ length: fillerCount }).map((_, i) => (
            <div key={`filler-${i}`} aria-hidden="true" className="invisible" />
          ))}
        </div>
      )}
    </div>
  );
}
