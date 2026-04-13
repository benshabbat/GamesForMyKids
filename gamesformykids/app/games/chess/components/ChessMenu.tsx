'use client';

import { useChessStore } from '../store/useChessStore';

export default function ChessMenu() {
  const { playerScore, computerScore, startGame } = useChessStore();

  return (
    <div className="flex flex-col items-center gap-8 text-center max-w-sm">
      <div className="text-8xl">♟</div>
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">שחמט</h1>
      <p className="text-slate-300 text-lg">
        משחק השחמט הקלאסי נגד המחשב!<br />
        אתה משחק לבן (♙) מהצד התחתון.
      </p>
      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex gap-6 text-white text-lg font-semibold">
          <span>♙ אתה: {playerScore}</span>
          <span>♟ מחשב: {computerScore}</span>
        </div>
      )}
      <button
        onClick={startGame}
        className="bg-slate-200 hover:bg-white text-slate-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
      >
        🎮 התחל משחק
      </button>
      <div className="bg-black/30 rounded-xl p-4 text-slate-300 text-sm text-right space-y-1">
        <p className="font-bold text-white mb-1">טיפים:</p>
        <p>♙ רגלי: מתקדם קדימה, תוקף באלכסון</p>
        <p>♞ פרש: קפיצת L - עובר מעל כלים אחרים</p>
        <p>♝ רץ: אלכסונים בלבד (כמה שרוצה)</p>
        <p>♜ צריח: קוים ישרים (כמה שרוצה)</p>
        <p>♛ מלכה: כל כיוון!</p>
        <p>♚ מלך: כיוון אחד בכל פנייה</p>
        <p>🏰 רוקד: מלך זז 2 שלבים כשניתן</p>
      </div>
    </div>
  );
}
