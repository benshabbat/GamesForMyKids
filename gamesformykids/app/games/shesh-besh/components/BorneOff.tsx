interface BorneOffProps {
  playerCount: number;
  compCount: number;
  onBearOff: () => void;
  isBearOffTarget: boolean;
}

export function BorneOff({ playerCount, compCount, onBearOff, isBearOffTarget }: BorneOffProps) {
  return (
    <div className="flex flex-col items-center justify-between bg-amber-950/60 border-l-2 border-amber-700 px-2 py-2 w-14 h-full gap-2">
      {/* Computer borne off */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] text-gray-400 font-semibold">⚪</span>
        <div className="w-8 h-8 rounded-full bg-gray-200/20 border border-gray-500 flex items-center justify-center">
          <span className="text-gray-200 text-sm font-extrabold">{compCount}</span>
        </div>
      </div>

      <div className="text-amber-600 text-[10px] font-bold">OUT</div>

      {/* Player borne off — clickable target */}
      <button
        onClick={onBearOff}
        aria-label="bear off"
        className={[
          'flex flex-col items-center gap-1 rounded-xl p-1 transition-all',
          isBearOffTarget
            ? 'bg-emerald-500/40 ring-2 ring-emerald-400 scale-105 animate-pulse'
            : '',
        ].join(' ')}
      >
        <div className="w-8 h-8 rounded-full bg-rose-500/30 border border-rose-400 flex items-center justify-center">
          <span className="text-rose-200 text-sm font-extrabold">{playerCount}</span>
        </div>
        <span className="text-[9px] text-rose-400 font-semibold">🔴</span>
        {isBearOffTarget && <span className="text-[9px] text-emerald-300 font-bold">↩</span>}
      </button>
    </div>
  );
}
