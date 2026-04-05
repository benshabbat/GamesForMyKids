'use client';

import { useSpaceDefenderGame } from './useSpaceDefenderGame';

export default function SpaceDefenderGame() {
  const { canvasRef, ui, shoot, startGame, handleMouseMove, handleCanvasClick, handleTouchMove, handleTouchStart, nudgeLeft, nudgeRight } = useSpaceDefenderGame();


  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-5 mb-2 text-white text-center">
          <div><p className="text-2xl font-black text-yellow-300">{ui.score}</p><p className="text-xs text-yellow-500">ניקוד</p></div>
          <div><p className="text-2xl font-black text-red-300">{'❤️'.repeat(Math.max(0, ui.lives))}</p><p className="text-xs text-red-400">חיים</p></div>
          <div><p className="text-2xl font-black text-blue-200">{ui.timeLeft}s</p><p className="text-xs text-blue-400">זמן</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          className="rounded-3xl shadow-2xl border-4 border-indigo-700 cursor-crosshair"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/60">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🚀</div>
              <h1 className="text-2xl font-black text-indigo-700 mb-1">מגן החלל</h1>
              <p className="text-gray-500 text-sm mb-5">הזז את הספינה וירה באסטרואידים!<br />הגן על כדור הארץ 🌍</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-indigo-500 to-blue-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'result' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/60">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">{ui.lives === 0 ? '💥' : '🎉'}</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">{ui.lives === 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-indigo-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-indigo-600">{ui.score}</p>
                  <p className="text-xs text-indigo-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-indigo-500 to-blue-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.phase === 'playing' && (
        <div className="mt-3 flex gap-3">
          <button
            onPointerDown={nudgeLeft}
            className="bg-indigo-700/80 text-white rounded-xl px-6 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          >◄</button>
          <button
            onPointerDown={shoot}
            className="bg-yellow-500/90 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-yellow-400 touch-none"
          >💥 ירה!</button>
          <button
            onPointerDown={nudgeRight}
            className="bg-indigo-700/80 text-white rounded-xl px-6 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          >▶</button>
        </div>
      )}
    </div>
  );
}
