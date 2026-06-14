'use client';
import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTzedakahStore } from './tzedakahStore';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { useRouter } from 'next/navigation';

export type { Coin } from './tzedakahStore';

export function useCharityCoinGame() {
  const { isMobile, gameWidth, gameHeight, basketX, basketWidth, basketHeight,
          gameStarted, score, gameTime, collectedCoins, coins } =
    useTzedakahStore(useShallow((s) => ({
      isMobile: s.isMobile, gameWidth: s.gameWidth, gameHeight: s.gameHeight,
      basketX: s.basketX, basketWidth: s.basketWidth, basketHeight: s.basketHeight,
      gameStarted: s.gameStarted, score: s.score, gameTime: s.gameTime,
      collectedCoins: s.collectedCoins, coins: s.coins,
    })));

  const { startGame, moveBasket, stepBasket, setIsMobile, tickCoins, spawnCoin, timerTick } =
    useTzedakahStore(useShallow((s) => ({
      startGame: s.startGame, moveBasket: s.moveBasket, stepBasket: s.stepBasket,
      setIsMobile: s.setIsMobile, tickCoins: s.tickCoins, spawnCoin: s.spawnCoin,
      timerTick: s.timerTick,
    })));

  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [setIsMobile]);

  useEffect(() => {
    if (!gameStarted) return;
    const id = setInterval(tickCoins, 16);
    return () => clearInterval(id);
  }, [gameStarted, tickCoins]);

  useEffect(() => {
    if (!gameStarted) return;
    const id = setInterval(spawnCoin, 800);
    return () => clearInterval(id);
  }, [gameStarted, spawnCoin]);

  useEffect(() => {
    if (!gameStarted) return;
    const id = setInterval(timerTick, 1000);
    return () => clearInterval(id);
  }, [gameStarted, timerTick]);

  useEffect(() => {
    if (!gameStarted || isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); stepBasket(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); stepBasket(1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameStarted, isMobile, stepBasket]);

  const nextGame = useMemo(() => {
    const all = GamesRegistry.getAllGameRegistrations()
      .filter(g => g.available).sort((a, b) => a.order - b.order);
    const idx = all.findIndex(g => g.id === 'tzedakah');
    return idx < all.length - 1 ? all[idx + 1] : all[0];
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    moveBasket(e.clientX - rect.left - basketWidth / 2);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    moveBasket(e.touches[0]!.clientX - rect.left - basketWidth / 2);
  };

  return { isMobile, gameWidth, gameHeight, basketX, basketWidth, basketHeight, gameStarted,
           score, gameTime, collectedCoins, coins, startGame, handleMouseMove, handleTouchMove, nextGame, router };
}
