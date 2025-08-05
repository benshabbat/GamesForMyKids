'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Coin {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
}

const CharityCoinGame: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [basketX, setBasketX] = useState(400);
  const [gameTime, setGameTime] = useState(60);
  const [coinId, setCoinId] = useState(0);
  const [collectedCoins, setCollectedCoins] = useState(0);

  const gameWidth = 800;
  const gameHeight = 600;
  const basketWidth = 120;
  const basketHeight = 70;

  // יצירת מטבע חדש
  const createCoin = useCallback(() => {
    if (!gameStarted || gameTime <= 0) return;
    
    const newCoin: Coin = {
      id: coinId,
      x: Math.random() * (gameWidth - 40),
      y: -40,
      speed: 2 + Math.random() * 3,
      rotation: 0
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
            y: coin.y + coin.speed,
            rotation: coin.rotation + 5
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
        setCollectedCoins(prev => prev + 1);
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
    setCollectedCoins(0);
  };

  // טיפול בתנועת העכבר
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameStarted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    setBasketX(Math.max(0, Math.min(gameWidth - basketWidth, mouseX - basketWidth / 2)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* כותרת מעוצבת */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mb-2 drop-shadow-lg">
            🪙 משחק קופת הצדקה 🪙
          </h1>
          <p className="text-xl text-purple-700 font-semibold">
            עזרו לתרום ולעשות מעשים טובים!
          </p>
        </div>
        
        {/* לוח תוצאות מעוצב */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-yellow-300">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {score}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  💰 ניקוד
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-1">
                  {gameTime}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  ⏰ זמן
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {collectedCoins}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  🪙 מטבעות
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* כפתורי התחלה וסיום */}
        <div className="flex justify-center mb-6">
          {!gameStarted && gameTime > 0 && (
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-300"
            >
              🎮 התחל משחק!
            </button>
          )}

          {gameTime <= 0 && score > 0 && (
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-400 rounded-2xl p-6 text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-purple-800 mb-3">המשחק נגמר!</h2>
              <p className="text-xl text-gray-700 mb-2">הניקוד הסופי שלך: <span className="font-bold text-blue-600">{score}</span></p>
              <p className="text-lg text-gray-600 mb-4">תפסת <span className="font-bold text-green-600">{collectedCoins}</span> מטבעות! 🪙</p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🔄 שחק שוב
              </button>
            </div>
          )}
        </div>

        {/* איזור המשחק מעוצב */}
        <div className="flex justify-center">
          <div
            className="relative bg-gradient-to-b from-sky-200 via-sky-300 to-blue-400 border-8 border-white rounded-3xl overflow-hidden shadow-2xl cursor-none"
            style={{ width: gameWidth, height: gameHeight }}
            onMouseMove={handleMouseMove}
          >
            {/* רקע עם עננים מעוצבים */}
            <div className="absolute inset-0">
              <div className="absolute top-8 left-12 w-20 h-12 bg-white rounded-full opacity-80 shadow-lg"></div>
              <div className="absolute top-16 right-16 w-24 h-14 bg-white rounded-full opacity-70 shadow-md"></div>
              <div className="absolute top-4 right-32 w-16 h-10 bg-white rounded-full opacity-60 shadow-sm"></div>
              <div className="absolute top-20 left-1/2 w-18 h-11 bg-white rounded-full opacity-75 shadow-md"></div>
              
              {/* שמש מעוצבת */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-600 text-lg">
                    ☀️
                  </div>
                </div>
              </div>
            </div>

            {/* מטבעות מעוצבים */}
            {coins.map(coin => (
              <div
                key={coin.id}
                className="absolute w-12 h-12 flex items-center justify-center"
                style={{
                  left: coin.x,
                  top: coin.y,
                  transform: `rotate(${coin.rotation}deg)`
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 rounded-full border-3 border-yellow-800 shadow-lg flex items-center justify-center relative">
                  <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-80"></div>
                  <span className="text-yellow-900 font-bold text-lg relative z-10">₪</span>
                  <div className="absolute top-1 left-2 w-2 h-2 bg-yellow-100 rounded-full opacity-90"></div>
                </div>
              </div>
            ))}

            {/* הסל המעוצב */}
            <div
              className="absolute bottom-0 flex items-center justify-center"
              style={{
                left: basketX,
                width: basketWidth,
                height: basketHeight,
              }}
            >
              <div className="w-full h-full relative">
                {/* גוף הסל */}
                <div 
                  className="w-full h-full bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-3xl border-4 border-amber-900 shadow-2xl"
                  style={{ clipPath: 'polygon(10% 0%, 90% 0%, 85% 100%, 15% 100%)' }}
                >
                  {/* דוגמת קליעה */}
                  <div className="absolute inset-2 opacity-40">
                    <div className="w-full h-full bg-amber-700 rounded-t-2xl"></div>
                    <div className="absolute top-2 left-2 right-2 h-px bg-amber-900 opacity-60"></div>
                    <div className="absolute top-4 left-2 right-2 h-px bg-amber-900 opacity-60"></div>
                    <div className="absolute top-6 left-2 right-2 h-px bg-amber-900 opacity-60"></div>
                  </div>
                </div>
                
                {/* תווית הסל */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg px-2 py-1 shadow-md">
                  <div className="text-amber-800 font-bold text-xs text-center">
                    💝 קופת צדקה
                  </div>
                </div>
                
                {/* אפקט ברק כאשר תופסים מטבע */}
                {gameStarted && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-400 text-2xl animate-bounce">
                    ✨
                  </div>
                )}
              </div>
            </div>

            {/* הוראות מעוצבות */}
            {gameStarted && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎯</span>
                  <div className="font-bold text-purple-800">הוראות:</div>
                </div>
                <div className="text-gray-700 text-sm">
                  הזז את העכבר כדי לתפוס מטבעות!
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  כל מטבע = 10 נקודות
                </div>
              </div>
            )}
          </div>
        </div>

        {/* הסבר על המשחק */}
        <div className="mt-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto shadow-xl border-2 border-purple-200">
            <div className="text-2xl mb-3">💝</div>
            <h3 className="text-xl font-bold text-purple-800 mb-3">
              למה חשובה צדקה?
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              צדקה היא מצווה חשובה שמלמדת אותנו לעזור לאחרים ולחלוק מהטוב שלנו.
              במשחק הזה אתם עוזרים לאסוף מטבעות לקופת הצדקה ולומדים על חשיבות הנתינה והעזרה לזולת.
            </p>
            <div className="flex justify-center gap-4 mt-4 text-2xl">
              <span>🤝</span>
              <span>❤️</span>
              <span>🌟</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityCoinGame;
