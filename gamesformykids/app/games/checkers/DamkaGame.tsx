'use client';

import { useDamkaGame } from './useDamkaGame';
import { DamkaMenuScreen, DamkaResultScreen, DamkaBoard, DamkaScoreBar } from './components';

export default function DamkaGame() {
  const { state, startGame, selectCell } = useDamkaGame();
  const { phase, board, selected, validMoves, currentTurn, playerScore, computerScore, message } = state;

  const playerPieces = board.flat().filter(c => c.color === 'player').length;
  const compPieces   = board.flat().filter(c => c.color === 'computer').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-950 to-stone-950 flex flex-col items-center justify-center p-4 select-none" dir="rtl">

      {phase === 'menu' && (
        <DamkaMenuScreen
          playerScore={playerScore}
          computerScore={computerScore}
          onStart={startGame}
        />
      )}

      {(phase === 'won' || phase === 'lost') && (
        <DamkaResultScreen
          phase={phase}
          playerScore={playerScore}
          computerScore={computerScore}
          onRestart={startGame}
        />
      )}

      {phase === 'playing' && (
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">
          <DamkaScoreBar
            playerPieces={playerPieces}
            compPieces={compPieces}
            playerScore={playerScore}
            computerScore={computerScore}
            currentTurn={currentTurn}
            message={message}
          />
          <DamkaBoard
            board={board}
            selected={selected}
            validMoves={validMoves}
            onCellClick={selectCell}
          />
        </div>
      )}
    </div>
  );
}
