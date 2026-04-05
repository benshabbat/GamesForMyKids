'use client';

import { useBalloonPopGame } from './useBalloonPopGame';
import BalloonMenuScreen from './components/BalloonMenuScreen';
import BalloonResultScreen from './components/BalloonResultScreen';
import BalloonHUD from './components/BalloonHUD';
import BalloonGameArea from './components/BalloonGameArea';

export default function BalloonPopGame() {
  const { phase, score, best, lives, timeLeft, balloons, pct, containerRef, startGame, pop } = useBalloonPopGame();

  if (phase === 'menu') return <BalloonMenuScreen best={best} onStart={startGame} />;

  if (phase === 'result') return (
    <BalloonResultScreen score={score} best={best} lives={lives} onRestart={startGame} />
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-400 flex flex-col items-center select-none" dir="rtl">
      <BalloonHUD score={score} lives={lives} timeLeft={timeLeft} pct={pct} />
      <BalloonGameArea containerRef={containerRef} balloons={balloons} onPop={pop} />
    </div>
  );
}
