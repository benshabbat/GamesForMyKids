import { useMemo } from "react";
import { useMemoryStore } from "../stores/useMemoryStore";
import { getWinAchievements } from "../stores/memoryDisplayHelpers";

export default function WinAchievements() {
  const score = useMemoryStore((s) => s.gameStats.score);
  const moves = useMemoryStore((s) => s.gameStats.moves);
  const streak = useMemoryStore((s) => s.gameStats.streak);
  const perfectMatches = useMemoryStore((s) => s.gameStats.perfectMatches);
  const timeLeft = useMemoryStore((s) => s.timeLeft);
  const totalPairs = useMemoryStore((s) => s.getDifficultyConfig().pairs);

  const achievements = useMemo(
    () => getWinAchievements(score, moves, streak, perfectMatches, timeLeft, totalPairs),
    [score, moves, streak, perfectMatches, timeLeft, totalPairs],
  );

  if (achievements.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {achievements.map((a) => (
        <div key={a.id} className={`${a.bgColor} ${a.textColor} px-3 py-1 rounded-full text-sm font-bold`}>
          {a.label}
        </div>
      ))}
    </div>
  );
}
