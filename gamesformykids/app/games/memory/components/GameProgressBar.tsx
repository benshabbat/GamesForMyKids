import { useMemoryStore } from "../stores/useMemoryStore";

export default function GameProgressBar() {
  const { getGameProgress } = useMemoryStore();
  const { completedPairs, totalPairs, progressPercentage } = getGameProgress();

  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-purple-800">
        זוגות: {completedPairs} / {totalPairs}
      </div>
      <div className="w-full bg-purple-200 rounded-full h-3 mt-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
