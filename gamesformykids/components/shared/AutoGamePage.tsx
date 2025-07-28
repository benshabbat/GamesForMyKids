/**
 * ===============================================
 * AutoGamePage - הקומפוננט הקסום 🎯
 * ===============================================
 * 
 * הופך כל דף משחק מ-120 שורות ל-3 שורות!
 * כל הלוגיקה במקום אחד - אוטומציה מושלמת
 */

"use client";

import React from "react";
import { GameType } from "@/lib/types/base";
import { GAME_UI_CONFIGS } from "@/lib/constants/ui/gameConfigs";
import { GAME_HOOKS_MAP } from "@/lib/constants/gameHooksMap";
import { GAME_ITEMS_MAP } from "@/lib/constants/gameItemsMap";
import { GameCardMap } from "./CardPresets";

// רכיבים משותפים
import AutoStartScreen from "./AutoStartScreen";
import GameHeader from "./GameHeader";
import ChallengeBox from "./ChallengeBox";
import CelebrationBox from "./CelebrationBox";
import { GameCardGrid } from "./GameCardGrid";
import TipsBox from "./TipsBox";

interface AutoGamePageProps {
  gameType: GameType;
}

/**
 * 🎯 הקומפוננט הקסום שהופך כל משחק לאוטומטי
 * מקבל רק gameType ובונה את כל המשחק אוטומטית!
 */
export function AutoGamePage({ gameType }: AutoGamePageProps) {
  // 🎨 קבלת כל הקונפיגורציות אוטומטית
  const config = GAME_UI_CONFIGS[gameType];
  const useGameHook = GAME_HOOKS_MAP[gameType];
  const items = GAME_ITEMS_MAP[gameType];
  const CardComponent = GameCardMap[gameType];
  
  // 🎮 הפעלת ה-Hook הנכון אוטומטית
  const {
    gameState,
    speakItemName,
    startGame,
    handleItemClick,
    resetGame,
  } = useGameHook();

  // 🖥️ רינדור מותנה - אם לא במשחק, הראה StartScreen
  if (!gameState.isPlaying) {
    return (
      <AutoStartScreen
        gameType={gameType}
        gameId={gameType}
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
        {/* Header אוטומטי */}
        <div className="text-center mb-8">
          <GameHeader
            score={gameState.score}
            level={gameState.level}
            onHome={() => (window.location.href = "/")}
            onReset={resetGame}
            scoreColor={config.colors.header}
            levelColor={config.colors.subHeader}
          />

          {/* Challenge Box אוטומטי */}
          {gameState.currentChallenge && !gameState.showCelebration && (
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
          {gameState.showCelebration && gameState.currentChallenge && (
            <CelebrationBox
              label={config.itemLabel || "פריט"}
              value={gameState.currentChallenge.hebrew}
            />
          )}
        </div>

        {/* Grid אוטומטי */}
        <GameCardGrid
          items={gameState.options}
          onItemClick={handleItemClick}
          currentChallenge={gameState.currentChallenge}
          gridCols="grid-cols-2"
          maxWidth="max-w-2xl"
          renderCustomCard={(item) => (
            <CardComponent item={item} onClick={handleItemClick} />
          )}
        />

        {/* Tips אוטומטי */}
        <TipsBox
          tip={config.tip || "💡 טיפ: הקשב בקפידה!"}
          description={config.tipDescription || "לחץ על הסמל למעלה כדי לשמוע שוב"}
        />
      </div>
    </div>
  );
}
