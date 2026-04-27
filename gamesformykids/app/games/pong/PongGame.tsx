'use client';

import { usePongGame, W, H, WIN_SCORE } from './usePongGame';
import PongScoreBar from './components/PongScoreBar';
import PongMenuOverlay from './components/PongMenuOverlay';
import PongResultOverlay from './components/PongResultOverlay';
import PongControls from './components/PongControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function PongGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleCanvasClick, playerWon, nudgeLeft, nudgeRight } = usePongGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-3xl shadow-2xl border-4 border-slate-700 cursor-none"
      canvasStyle={{ maxHeight: '85vh', width: 'auto' }}
      canvasProps={{ onMouseMove: handleMouseMove, onTouchMove: handleTouchMove, onClick: handleCanvasClick, onTouchStart: handleTouchStart }}
      hud={ui.phase === 'playing' && <PongScoreBar aiScore={ui.aiScore} playerScore={ui.playerScore} />}
      overlays={<>
        {ui.phase === 'menu' && <PongMenuOverlay winScore={WIN_SCORE} onStart={startGame} />}
        {ui.phase === 'result' && (
          <PongResultOverlay playerWon={playerWon} playerScore={ui.playerScore} aiScore={ui.aiScore} onRestart={startGame} />
        )}
      </>}
      controls={ui.phase === 'playing' && <PongControls onNudgeLeft={nudgeLeft} onNudgeRight={nudgeRight} />}
    />
  );
}
