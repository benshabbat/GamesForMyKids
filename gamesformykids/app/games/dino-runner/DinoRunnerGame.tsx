'use client';

import { useDinoRunnerGame, W, H } from './useDinoRunnerGame';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import DinoMenuOverlay from './components/DinoMenuOverlay';
import DinoGameOverOverlay from './components/DinoGameOverOverlay';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function DinoRunnerGame() {
  const { canvasRef, ui, handleTap } = useDinoRunnerGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-200 flex flex-col items-center justify-center p-4 select-none"
      canvasClassName="rounded-3xl shadow-2xl cursor-pointer border-4 border-amber-300"
      canvasStyle={{ maxWidth: '100%' }}
      canvasProps={{ onClick: handleTap, onTouchStart: handleTap }}
      hud={ui.phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: ui.score, label: "מפגש", valueClass: "text-2xl font-black text-amber-700", labelClass: "text-xs text-amber-500" },
            { value: ui.best,  label: "שיא",  valueClass: "text-2xl font-black text-gray-600",  labelClass: "text-xs text-gray-400" },
          ]}
          mb="mb-4"
        />
      )}
      overlays={<>
        {ui.phase === 'menu' && <DinoMenuOverlay best={ui.best} onStart={handleTap} />}
        {ui.phase === 'dead' && <DinoGameOverOverlay score={ui.score} best={ui.best} onRestart={handleTap} />}
      </>}
      controls={<p className="mt-4 text-amber-600 text-sm font-medium">הקש / לחץ מקש רווח לקפוץ</p>}
    />
  );
}
