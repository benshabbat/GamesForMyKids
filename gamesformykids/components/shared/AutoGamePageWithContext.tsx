/**
 * ===============================================
 * AutoGamePage - עמוד משחק עם קונטקסט מלא 🎯
 * ===============================================
 * 
 * עמוד משחק שמקבל הכל מקונטקסט - ללא props בכלל!
 * - UniversalGameContext מספק את כל הלוגיקה והמידע
 * - פשוט מציג את התוכן בהתאם למצב
 * - אפס props drilling! 🚀
 */

"use client";

import { BaseGameItem } from "@/lib/types/base";
import { useUniversalGame } from '@/contexts/UniversalGameContext';

// רכיבים משותפים
import AutoStartScreen from "./AutoStartScreen";
import GameHeader from "./GameHeader";
import ChallengeBox from "./ChallengeBox";
import CelebrationBox from "./CelebrationBox";
import { GameCardGrid } from "./GameCardGrid";
import TipsBox from "./TipsBox";
import { GameHints } from "./GameHints";
import { ProgressDisplay } from "./ProgressDisplay";

interface AutoGamePageProps {
  renderCard?: (item: BaseGameItem, onClick: (item: BaseGameItem) => void) => React.ReactNode; // רינדר מותאם אישית - אופציונלי בלבד
}

/**
 * 🎯 עמוד משחק מלא עם קונטקסט - ללא props!
 * כל הנתונים מגיעים מהקונטקסט - אפס העברת פרמטרים!
 */
export function AutoGamePageWithContext({ renderCard }: AutoGamePageProps) {
  // 🎮 כל הנתונים בשורה אחת מהקונטקסט האוניברסלי!
  const game = useUniversalGame();

  // 🔄 Loading state
  if (!game.isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-600">טוען משחק...</h2>
        </div>
      </div>
    );
  }

  // ❌ Error state
  if (game.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">שגיאה במשחק</h2>
          <p className="text-gray-600 mb-4">{game.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  // 🖥️ רינדור מותנה - אם לא במשחק או gameState לא קיים, הראה StartScreen
  if (!game.gameState || !game.isPlaying) {
    return <AutoStartScreen />;
  }

  // 🎯 רינדור המשחק עצמו
  return (
    <div 
      className="min-h-screen p-4"
      style={{ background: game.config.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header אוטומטי עם סטטיסטיקות */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <GameHeader />
            
            {/* כפתור סטטיסטיקות */}
            <button
              onClick={() => game.setShowProgressModal(true)}
              className="
                px-3 py-2 bg-blue-500 text-white rounded-lg shadow-lg
                hover:bg-blue-600 transform hover:scale-105 
                transition-all duration-200 text-sm font-bold
              "
              title="הצג סטטיסטיקות"
            >
              📊 {Math.round(game.currentAccuracy)}%
            </button>
          </div>

          {/* Challenge Box אוטומטי */}
          {game.gameState && game.currentChallenge && !game.showCelebration && (
            <ChallengeBox />
          )}

          {/* Celebration אוטומטי */}
          {game.gameState && game.showCelebration && game.currentChallenge && (
            <CelebrationBox />
          )}
        </div>

        {/* Grid והרכיבים החדשים */}
        <div className="space-y-6">
          {/* Grid אוטומטי */}
          <GameCardGrid
            items={game.options}
            onItemClick={game.handleItemClick}
            currentChallenge={game.currentChallenge}
            gridCols="grid-cols-2"
            maxWidth="max-w-2xl"
            renderCustomCard={(item) => (
              renderCard ? renderCard(item, game.handleItemClick) : (
                <game.CardComponent item={item} onClick={game.handleItemClick} />
              )
            )}
          />

          {/* רמזים חכמים */}
          {game.hints && game.hints.length > 0 && (
            <GameHints />
          )}

          {/* סטטיסטיקות בכפתור */}
          <div className="text-center mt-4">
            <button
              onClick={() => game.setShowProgressModal(true)}
              className="
                px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg
                hover:bg-blue-600 transform hover:scale-105 
                transition-all duration-200 font-bold
              "
            >
              📊 דיוק: {Math.round(game.currentAccuracy)}%
            </button>
          </div>

          {/* Tips אוטומטי */}
          <TipsBox />
        </div>

        {/* מודל סטטיסטיקות */}
        <ProgressDisplay />
      </div>
    </div>
  );
}
