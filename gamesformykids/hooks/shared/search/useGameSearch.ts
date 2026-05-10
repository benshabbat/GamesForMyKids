'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GamesRegistry, GameRegistration } from '@/lib/registry/gamesRegistry';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import { useHomePageStore } from '@/lib/stores';

export function useGameSearch() {
  const router = useRouter();
  const showAllGamesView = useHomePageStore((s) => s.showAllGamesView);
  const [query, setQueryState] = useState('');
  const [activeCat, setActiveCatState] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';
    const cat = params.get('cat') ?? null;
    if (q) setQueryState(q);
    if (cat) setActiveCatState(cat);
    if (q || cat) showAllGamesView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateURL = useCallback(
    (q: string, cat: string | null) => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (cat) params.set('cat', cat);
      const search = params.toString();
      const url = search
        ? `${window.location.pathname}?${search}`
        : window.location.pathname;
      router.replace(url, { scroll: false });
    },
    [router],
  );

  const setQuery = useCallback(
    (q: string) => {
      setQueryState(q);
      updateURL(q, activeCat);
      if (q) showAllGamesView();
    },
    [activeCat, updateURL, showAllGamesView],
  );

  const setActiveCat = useCallback(
    (cat: string | null) => {
      setActiveCatState(cat);
      updateURL(query, cat);
      if (cat) showAllGamesView();
    },
    [query, updateURL, showAllGamesView],
  );

  const clearFilters = useCallback(() => {
    setQueryState('');
    setActiveCatState(null);
    updateURL('', null);
  }, [updateURL]);

  const allGames = useMemo(() => GamesRegistry.getAllGameRegistrations(), []);

  const filteredGames = useMemo((): GameRegistration[] => {
    let games = allGames;
    if (activeCat && GAME_CATEGORIES[activeCat]) {
      const ids = new Set(GAME_CATEGORIES[activeCat].gameIds);
      games = games.filter((g) => ids.has(g.id));
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      games = games.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q),
      );
    }
    return games;
  }, [allGames, query, activeCat]);

  return {
    query,
    setQuery,
    activeCat,
    setActiveCat,
    filteredGames,
    hasFilter: Boolean(query || activeCat),
    clearFilters,
  };
}
