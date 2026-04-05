'use client';

import { useReflexGame } from './useReflexGame';
import { GAME_DURATION } from './data/targets';
import ReflexMenuScreen from './components/ReflexMenuScreen';
import ReflexPlayScreen from './components/ReflexPlayScreen';
import ReflexResultScreen from './components/ReflexResultScreen';

export default function ReflexGame() {
  const { phase, targets, score, missed, timeLeft, startGame, hitTarget, goMenu } = useReflexGame();

  const timePct = (timeLeft / GAME_DURATION) * 100;

  if (phase === 'menu') return <ReflexMenuScreen gameDuration={GAME_DURATION} onStart={startGame} />;

  if (phase === 'playing') return (
    <ReflexPlayScreen score={score} timeLeft={timeLeft} timePct={timePct} targets={targets} onHit={hitTarget} onMenu={goMenu} />
  );

  return <ReflexResultScreen score={score} missed={missed} onRestart={startGame} onMenu={goMenu} />;
}
