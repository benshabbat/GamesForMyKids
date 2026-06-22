'use client';

import MemoryGameHeader from './components/MemoryGameHeader';
import GameWinMessage from './components/GameWinMessage';
import GameTimeoutScreen from './components/GameTimeoutScreen';
import MemoryGameBoard from './components/MemoryGameBoard';
import MemoryStartScreen from './components/MemoryStartScreen';
import { useMemoryGameContent } from './useMemoryGameContent';
import { useMemoryGame } from './useMemoryGame';
import { GameTutorial } from '@/components/game/GameTutorial';

const MEMORY_TUTORIAL = [
  { emoji: '🃏', title: 'משחק זיכרון', body: 'כל הכרטיסים הפוכים על הגב. לחצו על כרטיס כדי לגלות מה מאחוריו.' },
  { emoji: '👀', title: 'זכרו היכן כל דבר', body: 'מצאו שני כרטיסים זהים ברצף — הם יישארו פתוחים!' },
  { emoji: '⏱️', title: 'חסכו לחיצות', body: 'כמה פחות ניסיונות — כך טוב יותר. שכלו את הזיכרון!' },
];

export default function MemoryClient() {
  useMemoryGameContent();
  const { phase } = useMemoryGame();

  if (phase === 'menu')    return <><GameTutorial steps={MEMORY_TUTORIAL} storageKey="gfk_tutorial_memory" /><MemoryStartScreen /></>;
  if (phase === 'won')     return <GameWinMessage />;
  if (phase === 'timeout') return <GameTimeoutScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        <MemoryGameHeader />
        <MemoryGameBoard />
      </div>
    </div>
  );
}
