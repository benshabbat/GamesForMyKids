'use client';

import { useDamkaStore } from './damkaStore';
import { DamkaMenuScreen, DamkaResultScreen, DamkaBoard, DamkaScoreBar } from './components';

export default function DamkaGame() {
  const phase = useDamkaStore((s) => s.phase);

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
