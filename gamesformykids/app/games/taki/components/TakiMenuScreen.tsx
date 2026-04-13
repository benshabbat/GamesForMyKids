'use client';

interface TakiMenuScreenProps {
  playerScore: number;
  computerScore: number;
  onStart: () => void;
}

export default function TakiMenuScreen({ playerScore, computerScore, onStart }: TakiMenuScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 text-center">
      <div className="text-8xl">🃏</div>
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">טאקי</h1>
      <p className="text-green-200 text-lg max-w-sm">
        משחק הקלפים הישראלי הקלאסי — שחק נגד המחשב!<br />
        שחק קלפים באותו צבע או ערך, השתמש בקלפים מיוחדים,<br />
        וריקן את היד ראשון כדי לנצח! 🏆
      </p>
      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex gap-6 text-white text-lg font-semibold">
          <span>🧑 אתה: {playerScore}</span>
          <span>🤖 מחשב: {computerScore}</span>
        </div>
      )}
      <button
        onClick={onStart}
        className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
      >
        🎮 התחל משחק
      </button>
      <div className="bg-black/30 rounded-xl p-4 text-green-200 text-sm max-w-sm text-right space-y-1">
        <p className="font-bold text-white mb-2">כללים בקצרה:</p>
        <p>🃏 <strong>טאקי</strong> — שחק קלפים באותו צבע ולחץ &ldquo;סגור&rdquo;</p>
        <p>✋ <strong>עצור</strong> — המתנגד מדלג תור</p>
        <p>+2 <strong>פלוס</strong> — המתנגד מושך 2 קלפים</p>
        <p>🌈 <strong>שנה צבע</strong> — בחר צבע חדש</p>
        <p>👑 <strong>מלך</strong> — שנה צבע + עצור</p>
        <p>⭐ <strong>סופר טאקי</strong> — טאקי עם כל צבע</p>
      </div>
    </div>
  );
}
