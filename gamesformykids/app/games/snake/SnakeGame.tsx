'use client';

import { useShallow } from 'zustand/react/shallow';
import { useSnakeGame, W, H } from './useSnakeGame';
import { useSnakeStore } from './stores/useSnakeStore';
import { useGameProgressStore, useGameStore } from '@/lib/stores';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import SnakeGameOverOverlay from './components/SnakeGameOverOverlay';
import { CanvasDPadControls } from '@/components/game/shared/CanvasDPadControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function SnakeGame() {
  const { canvasRef, startGame, handleTouchStart, handleTouchEnd, controlDir } = useSnakeGame();
  const phase = useSnakeStore((s) => s.phase);
  const { score, level } = useGameProgressStore(useShallow((s) => ({ score: s.score, level: s.level })));
  const best = useGameStore((s) => s.highScores['snake'] ?? 0);

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-950 flex flex-col items-center justify-center p-4 select-none"
      canvasClassName="rounded-2xl shadow-2xl border-4 border-green-700"
      canvasStyle={{ maxHeight: '60vh', width: 'auto' }}
      canvasProps={{ onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd }}
      hud={phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: score, label: "ניקוד", valueClass: "text-2xl font-black text-green-300", labelClass: "text-xs text-green-500" },
            { value: level, label: "רמה",   valueClass: "text-2xl font-black text-yellow-300", labelClass: "text-xs text-yellow-500" },
            { value: best,  label: "שיא",   valueClass: "text-2xl font-black text-gray-300",   labelClass: "text-xs text-gray-500" },
          ]}
          mb="mb-3" className="text-white"
        />
      )}
      overlays={<>
        {phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🐍" title="נחש"
            description={<>אסוף פירות וגדל!<br />הימנע מהקירות ומעצמך</>}
            best={best} onStart={startGame}
            backdropClass="rounded-2xl bg-black/50" cardWidth="w-64"
            emojiSize="text-6xl" titleSize="text-3xl" titleColor="text-green-700"
            buttonClass="bg-gradient-to-l from-green-500 to-emerald-600 shadow-lg hover:opacity-90"
          />
        )}
        {phase === 'dead' && <SnakeGameOverOverlay onRestart={startGame} />}
      </>}
      controls={
        <CanvasDPadControls
          onUp={() => controlDir('U')} onDown={() => controlDir('D')}
          onLeft={() => controlDir('L')} onRight={() => controlDir('R')}
          mt="mt-4" style={{ width: 144 }}
        />
      }
    />
  );
}
