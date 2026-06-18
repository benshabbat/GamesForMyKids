'use client';
import type { Dir } from './LevelData';

const DIRS: Dir[] = ['↑', '↓', '←', '→'];
const DIR_LABELS: Record<Dir, string> = { '↑': 'למעלה', '↓': 'למטה', '←': 'שמאלה', '→': 'ימינה' };

type Props = {
  commands: Dir[];
  maxCommands: number;
  isRunning: boolean;
  animStep: number;
  onAdd: (dir: Dir) => void;
  onRemove: (idx: number) => void;
  onClear: () => void;
  onRun: () => void;
};

export default function CommandStrip({ commands, maxCommands, isRunning, animStep, onAdd, onRemove, onClear, onRun }: Props) {
  const slots = Array.from({ length: maxCommands }, (_, i) => commands[i] ?? null);

  return (
    <div className="flex flex-col gap-3 w-full items-center" dir="rtl">
      {/* Direction palette */}
      <div className="flex gap-2">
        {DIRS.map(dir => (
          <button
            key={dir}
            onClick={() => onAdd(dir)}
            disabled={isRunning || commands.length >= maxCommands}
            title={DIR_LABELS[dir]}
            className="w-12 h-12 rounded-xl bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300 border-2 border-indigo-300 text-indigo-700 text-2xl font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {dir}
          </button>
        ))}
      </div>

      {/* Command slots */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {slots.map((cmd, i) => (
          <button
            key={i}
            onClick={() => cmd && !isRunning && onRemove(i)}
            disabled={isRunning}
            className={`w-10 h-10 rounded-xl border-2 text-xl font-bold transition ${
              cmd
                ? i === animStep - 1 && isRunning
                  ? 'border-yellow-400 bg-yellow-200 text-yellow-800 scale-110'
                  : 'border-indigo-400 bg-indigo-100 text-indigo-700 hover:bg-red-100 hover:border-red-400 hover:text-red-600'
                : 'border-dashed border-gray-300 bg-gray-50 text-gray-300 cursor-default'
            }`}
          >
            {cmd ?? '+'}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={onClear}
          disabled={isRunning || commands.length === 0}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm transition disabled:opacity-40"
        >
          נקה
        </button>
        <button
          onClick={onRun}
          disabled={isRunning || commands.length === 0}
          className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-extrabold text-base transition disabled:opacity-40 shadow-md"
        >
          {isRunning ? '⚙️ רץ...' : '▶ הרץ!'}
        </button>
      </div>

      <p className="text-xs text-gray-400">
        {commands.length}/{maxCommands} פקודות • לחץ על פקודה להסרה
      </p>
    </div>
  );
}
