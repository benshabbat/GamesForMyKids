'use client';
import { useNumberBubblesGame } from './useNumberBubblesGame';
import NumberBubblesMenuScreen from './components/NumberBubblesMenuScreen';
import NumberBubblesResultScreen from './components/NumberBubblesResultScreen';
import NumberBubblesHUD from './components/NumberBubblesHUD';
import NumberBubbleGrid from './components/NumberBubbleGrid';

export default function NumberBubblesGame() {
  const { phase, wrong } = useNumberBubblesGame();

  if (phase === 'menu')    return <NumberBubblesMenuScreen />;
  if (phase === 'results') return <NumberBubblesResultScreen />;

  return (
    <div className="min-h-screen flex flex-col items-center p-3 select-none bg-gradient-to-br from-sky-100 to-blue-200">
      <NumberBubblesHUD />
      <div className={`w-full flex-1 ${wrong ? 'ring-4 ring-amber-400 ring-inset rounded-3xl' : ''}`}>
        <NumberBubbleGrid />
      </div>
    </div>
  );
}
