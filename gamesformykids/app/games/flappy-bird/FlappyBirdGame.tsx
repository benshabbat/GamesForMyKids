'use client';

import { useFlappyBirdGame, W, H } from './useFlappyBirdGame';

export default function FlappyBirdGame() {
  const { canvasRef, ui, handleInput } = useFlappyBirdGame();

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-sky-500 to-blue-700 flex flex-col items-center justify-center select-none"
      dir="rtl"
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleInput}
          onTouchStart={handleInput}
          className="rounded-3xl shadow-2xl cursor-pointer max-w-full"
          style={{ touchAction: 'none', maxHeight: '90vh', width: 'auto' }}
        />

        {/* Menu overlay */}
        {ui.phase === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-black/35">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-6xl mb-2">🐦</div>
              <h1 className="text-3xl font-black text-sky-600 mb-1">ציפור מעופפת</h1>
              <p className="text-gray-500 text-sm mb-5">הקש כדי לעוף!<br />עזור לציפור לעבור בין הצינורות</p>
              {ui.best > 0 && (
                <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {ui.best}</p>
              )}
              <button
                onClick={handleInput}
                className="w-full py-4 rounded-2xl bg-gradient-to-l from-sky-500 to-blue-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                🚀 התחל!
              </button>
            </div>
          </div>
        )}

        {/* Dead overlay */}
        {ui.phase === 'dead' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-black/40">
            <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
              <div className="text-5xl mb-2">💥</div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">נפלת!</h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-sky-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-sky-600">{ui.score}</p>
                  <p className="text-xs text-sky-400">ניקוד</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-3">
                  <p className="text-3xl font-black text-yellow-500">{ui.best}</p>
                  <p className="text-xs text-yellow-400">שיא</p>
                </div>
              </div>
              <button
                onClick={handleInput}
                className="w-full py-4 rounded-2xl bg-gradient-to-l from-sky-500 to-blue-600 text-white font-black text-xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                🔄 שוב!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
