import { useSheshBeshStore } from '../sheshBeshGameStore';
import { DieChip } from './DieChip';

export function Scoreboard() {
  const currentTurn = useSheshBeshStore(s => s.currentTurn);
  const playerScore = useSheshBeshStore(s => s.playerScore);
  const computerScore = useSheshBeshStore(s => s.computerScore);
  const rolledDice = useSheshBeshStore(s => s.rolledDice);
  const dice = useSheshBeshStore(s => s.dice);
  const usedSet = [...dice];
  const remaining = rolledDice.map(d => {
    const idx = usedSet.indexOf(d);
    if (idx !== -1) { usedSet.splice(idx, 1); return false; }
    return true;
  });

  return (
    <>
      {/* Score + turn HUD */}
      <div className="flex items-center justify-between w-full px-1 gap-2">
        <div className="flex items-center gap-2 bg-rose-950/60 border border-rose-800/50 rounded-xl px-3 py-1.5">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-sm" />
          <span className="text-rose-200 text-xs font-extrabold">{playerScore}</span>
        </div>

        <div className={[
          'flex-1 flex items-center justify-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl border transition-all duration-300',
          currentTurn === 'player'
            ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
            : 'bg-gray-800/60 border-gray-700/50 text-gray-400',
        ].join(' ')}>
          {currentTurn === 'player' ? <><span>תורך</span><span>←</span></> : <><span>⏳</span><span>מחשב...</span></>}
        </div>

        <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-xl px-3 py-1.5">
          <span className="text-slate-200 text-xs font-extrabold">{computerScore}</span>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-sm" />
        </div>
      </div>

      {/* Dice row */}
      <div className="flex gap-3 items-center justify-center h-14">
        {rolledDice.map((d, i) => (
          <DieChip key={i} face={d} used={remaining[i]} />
        ))}
      </div>
    </>
  );
}
