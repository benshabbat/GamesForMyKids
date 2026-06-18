'use client';
import { useMazeGame } from './useMazeGame';
import MazeCanvas from './components/MazeCanvas';
import { GameCompletionCelebration } from '@/components/game/shared/GameCompletionCelebration';

const LEVEL_NAMES = ['מפה קטנה 5×5', 'מפה בינונית 7×7', 'מפה גדולה 9×9', 'מפה ענקית 11×11', 'מבוך המומחים 13×13'];
const TOTAL_LEVELS = 5;

export default function MazeClient() {
  const { phase, level, starsCollectedThisLevel, totalStarsCollected, startGame, move, nextLevel, reset } = useMazeGame();

  if (phase === 'idle') {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-6 gap-6">
        <div className="text-7xl">🧩</div>
        <h1 className="text-4xl font-black text-white text-center">מבוך</h1>
        <p className="text-lg text-indigo-200 text-center max-w-xs">
          נווט את הדמות דרך המבוך, אסוף כוכבים, והגע לדלת!
        </p>
        <div className="flex flex-col gap-2 text-sm text-indigo-300 text-center">
          <p>5 רמות — מ-5×5 עד 13×13</p>
          <p>חצי מקלדת או כפתורי הכיוון 🕹️</p>
        </div>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black text-xl rounded-2xl shadow-lg transition-transform active:scale-95"
        >
          🚀 התחל משחק
        </button>
      </div>
    );
  }

  if (phase === 'gameComplete') {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-6 gap-6">
        <GameCompletionCelebration />
        <div className="text-7xl">🏆</div>
        <h2 className="text-3xl font-black text-white text-center">כל הכבוד!</h2>
        <p className="text-xl text-yellow-300">ניצחת את כל {TOTAL_LEVELS} המבוכים!</p>
        <p className="text-2xl font-bold text-yellow-200">⭐ {totalStarsCollected} כוכבים</p>
        <button
          onClick={reset}
          className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black text-xl rounded-2xl shadow-lg transition-transform active:scale-95"
        >
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  if (phase === 'levelComplete') {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-6 gap-6">
        <div className="text-7xl">🎉</div>
        <h2 className="text-3xl font-black text-white text-center">רמה {level + 1} הושלמה!</h2>
        <p className="text-xl text-yellow-300">⭐ {starsCollectedThisLevel} כוכבים ברמה זו</p>
        <p className="text-lg text-indigo-200">סה&quot;כ: {totalStarsCollected} כוכבים</p>
        {level + 1 < TOTAL_LEVELS && (
          <p className="text-sm text-indigo-300">הרמה הבאה: {LEVEL_NAMES[level + 1]}</p>
        )}
        <button
          onClick={nextLevel}
          className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black text-xl rounded-2xl shadow-lg transition-transform active:scale-95"
        >
          ➡️ רמה הבאה
        </button>
      </div>
    );
  }

  // Playing phase
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 to-purple-900 flex flex-col items-center p-4 gap-3">
      <div className="flex items-center justify-between w-full max-w-sm pt-2" dir="rtl">
        <span className="text-white font-bold text-sm">רמה {level + 1}/{TOTAL_LEVELS}</span>
        <span className="text-indigo-300 text-xs">{LEVEL_NAMES[level]}</span>
        <span className="text-yellow-300 font-bold">⭐ {totalStarsCollected}</span>
      </div>

      <MazeCanvas />

      <p className="text-xs text-indigo-400">הגע ל-🚪 כדי לסיים</p>

      {/* D-pad for mobile */}
      <div className="grid grid-cols-3 gap-2">
        <div />
        <DPadBtn label="▲" onClick={() => move('N')} />
        <div />
        <DPadBtn label="◀" onClick={() => move('W')} />
        <div className="w-14 h-14" />
        <DPadBtn label="▶" onClick={() => move('E')} />
        <div />
        <DPadBtn label="▼" onClick={() => move('S')} />
        <div />
      </div>
    </div>
  );
}

function DPadBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 text-white text-2xl font-bold rounded-xl shadow-md transition-transform active:scale-90 select-none"
    >
      {label}
    </button>
  );
}
