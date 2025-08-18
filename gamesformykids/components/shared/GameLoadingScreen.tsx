"use client";

export default function GameLoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="text-center">
        <div className="text-8xl mb-6 animate-bounce">🎮</div>
        <h2 className="text-3xl font-bold text-gray-700 mb-2">טוען משחק מדהים...</h2>
        <div className="w-20 h-2 bg-gray-200 rounded-full mx-auto">
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
