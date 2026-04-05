'use client';

import { useDinoRunnerGame, W, H } from './useDinoRunnerGame';

export default function DinoRunnerGame() {
  const { canvasRef, ui, jump, handleTap } = useDinoRunnerGame();


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <div className="flex gap-6 mb-4 text-center">
          <div><p className="text-2xl font-black text-amber-700">{ui.score}</p><p className="text-xs text-amber-500">מפגש</p></div>
          <div><p className="text-2xl font-black text-gray-600">{ui.best}</p><p className="text-xs text-gray-400">שיא</p></div>
        </div>
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleTap}
          onTouchStart={handleTap}
          className="rounded-3xl shadow-2xl cursor-pointer border-4 border-amber-300"
          style={{ touchAction: 'none', maxWidth: '100%' }}
        />

        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/35">
            <div className="bg-white rounded-3xl p-6 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">🦖</div>
              <h1 className="text-2xl font-black text-amber-700 mb-1">דינוזאור קופץ</h1>
              <p className="text-gray-500 text-sm mb-4">הקש כדי לקפוץ מעל המכשולים!</p>
              {ui.best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>}
              <button onClick={handleTap} className="w-full py-3 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/40">
            <div className="bg-white rounded-3xl p-6 text-center shadow-2xl w-64">
              <div className="text-5xl mb-2">😵</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">אוי!</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-amber-50 rounded-2xl p-3">
                  <p className="text-2xl font-black text-amber-600">{ui.score}</p>
                  <p className="text-xs text-amber-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-2xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button onClick={handleTap} className="w-full py-3 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all">
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-amber-600 text-sm font-medium">הקש / לחץ מקש רווח לקפוץ</p>
    </div>
  );
}
