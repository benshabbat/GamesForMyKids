'use client';

import { useSpaceDefenderGame, W, H } from './useSpaceDefenderGame';
import SpaceDefenderHUD from './components/SpaceDefenderHUD';
import SpaceDefenderMenuOverlay from './components/SpaceDefenderMenuOverlay';
import SpaceDefenderResultOverlay from './components/SpaceDefenderResultOverlay';
import SpaceDefenderControls from './components/SpaceDefenderControls';
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
        {ui.phase === 'menu' && <SpaceDefenderMenuOverlay best={ui.best} onStart={startGame} />}
        {ui.phase === 'result' && (
          <SpaceDefenderResultOverlay lives={ui.lives} score={ui.score} best={ui.best} onRestart={startGame} />
        )}
      </>}
      controls={ui.phase === 'playing' && (
        <SpaceDefenderControls onNudgeLeft={nudgeLeft} onShoot={shoot} onNudgeRight={nudgeRight} />
      )}
    />
  );
}
