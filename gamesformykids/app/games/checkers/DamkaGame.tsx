'use client';

import { useDamkaGame } from './useDamkaGame';
import { DamkaMenuScreen, DamkaResultScreen, DamkaBoard, DamkaScoreBar } from './components';

export default function DamkaGame() {
  // Always-mounted parent: the completion hook inside useDamkaGame must live here to observe
  // the playing -> won/lost transition (the phase-scoped children unmount in that same render).
  const { phase } = useDamkaGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-950 to-stone-950 flex flex-col items-center justify-center p-4 select-none">

      {phase === 'menu' && <DamkaMenuScreen />}

      {(phase === 'won' || phase === 'lost') && <DamkaResultScreen />}

      {phase === 'playing' && (
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">
          <DamkaScoreBar />
          <DamkaBoard />
        </div>
      )}
    </div>
  );
}
