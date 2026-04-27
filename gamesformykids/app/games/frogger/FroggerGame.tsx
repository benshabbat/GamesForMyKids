'use client';
import { useCanvasReady } from '@/hooks/canvas/useCanvasReady';

import { useFroggerGame, W, H } from './useFroggerGame';
import FroggerScoreBar from './components/FroggerScoreBar';
import FroggerMenuOverlay from './components/FroggerMenuOverlay';
import FroggerGameOverOverlay from './components/FroggerGameOverOverlay';
import FroggerControls from './components/FroggerControls';

export default function FroggerGame() {
  const { canvasRef, ui, startGame, moveFrog, handleTouchStart, handleTouchEnd } = useFroggerGame();
  const ready = useCanvasReady();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <FroggerScoreBar score={ui.score} lives={ui.lives} />
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="rounded-2xl shadow-2xl border-2 border-gray-700"
          style={{ touchAction: 'none', opacity: ready ? 1 : 0, transition: 'opacity 0.2s', maxHeight: '70vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <FroggerMenuOverlay onStart={startGame} />
        )}

        {ui.phase === 'dead' && (
          <FroggerGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />
        )}
      </div>

      {ui.phase === 'playing' && (
        <FroggerControls onMove={moveFrog} />
      )}
    </div>
  );
}
