'use client';
import { useCanvasReady } from '@/hooks/canvas/useCanvasReady';

import { useSpaceDefenderGame, W, H } from './useSpaceDefenderGame';
import SpaceDefenderHUD from './components/SpaceDefenderHUD';
import SpaceDefenderMenuOverlay from './components/SpaceDefenderMenuOverlay';
import SpaceDefenderResultOverlay from './components/SpaceDefenderResultOverlay';
import SpaceDefenderControls from './components/SpaceDefenderControls';

export default function SpaceDefenderGame() {
  const { canvasRef, ui, shoot, startGame, handleMouseMove, handleCanvasClick, handleTouchMove, handleTouchStart, nudgeLeft, nudgeRight } = useSpaceDefenderGame();
  const ready = useCanvasReady();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <SpaceDefenderHUD score={ui.score} lives={ui.lives} timeLeft={ui.timeLeft} />
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          className="rounded-3xl shadow-2xl border-4 border-indigo-700 cursor-crosshair"
          style={{ touchAction: 'none', opacity: ready ? 1 : 0, transition: 'opacity 0.2s', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <SpaceDefenderMenuOverlay best={ui.best} onStart={startGame} />
        )}

        {ui.phase === 'result' && (
          <SpaceDefenderResultOverlay
            lives={ui.lives}
            score={ui.score}
            best={ui.best}
            onRestart={startGame}
          />
        )}
      </div>

      {ui.phase === 'playing' && (
        <SpaceDefenderControls
          onNudgeLeft={nudgeLeft}
          onShoot={shoot}
          onNudgeRight={nudgeRight}
        />
      )}
    </div>
  );
}
