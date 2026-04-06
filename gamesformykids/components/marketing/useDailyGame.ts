'use client';

import { useEffect } from 'react';
import { GamesRegistry, GameRegistration } from '@/lib/registry/gamesRegistry';
import { useFeaturedGameStore } from '@/lib/stores/featuredGameStore';

function getDailyGame(): GameRegistration {
  const availableGames = GamesRegistry.getAllGameRegistrations().filter(game => game.available);

  if (availableGames.length === 0) {
    return {
      id: 'colors',
      title: '🎨 משחק צבעים 🎨',
      description: 'למד צבעים!',
      icon: () => null,
      color: 'bg-blue-400',
      href: '/games/colors',
      available: true,
      order: 1,
    };
  }

  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  return availableGames[dayOfYear % availableGames.length];
}

export function useDailyGame() {
  const dailyGame = useFeaturedGameStore((s) => s.featuredGame);
  const isClient = useFeaturedGameStore((s) => s.isClient);
  const setFeaturedGame = useFeaturedGameStore((s) => s.setFeaturedGame);
  const setIsClient = useFeaturedGameStore((s) => s.setIsClient);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
      setFeaturedGame(getDailyGame());
    }
  }, [isClient, setIsClient, setFeaturedGame]);

  return { dailyGame, isClient };
}
