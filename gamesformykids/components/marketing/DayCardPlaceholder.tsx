interface Props {
  /** Tailwind gradient stops, e.g. "from-yellow-400 to-amber-500" (full literal so Tailwind sees it) */
  gradient: string;
  label: string;
  /** Height class of the action-button row, matching the real card */
  actionHeight?: string;
}

/**
 * Stable stand-in for the "of the day" cards until they mount and pick today's item.
 * Mirrors the real card's structure (label, emoji slot, text, button) to avoid layout jumps.
 */
export default function DayCardPlaceholder({ gradient, label, actionHeight = 'h-8' }: Props) {
  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-4 mt-3" aria-hidden="true">
      <div className={`rounded-2xl bg-linear-to-l ${gradient} text-white shadow-lg overflow-hidden`}>
        <div className="px-4 py-3">
          <p className="text-xs opacity-80 font-bold mb-2">{label}</p>
          <div className="flex items-start gap-3">
            <span className="text-4xl shrink-0 leading-none mt-0.5 invisible">⬜</span>
            <div className="flex-1 min-w-0">
              <div className="h-10 rounded-lg bg-white/20 motion-safe:animate-pulse" />
              <div className={`mt-2 w-28 rounded-xl bg-white/20 motion-safe:animate-pulse ${actionHeight}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
