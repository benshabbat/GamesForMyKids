/**
 * Game Navigation Component
 * דוגמה לשימוש בקונטקסט GameType
 */

'use client';

import { useGameType } from '@/contexts/GameTypeContext';
import { Button } from '@/components/ui/button';

export function GameNavigation() {
  const {
    currentGameType,
    currentGameConfig,
    gameState,
    navigateToGame,
    goToPreviousGame,
    clearGameHistory,
  } = useGameType();

  if (!currentGameType || !currentGameConfig) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <h3 className="text-lg font-bold mb-2">ניווט משחקים</h3>
      
      {/* מידע על המשחק הנוכחי */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">המשחק הנוכחי:</p>
        <h4 className="font-semibold text-blue-600">{currentGameConfig.title}</h4>
        <p className="text-xs text-gray-500">{currentGameConfig.subTitle}</p>
      </div>

      {/* היסטוריית משחקים */}
      {gameState.gameHistory.length > 1 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">משחקים אחרונים:</p>
          <div className="flex flex-wrap gap-1">
            {gameState.gameHistory.slice(0, -1).reverse().slice(0, 3).map((gameType) => (
              <Button
                key={gameType}
                variant="outline"
                size="sm"
                onClick={() => navigateToGame(gameType)}
                className="text-xs"
              >
                {gameType}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* כפתורי ניווט */}
      <div className="flex gap-2">
        {gameState.previousGameType && (
          <Button
            variant="secondary"
            size="sm"
            onClick={goToPreviousGame}
          >
            ← משחק קודם
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToGame('animals')}
        >
          חיות
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToGame('colors')}
        >
          צבעים
        </Button>
      </div>

      {/* ניקוי היסטוריה */}
      {gameState.gameHistory.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearGameHistory}
          className="w-full mt-2 text-xs"
        >
          נקה היסטוריה
        </Button>
      )}
    </div>
  );
}

/**
 * Current Game Info Component
 * קומפוננט קטן שמציג מידע על המשחק הנוכחי
 */
export function CurrentGameInfo() {
  const { currentGameType, currentGameConfig } = useGameType();

  if (!currentGameType || !currentGameConfig) {
    return <div className="text-gray-500">לא נבחר משחק</div>;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium">{currentGameConfig.title}</span>
      <span className="text-gray-500">({currentGameType})</span>
    </div>
  );
}
