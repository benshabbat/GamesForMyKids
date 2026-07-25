import { useTetrisState } from '../hooks/useTetrisState';
import { useTouchControls } from './useTouchControls';

interface TouchControlsProps {
  isDesktop?: boolean;
}

const TouchControls = ({ isDesktop = false }: TouchControlsProps) => {
  const { phase, score, startNewGame: onStartGame } = useTetrisState();
  const isGameRunning = phase === 'playing';
  const isPaused = phase === 'paused';
  const gameOver = phase === 'gameover';
  const { handleMove, handleRotate, handleHardDrop, handleTogglePause } = useTouchControls();

  // פריסה למחשב
  if (isDesktop) {
    return (
      <div className="space-y-6">
        {/* Game Over / Start Game */}
        {gameOver && (
          <div className="text-center bg-red-500/90 text-white p-4 rounded-xl backdrop-blur-sm border border-red-300/30">
            <h2 className="text-2xl font-bold mb-2">המשחק הסתיים!</h2>
            <p className="text-lg mb-4">הניקוד שלך: {score}</p>
            <button
              onClick={onStartGame}
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              שחק שוב
            </button>
          </div>
        )}

        {!isGameRunning && !gameOver && !isPaused && (
          <div className="text-center">
            <button
              onClick={onStartGame}
              className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:scale-105 transition-transform duration-200"
            >
              התחל משחק
            </button>
          </div>
        )}

        {/* Paused */}
        {isPaused && (
          <div className="text-center bg-indigo-900/80 text-white p-4 rounded-xl backdrop-blur-sm border border-indigo-300/30">
            <h2 className="text-2xl font-bold mb-2">⏸️ המשחק מושהה</h2>
            <button
              onClick={handleTogglePause}
              className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              ▶️ המשך משחק
            </button>
          </div>
        )}

        {/* Desktop Controls - Keyboard Instructions */}
        {(isGameRunning || isPaused) && (
          <div className="bg-black/60 p-4 rounded-xl backdrop-blur-sm border border-blue-300/30">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-bold text-lg text-center flex-1">פקדי מקלדת</h3>
              <button
                onClick={handleTogglePause}
                aria-label={isPaused ? 'המשך משחק' : 'השהה משחק'}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg border border-white/20 transition-colors"
              >
                {isPaused ? '▶️' : '⏸️'}
              </button>
            </div>
            <div className="space-y-2 text-white text-sm">
              <div className="flex justify-between">
                <span>הזזה שמאלה:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">←</span>
              </div>
              <div className="flex justify-between">
                <span>הזזה ימינה:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">→</span>
              </div>
              <div className="flex justify-between">
                <span>הזזה מטה:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">↓</span>
              </div>
              <div className="flex justify-between">
                <span>סיבוב:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">↑</span>
              </div>
              <div className="flex justify-between">
                <span>נפילה מהירה:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Space</span>
              </div>
              <div className="flex justify-between">
                <span>השהיה:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Esc / P</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // פריסה למובייל
  return (
    <div className="mt-6 w-full max-w-xs">
      {/* Rotate + Pause */}
      <div className="flex justify-center items-center gap-3 mb-4">
        <button
          onClick={handleRotate}
          aria-label="סובב חלק"
          className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-black text-lg shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-green-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          🔄 סיבוב
        </button>
        <button
          onClick={handleTogglePause}
          aria-label={isPaused ? 'המשך משחק' : 'השהה משחק'}
          className="bg-gradient-to-br from-slate-500 to-slate-700 text-white px-4 py-3 rounded-xl font-black text-lg shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-slate-300/30 touch-manipulation"
          disabled={!isGameRunning && !isPaused}
        >
          {isPaused ? '▶️' : '⏸️'}
        </button>
      </div>

      {/* Movement Controls — forced LTR so left/right visually match the move direction regardless of page RTL */}
      <div dir="ltr" style={{ direction: 'ltr' }} className="grid grid-cols-3 gap-3 mb-4">
        <button
          onClick={() => handleMove(-1, 0)}
          aria-label="הזז שמאלה"
          className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-3 rounded-xl font-black text-lg shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-blue-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ⬅️
        </button>
        <button
          onClick={handleHardDrop}
          aria-label="הפל מיד"
          className="bg-gradient-to-br from-red-400 to-red-600 text-white p-3 rounded-xl font-black text-sm shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-red-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ⏬ צנח
        </button>
        <button
          onClick={() => handleMove(1, 0)}
          aria-label="הזז ימינה"
          className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-3 rounded-xl font-black text-lg shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-blue-300/30 touch-manipulation"
          disabled={!isGameRunning}
        >
          ➡️
        </button>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartGame}
        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-6 py-4 rounded-xl font-black text-lg shadow-2xl active:scale-95 transition-transform duration-150 border-2 border-white/30 touch-manipulation"
      >
        {gameOver ? '🔄 משחק חדש' : isGameRunning || isPaused ? '🔄 התחל מחדש' : '▶️ התחל לשחק'}
      </button>

      {/* Paused Message */}
      {isPaused && (
        <div className="bg-gradient-to-br from-indigo-400/20 to-slate-500/20 backdrop-blur-lg border-2 border-indigo-400/50 rounded-xl p-4 text-center mt-4 shadow-2xl">
          <h3 className="text-xl font-black text-white mb-2 drop-shadow-lg">⏸️ המשחק מושהה</h3>
          <p className="text-white/80 text-sm">לחץ על ▶️ כדי להמשיך</p>
        </div>
      )}

      {/* Game Over Message */}
      {gameOver && (
        <div className="bg-gradient-to-br from-red-400/20 to-pink-500/20 backdrop-blur-lg border-2 border-red-400/50 rounded-xl p-4 text-center mt-4 shadow-2xl">
          <h3 className="text-xl font-black text-white mb-2 drop-shadow-lg">🎯 המשחק הסתיים!</h3>
          <p className="text-yellow-300 text-lg font-bold drop-shadow-lg">הניקוד שלך: {score.toLocaleString()}</p>
        </div>
      )}

      {/* Control Instructions */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-3 mt-4 text-center border border-white/20">
        <p className="text-white/80 font-medium text-sm">
          השתמש בכפתורים למעלה, בחיצי המקלדת או בהחלקת אצבע על הלוח 📱⌨️
        </p>
      </div>
    </div>
  );
};

export default TouchControls;
