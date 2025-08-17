/**
 * Game Header with Context
 * דוגמה לקומפוננט הדר שמשתמש בקונטקסט GameType
 */

'use client';
import Link from 'next/link';
import { useGameType } from '@/contexts/GameTypeContext';

export function GameHeader() {
  const { 
    currentGameType, 
    currentGameConfig, 
    gameState,
    goToPreviousGame 
  } = useGameType();

  if (!currentGameType || !currentGameConfig) {
    return (
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <h1 className="text-2xl font-bold">משחקים לילדים</h1>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* כותרת המשחק */}
        <div>
          <h1 className="text-2xl font-bold">{currentGameConfig.title}</h1>
          <p className="text-blue-100 text-sm">{currentGameConfig.subTitle}</p>
        </div>

        {/* מידע נוסף */}
        <div className="flex items-center gap-4">
          {/* מספר משחקים בהיסטוריה */}
          {gameState.gameHistory.length > 1 && (
            <div className="text-right">
              <div className="text-xs text-blue-200">משחקים בהיסטוריה</div>
              <div className="font-bold">{gameState.gameHistory.length}</div>
            </div>
          )}

          {/* כפתור חזרה למשחק קודם */}
          {gameState.previousGameType && (
            <button
              onClick={goToPreviousGame}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm transition-colors"
            >
              ← משחק קודם
            </button>
          )}
        </div>
      </div>

      {/* אינדיקטור סוג המשחק */}
      <div className="mt-2">
        <span className="inline-block bg-white/20 px-2 py-1 rounded text-xs">
          {currentGameType}
        </span>
      </div>
    </header>
  );
}

/**
 * Game Breadcrumbs
 * קומפוננט breadcrumbs שמשתמש בהיסטוריית המשחקים
 */
export function GameBreadcrumbs() {
  const { gameState, navigateToGame, getGameConfig } = useGameType();

  if (gameState.gameHistory.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-gray-50 px-4 py-2 text-sm">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="/games" className="text-blue-600 hover:text-blue-800">
              כל המשחקים
            </Link>
          </li>
          
          {gameState.gameHistory.slice(0, -1).map((gameType) => {
            const config = getGameConfig(gameType);
            return (
              <li key={gameType} className="flex items-center">
                <span className="mx-2 text-gray-500">{'>'}</span>
                <button
                  onClick={() => navigateToGame(gameType)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {config?.title || gameType}
                </button>
              </li>
            );
          })}
          
          <li className="flex items-center">
            <span className="mx-2 text-gray-500">{'>'}</span>
            <span className="text-gray-900 font-medium">
              {getGameConfig(gameState.currentGameType!)?.title || gameState.currentGameType}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}

/**
 * Quick Game Switcher
 * קומפוננט מהיר למעבר בין משחקים פופולריים
 */
export function QuickGameSwitcher() {
  const { currentGameType, navigateToGame } = useGameType();

  const popularGames = [
    { type: 'animals', name: 'חיות' },
    { type: 'colors', name: 'צבעים' },
    { type: 'fruits', name: 'פירות' },
    { type: 'numbers', name: 'מספרים' },
    { type: 'letters', name: 'אותיות' },
  ] as const;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">מעבר מהיר:</span>
          {popularGames.map(({ type, name }) => (
            <button
              key={type}
              onClick={() => navigateToGame(type)}
              className={`px-3 py-1 rounded-full transition-colors ${ 
                currentGameType === type
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
