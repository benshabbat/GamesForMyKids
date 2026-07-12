interface BorneOffProps {
  playerCount: number;
  compCount: number;
  onBearOff: () => void;
  isBearOffTarget: boolean;
  playerRef?: (el: HTMLButtonElement | null) => void;
  computerRef?: (el: HTMLDivElement | null) => void;
}

const TOTAL = 15;

export function BorneOff({ playerCount, compCount, onBearOff, isBearOffTarget, playerRef, computerRef }: BorneOffProps) {
  return (
    <div
      className="flex flex-col items-center justify-between border-l-2 border-amber-900/60 px-1.5 py-3 h-full gap-2 relative"
      style={{ flex: '64 64 0%', background: 'linear-gradient(180deg,#92400e 0%,#3b1505 50%,#92400e 100%)' }}
    >
      {/* Wood-grain lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(0,0,0,.4) 5px,rgba(0,0,0,.4) 6px)' }}
      />

      {/* Computer borne off */}
      <div ref={computerRef} className="relative z-10 flex flex-col items-center gap-1.5 w-full">
        <span className="text-[clamp(7px,1.6vw,10px)] text-gray-400 font-bold">מחשב</span>
        <div className="flex flex-wrap gap-[3px] justify-center w-full">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`w-[clamp(7px,2vw,13px)] aspect-[3/2] rounded-full transition-colors ${
                i < compCount
                  ? 'bg-gradient-to-br from-white to-slate-300 shadow-sm'
                  : 'bg-black/40'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-300 text-[clamp(9px,2.2vw,13px)] font-extrabold leading-none">{compCount}/15</span>
      </div>

      <div className="relative z-10 w-3/4 border-t border-amber-700/40" />

      {/* Player borne off — clickable bear-off target */}
      <button
        ref={playerRef}
        onClick={onBearOff}
        aria-label="bear off"
        className={[
          'relative z-10 flex flex-col items-center gap-1.5 rounded-xl px-1 py-1.5 w-full transition duration-200',
          isBearOffTarget ? 'bg-emerald-500/25 ring-2 ring-emerald-400/80 scale-105' : '',
        ].join(' ')}
      >
        <div className="flex flex-wrap gap-[3px] justify-center w-full">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`w-[clamp(7px,2vw,13px)] aspect-[3/2] rounded-full transition-colors ${
                i < playerCount
                  ? 'bg-gradient-to-br from-rose-300 to-rose-600 shadow-sm shadow-rose-900/50'
                  : 'bg-black/40'
              }`}
            />
          ))}
        </div>
        <span className="text-rose-300 text-[clamp(9px,2.2vw,13px)] font-extrabold leading-none">{playerCount}/15</span>
        <span className="text-[clamp(7px,1.6vw,10px)] text-rose-400/70 font-bold">
          {isBearOffTarget ? '✓ צא' : 'שלך'}
        </span>
      </button>
    </div>
  );
}
