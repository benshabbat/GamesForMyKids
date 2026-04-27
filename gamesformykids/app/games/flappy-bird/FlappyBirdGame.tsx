'use client';

import { useFlappyBirdGame, W, H } from './useFlappyBirdGame';
import FlappyMenuOverlay from './components/FlappyMenuOverlay';
import FlappyGameOverOverlay from './components/FlappyGameOverOverlay';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function FlappyBirdGame() {
  const { canvasRef, ui, handleInput } = useFlappyBirdGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-b from-sky-500 to-blue-700 flex flex-col items-center justify-center select-none"
      canvasClassName="rounded-3xl shadow-2xl cursor-pointer max-w-full"
      canvasStyle={{ maxHeight: '90vh', width: 'auto' }}
      canvasProps={{ onClick: handleInput, onTouchStart: handleInput }}
      overlays={<>
        {ui.phase === 'menu' && <FlappyMenuOverlay best={ui.best} onStart={handleInput} />}
        {ui.phase === 'dead' && <FlappyGameOverOverlay score={ui.score} best={ui.best} onRestart={handleInput} />}
      </>}
    />
  );
}
