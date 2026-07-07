import { useMemoryStore } from "../stores/useMemoryStore";
import TimerProgressBar from "@/components/game/shared/TimerProgressBar";

export default function GameProgressBar() {
  const { getGameProgress } = useMemoryStore();
  const { completedPairs, totalPairs, progressPercentage } = getGameProgress();

  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-purple-800">
        זוגות: {completedPairs} / {totalPairs}
      </div>
      <div className="mt-2">
        <TimerProgressBar
          pct={progressPercentage}
          trackClass="h-3 bg-purple-200"
          barClass="bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </div>
    </div>
  );
}
