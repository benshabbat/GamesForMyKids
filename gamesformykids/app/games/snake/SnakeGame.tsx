'use client';

import { useSnakeGame, W, H } from './useSnakeGame';
import SnakeScoreBar from './components/SnakeScoreBar';
import SnakeMenuOverlay from './components/SnakeMenuOverlay';
import SnakeGameOverOverlay from './components/SnakeGameOverOverlay';
import SnakeTouchControls from './components/SnakeTouchControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function SnakeGame() {
  const { canvasRef, ui, startGame, handleTouchStart, handleTouchEnd, controlDir } = useSnakeGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-950 flex flex-col items-center justify-center p-4 select-none"
      canvasClassName="rounded-2xl shadow-2xl border-4 border-green-700"
      canvasStyle={{ maxHeight: '60vh', width: 'auto' }}
      canvasProps={{ onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd }}
      hud={ui.phase === 'playing' && <SnakeScoreBar score={ui.score} level={ui.level} best={ui.best} />}
      overlays={<>
        {ui.phase === 'menu' && <SnakeMenuOverlay best={ui.best} onStart={startGame} />}
        {ui.phase === 'dead' && <SnakeGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={<SnakeTouchControls onControl={controlDir} />}
    />
  );
}
