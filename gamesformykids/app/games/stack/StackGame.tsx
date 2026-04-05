'use client';

import { useStackGame, W, H } from './useStackGame';
import StackMenuOverlay from './components/StackMenuOverlay';
import StackGameOverOverlay from './components/StackGameOverOverlay';
import StackDropButton from './components/StackDropButton';

export default function StackGame() {
  const { canvasRef, ui, startGame, drop, handleCanvasClick } = useStackGame();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-2 select-none" dir="rtl">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleCanvasClick}
          className="rounded-3xl shadow-2xl border-2 border-slate-700 cursor-pointer"
          style={{ touchAction: 'none', maxHeight: '80vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <StackMenuOverlay best={ui.best} onStart={startGame} />
        )}

        {ui.phase === 'dead' && (
          <StackGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />
        )}
      </div>

      {ui.phase === 'playing' && (
        <StackDropButton onDrop={drop} />
      )}
    </div>
  );
}
