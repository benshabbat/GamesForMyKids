"use client";

import { useBubbleGame } from './useBubbleGame';
import BubbleStartScreen from './BubbleStartScreen';
import Bubble from './Bubble';
import GameHeader from '@/components/shared/GameHeader';
import TipsBox from '@/components/shared/TipsBox';

export default function BubbleGame() {
  const {
    gameState,
    gameContainerRef,
    startGame,
    stopGame,
    resetGame,
    handleBubblePop,
  } = useBubbleGame();

  if (!gameState || !gameState.isPlaying) {
    return <BubbleStartScreen onStart={startGame} />;
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
        <GameHeader
          score={gameState.score}
          level={gameState.level}
          onHome={() => (window.location.href = "/")}
          onReset={resetGame}
          levelColor="text-blue-600"
        />
      </div>

      {/* אזור המשחק */}
      <div className="absolute inset-0 pointer-events-none">
        {gameState.bubbles.map((bubble) => (
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
      <div className="absolute top-20 right-4 z-20 bg-white bg-opacity-80 rounded-2xl p-4 shadow-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-800">בועות פוצצו:</div>
          <div className="text-2xl font-bold text-blue-600">{gameState.poppedCount}</div>
        </div>
      </div>

      {/* הוראות משחק */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <TipsBox
          tip="💡 טיפ: לחץ על הבועות לפני שהן בורחות!"
          description="כל בועה מנגנת צליל שונה - נסה ליצור מנגינות!"
        />
      </div>

      {/* כפתור עצירה */}
      <button
        onClick={stopGame}
        className="absolute top-4 left-4 z-20 px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg"
      >
        עצור משחק
      </button>

      {/* אפקטים ויזואליים נוספים */}
      <div className="absolute inset-0 pointer-events-none">
        {/* עננים מאחורה */}
        <div className="absolute top-10 left-10 w-20 h-12 bg-white bg-opacity-40 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-10 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 left-1/2 w-24 h-14 bg-white bg-opacity-35 rounded-full animate-pulse"></div>
        
        {/* ציפורים קטנות */}
        <div className="absolute top-16 right-1/4 text-white text-opacity-60 animate-bounce">🐦</div>
        <div className="absolute top-40 left-1/3 text-white text-opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}>🐦</div>
      </div>
    </div>
  );
}
