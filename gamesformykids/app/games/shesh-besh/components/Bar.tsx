interface BarProps {
  playerBar: number;
  compBar: number;
  isSelected: boolean;
  onClickPlayer: () => void;
}

export function Bar({ playerBar, compBar, isSelected, onClickPlayer }: BarProps) {
  return (
    <div className="flex flex-col items-center justify-between w-10 bg-gradient-to-b from-amber-950 to-amber-900/80 border-x-2 border-amber-600/70">
      {/* Computer bar pieces (top) */}
      <div className="flex flex-col items-center gap-[3px] pt-2 flex-1 justify-start">
        {Array.from({ length: Math.min(compBar, 5) }).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 border border-gray-400 shadow-md" />
        ))}
        {compBar > 5 && <span className="text-[9px] text-gray-300 font-bold mt-0.5">×{compBar}</span>}
      </div>

      <div className="flex flex-col items-center gap-0.5 py-1">
        <div className="w-[2px] h-3 bg-amber-600/60 rounded-full" />
        <span className="text-amber-400 text-[9px] font-bold tracking-widest">בר</span>
        <div className="w-[2px] h-3 bg-amber-600/60 rounded-full" />
      </div>

      {/* Player bar pieces (bottom) — clickable */}
      <button
        onClick={onClickPlayer}
        aria-label="bar player"
        className={[
          'flex flex-col-reverse items-center gap-[3px] pb-2 flex-1 justify-start w-full rounded transition-all',
          isSelected ? 'ring-2 ring-yellow-400 ring-inset bg-yellow-400/10' : '',
        ].join(' ')}
      >
        {Array.from({ length: Math.min(playerBar, 5) }).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 border border-rose-300 shadow-md" />
        ))}
        {playerBar > 5 && <span className="text-[9px] text-rose-300 font-bold mt-0.5">×{playerBar}</span>}
      </button>
    </div>
  );
}
