'use client';

import { useGameStatus } from './hooks';
import { MenuScreen }     from './components/MenuScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { Scoreboard }     from './components/Scoreboard';
import { GameBoard }      from './components/GameBoard';
import { ActionButtons }  from './components/ActionButtons';

export default function SheshBeshGame() {
  const { phase } = useGameStatus();

  if (phase === 'menu') return <MenuScreen />;
  if (phase === 'won' || phase === 'lost') return <GameOverScreen />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-stone-950 via-amber-950 to-stone-950 flex flex-col items-center justify-start pt-4 pb-6 px-2 select-none"
    >
      <div className="flex flex-col items-center gap-2 w-full" style={{ maxWidth: 720 }}>
        <Scoreboard />
        <GameBoard />
        <ActionButtons />
      </div>
    </div>
  );
}
