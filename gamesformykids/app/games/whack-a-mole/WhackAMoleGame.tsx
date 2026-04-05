'use client';

import { useWhackAMoleGame } from './useWhackAMoleGame';
import WhackMenuScreen from './components/WhackMenuScreen';
import WhackResultScreen from './components/WhackResultScreen';
import WhackHUD from './components/WhackHUD';
import WhackGrid from './components/WhackGrid';

export default function WhackAMoleGame() {
  const { phase, holes, holeValues, score, timeLeft, best, combo, bgColor, pct, startGame, whack, goMenu } = useWhackAMoleGame();

  if (phase === 'menu') return (
    <WhackMenuScreen bgColor={bgColor} best={best} onStart={startGame} />
  );

  if (phase === 'result') return (
    <WhackResultScreen score={score} best={best} onRestart={startGame} onGoMenu={goMenu} />
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex flex-col items-center justify-center p-4 select-none`} dir="rtl">
      <WhackHUD score={score} timeLeft={timeLeft} pct={pct} combo={combo} />
      <WhackGrid holes={holes} holeValues={holeValues} onWhack={whack} />
    </div>
  );
}
