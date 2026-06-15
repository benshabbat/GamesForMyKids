'use client';

import { useLetterDefender } from './useLetterDefender';
import DefenderGrid from './components/DefenderGrid';
import { WAVE_DATA } from './letterDefenderStore';

export default function LetterDefenderClient() {
  const {
    phase, wave, lives, score, enemies, towers, targetWord,
    enemiesToSpawn, startGame, restartGame, toggleTower,
  } = useLetterDefender();

  const totalWaves = WAVE_DATA.length;
  const livesArr = Array.from({ length: 3 });

  if (phase === 'idle') {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="text-6xl mb-4">🏰</div>
          <h1 className="text-2xl font-black text-emerald-800 mb-2">מגן האותיות</h1>
          <p className="text-gray-600 text-sm mb-6">הצב מגדלים כדי לעצור את המילים השגויות — הגן על המילה הנכונה!</p>
          <div className="text-sm text-gray-500 mb-6 space-y-1 text-right">
            <p>🏰 לחץ על תא ריק להצבת מגדל</p>
            <p>🔴 עצור את המילים השגויות</p>
            <p>💔 3 חיים — אל תתן להן לעבור!</p>
          </div>
          <button
            onClick={startGame}
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl active:scale-95 transition-[transform,background-color]"
          >
            🏰 התחל לשמור!
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'gameOver') {
    const won = wave >= totalWaves - 1 && lives > 0;
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="text-7xl mb-4">{won ? '🏆' : '💔'}</div>
          <h2 className="text-2xl font-black text-emerald-800 mb-2">
            {won ? 'ניצחון!' : 'המשחק נגמר'}
          </h2>
          <p className="text-gray-600 mb-2">גל: {wave + 1} / {totalWaves}</p>
          <div className="text-4xl font-black text-emerald-600 mb-1">{score}</div>
          <p className="text-gray-400 mb-6">נקודות</p>
          <button
            onClick={restartGame}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg active:scale-95 transition-[transform,background-color]"
          >
            שחק שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 flex flex-col items-center p-3" dir="rtl">
      {/* HUD */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1">
          {livesArr.map((_, i) => (
            <span key={i} className={`text-2xl transition-opacity ${i < lives ? 'opacity-100' : 'opacity-20'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <div className="text-xs text-emerald-600 font-semibold">גל {wave + 1} / {totalWaves}</div>
          <div className="text-sm font-black text-emerald-800">הגן על: <span className="text-red-600">{targetWord}</span></div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">ניקוד</div>
          <div className="text-xl font-black text-emerald-700">{score}</div>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-auto max-w-full">
        <DefenderGrid
          enemies={enemies}
          towers={towers}
          onCellClick={toggleTower}
        />
      </div>

      {/* Wave status */}
      <div className="mt-3 text-center text-sm text-gray-500">
        {enemiesToSpawn.length > 0
          ? `${enemiesToSpawn.length} אויבים ממתינים`
          : enemies.some(e => !e.dying)
            ? 'עצור אותם!'
            : '⏳ מתחיל גל הבא...'}
      </div>

      <p className="mt-2 text-xs text-gray-400">לחץ על תא ריק להצבת מגדל 🏰 / לחץ שוב להסרה</p>
    </div>
  );
}
