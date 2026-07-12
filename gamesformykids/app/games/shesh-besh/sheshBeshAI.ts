import type { SheshState } from './sheshBeshTypes';
import {
  rollDie, expandDice, clonePoints,
  computerBestMove, applyMove,
} from './gameLogic';
import { PIECE_MOVE_MS, MOVE_STEP_GAP_MS } from './sheshBeshAnimation';

type GetState = () => SheshState;
type SetState = (partial: Partial<SheshState>) => void;
type Schedule = (fn: () => void, ms: number) => void;

/**
 * Runs the full computer-turn sequence, one die at a time, animating each
 * piece sliding to its destination before committing that step's state.
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

    // Play moves one at a time after a short visual pause
    schedule(() => {
      const cur0 = getState();
      if (cur0.phase !== 'computer') return;

      let remaining = [...cur0.dice];
      let pts = clonePoints(cur0.points);
      let barP = cur0.barPlayer;
      let barC = cur0.barComputer;
      let movedAny = false;

      const finish = () => {
        setState({
          points: pts, barPlayer: barP, barComputer: barC,
          dice: [], rolledDice: [], currentTurn: 'player', phase: 'rolling',
          message: movedAny ? 'תורך!' : 'המחשב לא יכול לזוז. תורך!',
        });
      };

      const step = () => {
        const move = computerBestMove(pts, barP, barC, remaining);
        if (!move) { finish(); return; }

        // Show the piece sliding before mutating the board
        setState({ animatingMove: { from: move.from, to: move.to, side: 'computer' } });

        schedule(() => {
          const r = applyMove(pts, barP, barC, move, 'computer');
          pts = r.pts; barP = r.barP; barC = r.barC;
          movedAny = true;
          const dieIdx = remaining.indexOf(move.die);
          remaining = remaining.filter((_, i) => i !== dieIdx);

          if (pts[25]!.computer === 15) {
            setState({
              points: pts, barPlayer: barP, barComputer: barC,
              dice: [], animatingMove: null, phase: 'lost',
              computerScore: cur0.computerScore + 1, message: '😢 המחשב ניצח!',
            });
            return;
          }

          setState({
            points: pts, barPlayer: barP, barComputer: barC, animatingMove: null,
            message: `המחשב: ${move.from < 0 ? 'בר' : move.from}→${move.to >= 25 ? 'סיים' : move.to}`,
          });

          if (remaining.length > 0) schedule(step, MOVE_STEP_GAP_MS);
          else finish();
        }, PIECE_MOVE_MS);
      };

      step();
    }, 700);
  }, 600);
}
