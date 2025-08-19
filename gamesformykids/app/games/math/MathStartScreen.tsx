"use client";

interface MathStartScreenProps {
  startGame: () => Promise<void>;
  speakQuestion: () => Promise<void>;
}

export default function MathStartScreen({ startGame, speakQuestion }: MathStartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
      <div className="text-center p-8 bg-white/80 rounded-3xl shadow-xl max-w-md mx-4">
        <div className="text-6xl mb-4">🧮</div>
        <h1 className="text-3xl font-bold text-orange-800 mb-4">משחק המתמטיקה</h1>
        <p className="text-lg text-orange-600 mb-6">
          פתרו תרגילים במתמטיקה ובחרו את התשובה הנכונה!
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-orange-700 mb-3">דוגמאות:</h3>
          <div className="space-y-2">
            <div className="text-2xl">3 + 2 = ? 🍎</div>
            <div className="text-2xl">5 - 1 = ? 🎈</div>
            <div className="text-2xl">2 + 3 = ? 🌟</div>
            <div className="text-2xl">4 - 2 = ? 🐶</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg w-full"
          >
            🚀 התחל משחק
          </button>
          
          <button
            onClick={speakQuestion}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full"
          >
            🔊 שמע הוראות
          </button>
        </div>
      </div>
    </div>
  );
}
