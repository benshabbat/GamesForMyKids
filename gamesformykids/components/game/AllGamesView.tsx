"use client";

import { useMemo } from "react";
import GameCard from "./GameCard";
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import { useGridFillers } from "@/hooks";

interface Props {
  games?: GameRegistration[];
  isFiltered?: boolean;
}

export default function AllGamesView({ games: gamesProp, isFiltered = false }: Props) {
  const allGameRegistrations = useMemo(() => GamesRegistry.getAllGameRegistrations(), []);
  const games = gamesProp ?? allGameRegistrations;
  const fillerCount = useGridFillers(games.length);

  if (isFiltered && games.length === 0) {
    return (
      <div className="text-center py-16" dir="rtl">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-xl font-bold text-gray-600 mb-2">לא נמצאו משחקים</p>
        <p className="text-gray-400 text-sm">נסה מילות חיפוש שונות או קטגוריה אחרת</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-5 md:mb-8">
        {isFiltered
          ? `נמצאו ${games.length} משחקים`
          : `כל המשחקים (${games.length})`}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {games.map((game, index) => (
          <GameCard key={game.id} game={game} animationDelay={Math.min(index * 50, 600)} />
        ))}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`filler-${i}`} aria-hidden="true" className="invisible" />
        ))}
      </div>
    </div>
  );
}
