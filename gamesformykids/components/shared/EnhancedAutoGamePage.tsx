/**
 * Enhanced Auto Game Page
 * גרסה משודרגת של AutoGamePage עם כל הקונטקסטים החדשים
 */

"use client";

import { useState, useEffect } from "react";
import { GameType, BaseGameItem } from "@/lib/types/base";
import { GAME_UI_CONFIGS } from "@/lib/constants/ui/gameConfigs";
import { GAME_HOOKS_MAP, AutoGameType } from "@/lib/constants/gameHooksMap";
import { GAME_ITEMS_MAP } from "@/lib/constants/gameItemsMap";
import { GameCardMap } from "./CardPresets";
import { useGameType } from "@/contexts/GameTypeContext";
import { useGameProgress } from "@/contexts/GameProgressContext";
import { useGameEvents } from "@/hooks/shared/useGameEvents";

// רכיבים משותפים
import AutoStartScreen from "./AutoStartScreen";
import GameHeader from "./GameHeader";
import ChallengeBox from "./ChallengeBox";
import CelebrationBox from "./CelebrationBox";
import { GameCardGrid } from "./GameCardGrid";
import TipsBox from "./TipsBox";
import { GameHints } from "./GameHints";
import { GameProgressDisplay } from "./GameProgressDisplay";
import { AchievementsBadge } from "./AchievementsDisplay";

interface EnhancedAutoGamePageProps {
  gameType: AutoGameType | GameType;
  renderCard?: (item: BaseGameItem, onClick: (item: BaseGameItem) => void) => React.ReactNode;
  showProgress?: boolean;
  showAchievements?: boolean;
}

/**
 * 🎯 הקומפוננט הקסום המשודרג עם מעקב התקדמות והישגים
 */
export function EnhancedAutoGamePage({ 
  gameType, 
  renderCard,
  showProgress = true,
  showAchievements = true,
}: EnhancedAutoGamePageProps) {
  // 🎮 עדכון הקונטקסט עם סוג המשחק הנוכחי
  const { setCurrentGameType } = useGameType();
  const { setGameActive, isGameActive } = useGameProgress();
  const { onCorrectAnswer, onWrongAnswer, onGameStart, onGamePause } = useGameEvents();
  
  useEffect(() => {
    setCurrentGameType(gameType);
  }, [gameType, setCurrentGameType]);

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
    speakChallenge,
    isLoading,
    setShowCelebration,
  } = useGameHook();

  // 🎯 Enhanced item click handler with progress tracking
  const enhancedHandleItemClick = (item: BaseGameItem) => {
    handleItemClick(item);
    
    // בדיקה אם התשובה נכונה
    if (gameState.targetItem && item.id === gameState.targetItem.id) {
      onCorrectAnswer({ item_id: item.id, item_name: item.name });
    } else {
      onWrongAnswer({ item_id: item.id, item_name: item.name, correct_id: gameState.targetItem?.id });
    }
  };

  // 🎮 Enhanced start game with progress tracking
  const enhancedStartGame = () => {
    startGame();
    setGameActive(true);
    onGameStart();
  };

  // ⏸️ Enhanced pause/resume game
  const toggleGamePause = () => {
    if (isGameActive) {
      onGamePause();
    } else {
      setGameActive(true);
    }
  };

  // 🔄 Enhanced reset game
  const enhancedResetGame = () => {
    resetGame();
    setGameActive(false);
  };

  // אם המשחק לא התחיל, הצג מסך התחלה
  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        {showProgress && (
          <div className="container mx-auto px-4 py-2">
            <GameProgressDisplay compact />
          </div>
        )}
        
        <div className="flex-1">
          <AutoStartScreen
            title={config.title}
            subTitle={config.subTitle}
            gameType={gameType}
            onStartGame={enhancedStartGame}
            speakText={speakItemName}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with Progress and Achievements */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <GameHeader
              title={config.title}
              subTitle={config.subTitle}
              onBack={() => window.history.back()}
            />
            
            <div className="flex items-center gap-3">
              {showAchievements && <AchievementsBadge />}
              {showProgress && (
                <button
                  onClick={() => setShowProgressModal(true)}
                  className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  📊 סטטיסטיקות
                </button>
              )}
              <button
                onClick={toggleGamePause}
                className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                  isGameActive 
                    ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {isGameActive ? '⏸️ השהה' : '▶️ המשך'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Display */}
      {showProgress && (
        <div className="container mx-auto px-4 py-2">
          <GameProgressDisplay compact />
        </div>
      )}

      {/* Main Game Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Challenge Box */}
          <ChallengeBox
            targetItem={gameState.targetItem}
            gameType={gameType}
            speakChallenge={speakChallenge}
            isLoading={isLoading}
          />

          {/* Game Cards Grid */}
          <GameCardGrid
            items={items}
            targetItem={gameState.targetItem}
            CardComponent={CardComponent}
            handleItemClick={enhancedHandleItemClick}
            renderCard={renderCard}
            gameType={gameType}
          />

          {/* Tips */}
          <TipsBox />

          {/* Game Hints */}
          <GameHints gameType={gameType} />
        </div>
      </div>

      {/* Celebration */}
      {gameState.showCelebration && (
        <CelebrationBox
          onClose={() => setShowCelebration(false)}
          onNext={enhancedStartGame}
          onReset={enhancedResetGame}
        />
      )}

      {/* Progress Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">סטטיסטיקות מפורטות</h2>
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
