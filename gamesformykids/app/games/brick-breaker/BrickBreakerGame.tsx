'use client';

import { useShallow } from 'zustand/react/shallow';
import { useBrickBreakerGame, W, H } from './useBrickBreakerGame';
import { useBrickBreakerStore } from './brickBreakerStore';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import BrickGameOverOverlay from './components/BrickGameOverOverlay';
import { CanvasLRControls } from '@/components/game/shared/CanvasLRControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function BrickBreakerGame() {
  const { canvasRef, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleClick, nudgeLeft, nudgeRight } = useBrickBreakerGame();
  const { phase, score, best, lives, level } = useBrickBreakerStore(
    useShallow((s) => ({ phase: s.phase, score: s.score, best: s.best, lives: s.lives, level: s.level })),
  );

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-b from-purple-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-3xl shadow-2xl border-4 border-purple-700 cursor-none"
      canvasStyle={{ maxHeight: '85vh', width: 'auto' }}
      canvasProps={{ onMouseMove: handleMouseMove, onClick: handleClick, onTouchMove: handleTouchMove, onTouchStart: handleTouchStart }}
      hud={phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: score,                              label: "ניקוד", valueClass: "text-2xl font-black text-yellow-300", labelClass: "text-xs text-yellow-500" },
            { value: Array(lives).fill('❤️').join(''), label: "חיים",  valueClass: "text-lg",                             labelClass: "text-xs text-red-400" },
            { value: `Lv.${level}`,                      label: "רמה",   valueClass: "text-2xl font-black text-blue-300",   labelClass: "text-xs text-blue-500" },
          ]}
          gap="gap-5" className="text-white"
        />
      )}
      overlays={<>
        {phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🧱" title="שובר לבנים"
            description={<>הזז את המחבט ושבור את כל הלבנים!<br />5 רמות של כיף</>}
            best={best} onStart={() => startGame(1)}
            backdropClass="rounded-3xl bg-black/60"
            titleColor="text-purple-700"
            buttonClass="bg-gradient-to-l from-purple-500 to-indigo-600 shadow-lg hover:opacity-90"
          />
        )}
        {(phase === 'dead' || phase === 'won') && (
          <BrickGameOverOverlay onRestart={() => startGame(1)} />
        )}
      </>}
      controls={phase === 'playing' && (
        <CanvasLRControls
          onLeft={nudgeLeft} onRight={nudgeRight}
          center={{ label: "🏸 השק", onAction: handleClick, className: "bg-white/20 text-white rounded-xl px-6 py-3 text-sm font-bold active:bg-white/40 touch-none" }}
          buttonClass="bg-purple-700/80 text-white rounded-xl px-7 py-3 text-xl font-bold active:bg-purple-500 touch-none"
        />
      )}
    />
  );
}
