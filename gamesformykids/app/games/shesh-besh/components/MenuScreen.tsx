import { useGameScores }  from '../hooks';
import { useGameActions } from '../hooks';

export function MenuScreen() {
  const { playerScore, computerScore } = useGameScores();
  const { startGame }                  = useGameActions();
  return (
    <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full mt-6">
      {/* Title */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-6xl drop-shadow-2xl">🎲</div>
        <h1 className="text-6xl font-extrabold tracking-wide bg-gradient-to-b from-yellow-200 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
          שש-בש
        </h1>
        <p className="text-amber-200/70 text-sm">
          משחק הקלאסי נגד המחשב
        </p>
      </div>

      {/* Previous scores */}
      {(playerScore > 0 || computerScore > 0) && (
        <div className="flex gap-3 text-sm font-bold">
          <div className="flex items-center gap-2 bg-rose-950/70 border border-rose-800/60 rounded-xl px-4 py-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-400 to-rose-600" />
            <span className="text-rose-200">{playerScore} ניצחונות</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/60 rounded-xl px-4 py-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-300" />
            <span className="text-slate-200">{computerScore} ניצחונות</span>
          </div>
        </div>
      )}

      {/* Start button */}
      <button
        onClick={startGame}
        className={[
          'bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400',
          'active:scale-95 text-gray-900 font-extrabold text-xl px-14 py-4 rounded-2xl',
          'shadow-[0_6px_0_#92400e,0_8px_30px_rgba(251,191,36,0.35)]',
          'hover:shadow-[0_6px_0_#92400e,0_8px_36px_rgba(251,191,36,0.45)]',
          'active:shadow-[0_2px_0_#92400e] active:translate-y-[4px]',
          'transition-all duration-150',
        ].join(' ')}
      >
        🎮 התחל משחק
      </button>

      {/* Rules */}
      <div className="bg-black/30 border border-amber-800/30 rounded-2xl p-4 text-sm text-right w-full space-y-1.5">
        <p className="font-bold text-amber-300 mb-2.5 text-center text-base">כיצד לשחק</p>
        {([
          ['🔴', 'אתה = אדום · זזים מ-24 ל-1'],
          ['⚪', 'מחשב = לבן · זזים מ-1 ל-24'],
          ['🎲', 'הטל קוביות ובחר אסימון'],
          ['💥', 'נחיתה על יחיד = שולח לבר'],
          ['🏠', 'מגרש הבית שלך: נקודות 1–6'],
          ['✅', 'כשכולם בבית — ניתן לצאת'],
        ] as [string, string][]).map(([icon, text]) => (
          <div key={text} className="flex items-center gap-2 text-amber-200/75">
            <span className="text-base w-6 text-center">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
