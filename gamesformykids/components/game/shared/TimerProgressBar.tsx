'use client';

interface Props {
  /** Percentage full, 0–100 */
  pct: number;
  /** Tailwind classes for the track (container), e.g. "h-3 bg-white/30" */
  trackClass?: string;
  /** Tailwind classes for the bar fill. Omit to use green→yellow→red thresholds. */
  barClass?: string;
}

export default function TimerProgressBar({ pct, trackClass = 'h-3 bg-white/30', barClass }: Props) {
  const fillClass = barClass ?? (
    pct > 50 ? 'bg-green-400' : pct > 25 ? 'bg-yellow-400' : 'bg-red-400'
  );
  return (
    <div className={`${trackClass} rounded-full overflow-hidden`}>
      <div
        className={`h-full rounded-full transition-all duration-1000 ${fillClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
