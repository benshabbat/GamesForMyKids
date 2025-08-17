/**
 * ===============================================
 * AutoGamePage - עמוד משחק עם קונטקסט מלא 🎯
 * ===============================================
 * 
 * עמוד משחק שמקבל הכל מקונטקסט - ללא props בכלל!
 * - GameLogicContext מספק את כל הלוגיקה והמידע
 * - פשוט מציג את התוכן בהתאם למצב
 * - אפס props drilling! 🚀
 */

"use client";

import { BaseGameItem } from "@/lib/types/base";
import { 
  useGameLogic, 
  useGameState, 
  useGameActions, 
  useGameConfigFromLogic, 
  useGameHints, 
  useGameUI 
} from '@/contexts';

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
  // 🎮 כל הנתונים מהקונטקסט!
  const { isReady, error } = useGameLogic();
  const { gameState, isPlaying, showCelebration, currentChallenge, options, score, level } = useGameState();
  const { startGame, resetGame, handleItemClick, speakItemName } = useGameActions();
  const { config, items, CardComponent, gameType } = useGameConfigFromLogic();
  const { hints, hasMoreHints, showNextHint, currentAccuracy } = useGameHints();
  const { showProgressModal, setShowProgressModal } = useGameUI();

  // 🔄 Loading state
  if (!isReady) {
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
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">שגיאה במשחק</h2>
          <p className="text-gray-600 mb-4">{error}</p>
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
  if (!gameState || !isPlaying) {
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
              score={score}
              level={level}
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
              📊 {Math.round(currentAccuracy || 0)}%
            </button>
          </div>

          {/* Challenge Box אוטומטי */}
          {gameState && currentChallenge && !showCelebration && (
            <ChallengeBox
              title={config.challengeTitle || "איזה פריט שמעת?"}
              icon={config.challengeIcon || "🎯"}
              iconColor={config.colors.header}
              challengeText={currentChallenge.hebrew}
              onSpeak={() => speakItemName(currentChallenge!.name)}
              description={config.challengeDescription || "בחר את הפריט הנכון!"}
            />
          )}

          {/* Celebration אוטומטי */}
          {gameState && showCelebration && currentChallenge && (
            <CelebrationBox
              label={config.itemLabel || "פריט"}
              value={currentChallenge.hebrew}
            />
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
                text: hint, 
                type: 'description' as const,
                isRevealed: true,
                order: index + 1
              }))}
              hasMoreHints={hasMoreHints || false}
              onShowNextHint={showNextHint || (() => {})}
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
              📊 דיוק: {Math.round(currentAccuracy || 0)}%
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
          currentAccuracy={currentAccuracy || 0}
          progressStats={null}
          isVisible={showProgressModal}
          onClose={() => setShowProgressModal(false)}
        />
      </div>
    </div>
  );
}
