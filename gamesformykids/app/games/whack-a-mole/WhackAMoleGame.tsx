'use client';

import { useWhackAMoleGame } from './useWhackAMoleGame';
import WhackAMoleMenuScreen from './components/WhackAMoleMenuScreen';
import WhackAMoleResultScreen from './components/WhackAMoleResultScreen';
import WhackHUD from './components/WhackHUD';
import WhackGrid from './components/WhackGrid';

export default function WhackAMoleGame() {
  const { phase, bgColor } = useWhackAMoleGame();

  if (phase === 'menu') return <WhackAMoleMenuScreen />;
  if (phase === 'result') return <WhackAMoleResultScreen />;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex flex-col items-center justify-center p-4 select-none`} dir="rtl">
      <WhackHUD />
      <WhackGrid />
    </div>
  );
}
