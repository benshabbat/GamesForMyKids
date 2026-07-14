'use client';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { GamesRegistry, GameRegistration } from '@/lib/registry/gamesRegistry';
import { GAME_CATEGORIES } from '@/lib/constants/gameCategories';
import { useHomePageStore } from '@/lib/stores';
import { useAgeFilterStore, isAgeAppropriate } from '@/lib/stores/ageFilterStore';

const URL_SYNC_DEBOUNCE_MS = 300;

export function useGameSearch() {
  const showAllGamesView = useHomePageStore((s) => s.showAllGamesView);
  const ageRange = useAgeFilterStore((s) => s.ageRange);
  const [query, setQueryState] = useState('');
  const [activeCat, setActiveCatState] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';
    const cat = params.get('cat') ?? null;
    if (q) setQueryState(q);
    if (cat) setActiveCatState(cat);
    if (q || cat) showAllGamesView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clear any pending debounced URL sync on unmount.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Writes the URL directly via the native History API instead of
  // next/navigation's router.replace(). This route never needs a server
  // re-render for `q`/`cat` (filtering is entirely client-side via
  // filteredGames below) — it's purely for shareable/bookmarkable links and
  // back/forward support. Next's router.replace(url, { scroll: false })
  // still resets window.scrollY to 0 a few hundred ms after the call in
  // this app's Next 16 setup (verified live: the reset lands right after
  // router.replace's internal history.replaceState, well after any
  // content-height change, so it isn't a layout-driven scroll clamp — it's
  // the router itself, and `scroll: false` doesn't suppress it here).
  // Bypassing the router for this URL-only sync avoids that reset entirely.
  const writeURL = useCallback((q: string, cat: string | null) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat) params.set('cat', cat);
    const search = params.toString();
    const url = search
      ? `${window.location.pathname}?${search}`
      : window.location.pathname;
    window.history.replaceState(window.history.state, '', url);
  }, []);

  // Debounced so fast typing doesn't push a router.replace on every keystroke.
  const updateURL = useCallback(
    (q: string, cat: string | null) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        writeURL(q, cat);
      }, URL_SYNC_DEBOUNCE_MS);
    },
    [writeURL],
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
    if (debounceRef.current) clearTimeout(debounceRef.current);
    writeURL('', null);
  }, [writeURL]);

  const allGames = useMemo(() => GamesRegistry.getAllGameRegistrations(), []);

  const filteredGames = useMemo((): GameRegistration[] => {
    let games = allGames.filter((g) => isAgeAppropriate(g.ageMin, ageRange));

    if (activeCat && GAME_CATEGORIES[activeCat]) {
      const ids = new Set(GAME_CATEGORIES[activeCat].gameIds);
      games = games.filter((g) => ids.has(g.id));
    }
    if (!query.trim()) return games;

    const q = query.trim().toLowerCase();

    type Scored = { game: GameRegistration; score: number };
    const scored = games.reduce<Scored[]>((acc, g) => {
      const title = g.title.toLowerCase();
      const desc  = g.description.toLowerCase();
      const id    = g.id.toLowerCase();

      let score = 0;
      if (g.emoji === q)              score = 5; // emoji exact
      else if (title === q || id === q) score = 4; // exact title / id
      else if (title.startsWith(q))    score = 3; // title starts with
      else if (title.includes(q) || id.includes(q)) score = 2; // title / id contains
      else if (desc.includes(q))       score = 1; // description contains

      if (score > 0) acc.push({ game: g, score });
      return acc;
    }, []);

    return scored.sort((a, b) => b.score - a.score).map(({ game }) => game);
  }, [allGames, query, activeCat, ageRange]);

  return {
    query,
    setQuery,
    activeCat,
    setActiveCat,
    filteredGames,
    hasFilter: Boolean(query || activeCat),
    ageRange,
    clearFilters,
  };
}
