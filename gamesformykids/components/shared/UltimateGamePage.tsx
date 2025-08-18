/**
 * ===============================================
 * Ultimate Game Page - הקומפוננט הסופי! 🎯
 * ===============================================
 * 
 * קומפוננט יחיד שמחליף את כל האחרים:
 * - אפס props drilling
 * - Hook יחיד בלבד
 * - כל הלוגיקה בקונטקסט
 * - פשוט, נקי ויעיל
 */

"use client";

import { useUniversalGame } from '@/contexts/UniversalGameContext';

// רכיבים מפורקים
import GameLoadingScreen from "./GameLoadingScreen";
import GameErrorScreen from "./GameErrorScreen";
import AutoStartScreen from "./AutoStartScreen";
import GameHeaderSection from "./GameHeaderSection";
import GameMainContent from "./GameMainContent";
import SimpleProgressDisplay from "./SimpleProgressDisplay";

/**
 * 🎯 הקומפוננט הסופי - אפס props, הכל מהקונטקסט!
 */
export function UltimateGamePage() {
  // 🎮 כל מה שצריך בשורה אחת!
  const game = useUniversalGame();

  // 🔄 Loading
  if (!game.isReady) {
    return <GameLoadingScreen />;
  }

  // ❌ Error
  if (game.error) {
    return <GameErrorScreen error={game.error} />;
  }

  // 🏠 Start Screen
  if (!game.gameState || !game.isPlaying) {
    return (
      <div style={{ background: game.config.colors.background }} className="min-h-screen">
        <AutoStartScreen />
      </div>
    );
  }

  // 🎮 Main Game
  return (
    <div 
      className="min-h-screen p-4"
      style={{ background: game.config.colors.background }}
    >
      <div className="max-w-5xl mx-auto">
        {/* 🎯 Game Header Section */}
        <GameHeaderSection />

        {/*  Game Content */}
        <GameMainContent />

        {/* 📊 Progress Modal */}
        <SimpleProgressDisplay />
      </div>
    </div>
  );
}

/**
 * 🎯 גרסה מינימלית לטסטים
 */
export function MinimalGamePage() {
  const game = useUniversalGame();
  
  if (!game.isReady) return <div className="p-8 text-center">טוען...</div>;
  if (game.error) return <div className="p-8 text-center text-red-500">שגיאה: {game.error}</div>;
  if (!game.isPlaying) return <div className="p-8 text-center"><button onClick={game.startGame} className="px-4 py-2 bg-blue-500 text-white rounded">התחל משחק</button></div>;
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{game.config.title}</h1>
      <p className="mb-4">ניקוד: {game.score} | רמה: {game.level}</p>
      {game.currentChallenge && (
        <div className="mb-4 p-4 bg-blue-100 rounded">
          <p>מה זה: {game.currentChallenge.hebrew}</p>
          <button onClick={() => game.speakItemName(game.currentChallenge!.name)} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">🔊</button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {game.options.map((item, index) => (
          <button
            key={index}
            onClick={() => game.handleItemClick(item)}
            className="p-4 border rounded hover:bg-gray-100"
          >
            {item.hebrew}
          </button>
        ))}
      </div>
    </div>
  );
}
