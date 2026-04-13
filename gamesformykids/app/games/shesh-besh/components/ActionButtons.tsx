import { useSheshBeshStore } from '../sheshBeshGameStore';

export function ActionButtons() {
  const phase = useSheshBeshStore(s => s.phase);
  const currentTurn = useSheshBeshStore(s => s.currentTurn);
  const message = useSheshBeshStore(s => s.message);
  const canUndo = useSheshBeshStore(s => s.turnHistory.length > 0);
  const rollDice = useSheshBeshStore(s => s.rollDice);
  const undoMove = useSheshBeshStore(s => s.undoMove);
  return (
    <>
      {/* Status message */}
      <div className="h-7 flex items-center justify-center w-full">
        {message && (
          <p className="text-amber-200/80 text-xs font-medium bg-black/50 border border-amber-900/40 rounded-full py-1 px-5 text-center max-w-xs truncate">
            {message}
          </p>
        )}
      </div>

      {/* Roll / Undo buttons */}
      <div className="h-12 flex items-center justify-center gap-3">
        {phase === 'rolling' && currentTurn === 'player' && (
          <button
            onClick={rollDice}
            className={[
              'relative bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400',
              'active:scale-95 text-gray-900 font-extrabold px-10 py-3 rounded-xl',
              'shadow-[0_4px_0_#92400e,0_6px_20px_rgba(251,191,36,0.3)]',
              'hover:shadow-[0_4px_0_#92400e,0_6px_24px_rgba(251,191,36,0.4)]',
              'active:shadow-[0_1px_0_#92400e] active:translate-y-[3px]',
              'transition-all duration-150 text-base',
            ].join(' ')}
          >
            🎲 הטל קובייות
          </button>
        )}
        {phase === 'moving' && currentTurn === 'player' && canUndo && (
          <button
            onClick={undoMove}
            className={[
              'bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-bold',
              'px-5 py-2.5 rounded-xl transition-all duration-150 text-sm',
              'border border-slate-500 shadow-[0_3px_0_#0f172a]',
              'active:shadow-none active:translate-y-[2px]',
            ].join(' ')}
          >
            ↩ בטל מהלך
          </button>
        )}
      </div>
    </>
  );
}
