interface BarProps {
  playerBar: number;
  compBar: number;
  isSelected: boolean;
  onClickPlayer: () => void;
}

export function Bar({ playerBar, compBar, isSelected, onClickPlayer }: BarProps) {
  return (
    <div className="flex flex-col items-center justify-between w-10 bg-amber-950/80 border-x-2 border-amber-700">
      {/* Computer bar pieces (top) */}
      <div className="flex flex-col items-center gap-[2px] pt-2 flex-1 justify-start">
        {Array.from({ length: Math.min(compBar, 5) }).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border border-gray-400 shadow" />
        ))}
        {compBar > 5 && <span className="text-[9px] text-gray-300 font-bold">×{compBar}</span>}
      </div>

      <span className="text-amber-400 text-[10px] font-bold tracking-wider py-1">בר</span>

      {/* Player bar pieces (bottom) — clickable */}
      <button
        onClick={onClickPlayer}
        aria-label="bar player"
        className={[
          'flex flex-col-reverse items-center gap-[2px] pb-2 flex-1 justify-start w-full',
          isSelected ? 'ring-2 ring-yellow-400 rounded' : '',
        ].join(' ')}
      >
        {Array.from({ length: Math.min(playerBar, 5) }).map((_, i) => (
          <div key={i} className="w-5 h-5 rounded-full bg-rose-500 border border-rose-300 shadow" />
        ))}
        {playerBar > 5 && <span className="text-[9px] text-rose-300 font-bold">×{playerBar}</span>}
      </button>
    </div>
  );
}
