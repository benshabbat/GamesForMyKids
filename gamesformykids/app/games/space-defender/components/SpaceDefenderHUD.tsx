'use client';
import { useSpaceDefenderGame } from '../useSpaceDefenderGame';
import ScoreTimeLivesHUD from '@/components/game/shared/ScoreTimeLivesHUD';

export default function SpaceDefenderHUD() {
  const { score, lives, timeLeft } = useSpaceDefenderGame();
  return <ScoreTimeLivesHUD score={score} lives={lives} timeLeft={timeLeft} mb="mb-2" />;
}
