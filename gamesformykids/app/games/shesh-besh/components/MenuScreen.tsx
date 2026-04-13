import { useSheshBeshStore } from '../sheshBeshGameStore';

export function MenuScreen() {
  const playerScore = useSheshBeshStore(s => s.playerScore);
  const computerScore = useSheshBeshStore(s => s.computerScore);
  const startGame = useSheshBeshStore(s => s.startGame);
  return (
    <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full mt-8">
      <div className="text-7xl drop-shadow-2xl">🎲</div>
      <h1 className="text-5xl font-extrabold text-amber-300 drop-shadow-lg tracking-wide">שש-בש</h1>
      <p className="text-amber-100/80 text-base leading-relaxed">
        משחק השש-בש הקלאסי נגד המחשב!<br />
        הטל קוביות, הזז אסימונים אדומים, ותהיה ראשון לרוקן הלוח!
      </p>

      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex gap-4 text-lg font-semibold">
          <span className="bg-rose-900/60 text-rose-200 px-4 py-1.5 rounded-full border border-rose-700">🔴 {playerScore}</span>
          <span className="bg-slate-700/60 text-slate-200 px-4 py-1.5 rounded-full border border-slate-500">⚪ {computerScore}</span>
        </div>
      )}

      <button
        onClick={startGame}
        className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-gray-900 font-extrabold text-xl px-12 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105"
      >
        🎮 התחל משחק
      </button>

      <div className="bg-black/30 border border-amber-800/40 rounded-2xl p-4 text-amber-200/80 text-sm text-right space-y-1.5 w-full">
        <p className="font-bold text-amber-300 mb-2">כיצד לשחק:</p>
        <p>🔴 אתה = אדום · זזים מ-24 ל-1</p>
        <p>⚪ מחשב = לבן · זזים מ-1 ל-24</p>
        <p>🎲 הטל קוביות ובחר אסימון</p>
        <p>💥 נחיתה על יחיד = שולח אותו לבר</p>
        <p>🏠 מגרש הבית שלך: נקודות 1–6</p>
        <p>✅ כשכל האסימונים בבית — ניתן לצאת</p>
      </div>
    </div>
  );
}
