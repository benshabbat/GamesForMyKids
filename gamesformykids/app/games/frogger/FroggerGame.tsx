'use client';

import { useFroggerGame, W, H } from './useFroggerGame';
import FroggerScoreBar from './components/FroggerScoreBar';
import FroggerMenuOverlay from './components/FroggerMenuOverlay';
import FroggerGameOverOverlay from './components/FroggerGameOverOverlay';
import FroggerControls from './components/FroggerControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function FroggerGame() {
  const { canvasRef, ui, startGame, moveFrog, handleTouchStart, handleTouchEnd } = useFroggerGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-2xl shadow-2xl border-2 border-gray-700"
      canvasStyle={{ maxHeight: '70vh', width: 'auto' }}
      canvasProps={{ onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd }}
      hud={ui.phase === 'playing' && <FroggerScoreBar score={ui.score} lives={ui.lives} />}
      overlays={<>
        {ui.phase === 'menu' && <FroggerMenuOverlay onStart={startGame} />}
        {ui.phase === 'dead' && <FroggerGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={ui.phase === 'playing' && <FroggerControls onMove={moveFrog} />}
    />
  );
}
