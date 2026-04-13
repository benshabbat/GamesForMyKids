import { useGameStatus }  from '../hooks';
import { useGameScores }  from '../hooks';
import { useGameActions } from '../hooks';

export function GameOverScreen() {
  const { phase, message }             = useGameStatus();
  const won                            = (phase as string) === 'won';
  const { playerScore, computerScore } = useGameScores();
  const { startGame }                  = useGameActions();

  return (
    <div className="flex flex-col items-center gap-6 text-center mt-12">
      <div className="text-8xl drop-shadow-2xl">{won ? '🎉' : '😢'}</div>
      <div className={[
        'text-5xl font-extrabold tracking-wide bg-clip-text text-transparent',
        won
          ? 'bg-gradient-to-b from-yellow-200 to-amber-400'
          : 'bg-gradient-to-b from-slate-300 to-slate-500',
      ].join(' ')}>
        {won ? 'ניצחת!' : 'הפסדת'}
      </div>
      <p className="text-white/70 text-sm">{message}</p>

      {/* Score summary */}
      <div className="flex gap-4 text-sm font-bold">
        <div className={`flex items-center gap-2 rounded-xl px-5 py-2.5 border ${
          won ? 'bg-rose-900/80 border-rose-600 ring-2 ring-rose-400' : 'bg-rose-950/50 border-rose-900'
        }`}>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-400 to-rose-600" />
          <span className="text-rose-200">{playerScore}</span>
        </div>
        <div className={`flex items-center gap-2 rounded-xl px-5 py-2.5 border ${
          !won ? 'bg-slate-700/80 border-slate-500 ring-2 ring-slate-300' : 'bg-slate-800/50 border-slate-800'
        }`}>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-300" />
          <span className="text-slate-200">{computerScore}</span>
        </div>
      </div>

      <button
        onClick={startGame}
        className={[
          'bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400',
          'active:scale-95 text-gray-900 font-extrabold text-xl px-12 py-4 rounded-2xl',
          'shadow-[0_5px_0_#92400e,0_6px_24px_rgba(251,191,36,0.3)]',
          'active:shadow-[0_2px_0_#92400e] active:translate-y-[3px]',
          'transition-all duration-150 mt-2',
        ].join(' ')}
      >
        🔄 שחק שוב
      </button>
    </div>
  );
}
