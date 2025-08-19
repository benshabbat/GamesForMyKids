"use client";

interface GameErrorScreenProps {
  error: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export default function GameErrorScreen({ 
  error, 
  onRetry = () => window.location.reload(),
  onBack
}: GameErrorScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-md mx-4">
        <div className="text-8xl mb-6">😔</div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">אופס! משהו השתבש</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
        >
          🔄 נסה שוב
        </button>
        {onBack && (
          <button
            onClick={onBack}
            className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200"
          >
            ← חזור
          </button>
        )}
      </div>
    </div>
  );
}
