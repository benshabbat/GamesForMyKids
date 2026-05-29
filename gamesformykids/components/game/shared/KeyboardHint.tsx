interface HintEntry {
  key: string;
  label: string;
}

interface Props {
  hints: HintEntry[];
  className?: string;
}

export function KeyboardHint({ hints, className = '' }: Props) {
  return (
    <div className={`hidden md:flex gap-3 justify-center flex-wrap mt-2 ${className}`}>
      {hints.map(({ key, label }) => (
        <span key={key} className="inline-flex items-center gap-1 text-xs text-gray-400">
          <kbd className="px-1.5 py-0.5 rounded bg-white/80 border border-gray-300 font-mono text-xs text-gray-500 shadow-sm">
            {key}
          </kbd>
          <span>{label}</span>
        </span>
      ))}
    </div>
  );
}
