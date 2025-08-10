/**
 * ===============================================
 * AutoGamePage - הקומפוננט הקסום 🎯
 * ===============================================
 * 
 * הופך כל דף משחק מ-120 שורות ל-3 שורות!
 * כל הלוגיקה במקום אחד - אוטומציה מושלמת
 */

"use client";

import { useState } from "react";
import { GameType, BaseGameItem } from "@/lib/types/base";
import { GAME_UI_CONFIGS } from "@/lib/constants/ui/gameConfigs";
import { GAME_HOOKS_MAP, AutoGameType } from "@/lib/constants/gameHooksMap";
import { GAME_ITEMS_MAP } from "@/lib/constants/gameItemsMap";
import { GameCardMap } from "./CardPresets";

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
  gameType: AutoGameType | GameType; // מקבל שני טיפוסים לגמישות
  renderCard?: (item: BaseGameItem, onClick: (item: BaseGameItem) => void) => React.ReactNode; // רינדר מותאם אישית
}

/**
 * 🎯 הקומפוננט הקסום שהופך כל משחק לאוטומטי
 * מקבל רק gameType ובונה את כל המשחק אוטומטית!
 */
export function AutoGamePage({ gameType, renderCard }: AutoGamePageProps) {
  // 🎨 קבלת כל הקונפיגורציות אוטומטית
  const config = GAME_UI_CONFIGS[gameType];
  const useGameHook = GAME_HOOKS_MAP[gameType as AutoGameType];
  const items = GAME_ITEMS_MAP[gameType];
  const CardComponent = GameCardMap[gameType];
  
  // בדיקה שהמשחק קיים במפה
  if (!useGameHook) {
    throw new Error(`Game type ${gameType} is not supported by AutoGamePage`);
  }
  
  // State for UI enhancements
  const [showProgressModal, setShowProgressModal] = useState(false);
  
  // 🎮 הפעלת ה-Hook הנכון אוטומטית
  const {
    gameState,
    speakItemName,
    startGame,
    handleItemClick,
    resetGame,
    // שיפורים חדשים
    hints,
    hasMoreHints,
    showNextHint,
    currentAccuracy,
    progressStats,
  } = useGameHook();

  // 🖥️ רינדור מותנה - אם לא במשחק או gameState לא קיים, הראה StartScreen
  if (!gameState || !gameState.isPlaying) {
    return (
      <AutoStartScreen
        gameType={gameType}
        items={items}
        onStart={startGame}
        onSpeak={speakItemName}
      />
    );
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
            <GameHeader
              score={gameState?.score || 0}
              level={gameState?.level || 1}
              onHome={() => (window.location.href = "/")}
              onReset={resetGame}
              levelColor={config.colors.subHeader}
            />
            
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
              📊 {currentAccuracy}%
            </button>
          </div>

          {/* Challenge Box אוטומטי */}
          {gameState && gameState.currentChallenge && !gameState.showCelebration && (
            <ChallengeBox
              title={config.challengeTitle || "איזה פריט שמעת?"}
              icon={config.challengeIcon || "🎯"}
              iconColor={config.colors.header}
              challengeText={gameState.currentChallenge.hebrew}
              onSpeak={() => speakItemName(gameState.currentChallenge!.name)}
              description={config.challengeDescription || "בחר את הפריט הנכון!"}
            />
          )}

          {/* Celebration אוטומטי */}
          {gameState && gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox
              label={config.itemLabel || "פריט"}
              value={gameState.currentChallenge.hebrew}
            />
          )}
        </div>

        {/* Grid והרכיבים החדשים */}
        <div className="space-y-6">
          {/* Grid אוטומטי */}
          <GameCardGrid
            items={gameState?.options || []}
            onItemClick={handleItemClick}
            currentChallenge={gameState?.currentChallenge}
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
              hints={hints}
              hasMoreHints={hasMoreHints}
              onShowNextHint={showNextHint}
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
          <TipsBox
            tip={config.tip || "💡 טיפ: הקשב בקפידה!"}
            description={config.tipDescription || "לחץ על הסמל למעלה כדי לשמוע שוב"}
          />
        </div>

        {/* מודל סטטיסטיקות */}
        <ProgressDisplay
          currentAccuracy={currentAccuracy}
          progressStats={progressStats}
          isVisible={showProgressModal}
          onClose={() => setShowProgressModal(false)}
        />
      </div>
    </div>
  );
}
