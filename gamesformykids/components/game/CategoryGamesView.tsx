"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import GameCard from "./GameCard";
import { useHomePageStore } from "@/lib/stores";
import { GAME_CATEGORIES } from "@/lib/constants/gameCategories";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";
import { useGridFillers } from "@/hooks";
import { useAgeFilterStore, isAgeAppropriate } from "@/lib/stores/ageFilterStore";
import { useChampionshipStore } from "@/lib/stores/championshipStore";

const MIN_GAMES_FOR_CHAMPIONSHIP = 3;

function pickThreeRandom(ids: string[]): [string, string, string] {
  const pool = [...ids];
  const result: string[] = [];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const removed = pool.splice(idx, 1);
    result.push(removed[0]!);
  }
  return result as [string, string, string];
}

export default function CategoryGamesView() {
  const router = useRouter();
  const selectedCategory = useHomePageStore((s) => s.selectedCategory);
  const backToCategories = useHomePageStore((s) => s.backToCategories);
  const allGameRegistrations = useMemo(() => GamesRegistry.getAllGameRegistrations(), []);
  const ageRange = useAgeFilterStore((s) => s.ageRange);
  const { startChampionship } = useChampionshipStore();

  const category = selectedCategory ? GAME_CATEGORIES[selectedCategory] : null;
  const categoryGames = useMemo(
    () =>
      category
        ? allGameRegistrations.filter(
            (game) =>
              category.gameIds.includes(game.id) &&
              isAgeAppropriate(game.ageMin, ageRange),
          )
        : [],
    [category, allGameRegistrations, ageRange],
  );
  const availableGames = useMemo(() => categoryGames.filter(g => g.available), [categoryGames]);
  const fillerCount = useGridFillers(categoryGames.length);

  const handleStartChampionship = useCallback(() => {
    if (!selectedCategory || !category || availableGames.length < MIN_GAMES_FOR_CHAMPIONSHIP) return;
    const pickedIds = pickThreeRandom(availableGames.map(g => g.id));
    startChampionship(selectedCategory, category.title, pickedIds);
    router.push(`/championship/${selectedCategory}`);
  }, [selectedCategory, category, availableGames, startChampionship, router]);

  if (!selectedCategory || !category) return null;

  const canStartChampionship = availableGames.length >= MIN_GAMES_FOR_CHAMPIONSHIP;

  return (
    <div>
      <div className="text-center mb-4 md:mb-6">
        <button
          onClick={backToCategories}
          className="mb-3 md:mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition-colors text-sm md:text-base"
        >
          חזור לקטגוריות ←
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
          {category.title}
        </h2>
        <p className="text-sm md:text-lg text-gray-600 mb-2 md:mb-3 hidden sm:block">
          {category.description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-1">
          <div className="inline-block bg-blue-100 rounded-full px-3 py-1 md:px-4 md:py-2">
            <span className="text-blue-800 font-semibold text-sm md:text-base">
              {categoryGames.length} משחקים
              ({availableGames.length} זמינים)
            </span>
          </div>
          {canStartChampionship && (
            <button
              onClick={handleStartChampionship}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-linear-to-l from-amber-500 to-yellow-400 text-amber-900 font-bold text-sm hover:opacity-90 active:scale-95 transition-[transform,opacity] shadow"
            >
              🏆 התחל אליפות
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {categoryGames.length > 0 ? (
          <>
            {categoryGames.map((game, index) => (
              <GameCard key={game.id} game={game} animationDelay={Math.min(index * 50, 600)} />
            ))}
            {Array.from({ length: fillerCount }).map((_, i) => (
              <div key={`filler-${i}`} aria-hidden="true" className="invisible" />
            ))}
          </>
        ) : (
          <div className="col-span-full text-center py-8 md:py-12">
            <div className="text-5xl md:text-6xl mb-3 md:mb-4">🎮</div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">אין עדיין משחקים בקטגוריה זו</h3>
            <p className="text-gray-500 text-sm md:text-base">המשחקים בקטגוריה זו עדיין בפיתוח</p>
          </div>
        )}
      </div>
    </div>
  );
}
