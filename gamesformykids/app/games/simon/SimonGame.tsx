'use client';
import { useSimonGame } from './useSimonGame';
import SimonMenuScreen from './components/SimonMenuScreen';
import SimonBoard from './components/SimonBoard';
import SimonGameOverScreen from './components/SimonGameOverScreen';

export default function SimonGame() {
  const { phase, handleTap } = useSimonGame();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {phase === 'menu' && <SimonMenuScreen />}
      {(phase === 'showing' || phase === 'input') && <SimonBoard onTap={handleTap} />}
      {phase === 'dead' && <SimonGameOverScreen />}
    </div>
  );
}
