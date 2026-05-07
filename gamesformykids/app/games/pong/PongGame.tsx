'use client';

import { usePongGame, W, H } from './usePongGame';
import { WIN_SCORE } from './pongStore';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import PongResultOverlay from './components/PongResultOverlay';
import PongControls from './components/PongControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function PongGame() {
  const { canvasRef, startGame, handleMouseMove, handleTouchMove, handleTouchStart, handleCanvasClick, nudgeLeft, nudgeRight, phase, playerScore, aiScore } = usePongGame();
  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-3xl shadow-2xl border-4 border-slate-700 cursor-none"
      canvasStyle={{ maxHeight: '85vh', width: 'auto' }}
      canvasProps={{ onMouseMove: handleMouseMove, onTouchMove: handleTouchMove, onClick: handleCanvasClick, onTouchStart: handleTouchStart }}
      hud={phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: aiScore,     label: "מחשב 🤖", valueClass: "text-3xl font-black text-red-400",   labelClass: "text-xs text-red-600" },
            { value: playerScore, label: "אתה 🎮",  valueClass: "text-3xl font-black text-green-400", labelClass: "text-xs text-green-600" },
          ]}
          gap="gap-8"
          separator={<div className="text-white/30 text-2xl font-bold self-center">:</div>}
        />
      )}
      overlays={<>
        {phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🏓" title="פונג"
            description={<>הזז את המחבט הירוק<br />הגע ל-{WIN_SCORE} נקודות לפני המחשב!</>}
            onStart={startGame}
            backdropClass="rounded-3xl bg-black/70"
            titleSize="text-3xl" titleColor="text-slate-700"
            buttonClass="bg-gradient-to-l from-slate-600 to-slate-800 shadow-lg hover:opacity-90"
          />
        )}
        {phase === 'result' && (
          <PongResultOverlay onRestart={startGame} />
        )}
      </>}
      controls={phase === 'playing' && <PongControls onNudgeLeft={nudgeLeft} onNudgeRight={nudgeRight} />}
    />
  );
}
