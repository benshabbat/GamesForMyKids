'use client';
import { useSpaceDefenderStore } from '../spaceDefenderStore';
import ScoreTimeLivesHUD from '@/components/game/shared/ScoreTimeLivesHUD';

export default function SpaceDefenderHUD() {
  // Read the store directly — calling useSpaceDefenderGame() here would start a second game instance.
  const score    = useSpaceDefenderStore((s) => s.score);
  const lives    = useSpaceDefenderStore((s) => s.lives);
  const timeLeft = useSpaceDefenderStore((s) => s.timeLeft);
  return <ScoreTimeLivesHUD score={score} lives={lives} timeLeft={timeLeft} mb="mb-2" />;
}
