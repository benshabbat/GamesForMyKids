import React from 'react';

interface GameStartButtonProps {
  onStart: () => void;
  isLoading?: boolean;
  fromColor?: string;
  toColor?: string;
}

function GameStartButton({
  onStart,
  isLoading = false,
  fromColor = "pink",
  toColor = "purple",
}: GameStartButtonProps) {
  // Create class names dynamically
  const buttonClass = `px-12 py-6 cursor-pointer bg-gradient-to-r from-${fromColor}-500 to-${toColor}-500 text-white rounded-full text-3xl font-bold hover:from-${fromColor}-600 hover:to-${toColor}-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6 ${
    isLoading ? 'opacity-50 cursor-not-allowed' : ''
  }`;
  
  return (
    <button
      onClick={onStart}
      className={buttonClass}
      disabled={isLoading}
    >
      {isLoading ? 'טוען...' : 'בואו נתחיל! 🚀'}
    </button>
  );
}

export default GameStartButton;
