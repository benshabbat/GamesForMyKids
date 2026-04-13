import { useSheshBeshStore } from '../sheshBeshGameStore';

/** Scores + dice display */
export function useGameScores() {
  const playerScore   = useSheshBeshStore(s => s.playerScore);
  const computerScore = useSheshBeshStore(s => s.computerScore);
  const rolledDice    = useSheshBeshStore(s => s.rolledDice);
  const dice          = useSheshBeshStore(s => s.dice);
  return { playerScore, computerScore, rolledDice, dice };
}
