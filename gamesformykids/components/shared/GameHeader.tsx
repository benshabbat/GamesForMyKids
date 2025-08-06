import { Home, RotateCcw } from "lucide-react";

type GameHeaderProps = {
  score: number;
  level: number;
  onHome: () => void;
  onReset: () => void;
  levelColor?: string; // לדוג' "text-purple-600"
};

export default function GameHeader({
  score,
  level,
  onHome,
  onReset,
  levelColor = "text-purple-600",
}: GameHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-white/90 via-purple-50/80 to-blue-50/80 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl mx-auto max-w-5xl mb-6 transform hover:scale-[1.01] transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 md:p-6">
        {/* כפתור בית */}
        <button
          onClick={onHome}
          className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-100/80 to-blue-100/80 hover:from-purple-200/90 hover:to-blue-200/90 backdrop-blur-sm rounded-xl shadow-lg text-base md:text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-300 border border-purple-200/50 hover:border-purple-300/70 hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-[120px] justify-center"
        >
          <Home className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">חזרה</span>
        </button>

        {/* תצוגת ניקוד ורמה */}
        <div className="text-center bg-gradient-to-br from-white/70 to-purple-50/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 min-w-[160px]">
          <div className={`text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm`}>
            ניקוד: {score.toLocaleString()}
          </div>
          <div className={`text-sm md:text-base font-semibold ${levelColor} mt-1 opacity-90`}>
            רמה: {level}
          </div>
        </div>

        {/* כפתור איפוס */}
        <button
          onClick={onReset}
          className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-100/80 to-red-100/80 hover:from-orange-200/90 hover:to-red-200/90 backdrop-blur-sm rounded-xl shadow-lg text-base md:text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-300 border border-orange-200/50 hover:border-orange-300/70 hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-[120px] justify-center"
        >
          <RotateCcw className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span className="hidden sm:inline">מחדש</span>
        </button>
      </div>
    </div>
  );
}
