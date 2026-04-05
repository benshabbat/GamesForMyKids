'use client';

import { useCatchFruitGame, W, H } from './useCatchFruitGame';
import CatchFruitHUD from './components/CatchFruitHUD';
import CatchFruitMenuOverlay from './components/CatchFruitMenuOverlay';
import CatchFruitResultOverlay from './components/CatchFruitResultOverlay';

export default function CatchFruitGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleMouseDown, handleMouseUp, handleTouchMove, handleTouchStart } = useCatchFruitGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-950 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {ui.phase === 'playing' && (
        <CatchFruitHUD score={ui.score} lives={ui.lives} timeLeft={ui.timeLeft} />
      )}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing border-4 border-purple-700"
          style={{ touchAction: 'none', maxHeight: '80vh', width: 'auto' }}
        />

        {ui.phase === 'menu' && (
          <CatchFruitMenuOverlay best={ui.best} onStart={startGame} />
        )}

        {ui.phase === 'result' && (
          <CatchFruitResultOverlay score={ui.score} best={ui.best} lives={ui.lives} onRestart={startGame} />
        )}
      </div>
    </div>
  );
}
