'use client';

import { useBrickBreakerGame, W, H } from './useBrickBreakerGame';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import BrickGameOverOverlay from './components/BrickGameOverOverlay';
import BrickControls from './components/BrickControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function BrickBreakerGame() {
  const { canvasRef, ui, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleClick, nudgeLeft, nudgeRight } = useBrickBreakerGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gradient-to-b from-purple-950 to-slate-950 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-3xl shadow-2xl border-4 border-purple-700 cursor-none"
      canvasStyle={{ maxHeight: '85vh', width: 'auto' }}
      canvasProps={{ onMouseMove: handleMouseMove, onClick: handleClick, onTouchMove: handleTouchMove, onTouchStart: handleTouchStart }}
      hud={ui.phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: ui.score,                              label: "ניקוד", valueClass: "text-2xl font-black text-yellow-300", labelClass: "text-xs text-yellow-500" },
            { value: Array(ui.lives).fill('❤️').join(''), label: "חיים",  valueClass: "text-lg",                             labelClass: "text-xs text-red-400" },
            { value: `Lv.${ui.level}`,                      label: "רמה",   valueClass: "text-2xl font-black text-blue-300",   labelClass: "text-xs text-blue-500" },
          ]}
          gap="gap-5" className="text-white"
        />
      )}
      overlays={<>
        {ui.phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🧱" title="שובר לבנים"
            description={<>הזז את המחבט ושבור את כל הלבנים!<br />5 רמות של כיף</>}
            best={ui.best} onStart={() => startGame(1)}
            backdropClass="rounded-3xl bg-black/60"
            titleColor="text-purple-700"
            buttonClass="bg-gradient-to-l from-purple-500 to-indigo-600 shadow-lg hover:opacity-90"
          />
        )}
        {(ui.phase === 'dead' || ui.phase === 'won') && (
          <BrickGameOverOverlay phase={ui.phase as 'dead' | 'won'} score={ui.score} best={ui.best} onRestart={() => startGame(1)} />
        )}
      </>}
      controls={ui.phase === 'playing' && <BrickControls onNudgeLeft={nudgeLeft} onLaunch={handleClick} onNudgeRight={nudgeRight} />}
    />
  );
}
