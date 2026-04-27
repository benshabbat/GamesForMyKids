'use client';
import { useCanvasReady } from '@/hooks/canvas/useCanvasReady';

import { useFlappyBirdGame, W, H } from './useFlappyBirdGame';
import FlappyMenuOverlay from './components/FlappyMenuOverlay';
import FlappyGameOverOverlay from './components/FlappyGameOverOverlay';

export default function FlappyBirdGame() {
  const { canvasRef, ui, handleInput } = useFlappyBirdGame();
  const ready = useCanvasReady();

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-sky-500 to-blue-700 flex flex-col items-center justify-center select-none"
      dir="rtl"
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleInput}
          onTouchStart={handleInput}
          className="rounded-3xl shadow-2xl cursor-pointer max-w-full"
          style={{ touchAction: 'none', opacity: ready ? 1 : 0, transition: 'opacity 0.2s', maxHeight: '90vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <FlappyMenuOverlay best={ui.best} onStart={handleInput} />
        )}

        {ui.phase === 'dead' && (
          <FlappyGameOverOverlay score={ui.score} best={ui.best} onRestart={handleInput} />
        )}
      </div>
    </div>
  );
}
