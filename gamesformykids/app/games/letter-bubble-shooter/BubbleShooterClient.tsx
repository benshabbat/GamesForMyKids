'use client';
import { useBubbleShooterGame } from './useBubbleShooterGame';

export default function BubbleShooterClient() {
  const {
    phase, score, won, LETTERS, COLORS,
    canvasRef, startGame, handlePointer, handleTap,
  } = useBubbleShooterGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-7xl mb-4 motion-safe:animate-bounce">🫧</div>
        <h1 className="text-4xl font-bold text-white mb-3">ירי אותיות</h1>
        <p className="text-xl text-indigo-300 mb-2">ירה בועות אל עמודות של 3 אותיות זהות!</p>
        <div className="flex gap-6 mb-8 flex-wrap justify-center">
          {LETTERS.map(l => (
            <div key={l} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                style={{ background: COLORS[l] }}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={startGame}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-2xl font-bold px-12 py-5 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
          🎮 התחל!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-7xl mb-4">{won ? '🥇' : '💥'}</div>
        <h2 className="text-4xl font-bold text-white mb-2">{won ? 'ניצחת!' : 'ניסיון טוב!'}</h2>
        <p className="text-2xl text-indigo-300 mb-8">ניקוד: {score}</p>
        <button onClick={startGame}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-xl">
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  // playing
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center" dir="rtl">
      <div className="w-full max-w-md flex justify-between items-center px-4 py-3">
        <span className="text-white font-bold text-lg">⭐ {score}</span>
        <span className="text-indigo-300 text-sm">הזז אצבע לכיוון וגע כדי לירות</span>
      </div>
      <div className="relative w-full max-w-md flex-1 min-h-[520px]"
        onPointerMove={handlePointer}
        onClick={handleTap}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none cursor-crosshair"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
}
