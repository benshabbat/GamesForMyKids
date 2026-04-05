'use client';

import { usePongGame, W, H, WIN_SCORE } from './usePongGame';
import PongScoreBar from './components/PongScoreBar';
import PongMenuOverlay from './components/PongMenuOverlay';
import PongResultOverlay from './components/PongResultOverlay';
import PongControls from './components/PongControls';

export default function PongGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleCanvasClick, playerWon, nudgeLeft, nudgeRight } = usePongGame();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <PongScoreBar aiScore={ui.aiScore} playerScore={ui.playerScore} />
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          className="rounded-3xl shadow-2xl border-4 border-slate-700 cursor-none"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <PongMenuOverlay winScore={WIN_SCORE} onStart={startGame} />
        )}

        {ui.phase === 'result' && (
          <PongResultOverlay
            playerWon={playerWon}
            playerScore={ui.playerScore}
            aiScore={ui.aiScore}
            onRestart={startGame}
          />
        )}
      </div>

      {ui.phase === 'playing' && (
        <PongControls onNudgeLeft={nudgeLeft} onNudgeRight={nudgeRight} />
      )}
    </div>
  );
}
