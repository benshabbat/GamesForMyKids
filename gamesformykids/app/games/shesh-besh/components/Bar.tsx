interface BarProps {
  playerBar: number;
  compBar: number;
  isSelected: boolean;
  onClickPlayer: () => void;
}

const disc = (isPlayer: boolean) =>
  isPlayer
    ? 'bg-gradient-to-br from-rose-300 via-rose-500 to-rose-800 border-rose-200/60'
    : 'bg-gradient-to-br from-white via-slate-100 to-slate-400 border-white/70';

export function Bar({ playerBar, compBar, isSelected, onClickPlayer }: BarProps) {
  return (
    <div
      className="flex flex-col items-center justify-between w-10 border-x-2 border-amber-900/60 relative"
      style={{ background: 'linear-gradient(180deg,#92400e 0%,#3b1505 50%,#92400e 100%)' }}
    >
      {/* Wood-grain lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(0,0,0,.4) 5px,rgba(0,0,0,.4) 6px)' }}
      />

      {/* Computer bar pieces (top) */}
      <div className="relative z-10 flex flex-col items-center gap-[3px] pt-2 flex-1 justify-start">
        {Array.from({ length: Math.min(compBar, 5) }).map((_, i) => (
          <div key={i} className={['w-[26px] h-[15px] rounded-full border-2 shadow-[0_2px_5px_rgba(0,0,0,.7)]', disc(false)].join(' ')} />
        ))}
        {compBar > 5 && <span className="text-[9px] text-gray-300 font-bold mt-0.5">×{compBar}</span>}
      </div>

      {/* Center label */}
      <div className="relative z-10 flex flex-col items-center gap-0.5 py-1">
        <div className="w-px h-3 bg-amber-400/50 rounded-full" />
        <span className="text-amber-400/80 text-[9px] font-bold tracking-widest">בר</span>
        <div className="w-px h-3 bg-amber-400/50 rounded-full" />
      </div>

      {/* Player bar pieces (bottom) — clickable */}
      <button
        onClick={onClickPlayer}
        aria-label="bar player"
        className={[
          'relative z-10 flex flex-col-reverse items-center gap-[3px] pb-2 flex-1 justify-start w-full rounded transition-all',
          isSelected ? 'ring-2 ring-yellow-400 ring-inset bg-yellow-400/10' : '',
        ].join(' ')}
      >
        {Array.from({ length: Math.min(playerBar, 5) }).map((_, i) => (
          <div key={i} className={['w-[26px] h-[15px] rounded-full border-2 shadow-[0_2px_5px_rgba(0,0,0,.7)]', disc(true)].join(' ')} />
        ))}
        {playerBar > 5 && <span className="text-[9px] text-rose-300 font-bold mt-0.5">×{playerBar}</span>}
      </button>
    </div>
  );
}
