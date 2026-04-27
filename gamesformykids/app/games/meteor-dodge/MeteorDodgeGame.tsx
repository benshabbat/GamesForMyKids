'use client';
import { useCanvasReady } from '@/hooks/canvas/useCanvasReady';

import { useMeteorDodgeGame, W, H } from './useMeteorDodgeGame';
import MeteorScoreBar from './components/MeteorScoreBar';
import MeteorMenuOverlay from './components/MeteorMenuOverlay';
import MeteorGameOverOverlay from './components/MeteorGameOverOverlay';
import MeteorControls from './components/MeteorControls';

export default function MeteorDodgeGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleCanvasClick, handleTouchStart, nudgeLeft, nudgeRight } = useMeteorDodgeGame();
  const ready = useCanvasReady();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <MeteorScoreBar score={ui.score} best={ui.best} />
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
          style={{ touchAction: 'none', opacity: ready ? 1 : 0, transition: 'opacity 0.2s', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <MeteorMenuOverlay best={ui.best} onStart={startGame} />
        )}

        {ui.phase === 'dead' && (
          <MeteorGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />
        )}
      </div>

      {ui.phase === 'playing' && (
        <MeteorControls onNudgeLeft={nudgeLeft} onNudgeRight={nudgeRight} />
      )}
    </div>
  );
}
