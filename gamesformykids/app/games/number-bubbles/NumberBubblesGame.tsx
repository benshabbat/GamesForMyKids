'use client';
import { useNumberBubblesGame } from './useNumberBubblesGame';
import NumberBubblesMenuScreen from './components/NumberBubblesMenuScreen';
import NumberBubblesResultScreen from './components/NumberBubblesResultScreen';
import NumberBubblesHUD from './components/NumberBubblesHUD';
import NumberBubbleGrid from './components/NumberBubbleGrid';

export default function NumberBubblesGame() {
  const { phase, level, bubbles, next, elapsed, best, wrong, startGame, nextLevel, tap } = useNumberBubblesGame();

  if (phase === 'menu') return (
    <NumberBubblesMenuScreen best={best} onStart={startGame} />
  );

  if (phase === 'results') return (
    <NumberBubblesResultScreen level={level} elapsed={elapsed} onNextLevel={nextLevel} onRestart={startGame} />
  );

  return (
    <div className={`min-h-screen flex flex-col items-center p-3 select-none transition-all ${wrong ? 'bg-red-100' : 'bg-gradient-to-br from-sky-100 to-blue-200'}`} dir="rtl">
      <NumberBubblesHUD
        popped={next - 1}
        total={bubbles.length}
        level={level}
        elapsed={elapsed}
        next={next}
      />
      <NumberBubbleGrid bubbles={bubbles} next={next} level={level} onTap={tap} />
    </div>
  );
}
