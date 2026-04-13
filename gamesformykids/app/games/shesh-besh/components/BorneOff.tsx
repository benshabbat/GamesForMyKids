interface BorneOffProps {
  playerCount: number;
  compCount: number;
  onBearOff: () => void;
  isBearOffTarget: boolean;
}

const TOTAL = 15;

export function BorneOff({ playerCount, compCount, onBearOff, isBearOffTarget }: BorneOffProps) {
  return (
    <div className="flex flex-col items-center justify-between bg-gradient-to-b from-amber-950 to-amber-900/60 border-l-2 border-amber-600/70 px-2 py-3 w-16 h-full gap-2">
      {/* Computer borne off */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">מחשב</span>
        <div className="flex flex-wrap gap-[3px] justify-center w-full">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i < compCount ? 'bg-gray-300 shadow-sm' : 'bg-gray-700'
            }`} />
          ))}
        </div>
        <span className="text-gray-300 text-xs font-extrabold">{compCount}</span>
      </div>

      <div className="w-full border-t border-amber-700/50" />

      {/* Player borne off — clickable target */}
      <button
        onClick={onBearOff}
        aria-label="bear off"
        className={[
          'flex flex-col items-center gap-1.5 rounded-xl p-1 w-full transition-all duration-200',
          isBearOffTarget
            ? 'bg-emerald-500/30 ring-2 ring-emerald-400 scale-105'
            : '',
        ].join(' ')}
      >
        <div className="flex flex-wrap gap-[3px] justify-center w-full">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i < playerCount
                ? 'bg-rose-400 shadow-sm shadow-rose-900/50'
                : 'bg-gray-700'
            }`} />
          ))}
        </div>
        <span className="text-rose-300 text-xs font-extrabold">{playerCount}</span>
        <span className="text-[8px] text-rose-400 font-bold uppercase tracking-wider">
          {isBearOffTarget ? '✓ צא' : 'שלך'}
        </span>
      </button>
    </div>
  );
}
