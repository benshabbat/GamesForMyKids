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
        <p className="text-amber-200/90 text-xs font-medium bg-black/40 rounded-full py-1 px-4 text-center max-w-xs truncate">
          {message}
        </p>
      </div>

      {/* Roll / Undo buttons */}
      <div className="h-12 flex items-center justify-center gap-3">
        {phase === 'rolling' && currentTurn === 'player' && (
          <button
            onClick={rollDice}
            className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-gray-900 font-extrabold px-10 py-3 rounded-xl shadow-lg transition-all hover:scale-105 text-base"
          >
            🎲 הטל קובייות
          </button>
        )}
        {phase === 'moving' && currentTurn === 'player' && canUndo && (
          <button
            onClick={undoMove}
            className="bg-slate-600 hover:bg-slate-500 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl shadow transition-all text-sm border border-slate-400"
          >
            ↩️ בטל מהלך
          </button>
        )}
      </div>
    </>
  );
}
