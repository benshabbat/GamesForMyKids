'use client';

import { useSpaceDefenderGame, W, H } from './useSpaceDefenderGame';
import SpaceDefenderHUD from './components/SpaceDefenderHUD';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import SpaceDefenderResultOverlay from './components/SpaceDefenderResultOverlay';
import { CanvasLRControls } from '@/components/game/shared/CanvasLRControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function SpaceDefenderGame() {
  const { canvasRef, ui, shoot, startGame, handleMouseMove, handleCanvasClick, handleTouchMove, handleTouchStart, nudgeLeft, nudgeRight } = useSpaceDefenderGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-3xl shadow-2xl border-4 border-indigo-700 cursor-crosshair"
      canvasStyle={{ maxHeight: '85vh', width: 'auto' }}
      canvasProps={{ onMouseMove: handleMouseMove, onClick: handleCanvasClick, onTouchMove: handleTouchMove, onTouchStart: handleTouchStart }}
      hud={ui.phase === 'playing' && <SpaceDefenderHUD score={ui.score} lives={ui.lives} timeLeft={ui.timeLeft} />}
      overlays={<>
        {ui.phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🚀" title="מגן החלל"
            description={<>הזז את הספינה וירה באסטרואידים!<br />הגן על כדור הארץ 🌍</>}
            best={ui.best} onStart={startGame}
            backdropClass="rounded-3xl bg-black/60"
            titleColor="text-indigo-700"
            buttonClass="bg-gradient-to-l from-indigo-500 to-blue-600 shadow-lg hover:opacity-90"
          />
        )}
        {ui.phase === 'result' && (
          <SpaceDefenderResultOverlay lives={ui.lives} score={ui.score} best={ui.best} onRestart={startGame} />
        )}
      </>}
      controls={ui.phase === 'playing' && (
        <CanvasLRControls
          onLeft={nudgeLeft} onRight={nudgeRight}
          center={{ label: "💥 ירה!", onAction: shoot, className: "bg-yellow-500/90 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-yellow-400 touch-none" }}
          buttonClass="bg-indigo-700/80 text-white rounded-xl px-6 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
          gap="gap-3"
        />
      )}
    />
  );
}
