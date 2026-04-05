'use client';

import { useStackGame, W, H } from './useStackGame';

export default function StackGame() {
  const { canvasRef, ui, startGame, drop, handleCanvasClick } = useStackGame();


  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleCanvasClick}
          className="rounded-3xl shadow-2xl border-2 border-slate-700 cursor-pointer"
          style={{ touchAction: 'none', maxHeight: '80vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-60">
              <div className="text-5xl mb-3">🏗️</div>
              <h1 className="text-2xl font-black text-gray-700 mb-1">ערם לבנים</h1>
              <p className="text-gray-500 text-sm mb-5">לחץ / הקש בזמן הנכון<br/>ועצב מגדל גבוה!</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-xl hover:bg-blue-500 active:scale-95 transition-all">
                🏗️ התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-60">
              <div className="text-5xl mb-3">💔</div>
              <h2 className="text-2xl font-black text-gray-700 mb-3">נפל!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-blue-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-blue-600">{ui.score}</p>
                  <p className="text-xs text-blue-400">לבנים</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-xl hover:bg-blue-500 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <button
          onClick={drop}
          className="mt-4 bg-blue-600/80 text-white rounded-2xl px-14 py-4 font-black text-2xl active:bg-blue-400 transition-all touch-none"
        >
          ⬇ הפל!
        </button>
      )}
    </div>
  );
}
