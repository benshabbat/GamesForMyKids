import { Home, RotateCcw } from "lucide-react";

type GameHeaderProps = {
  score: number;
  level: number;
  onHome: () => void;
  onReset: () => void;
  scoreColor?: string; // לדוג' "text-purple-800"
  levelColor?: string; // לדוג' "text-purple-600"
};

export default function GameHeader({
  score,
  level,
  onHome,
  onReset,
  scoreColor = "text-purple-800",
  levelColor = "text-purple-600",
}: GameHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md rounded-xl border border-white/40 shadow-lg mx-auto max-w-4xl mb-6">
      <div className="flex justify-between items-center p-4">
        <button
          onClick={onHome}
          className="px-3 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-lg shadow-md text-lg font-bold text-gray-600 hover:text-gray-800 transition-all duration-200 border border-gray-200/50"
        >
          <Home className="inline w-4 h-4 ml-2" /> חזרה
        </button>
        <div className="text-center">
          <div className={`text-xl font-bold ${scoreColor}`}>ניקוד: {score}</div>
          <div className={`text-sm ${levelColor}`}>רמה: {level}</div>
        </div>
        <button
          onClick={onReset}
          className="px-3 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-lg shadow-md text-lg font-bold text-gray-600 hover:text-gray-800 transition-all duration-200 border border-gray-200/50"
        >
          <RotateCcw className="inline w-4 h-4 ml-2" /> מחדש
        </button>
      </div>
    </div>
  );
}
