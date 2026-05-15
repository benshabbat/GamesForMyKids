'use client';
import { useCatchFruitGame } from '../useCatchFruitGame';
import ScoreTimeLivesHUD from '@/components/game/shared/ScoreTimeLivesHUD';

export default function CatchFruitHUD() {
  const { score, lives, timeLeft } = useCatchFruitGame();
  return <ScoreTimeLivesHUD score={score} lives={lives} timeLeft={timeLeft} />;
}
