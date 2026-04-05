'use client';

import { useMeteorDodgeGame } from './useMeteorDodgeGame';

export default function MeteorDodgeGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleCanvasClick, handleTouchStart, nudgeLeft, nudgeRight } = useMeteorDodgeGame();


  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-2 text-white text-center">
          <div><p className="text-2xl font-black text-yellow-300">{ui.score}</p><p className="text-xs text-yellow-500">ניקוד</p></div>
          <div><p className="text-2xl font-black text-gray-400">{ui.best}</p><p className="text-xs text-gray-500">שיא</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          className="rounded-3xl shadow-2xl border-4 border-slate-700 cursor-none"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">☄️</div>
              <h1 className="text-2xl font-black text-slate-700 mb-1">התחמק ממטאורים</h1>
              <p className="text-gray-500 text-sm mb-5">הזז את הספינה 🚀 והימנע ממטאורים<br />אסוף כוכבים ⭐ לנקודות בונוס!</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-violet-600 to-purple-700 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">💥</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">הוכית!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-violet-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-violet-600">{ui.score}</p>
                  <p className="text-xs text-violet-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-violet-600 to-purple-700 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-4">
          <button onPointerDown={nudgeLeft} className="bg-violet-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-violet-500 touch-none">◀</button>
          <button onPointerDown={nudgeRight} className="bg-violet-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-violet-500 touch-none">▶</button>
        </div>
      )}
    </div>
  );
}
