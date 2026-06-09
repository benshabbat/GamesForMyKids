"use client";

import type { ComponentTypes } from "@/lib/types";

export default function GameErrorScreen({ 
  message,
  title = "אופס! משהו השתבש",
  onRetry = () => window.location.reload(),
  onGoHome,
  errorDetails
}: ComponentTypes.GameErrorScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-md mx-4">
        <div className="text-8xl mb-6">😔</div>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {errorDetails && (
          <details className="mb-4 text-start">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">פרטים טכניים</summary>
            <p className="mt-2 text-xs text-gray-400 font-mono bg-gray-100 p-2 rounded">{errorDetails}</p>
          </details>
        )}
        <button
          onClick={onRetry}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold transition-transform duration-200 transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
        >
          🔄 נסה שוב
        </button>
        {onGoHome && (
          <button
            onClick={onGoHome}
            className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200"
          >
            🏠 חזור לעמוד הבית
          </button>
        )}
      </div>
    </div>
  );
}
