import React from 'react';

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4 animate-bounce">🧩</div>
      <div className="text-white text-2xl font-bold">טוען טטריס...</div>
    </div>
  </div>
);

export default LoadingScreen;
