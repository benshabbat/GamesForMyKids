import type { SheshState } from './sheshBeshTypes';
import {
  rollDie, expandDice, clonePoints,
  computerBestMove, applyMove,
} from './gameLogic';

type GetState = () => SheshState;
type SetState = (partial: Partial<SheshState>) => void;
type Schedule = (fn: () => void, ms: number) => void;

/**
 * Runs the full computer-turn sequence.
 * `schedule` is injected so the caller controls the timer (no module globals).
 */
export function runComputerTurn(
  getState: GetState,
  setState: SetState,
  schedule: Schedule,
) {
  schedule(() => {
    const s = getState();
    if (s.currentTurn !== 'computer') return;

    // Roll computer dice
    const d1 = rollDie(), d2 = rollDie();
    const dice = expandDice(d1, d2);
    setState({ dice, rolledDice: [d1, d2], phase: 'computer', message: `המחשב הטיל ${d1}-${d2}` });

    // Play all moves after a short visual pause
    schedule(() => {
      const cur = getState();
      if (cur.phase !== 'computer') return;

      let remaining = [...cur.dice];
      let pts = clonePoints(cur.points);
      let barP = cur.barPlayer;
      let barC = cur.barComputer;
      const parts: string[] = [];

      while (remaining.length > 0) {
        const move = computerBestMove(pts, barP, barC, remaining);
        if (!move) break;
        const r = applyMove(pts, barP, barC, move, 'computer');
        pts = r.pts; barP = r.barP; barC = r.barC;
        parts.push(`${move.from < 0 ? 'בר' : move.from}→${move.to >= 25 ? 'סיים' : move.to}`);
        const dieIdx = remaining.indexOf(move.die);
        remaining = remaining.filter((_, i) => i !== dieIdx);
      }

      const msg = parts.length ? `המחשב: ${parts.join(', ')}. תורך!` : 'המחשב לא יכול לזוז. תורך!';

      if (pts[25]!.computer === 15) {
        setState({
          points: pts, barPlayer: barP, barComputer: barC, dice: [], phase: 'lost',
          computerScore: cur.computerScore + 1, message: '😢 המחשב ניצח!',
        });
        return;
      }

      setState({
        points: pts, barPlayer: barP, barComputer: barC,
        dice: [], rolledDice: [], currentTurn: 'player', phase: 'rolling', message: msg,
      });
    }, 1000);
  }, 600);
}
