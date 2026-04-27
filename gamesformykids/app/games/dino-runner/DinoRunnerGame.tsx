'use client';
import { useCanvasReady } from '@/hooks/canvas/useCanvasReady';

import { useDinoRunnerGame, W, H } from './useDinoRunnerGame';
import DinoScoreBar from './components/DinoScoreBar';
import DinoMenuOverlay from './components/DinoMenuOverlay';
import DinoGameOverOverlay from './components/DinoGameOverOverlay';

export default function DinoRunnerGame() {
  const { canvasRef, ui, handleTap } = useDinoRunnerGame();
  const ready = useCanvasReady();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <DinoScoreBar score={ui.score} best={ui.best} />
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleTap}
          onTouchStart={handleTap}
          className="rounded-3xl shadow-2xl cursor-pointer border-4 border-amber-300"
          style={{ touchAction: 'none', opacity: ready ? 1 : 0, transition: 'opacity 0.2s', maxWidth: '100%' }}
        />

        {ui.phase === 'menu' && (
          <DinoMenuOverlay best={ui.best} onStart={handleTap} />
        )}

        {ui.phase === 'dead' && (
          <DinoGameOverOverlay score={ui.score} best={ui.best} onRestart={handleTap} />
        )}
      </div>

      <p className="mt-4 text-amber-600 text-sm font-medium">הקש / לחץ מקש רווח לקפוץ</p>
    </div>
  );
}
