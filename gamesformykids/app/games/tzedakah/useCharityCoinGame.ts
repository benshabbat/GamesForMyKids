'use client';

import { useState, useEffect, useCallback } from 'react';
import { GamesRegistry } from '@/lib/registry/gamesRegistry';
import { useRouter } from 'next/navigation';

export interface Coin {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
}

export function useCharityCoinGame() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [basketX, setBasketX] = useState(400);
  const [gameTime, setGameTime] = useState(60);
  const [coinId, setCoinId] = useState(0);
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  // זיהוי גדלי מסך
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gameWidth = isMobile ? 350 : 800;
  const gameHeight = isMobile ? 450 : 600;
  const basketWidth = isMobile ? 80 : 120;
  const basketHeight = isMobile ? 50 : 70;

  // מציאת המשחק הבא
  const availableGames = GamesRegistry.getAllGameRegistrations()
    .filter(game => game.available)
    .sort((a, b) => a.order - b.order);
  const currentIndex = availableGames.findIndex(game => game.id === 'tzedakah');
  const nextGame =
    currentIndex < availableGames.length - 1
      ? availableGames[currentIndex + 1]
      : availableGames[0];

  // יצירת מטבע חדש
  const createCoin = useCallback(() => {
    if (!gameStarted || gameTime <= 0) return;
    const coinSize = isMobile ? 32 : 48;
    const newCoin: Coin = {
      id: coinId,
      x: Math.random() * (gameWidth - coinSize),
      y: -coinSize,
      speed: 2 + Math.random() * 3,
      rotation: 0,
    };
    setCoins(prev => [...prev, newCoin]);
    setCoinId(prev => prev + 1);
  }, [gameStarted, gameTime, coinId, gameWidth, isMobile]);

  // עדכון מיקום מטבעות
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      const coinSize = isMobile ? 32 : 48;
      setCoins(prev =>
        prev
          .map(coin => ({
            ...coin,
            y: coin.y + coin.speed,
            rotation: coin.rotation + 5,
          }))
          .filter(coin => coin.y < gameHeight + coinSize)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [gameStarted, gameHeight, isMobile]);

  // יצירת מטבעות חדשים
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(createCoin, 800);
    return () => clearInterval(interval);
  }, [createCoin, gameStarted]);

  // ספירה לאחור
  useEffect(() => {
    if (!gameStarted || gameTime <= 0) return;
    const timer = setTimeout(() => setGameTime(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameStarted, gameTime]);

  // סיום משחק
  useEffect(() => {
    if (gameTime <= 0 && gameStarted) setGameStarted(false);
  }, [gameTime, gameStarted]);

  // מקשי חצים
  useEffect(() => {
    if (!gameStarted || isMobile) return;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setBasketX(prev => Math.max(0, prev - 20));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setBasketX(prev => Math.min(gameWidth - basketWidth, prev + 20));
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, isMobile, gameWidth, basketWidth]);

  // בדיקת התנגשות
  useEffect(() => {
    const coinSize = isMobile ? 32 : 48;
    coins.forEach(coin => {
      if (
        coin.y + coinSize >= gameHeight - basketHeight &&
        coin.y + coinSize <= gameHeight &&
        coin.x + coinSize >= basketX &&
        coin.x <= basketX + basketWidth
      ) {
        setScore(prev => prev + 10);
        setCollectedCoins(prev => prev + 1);
        setCoins(prev => prev.filter(c => c.id !== coin.id));
      }
    });
  }, [coins, basketX, basketWidth, basketHeight, gameHeight, isMobile]);

  // התחלת משחק חדש
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameTime(60);
    setCoins([]);
    setCoinId(0);
    setBasketX(isMobile ? 135 : 340);
    setCollectedCoins(0);
  };

  // תנועת עכבר
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameStarted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    setBasketX(Math.max(0, Math.min(gameWidth - basketWidth, mouseX - basketWidth / 2)));
  };

  // תנועת מגע
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gameStarted) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const touchX = touch.clientX - rect.left;
    setBasketX(Math.max(0, Math.min(gameWidth - basketWidth, touchX - basketWidth / 2)));
  };

  return {
    coins,
    score,
    gameStarted,
    basketX,
    gameTime,
    collectedCoins,
    isMobile,
    gameWidth,
    gameHeight,
    basketWidth,
    basketHeight,
    nextGame,
    startGame,
    handleMouseMove,
    handleTouchMove,
    router,
  };
}
