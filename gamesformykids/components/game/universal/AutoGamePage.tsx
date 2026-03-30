/**
 * ===============================================
 * AutoGamePage - הקומפוננט הקסום 🎯
 * ===============================================
 * 
 * הופך כל דף משחק מ-120 שורות ל-3 שורות!
 * כל הלוגיקה במקום אחד - אוטומציה מושלמת
 * עכשיו עם קונטקסטים וhook מותאם - ללא props drilling!
 * 🚀 חדש: כל הלוגיקה ב-useAutoGame hook!
 */

"use client";

import { BaseGameItem } from '@/lib/types/core/base';
import { useAutoGame } from "@/hooks";

// רכיבים משותפים
import { AutoStartScreen } from "../../shared";
import { GameHeader } from "../../shared";
import { ChallengeBox } from "../../shared";
import { CelebrationBox } from "../../shared";
import { GameCardGrid } from "../../shared";
import { TipsBox } from "../../shared";
import { GameHints } from "../../shared";
import { ProgressDisplay } from "../../shared";

interface AutoGamePageProps {
  renderCard?: (item: BaseGameItem, onClick: (item: BaseGameItem) => void) => React.ReactNode; // רינדר מותאם אישית - אופציונלי בלבד
}

/**
 * 🎯 הקומפוננט הקסום שהופך כל משחק לאוטומטי
 * עכשיו ללא props drilling וכל הלוגיקה בhook מותאם!
 * 🚀 gameType אופציונלי - אם לא מועבר, יילקח מהקונטקסט
 */
export function AutoGamePage({ renderCard }: AutoGamePageProps) {
  // 🎯 כל הלוגיקה בhook אחד מותאם!
  const {
    // Game State
    gameState,
    isPlaying,
    showCelebration,
    currentChallenge,
    options,
    
    // Game Actions
    handleItemClick,
    
    // Enhanced Features
    hints,
    currentAccuracy,
    
    // UI State
    setShowProgressModal,
    
    // Configuration
    config,
    CardComponent
  } = useAutoGame();

  // 🖥️ רינדור מותנה - אם לא במשחק או gameState לא קיים, הראה StartScreen
  if (!gameState || !isPlaying) {
    return <AutoStartScreen />;
  }

  // 🎯 רינדור המשחק עצמו
  return (
    <div 
      className="min-h-screen p-4"
      style={{ background: config.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header אוטומטי עם סטטיסטיקות */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <GameHeader />
            
            {/* כפתור סטטיסטיקות */}
            <button
              onClick={() => setShowProgressModal(true)}
              className="
                px-3 py-2 bg-blue-500 text-white rounded-lg shadow-lg
                hover:bg-blue-600 transform hover:scale-105 
                transition-all duration-200 text-sm font-bold
              "
              title="הצג סטטיסטיקות"
            >
              📊 {currentAccuracy || 0}%
            </button>
          </div>

          {/* Challenge Box אוטומטי */}
          {gameState && currentChallenge && !showCelebration && (
            <ChallengeBox />
          )}

          {/* Celebration אוטומטי */}
          {gameState && showCelebration && currentChallenge && (
            <CelebrationBox />
          )}
        </div>

        {/* Grid והרכיבים החדשים */}
        <div className="space-y-6">
          {/* Grid אוטומטי */}
          <GameCardGrid
            items={options || []}
            onItemClick={handleItemClick}
            currentChallenge={currentChallenge}
            gridCols="grid-cols-2"
            maxWidth="max-w-2xl"
            renderCustomCard={(item) => (
              renderCard ? renderCard(item, handleItemClick) : (
                <CardComponent item={item} onClick={handleItemClick} />
              )
            )}
          />

          {/* רמזים חכמים */}
          {hints && hints.length > 0 && (
            <GameHints 
              hints={hints.map((hint, index) => ({
                id: `hint-${index}`,
                text: hint,
                type: 'info' as const,
                priority: index
              }))}
              showHints={true}
            />
          )}

          {/* סטטיסטיקות בכפתור */}
          <div className="text-center mt-4">
            <button
              onClick={() => setShowProgressModal(true)}
              className="
                px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg
                hover:bg-blue-600 transform hover:scale-105 
                transition-all duration-200 font-bold
              "
            >
              📊 דיוק: {currentAccuracy || 0}%
            </button>
          </div>

          {/* Tips אוטומטי */}
          <TipsBox />
        </div>

        {/* מודל סטטיסטיקות */}
        <ProgressDisplay 
          stats={{
            totalItems: 10,
            completedItems: 5,
            averageTime: 2.5,
            accuracy: 85,
            streak: 3
          }}
        />
      </div>
    </div>
  );
}
