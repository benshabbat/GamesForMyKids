'use client';

import { useSnakeGame, W, H } from './useSnakeGame';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import SnakeMenuOverlay from './components/SnakeMenuOverlay';
import SnakeGameOverOverlay from './components/SnakeGameOverOverlay';
import SnakeTouchControls from './components/SnakeTouchControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function SnakeGame() {
  const { canvasRef, ui, startGame, handleTouchStart, handleTouchEnd, controlDir } = useSnakeGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-950 flex flex-col items-center justify-center p-4 select-none"
      canvasClassName="rounded-2xl shadow-2xl border-4 border-green-700"
      canvasStyle={{ maxHeight: '60vh', width: 'auto' }}
      canvasProps={{ onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd }}
      hud={ui.phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: ui.score, label: "ניקוד", valueClass: "text-2xl font-black text-green-300", labelClass: "text-xs text-green-500" },
            { value: ui.level, label: "רמה",   valueClass: "text-2xl font-black text-yellow-300", labelClass: "text-xs text-yellow-500" },
            { value: ui.best,  label: "שיא",   valueClass: "text-2xl font-black text-gray-300",   labelClass: "text-xs text-gray-500" },
          ]}
          mb="mb-3" className="text-white"
        />
      )}
      overlays={<>
        {ui.phase === 'menu' && <SnakeMenuOverlay best={ui.best} onStart={startGame} />}
        {ui.phase === 'dead' && <SnakeGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={<SnakeTouchControls onControl={controlDir} />}
    />
  );
}
