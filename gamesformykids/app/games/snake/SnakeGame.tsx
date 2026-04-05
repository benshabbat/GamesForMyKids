'use client';

import { useSnakeGame, W, H } from './useSnakeGame';

export default function SnakeGame() {
  const { canvasRef, ui, startGame, handleTouchStart, handleTouchEnd, controlDir } = useSnakeGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-950 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {/* Score bar */}
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-3 text-white text-center">
          <div><p className="text-2xl font-black text-green-300">{ui.score}</p><p className="text-xs text-green-500">ניקוד</p></div>
          <div><p className="text-2xl font-black text-yellow-300">{ui.level}</p><p className="text-xs text-yellow-500">רמה</p></div>
          <div><p className="text-2xl font-black text-gray-300">{ui.best}</p><p className="text-xs text-gray-500">שיא</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="rounded-2xl shadow-2xl border-4 border-green-700"
          style={{ touchAction: 'none', maxHeight: '60vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
              <div className="text-6xl mb-2">🐍</div>
              <h1 className="text-3xl font-black text-green-700 mb-1">נחש</h1>
              <p className="text-gray-500 text-sm mb-5">אסוף פירות וגדל!<br />הימנע מהקירות ומעצמך</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-green-500 to-emerald-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">💀</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">נגמר!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-green-600">{ui.score}</p>
                  <p className="text-xs text-green-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-green-500 to-emerald-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Touch controls */}
      <div className="mt-4 grid grid-cols-3 gap-2 w-36">
        <div />
        <button onPointerDown={() => controlDir('U')} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▲</button>
        <div />
        <button onPointerDown={() => controlDir('L')} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">◀</button>
        <button onPointerDown={() => controlDir('D')} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▼</button>
        <button onPointerDown={() => controlDir('R')} className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none">▶</button>
      </div>
    </div>
  );
}
