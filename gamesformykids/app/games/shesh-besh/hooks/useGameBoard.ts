import { useSheshBeshStore } from '../sheshBeshGameStore';

/** Board geometry + interaction state */
export function useGameBoard() {
  const points      = useSheshBeshStore(s => s.points);
  const barPlayer   = useSheshBeshStore(s => s.barPlayer);
  const barComputer = useSheshBeshStore(s => s.barComputer);
  const selected    = useSheshBeshStore(s => s.selected);
  const validMoves  = useSheshBeshStore(s => s.validMoves);
  const selectPoint = useSheshBeshStore(s => s.selectPoint);
  return { points, barPlayer, barComputer, selected, validMoves, selectPoint };
}
