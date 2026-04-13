import { useSheshBeshStore } from '../sheshBeshGameStore';

/** All player-invoked actions */
export function useGameActions() {
  const startGame = useSheshBeshStore(s => s.startGame);
  const rollDice  = useSheshBeshStore(s => s.rollDice);
  const undoMove  = useSheshBeshStore(s => s.undoMove);
  const canUndo   = useSheshBeshStore(s => s.turnHistory.length > 0);
  return { startGame, rollDice, undoMove, canUndo };
}
