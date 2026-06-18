"use client";

import { useBubbleGame } from '../hooks/useBubbleGame';
import BubbleStartScreen from './BubbleStartScreen';
import Bubble from './Bubble';

export default function BubbleGame() {
  const { gameContainerRef, stopGame, handleBubblePop, startGame, isPlaying, score, level, poppedCount, bubbles } = useBubbleGame();

  if (!isPlaying) {
    return <BubbleStartScreen startGame={startGame} />;
  }

  return (
    <div 
      ref={gameContainerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 25%, #ADD8E6 50%, #B0E0E6 75%, #E0F6FF 100%)',
      }}
    >
      {/* כותרת המשחק */}
      <div className="relative z-10 p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">🫧 משחק הבועות</h1>
          <p className="text-lg text-purple-600">ניקוד: {score} | רמה: {level}</p>
        </div>
      </div>

      {/* אזור המשחק */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div key={bubble.id} className="pointer-events-auto">
            <Bubble
              id={bubble.id}
              x={bubble.x}
              y={bubble.y}
              size={bubble.size}
              color={bubble.color}
              speed={bubble.speed}
              frequency={bubble.frequency}
              onPop={handleBubblePop}
            />
          </div>
        ))}
      </div>

      {/* סטטיסטיקות נוספות */}
      <div className="absolute top-20 end-4 z-20 bg-white/80 rounded-2xl p-4 shadow-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-800">בועות פוצצו:</div>
          <div className="text-2xl font-bold text-blue-600">{poppedCount}</div>
        </div>
      </div>

      {/* הוראות משחק */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 text-center">
          <p className="text-yellow-800 font-semibold">💡 לחץ על הבועות לפוצץ אותן!</p>
        </div>
      </div>

      {/* כפתור עצירה */}
      <button
        onClick={stopGame}
        className="absolute top-4 start-4 z-20 px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg"
      >
        עצור משחק
      </button>

      {/* אפקטים ויזואליים נוספים */}
      <div className="absolute inset-0 pointer-events-none">
        {/* עננים מאחורה */}
        <div className="absolute top-10 left-10 w-20 h-12 bg-white/40 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-10 bg-white/30 rounded-full"></div>
        <div className="absolute top-20 left-1/2 w-24 h-14 bg-white/35 rounded-full"></div>

        {/* ציפורים קטנות */}
        <div className="absolute top-16 right-1/4 text-white/60">🐦</div>
        <div className="absolute top-40 left-1/3 text-white/60">🐦</div>
      </div>
    </div>
  );
}
