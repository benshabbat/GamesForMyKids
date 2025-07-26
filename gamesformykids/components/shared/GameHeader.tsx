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
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onHome}
        className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50"
      >
        <Home className="inline w-5 h-5 ml-2" /> חזרה
      </button>
      <div className="text-center">
        <div className={`text-2xl font-bold ${scoreColor}`}>ניקוד: {score}</div>
        <div className={`text-lg ${levelColor}`}>רמה: {level}</div>
      </div>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50"
      >
        <RotateCcw className="inline w-5 h-5 ml-2" /> מחדש
      </button>
    </div>
  );
}
