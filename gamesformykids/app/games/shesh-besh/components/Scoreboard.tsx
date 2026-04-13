import { useSheshBeshStore } from '../sheshBeshGameStore';
import { DieChip } from './DieChip';

export function Scoreboard() {
  const currentTurn = useSheshBeshStore(s => s.currentTurn);
  const playerScore = useSheshBeshStore(s => s.playerScore);
  const computerScore = useSheshBeshStore(s => s.computerScore);
  const rolledDice = useSheshBeshStore(s => s.rolledDice);
  const dice = useSheshBeshStore(s => s.dice);
  return (
    <>
      {/* Score pills + turn indicator */}
      <div className="flex items-center justify-between w-full px-1">
        <span className="bg-rose-900/70 border border-rose-700 text-rose-200 text-xs font-bold px-3 py-1 rounded-full">
          🔴 {playerScore} ניצ׳
        </span>
        <span className={[
          'text-xs font-extrabold px-3 py-1 rounded-full transition-colors',
          currentTurn === 'player' ? 'bg-amber-400 text-gray-900' : 'bg-gray-700 text-gray-300',
        ].join(' ')}>
          {currentTurn === 'player' ? '← תורך' : '⏳ מחשב...'}
        </span>
        <span className="bg-slate-700/70 border border-slate-600 text-slate-200 text-xs font-bold px-3 py-1 rounded-full">
          ⚪ {computerScore} ניצ׳
        </span>
      </div>

      {/* Dice row */}
      <div className="flex gap-2 items-center justify-center h-11">
        {rolledDice.map((d, i) => (
          <DieChip key={i} face={d} used={!dice.includes(d)} />
        ))}
      </div>
    </>
  );
}
