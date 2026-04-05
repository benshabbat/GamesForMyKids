'use client';

import { useCatchFruitGame } from './useCatchFruitGame';

export default function CatchFruitGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleMouseDown, handleMouseUp, handleTouchMove, handleTouchStart } = useCatchFruitGame();


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-950 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {/* HUD */}
      {ui.phase === 'playing' && (
        <div className="flex gap-5 mb-3 text-white text-center">
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing border-4 border-purple-700"
          style={{ touchAction: 'none', maxHeight: '80vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/50">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">🧺</div>
              <h1 className="text-2xl font-black text-purple-700 mb-1">תפוס פירות!</h1>
              <p className="text-gray-500 text-sm mb-5">הزز את הסל ותפוס פירות<br />הימנע מהפצצות 💣</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'result' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/50">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">{ui.lives === 0 ? '💔' : '🎉'}</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">{ui.lives === 0 ? 'נגמרו החיים!' : 'הזמן נגמר!'}</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-purple-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-purple-600">{ui.score}</p>
                  <p className="text-xs text-purple-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={startGame} className="w-full py-4 rounded-2xl bg-gradient-to-l from-purple-500 to-indigo-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
