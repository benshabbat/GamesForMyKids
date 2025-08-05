import React from 'react';

interface GameInstructionsProps {
  gameStarted: boolean;
  isMobile: boolean;
}

export default function GameInstructions({ gameStarted, isMobile }: GameInstructionsProps) {
  if (!gameStarted) return null;

  return (
    <div className={`absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 z-20 ${
      isMobile ? 'p-3' : 'p-4'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={isMobile ? 'text-lg' : 'text-2xl'}>🎯</span>
        <div className={`font-bold text-purple-800 ${isMobile ? 'text-sm' : 'text-base'}`}>
          הוראות:
        </div>
      </div>
      <div className={`text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>
        {isMobile ? 'גע והזז את האצבע לתפיסת מטבעות!' : 'הזז את העכבר כדי לתפוס מטבעות!'}
      </div>
      <div className={`text-gray-500 mt-1 flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
        <span>🪙</span>
        <span>כל מטבע = 10 נקודות</span>
      </div>
      
      {/* אינדיקטור כיוון */}
      <div className="flex items-center justify-center mt-2">
        <div className="animate-bounce">
          <span className={isMobile ? 'text-sm' : 'text-base'}>👆</span>
        </div>
      </div>
    </div>
  );
}
