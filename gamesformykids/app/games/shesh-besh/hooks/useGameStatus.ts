import { useSheshBeshStore } from '../sheshBeshGameStore';

/** Phase, turn, and message */
export function useGameStatus() {
  const phase       = useSheshBeshStore(s => s.phase);
  const currentTurn = useSheshBeshStore(s => s.currentTurn);
  const message     = useSheshBeshStore(s => s.message);
  return { phase, currentTurn, message };
}
