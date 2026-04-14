import { useMemoryStore } from "../stores/useMemoryStore";

export default function DifficultySelector() {
  const { setDifficulty, getDifficultyOptions } = useMemoryStore();
  const options = getDifficultyOptions();

  return (
    <div className="flex justify-center gap-3 mb-6">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => setDifficulty(opt.key)}
          className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${
            opt.isActive
              ? 'bg-purple-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-purple-600 hover:bg-purple-50'
          }`}
        >
          {opt.emoji} {opt.name} ({opt.pairs} זוגות)
        </button>
      ))}
    </div>
  );
}
