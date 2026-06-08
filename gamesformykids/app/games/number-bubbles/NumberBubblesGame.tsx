'use client';
import { useEffect, useRef } from 'react';
import { useNumberBubblesGame } from './useNumberBubblesGame';
import NumberBubblesMenuScreen from './components/NumberBubblesMenuScreen';
import NumberBubblesResultScreen from './components/NumberBubblesResultScreen';
import NumberBubblesHUD from './components/NumberBubblesHUD';
import NumberBubbleGrid from './components/NumberBubbleGrid';

export default function NumberBubblesGame() {
  const { phase, wrong, tick, clearWrong } = useNumberBubblesGame();
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (phase !== 'playing') return;
    startTimeRef.current = Date.now();
    const id = setInterval(() => {
      tick(Math.floor((Date.now() - startTimeRef.current) / 100) / 10);
    }, 100);
    return () => clearInterval(id);
  }, [phase, tick]);

  useEffect(() => {
    if (!wrong) return;
    const id = setTimeout(clearWrong, 600);
    return () => clearTimeout(id);
  }, [wrong, clearWrong]);

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
