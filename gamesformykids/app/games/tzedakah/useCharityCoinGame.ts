'use client';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTzedakahStore } from './tzedakahStore';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { useRouter } from 'next/navigation';

export type { Coin } from './tzedakahStore';

export function useCharityCoinGame() {
  const { isMobile, gameWidth, gameHeight, basketX, basketWidth, basketHeight, gameStarted,
          score, gameTime, collectedCoins, startGame, moveBasket, stepBasket, setIsMobile } =
    useTzedakahStore(useShallow((s) => s));

  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [setIsMobile]);

  useEffect(() => {
    if (!gameStarted || isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); stepBasket(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); stepBasket(1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameStarted, isMobile, stepBasket]);

  const availableGames = GamesRegistry.getAllGameRegistrations()
    .filter(g => g.available).sort((a, b) => a.order - b.order);
  const idx      = availableGames.findIndex(g => g.id === 'tzedakah');
  const nextGame = idx < availableGames.length - 1 ? availableGames[idx + 1] : availableGames[0];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    moveBasket(e.clientX - rect.left - basketWidth / 2);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    moveBasket(e.touches[0].clientX - rect.left - basketWidth / 2);
  };

  return { isMobile, gameWidth, gameHeight, basketX, basketWidth, basketHeight, gameStarted,
           score, gameTime, collectedCoins, startGame, handleMouseMove, handleTouchMove, nextGame, router };
}
