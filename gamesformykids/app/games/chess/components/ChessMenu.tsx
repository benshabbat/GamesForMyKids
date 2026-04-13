'use client';

import { useChessStore } from '../store/useChessStore';

export default function ChessMenu() {
  const { playerScore, computerScore, startGame } = useChessStore();

  return (
    <div className="flex flex-col items-center gap-5 text-center w-full max-w-sm">
      {/* Title card */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl px-8 py-7 w-full shadow-2xl">
        <div className="text-7xl mb-4" style={{ display: 'inline-block', animation: 'float 3s ease-in-out infinite' }}>♟</div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-2">
          שחמט
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          שחמט קלאסי נגד המחשב<br />
          אתה משחק לבן (♙) מהצד התחתון
        </p>
      </div>

      {/* Scores — shown only after first game */}
      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex gap-3 w-full">
          <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl py-3 text-center">
            <div className="text-3xl leading-none mb-1">♙</div>
            <div className="text-amber-300 font-extrabold text-lg leading-none">{playerScore}</div>
            <div className="text-slate-400 text-[11px] mt-0.5">ניצחונות</div>
          </div>
          <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl py-3 text-center">
            <div className="text-3xl leading-none mb-1">♟</div>
            <div className="text-amber-300 font-extrabold text-lg leading-none">{computerScore}</div>
            <div className="text-slate-400 text-[11px] mt-0.5">ניצחונות</div>
          </div>
        </div>
      )}

      <button
        onClick={startGame}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl shadow-amber-900/40 transition-all hover:scale-105 active:scale-95"
      >
        🎮 התחל משחק
      </button>

      {/* Tips */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-300 text-sm text-right w-full">
        <p className="font-bold text-white mb-2 text-sm">כללי הכלים:</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-400">
          <p>♙ רגלי — קדימה, תוקף באלכסון</p>
          <p>♞ פרש — קפיצת L</p>
          <p>♝ רץ — אלכסונים</p>
          <p>♜ צריח — קוים ישרים</p>
          <p>♛ מלכה — כל כיוון</p>
          <p>♚ מלך — צעד אחד</p>
        </div>
        <p className="mt-2 text-slate-500 text-xs">🏰 רוקד: מלך זז 2 שלבים כשניתן</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
