'use client';

interface Props {
  symbol: string;
  label: string;
  score: number;
  isActive: boolean;
  reversed?: boolean;
}

export default function ChessPlayerPanel({ symbol, label, score, isActive, reversed = false }: Props) {
  return (
    <div className={[
      'flex items-center gap-2.5 flex-1 rounded-2xl px-3 py-2.5 transition-all duration-300 relative overflow-hidden',
      reversed ? 'flex-row-reverse' : '',
      isActive ? 'bg-white/15 shadow-lg shadow-black/30' : 'bg-white/[0.04]',
    ].join(' ')}>
      {isActive && (
        <div className="absolute inset-0 rounded-2xl ring-1 ring-amber-400/40 pointer-events-none" />
      )}
      <span className={`text-2xl leading-none transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'opacity-40'}`}>
        {symbol}
      </span>
      <div className={`${reversed ? 'text-right' : ''} flex-1`}>
        <div className="text-slate-400 text-[10px] uppercase tracking-wider leading-none">{label}</div>
        <div className={`text-sm font-extrabold leading-tight mt-0.5 transition-all duration-300 ${isActive ? 'text-amber-300' : 'text-slate-500'}`}>
          {score > 0 ? `${score} ✓` : '0'}
        </div>
      </div>
      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
    </div>
  );
}
