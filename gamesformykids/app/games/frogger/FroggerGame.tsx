'use client';

import { useFroggerGame, W, H } from './useFroggerGame';
import { CanvasScoreBar } from '@/components/game/shared/CanvasScoreBar';
import { CanvasMenuOverlay } from '@/components/game/shared/CanvasMenuOverlay';
import FroggerGameOverOverlay from './components/FroggerGameOverOverlay';
import FroggerControls from './components/FroggerControls';
import CanvasGameShell from '@/components/game/canvas/CanvasGameShell';

export default function FroggerGame() {
  const { canvasRef, ui, startGame, moveFrog, handleTouchStart, handleTouchEnd } = useFroggerGame();

  return (
    <CanvasGameShell
      canvasRef={canvasRef} width={W} height={H}
      className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2 select-none"
      canvasClassName="rounded-2xl shadow-2xl border-2 border-gray-700"
      canvasStyle={{ maxHeight: '70vh', width: 'auto' }}
      canvasProps={{ onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd }}
      hud={ui.phase === 'playing' && (
        <CanvasScoreBar
          stats={[
            { value: ui.score, label: "ניקוד", valueClass: "text-xl font-black text-green-300", labelClass: "text-xs text-green-600" },
            { value: <div className="flex gap-1 items-center justify-center">{[0,1,2].map(i => <span key={i} className={`text-xl ${i < ui.lives ? '' : 'opacity-20'}`}>❤️</span>)}</div> },
          ]}
        />
      )}
      overlays={<>
        {ui.phase === 'menu' && (
          <CanvasMenuOverlay
            emoji="🐸" title="צפרדע חוצה"
            description={<>עזור לצפרדע לחצות את הכביש!<br />הימנע מהרכבים — הגע לדגלים 🏁</>}
            onStart={startGame}
            backdropClass="rounded-2xl bg-black/75"
            titleColor="text-gray-700" startLabel="🐸 התחל!"
            buttonClass="bg-green-500 hover:bg-green-600"
          />
        )}
        {ui.phase === 'dead' && <FroggerGameOverOverlay score={ui.score} best={ui.best} onRestart={startGame} />}
      </>}
      controls={ui.phase === 'playing' && <FroggerControls onMove={moveFrog} />}
    />
  );
}
