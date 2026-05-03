'use client';

import { useJumperGame, W, H } from './useJumperGame';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import JumperMenuOverlay from './components/JumperMenuOverlay';
import JumperGameOverOverlay from './components/JumperGameOverOverlay';
import JumperControls from './components/JumperControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function JumperGame() {
  const { canvasRef, ui, startGame, handleTouchMove, handleTouchEnd, handleCanvasClick, pressLeft, releaseLeft, pressRight, releaseRight } = useJumperGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-3xl shadow-2xl border-2 border-indigo-800"
      canvasStyle={{ maxHeight: '78vh', width: 'auto' }}
      canvasProps={{ onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, onClick: handleCanvasClick }}
      hud={ui.phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: `${ui.score}m`, label: "גובה", valueClass: "text-2xl font-black text-green-300", labelClass: "text-xs text-green-600" },
            { value: `${ui.best}m`,  label: "שיא",  valueClass: "text-2xl font-black text-gray-400",  labelClass: "text-xs text-gray-600" },
          ]}
        />
      )}
      overlays={<>
        {ui.phase === 'menu' && <JumperMenuOverlay best={ui.best} onStart={startGame} />}
        {ui.phase === 'dead' && <JumperGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={ui.phase === 'playing' && (
        <JumperControls pressLeft={pressLeft} releaseLeft={releaseLeft} pressRight={pressRight} releaseRight={releaseRight} />
      )}
    />
  );
}
