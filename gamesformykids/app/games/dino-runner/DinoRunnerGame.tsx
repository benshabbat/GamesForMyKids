'use client';

import { useDinoRunnerGame, W, H } from './useDinoRunnerGame';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import DinoGameOverOverlay from './components/DinoGameOverOverlay';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function DinoRunnerGame() {
  const { canvasRef, handleTap, phase, score, best } = useDinoRunnerGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-200 flex flex-col items-center justify-center p-4 select-none"
      canvasClassName="rounded-3xl shadow-2xl cursor-pointer border-4 border-amber-300"
      canvasStyle={{ maxWidth: '100%' }}
      canvasProps={{ onClick: handleTap, onTouchStart: handleTap }}
      hud={phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: score, label: "מפגש", valueClass: "text-2xl font-black text-amber-700", labelClass: "text-xs text-amber-500" },
            { value: best,  label: "שיא",  valueClass: "text-2xl font-black text-gray-600",  labelClass: "text-xs text-gray-400" },
          ]}
          mb="mb-4"
        />
      )}
      overlays={<>
        {phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🦖" title="דינוזאור קופץ"
            description="הקש כדי לקפוץ מעל המכשולים!"
            best={best} onStart={handleTap}
            backdropClass="rounded-3xl bg-black/35" cardWidth="w-64"
            titleColor="text-amber-700"
            buttonClass="bg-gradient-to-l from-amber-500 to-orange-500 shadow-lg hover:opacity-90"
          />
        )}
        {phase === 'dead' && <DinoGameOverOverlay onRestart={handleTap} />}
      </>}
      controls={<p className="mt-4 text-amber-600 text-sm font-medium">הקש / לחץ מקש רווח לקפוץ</p>}
    />
  );
}
