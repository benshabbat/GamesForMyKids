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
import { BaseGameItem } from "@/lib/types/base";

// רכיבים בסיסיים
import AutoStartScreen from "./AutoStartScreen";
import GameHeader from "./GameHeader";
import ChallengeBox from "./ChallengeBox";
import CelebrationBox from "./CelebrationBox";
import { GameCardGrid } from "./GameCardGrid";
import TipsBox from "./TipsBox";
import { GameHints } from "./GameHints";
import { ProgressDisplay } from "./ProgressDisplay";

/**
 * 🎯 הקומפוננט הסופי - אפס props, הכל מהקונטקסט!
 */
export function UltimateGamePage() {
  // 🎮 כל מה שצריך בשורה אחת!
  const game = useUniversalGame();

  // 🔄 Loading
  if (!game.isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🎮</div>
          <h2 className="text-3xl font-bold text-gray-700 mb-2">טוען משחק מדהים...</h2>
          <div className="w-20 h-2 bg-gray-200 rounded-full mx-auto">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // ❌ Error
  if (game.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-md mx-4">
          <div className="text-8xl mb-6">😔</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">אופס! משהו השתבש</h2>
          <p className="text-gray-600 mb-6">{game.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
          >
            🔄 נסה שוב
          </button>
        </div>
      </div>
    );
  }

  // 🏠 Start Screen
  if (!game.gameState || !game.isPlaying) {
    return (
      <div style={{ background: game.config.colors.background }} className="min-h-screen">
        <AutoStartScreen
          gameType={game.gameType}
          items={game.items}
          onStart={game.startGame}
          onSpeak={game.speakItemName}
        />
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
        {/* 🎯 Game Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <GameHeader
              score={game.score}
              level={game.level}
              onHome={() => (window.location.href = "/")}
              onReset={game.resetGame}
              levelColor={game.config.colors.subHeader}
            />
            
            {/* 📊 Stats Button */}
            <button
              onClick={() => game.setShowProgressModal(true)}
              className="
                px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg
                hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 
                transition-all duration-200 font-bold flex items-center gap-2
              "
              title="הצג סטטיסטיקות מפורטות"
            >
              📊 {Math.round(game.currentAccuracy)}%
            </button>
          </div>

          {/* 🎯 Challenge */}
          {game.currentChallenge && !game.showCelebration && (
            <div className="mb-6">
              <ChallengeBox
                title={game.config.challengeTitle || "איזה פריט שמעת?"}
                icon={game.config.challengeIcon || "🎯"}
                iconColor={game.config.colors.header}
                challengeText={game.currentChallenge.hebrew}
                onSpeak={() => game.speakItemName(game.currentChallenge!.name)}
                description={game.config.challengeDescription || "בחר את הפריט הנכון!"}
              />
            </div>
          )}

          {/* 🎉 Celebration */}
          {game.showCelebration && game.currentChallenge && (
            <div className="mb-6">
              <CelebrationBox
                label={game.config.itemLabel || "פריט"}
                value={game.currentChallenge.hebrew}
              />
            </div>
          )}
        </div>

        {/* 🎮 Game Content */}
        <div className="space-y-8">
          {/* 🎯 Game Grid */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <GameCardGrid
              items={game.options}
              onItemClick={game.handleItemClick}
              currentChallenge={game.currentChallenge}
              gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              maxWidth="max-w-4xl"
              renderCustomCard={(item: BaseGameItem) => (
                <game.CardComponent item={item} onClick={game.handleItemClick} />
              )}
            />
          </div>

          {/* 💡 Hints */}
          {game.hints.length > 0 && (
            <div className="bg-yellow-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <GameHints
                hints={game.hints.map((hint, index) => ({ 
                  text: hint, 
                  type: 'description' as const,
                  isRevealed: true,
                  order: index + 1
                }))}
                hasMoreHints={game.hasMoreHints}
                onShowNextHint={game.showNextHint}
              />
            </div>
          )}

          {/* 📊 Quick Stats */}
          <div className="text-center">
            <button
              onClick={() => game.setShowProgressModal(true)}
              className="
                px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg
                hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 
                transition-all duration-200 font-bold
              "
            >
              📈 דיוק משחק: {Math.round(game.currentAccuracy)}%
            </button>
          </div>

          {/* 💡 Tips */}
          <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <TipsBox
              tip={game.config.tip || "💡 טיפ: הקשב בקפידה!"}
              description={game.config.tipDescription || "לחץ על הסמל למעלה כדי לשמוע שוב"}
            />
          </div>
        </div>

        {/* 📊 Progress Modal */}
        <ProgressDisplay
          currentAccuracy={game.currentAccuracy}
          progressStats={null}
          isVisible={game.showProgressModal}
          onClose={() => game.setShowProgressModal(false)}
        />
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
