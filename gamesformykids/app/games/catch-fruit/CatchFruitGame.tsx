'use client';

import { useShallow } from 'zustand/react/shallow';
import { useCatchFruitGame, W, H } from './useCatchFruitGame';
import { useCatchFruitStore } from './catchFruitStore';
import CatchFruitHUD from './components/CatchFruitHUD';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import CatchFruitResultOverlay from './components/CatchFruitResultOverlay';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function CatchFruitGame() {
  const { canvasRef, startGame, handleMouseMove, handleMouseDown, handleMouseUp, handleTouchMove, handleTouchStart } = useCatchFruitGame();
  const { phase, score, best, lives, timeLeft } = useCatchFruitStore(
    useShallow((s) => ({ phase: s.phase, score: s.score, best: s.best, lives: s.lives, timeLeft: s.timeLeft })),
  );

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-950 flex flex-col items-center justify-center p-4 select-none"
      canvasClassName="rounded-3xl shadow-2xl cursor-grab active:cursor-grabbing border-4 border-purple-700"
      canvasStyle={{ maxHeight: '80vh', width: 'auto' }}
      canvasProps={{ onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove }}
      hud={phase === 'playing' && <CatchFruitHUD score={score} lives={lives} timeLeft={timeLeft} />}
      overlays={<>
        {phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🧺" title="תפוס פירות!"
            description={<>הזז את הסל ותפוס פירות<br />הימנע מהפצצות 💣</>}
            best={best} onStart={startGame}
            backdropClass="rounded-3xl bg-black/50"
            titleColor="text-purple-700"
            buttonClass="bg-gradient-to-l from-purple-500 to-indigo-600 shadow-lg hover:opacity-90"
          />
        )}
        {phase === 'result' && <CatchFruitResultOverlay score={score} best={best} lives={lives} onRestart={startGame} />}
      </>}
    />
  );
}
