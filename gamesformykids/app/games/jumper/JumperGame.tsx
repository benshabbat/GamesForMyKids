'use client';

import { useJumperGame, W, H } from './useJumperGame';
import JumperScoreBar from './components/JumperScoreBar';
import JumperMenuOverlay from './components/JumperMenuOverlay';
import JumperGameOverOverlay from './components/JumperGameOverOverlay';
import JumperControls from './components/JumperControls';

export default function JumperGame() {
  const { canvasRef, ui, startGame, handleTouchMove, handleTouchEnd, handleCanvasClick, pressLeft, releaseLeft, pressRight, releaseRight } = useJumperGame();

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <JumperScoreBar score={ui.score} best={ui.best} />
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleCanvasClick}
          className="rounded-3xl shadow-2xl border-2 border-indigo-800"
          style={{ touchAction: 'none', maxHeight: '78vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <JumperMenuOverlay best={ui.best} onStart={startGame} />
        )}

        {ui.phase === 'dead' && (
          <JumperGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />
        )}
      </div>

      {ui.phase === 'playing' && (
        <JumperControls
          pressLeft={pressLeft}
          releaseLeft={releaseLeft}
          pressRight={pressRight}
          releaseRight={releaseRight}
        />
      )}
    </div>
  );
}
