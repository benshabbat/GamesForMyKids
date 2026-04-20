'use client';
import { useBalloonPopStore } from '../balloonPopStore';

export default function BalloonMenuScreen() {
  const best      = useBalloonPopStore(s => s.best);
  const startGame = useBalloonPopStore(s => s.startGame);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <div className="text-7xl mb-4 flex justify-center gap-1">🎈🎈🎈</div>
        <h1 className="text-4xl font-black text-white drop-shadow-lg mb-2">פוצץ בלונים!</h1>
        <p className="text-white/80 mb-6">הקש על בלונים לפני שהם עפים<br />הימנע מפצצות 💣</p>
        {best > 0 && <p className="text-yellow-200 font-bold mb-4">🏆 שיא: {best}</p>}
        <button
          onClick={startGame}
          className="px-12 py-5 rounded-2xl bg-gradient-to-l from-pink-500 to-rose-500 text-white font-black text-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🎈 התחל!
        </button>
      </div>
    </div>
  );
}
