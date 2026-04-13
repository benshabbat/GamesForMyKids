'use client';

interface DamkaMenuScreenProps {
  playerScore: number;
  computerScore: number;
  onStart: () => void;
}

export default function DamkaMenuScreen({ playerScore, computerScore, onStart }: DamkaMenuScreenProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="text-8xl">♟️</div>
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">דמקה</h1>
      <p className="text-amber-200 text-lg max-w-sm">
        משחק הדמקה הקלאסי נגד המחשב!<br />
        בחר האסימון האדום שלך וקפוץ מעל האסימונים הלבנים.<br />
        מי שיישאר עם קלפים ינצח! 👑
      </p>
      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex gap-6 text-white text-lg font-semibold">
          <span>🔴 אתה: {playerScore}</span>
          <span>⚪ מחשב: {computerScore}</span>
        </div>
      )}
      <button
        onClick={onStart}
        className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
      >
        🎮 התחל משחק
      </button>
      <div className="bg-black/30 rounded-xl p-4 text-amber-200 text-sm max-w-sm text-right space-y-1">
        <p className="font-bold text-white mb-2">כללים:</p>
        <p>🔴 האסימונים שלך = אדום (מלמטה↑)</p>
        <p>⚪ המחשב = לבן (מלמעלה↓)</p>
        <p>👑 הגע לצד השני להפוך למלך (זז בכל כיוון)</p>
        <p>⚡ חובה לקפוץ כשיש הזדמנות!</p>
        <p>🏆 נצח כשלמחשב אין אסימונים או מהלכים</p>
      </div>
    </div>
  );
}
