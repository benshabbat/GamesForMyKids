interface BorneOffProps {
  playerCount: number;
  compCount: number;
  onBearOff: () => void;
  isBearOffTarget: boolean;
}

const TOTAL = 15;

export function BorneOff({ playerCount, compCount, onBearOff, isBearOffTarget }: BorneOffProps) {
  return (
    <div
      className="flex flex-col items-center justify-between border-l-2 border-amber-900/60 px-1.5 py-3 w-16 h-full gap-2 relative"
      style={{ background: 'linear-gradient(180deg,#92400e 0%,#3b1505 50%,#92400e 100%)' }}
    >
      {/* Wood-grain lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(0,0,0,.4) 5px,rgba(0,0,0,.4) 6px)' }}
      />

      {/* Computer borne off */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 w-full">
        <span className="text-[8px] text-gray-400 font-bold tracking-wider">מחשב</span>
        <div className="flex flex-wrap gap-[3px] justify-center w-full">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-[8px] rounded-full transition-colors ${
                i < compCount
                  ? 'bg-gradient-to-br from-white to-slate-300 shadow-sm'
                  : 'bg-black/40'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-300 text-[11px] font-extrabold leading-none">{compCount}/15</span>
      </div>

      <div className="relative z-10 w-3/4 border-t border-amber-700/40" />

      {/* Player borne off — clickable bear-off target */}
      <button
        onClick={onBearOff}
        aria-label="bear off"
        className={[
          'relative z-10 flex flex-col items-center gap-1.5 rounded-xl px-1 py-1.5 w-full transition-all duration-200',
          isBearOffTarget ? 'bg-emerald-500/25 ring-2 ring-emerald-400/80 scale-105' : '',
        ].join(' ')}
      >
        <div className="flex flex-wrap gap-[3px] justify-center w-full">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-[8px] rounded-full transition-colors ${
                i < playerCount
                  ? 'bg-gradient-to-br from-rose-300 to-rose-600 shadow-sm shadow-rose-900/50'
                  : 'bg-black/40'
              }`}
            />
          ))}
        </div>
        <span className="text-rose-300 text-[11px] font-extrabold leading-none">{playerCount}/15</span>
        <span className="text-[8px] text-rose-400/70 font-bold tracking-wider">
          {isBearOffTarget ? '✓ צא' : 'שלך'}
        </span>
      </button>
    </div>
  );
}
