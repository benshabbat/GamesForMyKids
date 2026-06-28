'use client';
import { useSlingshotGame, LEVELS_PER_GAME } from './useSlingshotGame';

export default function SlingshotClient() {
  const {
    phase, score, levelIdx, feedbackText, feedbackOk, currentLevel,
    canvasRef, startGame, handlePointerDown, handlePointerMove, handlePointerUp,
  } = useSlingshotGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-200 to-blue-400 p-6 text-white" dir="rtl">
        <div className="text-7xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold mb-2 text-blue-900">קלע אותיות</h1>
        <p className="text-xl mb-2 text-blue-800">קלע לקופסה עם המילה הנכונה!</p>
        <p className="text-sm text-blue-700 mb-8">גרור את הכדור אחורה ושחרר לכיוון המילה שמתחילה באות</p>
        <div className="bg-white/30 rounded-xl p-4 mb-8 max-w-sm w-full text-blue-900">
          <div className="flex gap-4 text-sm text-center">
            <div className="flex-1"><div className="text-2xl mb-1">👀</div><div>ראה את האות על הכדור</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🎯</div><div>גרור ושחרר</div></div>
            <div className="flex-1"><div className="text-2xl mb-1">🏆</div><div>פגע במילה הנכונה</div></div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🚀 יאללה, נשגר!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / (LEVELS_PER_GAME * 10)) * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 50 ? '🥈' : '🥉';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-200 to-blue-400 p-6 text-white" dir="rtl">
        <div className="text-6xl mb-4">{medal}</div>
        <h1 className="text-3xl font-bold mb-2 text-blue-900">כל הכבוד, קלעי!</h1>
        <p className="text-xl mb-6 text-blue-800">ניקוד: {score} מתוך {LEVELS_PER_GAME * 10}</p>
        <div className="flex gap-8 mb-8">
          <div className="text-center bg-white/30 rounded-xl p-4 text-blue-900">
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-sm">נקודות</div>
          </div>
          <div className="text-center bg-white/30 rounded-xl p-4 text-blue-900">
            <div className="text-3xl font-bold">{pct}%</div>
            <div className="text-sm">דיוק</div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-xl transition"
        >
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col" dir="rtl">
      <div className="flex items-center justify-between px-4 py-2 bg-blue-900/80 text-white z-10">
        <div className="text-sm text-blue-200">שלב {levelIdx + 1}/{LEVELS_PER_GAME}</div>
        <div className="flex items-center gap-3">
          {currentLevel && (
            <div className="text-3xl font-bold text-yellow-300 bg-purple-700 rounded-full w-12 h-12 flex items-center justify-center">
              {currentLevel.letter}
            </div>
          )}
          <div className="text-sm text-blue-200">מצא מילה שמתחילה ב...</div>
        </div>
        <div className="text-lg font-bold text-yellow-300">{score} 🎯</div>
      </div>
      {(phase === 'feedback') && (
        <div className={`absolute top-16 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full font-bold text-lg shadow-lg whitespace-nowrap
          ${feedbackOk ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {feedbackText}
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full touch-none"
        style={{ cursor: phase === 'aiming' ? 'crosshair' : 'default' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {phase === 'aiming' && (
        <div className="text-center py-2 text-sm text-blue-900 bg-blue-200">
          גרור את הכדור הסגול אחורה ושחרר 🎯
        </div>
      )}
    </div>
  );
}
