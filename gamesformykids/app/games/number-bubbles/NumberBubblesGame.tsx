'use client';
import { useNumberBubblesStore } from './numberBubblesStore';
import NumberBubblesMenuScreen from './components/NumberBubblesMenuScreen';
import NumberBubblesResultScreen from './components/NumberBubblesResultScreen';
import NumberBubblesHUD from './components/NumberBubblesHUD';
import NumberBubbleGrid from './components/NumberBubbleGrid';

export default function NumberBubblesGame() {
  const { phase, wrong } = useNumberBubblesStore();

  if (phase === 'menu')    return <NumberBubblesMenuScreen />;
  if (phase === 'results') return <NumberBubblesResultScreen />;

  return (
    <div className={`min-h-screen flex flex-col items-center p-3 select-none transition-all ${wrong ? 'bg-red-100' : 'bg-gradient-to-br from-sky-100 to-blue-200'}`} dir="rtl">
      <NumberBubblesHUD />
      <NumberBubbleGrid />
    </div>
  );
}
