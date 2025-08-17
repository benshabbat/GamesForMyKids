/**
 * Simple Enhanced Game Page
 * גרסה פשוטה שמשתמשת רק בקונטקסטים
 */

"use client";

import { useState } from "react";
import { GameType } from "@/lib/types/base";
import { GAME_UI_CONFIGS } from "@/lib/constants/ui/gameConfigs";
import { AutoGameType } from "@/lib/constants/gameHooksMap";
import { useGameContext } from "@/hooks/shared/useGameContext";

// רכיבים פשוטים
import { GameProgressDisplay } from "./GameProgressDisplay";
import { AchievementsBadge } from "./AchievementsDisplay";

interface SimpleEnhancedGamePageProps {
  gameType: AutoGameType | GameType;
  showProgress?: boolean;
  showAchievements?: boolean;
}

/**
 * 🎯 גרסה פשוטה של AutoGamePage עם קונטקסטים
 */
export function SimpleEnhancedGamePage({ 
  gameType, 
  showProgress = true,
  showAchievements = true,
}: SimpleEnhancedGamePageProps) {
  // 🎮 שימוש ב-hook המרכזי - ללא props drilling!
  const {
    score,
    level,
    isGameActive,
    startGame,
    pauseGame,
    resumeGame,
    resetProgress,
    handleCorrectAnswer,
    handleWrongAnswer
  } = useGameContext();
  
  // State for UI
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // � קבלת קונפיגורציה
  const config = GAME_UI_CONFIGS[gameType];

  // �🎯 Enhanced start game
  const enhancedStartGame = () => {
    startGame();
    setGameStarted(true);
  };

  // ⏸️ Enhanced pause/resume game
  const toggleGamePause = () => {
    if (isGameActive) {
      pauseGame();
    } else {
      resumeGame();
    }
  };

  // 🔄 Enhanced reset game
  const enhancedResetGame = () => {
    resetProgress();
    setGameStarted(false);
  };

  // אם המשחק לא התחיל, הצג מסך התחלה
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-100">
        {/* Progress Header */}
        {showProgress && (
          <div className="bg-white shadow-sm p-4">
            <div className="container mx-auto">
              <GameProgressDisplay compact />
            </div>
          </div>
        )}
        
        {/* Start Screen */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {config.title}
            </h1>
            <p className="text-gray-600 mb-6">{config.subTitle}</p>
            
            <button
              onClick={enhancedStartGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🚀 בואו נתחיל!
            </button>
            
            {showProgress && score > 0 && (
              <div className="mt-4 text-sm text-gray-500">
                הציון הנוכחי: {score} נקודות
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Game Info */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-800">
                {config.title}
              </h1>
              {showProgress && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    רמה {level}
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                    {score} נקודות
                  </span>
                </div>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-3">
              {showAchievements && <AchievementsBadge />}
              
              {showProgress && (
                <button
                  onClick={() => setShowProgressModal(true)}
                  className="text-sm bg-purple-100 text-purple-800 px-3 py-2 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  📊 סטטיסטיקות
                </button>
              )}
              
              <button
                onClick={toggleGamePause}
                className={`text-sm px-3 py-2 rounded-lg transition-colors font-medium ${
                  isGameActive 
                    ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {isGameActive ? '⏸️ השהה' : '▶️ המשך'}
              </button>
              
              <button
                onClick={enhancedResetGame}
                className="text-sm bg-gray-100 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                🔄 מחדש
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Display */}
      {showProgress && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-2">
            <GameProgressDisplay compact />
          </div>
        </div>
      )}

      {/* Main Game Content - כאן נוכל להוסיף את תוכן המשחק */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              המשחק מוכן!
            </h2>
            <p className="text-gray-600 mb-4">
              כאן יהיה תוכן המשחק הספציפי עבור {gameType}
            </p>
            
            {/* Demo Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleCorrectAnswer()}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                ✅ תשובה נכונה
              </button>
              <button
                onClick={() => handleWrongAnswer()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                ❌ תשובה שגויה
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Progress Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">סטטיסטיקות מפורטות</h2>
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <GameProgressDisplay showDetailedStats />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
