import { useMemoryStore } from "../stores/useMemoryStore";
import { MEMORY_GAME_CONSTANTS } from "@/lib/constants";
import { DifficultyLevel } from "../types/memory";

export default function DifficultySelector() {
  const { setDifficulty, getDifficultyConfig } = useMemoryStore();
  const difficultyConfig = getDifficultyConfig();

  return (
    <div className="flex justify-center gap-3 mb-6">
      {Object.entries(MEMORY_GAME_CONSTANTS.DIFFICULTY_LEVELS).map(([key, config]) => (
        <button
          key={key}
          onClick={() => setDifficulty(key as DifficultyLevel)}
          className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${
            difficultyConfig.name === config.name
              ? 'bg-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-purple-600 hover:bg-purple-50'
          }`}
        >
          {config.emoji} {config.name} ({config.pairs} זוגות)
        </button>
      ))}
    </div>
  );
}
