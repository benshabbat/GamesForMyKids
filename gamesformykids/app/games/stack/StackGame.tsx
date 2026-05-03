'use client';

import { useStackGame, W, H } from './useStackGame';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
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
        {ui.phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🏗️" title="ערם לבנים"
            description={<>לחץ / הקש בזמן הנכון<br />ועצב מגדל גבוה!</>}
            best={ui.best} onStart={startGame}
            backdropClass="rounded-3xl bg-black/70" cardWidth="w-60"
            titleColor="text-gray-700" startLabel="🏗️ התחל!"
            buttonClass="bg-blue-600 hover:bg-blue-500"
          />
        )}
        {ui.phase === 'dead' && <StackGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={ui.phase === 'playing' && <StackDropButton onDrop={drop} />}
    />
  );
}
