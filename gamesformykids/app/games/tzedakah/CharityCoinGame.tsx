'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Coin {
  id: number;
  x: number;
  y: number;
  speed: number;
}

const CharityCoinGame: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [basketX, setBasketX] = useState(400);
  const [gameTime, setGameTime] = useState(60);
  const [coinId, setCoinId] = useState(0);

  const gameWidth = 800;
  const gameHeight = 600;
  const basketWidth = 100;
  const basketHeight = 60;

  // יצירת מטבע חדש
  const createCoin = useCallback(() => {
    if (!gameStarted || gameTime <= 0) return;
    
    const newCoin: Coin = {
      id: coinId,
      x: Math.random() * (gameWidth - 40),
      y: -40,
      speed: 2 + Math.random() * 3
    };
    
    setCoins(prev => [...prev, newCoin]);
    setCoinId(prev => prev + 1);
  }, [gameStarted, gameTime, coinId, gameWidth]);

  // עדכון מיקום המטבעות
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      setCoins(prev => 
        prev
          .map(coin => ({
            ...coin,
            y: coin.y + coin.speed
          }))
          .filter(coin => coin.y < gameHeight + 40)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [gameStarted, gameHeight]);

  // יצירת מטבעות חדשים
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(createCoin, 800);
    return () => clearInterval(interval);
  }, [createCoin, gameStarted]);

  // ספירה לאחור של הזמן
  useEffect(() => {
    if (!gameStarted || gameTime <= 0) return;

    const timer = setTimeout(() => {
      setGameTime(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameStarted, gameTime]);

  // סיום המשחק
  useEffect(() => {
    if (gameTime <= 0 && gameStarted) {
      setGameStarted(false);
    }
  }, [gameTime, gameStarted]);

  // בדיקת התנגשות עם הסל
  useEffect(() => {
    coins.forEach(coin => {
      if (
        coin.y + 40 >= gameHeight - basketHeight &&
        coin.y + 40 <= gameHeight &&
        coin.x + 40 >= basketX &&
        coin.x <= basketX + basketWidth
      ) {
        setScore(prev => prev + 10);
        setCoins(prev => prev.filter(c => c.id !== coin.id));
      }
    });
  }, [coins, basketX, basketWidth, basketHeight, gameHeight]);

  // התחלת משחק חדש
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameTime(60);
    setCoins([]);
    setCoinId(0);
    setBasketX(400);
  };

  // טיפול בתנועת העכבר
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameStarted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    setBasketX(Math.max(0, Math.min(gameWidth - basketWidth, mouseX - basketWidth / 2)));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-100 to-green-100 min-h-screen">
      <h1 className="text-4xl font-bold text-purple-800 mb-4 text-center">
        🪙 משחק קופת הצדקה 🪙
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex justify-between items-center gap-8">
          <div className="text-xl font-semibold text-blue-600">
            ניקוד: {score}
          </div>
          <div className="text-xl font-semibold text-red-600">
            זמן: {gameTime}
          </div>
        </div>
      </div>

      {!gameStarted && gameTime > 0 && (
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl mb-4 transition-colors"
        >
          התחל משחק!
        </button>
      )}

      {gameTime <= 0 && score > 0 && (
        <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 mb-4 text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-2">המשחק נגמר!</h2>
          <p className="text-xl text-gray-700 mb-3">הניקוד הסופי שלך: {score}</p>
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            שחק שוב
          </button>
        </div>
      )}

      <div
        className="relative bg-gradient-to-b from-sky-200 to-sky-300 border-4 border-gray-600 rounded-lg overflow-hidden cursor-none"
        style={{ width: gameWidth, height: gameHeight }}
        onMouseMove={handleMouseMove}
      >
        {/* רקע עם עננים */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-16 h-10 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-20 right-20 w-20 h-12 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-5 right-40 w-12 h-8 bg-white rounded-full opacity-50"></div>
        </div>

        {/* מטבעות */}
        {coins.map(coin => (
          <div
            key={coin.id}
            className="absolute w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full border-2 border-yellow-700 flex items-center justify-center text-xs font-bold text-yellow-900 shadow-lg animate-pulse"
            style={{
              left: coin.x,
              top: coin.y,
              transform: 'rotate(' + (coin.y * 2) + 'deg)'
            }}
          >
            ₪
          </div>
        ))}

        {/* הסל */}
        <div
          className="absolute bottom-0 bg-gradient-to-b from-brown-400 to-brown-600 rounded-t-full border-4 border-brown-700 flex items-center justify-center"
          style={{
            left: basketX,
            width: basketWidth,
            height: basketHeight,
            backgroundColor: '#8B4513',
            borderColor: '#654321'
          }}
        >
          <div className="text-white font-bold text-sm">קופת צדקה</div>
        </div>

        {/* הוראות */}
        {gameStarted && (
          <div className="absolute top-4 left-4 bg-white bg-opacity-80 rounded-lg p-3 text-sm">
            <div className="font-semibold text-purple-800">הוראות:</div>
            <div className="text-gray-700">הזז את העכבר כדי לתפוס מטבעות!</div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-gray-600 max-w-md">
        <p className="text-sm">
          הזז את העכבר כדי להזיז את קופת הצדקה ותפוס כמה שיותר מטבעות! 
          כל מטבע שתתפוס יוסיף 10 נקודות לציון שלך.
        </p>
      </div>
    </div>
  );
};

export default CharityCoinGame;
