'use client';
import { useShallow } from 'zustand/react/shallow';
import { useCatchFruitStore } from '../catchFruitStore';
import ScoreTimeLivesHUD from '@/components/game/shared/ScoreTimeLivesHUD';

export default function CatchFruitHUD() {
  // Read the store directly — calling useCatchFruitGame() here would start a second game instance.
  const { score, lives, timeLeft } = useCatchFruitStore(useShallow(s => ({ score: s.score, lives: s.lives, timeLeft: s.timeLeft })));
  return <ScoreTimeLivesHUD score={score} lives={lives} timeLeft={timeLeft} />;
}
