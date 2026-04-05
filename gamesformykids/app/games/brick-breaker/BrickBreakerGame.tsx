'use client';

import { useBrickBreakerGame, W, H } from './useBrickBreakerGame';
import BrickScoreBar from './components/BrickScoreBar';
import BrickMenuOverlay from './components/BrickMenuOverlay';
import BrickGameOverOverlay from './components/BrickGameOverOverlay';
import BrickControls from './components/BrickControls';

export default function BrickBreakerGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleClick, nudgeLeft, nudgeRight } = useBrickBreakerGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <BrickScoreBar score={ui.score} lives={ui.lives} level={ui.level} />
      )}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          className="rounded-3xl shadow-2xl border-4 border-purple-700 cursor-none"
          style={{ touchAction: 'none', maxHeight: '85vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <BrickMenuOverlay best={ui.best} onStart={() => startGame(1)} />
        )}

        {(ui.phase === 'dead' || ui.phase === 'won') && (
          <BrickGameOverOverlay
            phase={ui.phase as 'dead' | 'won'}
            score={ui.score}
            best={ui.best}
            onRestart={() => startGame(1)}
          />
        )}
      </div>

      {ui.phase === 'playing' && (
        <BrickControls onNudgeLeft={nudgeLeft} onLaunch={handleClick} onNudgeRight={nudgeRight} />
      )}
    </div>
  );
}
