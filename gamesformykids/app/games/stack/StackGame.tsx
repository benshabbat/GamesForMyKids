'use client';

import { useStackGame, W, H } from './useStackGame';
import StackMenuOverlay from './components/StackMenuOverlay';
import StackGameOverOverlay from './components/StackGameOverOverlay';
import StackDropButton from './components/StackDropButton';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function StackGame() {
  const { canvasRef, ui, startGame, drop, handleCanvasClick } = useStackGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-3xl shadow-2xl border-2 border-slate-700 cursor-pointer"
      canvasStyle={{ maxHeight: '80vh', width: 'auto' }}
      canvasProps={{ onClick: handleCanvasClick }}
      overlays={<>
        {ui.phase === 'menu' && <StackMenuOverlay best={ui.best} onStart={startGame} />}
        {ui.phase === 'dead' && <StackGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={ui.phase === 'playing' && <StackDropButton onDrop={drop} />}
    />
  );
}
