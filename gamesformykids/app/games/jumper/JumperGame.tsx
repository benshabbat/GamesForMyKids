'use client';

import { useJumperGame, W, H } from './useJumperGame';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import JumperGameOverOverlay from './components/JumperGameOverOverlay';
import { CanvasLRControls } from '@/components/game/shared/CanvasLRControls';
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
        {ui.phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🦘" title="קפצן"
            description={<>קפץ על הפלטפורמות וטפס גבוה!<br />הזז שמאלה/ימינה· אל תיפול</>}
            best={ui.best} bestSuffix="m" onStart={startGame}
            backdropClass="rounded-3xl bg-black/70" cardWidth="w-64"
            titleColor="text-gray-700" startLabel="🦘 קפץ!"
            buttonClass="bg-indigo-600 hover:bg-indigo-500"
          />
        )}
        {ui.phase === 'dead' && <JumperGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={ui.phase === 'playing' && (
        <CanvasLRControls
          onLeft={pressLeft} onRight={pressRight}
          onLeftRelease={releaseLeft} onRightRelease={releaseRight}
          buttonClass="bg-indigo-700/80 text-white rounded-xl px-10 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
        />
      )}
    />
  );
}
