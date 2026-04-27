'use client';

import { useMeteorDodgeGame, W, H } from './useMeteorDodgeGame';
import MeteorScoreBar from './components/MeteorScoreBar';
import MeteorMenuOverlay from './components/MeteorMenuOverlay';
import MeteorGameOverOverlay from './components/MeteorGameOverOverlay';
import MeteorControls from './components/MeteorControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function MeteorDodgeGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleCanvasClick, handleTouchStart, nudgeLeft, nudgeRight } = useMeteorDodgeGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-3xl shadow-2xl border-4 border-slate-700 cursor-none"
      canvasStyle={{ maxHeight: '85vh', width: 'auto' }}
      canvasProps={{ onMouseMove: handleMouseMove, onTouchMove: handleTouchMove, onClick: handleCanvasClick, onTouchStart: handleTouchStart }}
      hud={ui.phase === 'playing' && <MeteorScoreBar score={ui.score} best={ui.best} />}
      overlays={<>
        {ui.phase === 'menu' && <MeteorMenuOverlay best={ui.best} onStart={startGame} />}
        {ui.phase === 'dead' && <MeteorGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={ui.phase === 'playing' && <MeteorControls onNudgeLeft={nudgeLeft} onNudgeRight={nudgeRight} />}
    />
  );
}
