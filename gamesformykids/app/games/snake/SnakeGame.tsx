'use client';
import { useCanvasReady } from '@/hooks/canvas/useCanvasReady';

import { useSnakeGame, W, H } from './useSnakeGame';
import SnakeScoreBar from './components/SnakeScoreBar';
import SnakeMenuOverlay from './components/SnakeMenuOverlay';
import SnakeGameOverOverlay from './components/SnakeGameOverOverlay';
import SnakeTouchControls from './components/SnakeTouchControls';

export default function SnakeGame() {
  const { canvasRef, ui, startGame, handleTouchStart, handleTouchEnd, controlDir } = useSnakeGame();
  const ready = useCanvasReady();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-950 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <SnakeScoreBar score={ui.score} level={ui.level} best={ui.best} />
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="rounded-2xl shadow-2xl border-4 border-green-700"
          style={{ touchAction: 'none', opacity: ready ? 1 : 0, transition: 'opacity 0.2s', maxHeight: '60vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <SnakeMenuOverlay best={ui.best} onStart={startGame} />
        )}

        {ui.phase === 'dead' && (
          <SnakeGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />
        )}
      </div>

      <SnakeTouchControls onControl={controlDir} />
    </div>
  );
}
