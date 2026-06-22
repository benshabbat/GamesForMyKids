'use client';
import { useSimonGame } from './useSimonGame';
import SimonMenuScreen from './components/SimonMenuScreen';
import SimonBoard from './components/SimonBoard';
import SimonGameOverScreen from './components/SimonGameOverScreen';
import { GameTutorial } from '@/components/game/GameTutorial';

const SIMON_TUTORIAL = [
  { emoji: '🎨', title: 'סיימון אומר', body: 'הלוח יאיר צבעים ברצף. הקשיבו לצליל וראו את הסדר.' },
  { emoji: '👆', title: 'עכשיו התורך!', body: 'חזרו על הרצף בדיוק באותו סדר — לחצו על כל צבע בתורו.' },
  { emoji: '📈', title: 'הרצף מתארך', body: 'כל סיבוב מוסיף צבע נוסף. כמה סיבובים תצליחו?' },
];

export default function SimonGame() {
  const { phase, handleTap, startGame } = useSimonGame();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 select-none">
      <GameTutorial steps={SIMON_TUTORIAL} storageKey="gfk_tutorial_simon" />
      {phase === 'menu' && <SimonMenuScreen />}
      {(phase === 'showing' || phase === 'input') && <SimonBoard onTap={handleTap} />}
      {phase === 'dead' && <SimonGameOverScreen onRestart={startGame} />}
    </div>
  );
}
