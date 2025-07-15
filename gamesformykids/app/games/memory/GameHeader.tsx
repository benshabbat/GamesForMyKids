import { Home, RotateCcw } from "lucide-react";

interface GameHeaderProps {
  isGameStarted: boolean;
  matchedPairs: number;
  totalPairs: number;
  onStart: () => void;
}

export default function GameHeader({
  matchedPairs,
  totalPairs,
  onStart,
}: GameHeaderProps) {
  return (
    <div className="text-center mb-8">
      {/* כותרת המשחק */}
      <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-2">
        🧠 משחק זיכרון 🧠
      </h1>
      <p className="text-xl text-purple-600 mb-6">מצא את הזוגות הזהים!</p>

      {/* פקדים */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => (window.location.href = "/")} 
          className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
        >
          <Home className="inline w-5 h-5 ml-2" /> חזרה
        </button>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-800">
            זוגות: {matchedPairs} / {totalPairs}
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3 mt-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(matchedPairs / totalPairs) * 100}%` }}
            ></div>
          </div>
        </div>

        <button 
          onClick={onStart} 
          className="px-4 py-2 bg-white rounded-full shadow-lg text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
        >
          <RotateCcw className="inline w-5 h-5 ml-2" /> מחדש
        </button>
      </div>
    </div>
  );
}