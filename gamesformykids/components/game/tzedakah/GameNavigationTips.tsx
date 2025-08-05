import React from 'react';

interface GameNavigationTipsProps {
  isMobile: boolean;
  nextGameTitle: string;
}

export default function GameNavigationTips({ isMobile, nextGameTitle }: GameNavigationTipsProps) {
  return (
    <div className="mt-8 flex justify-center">
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 ${
        isMobile ? 'p-3' : 'p-4'
      }`}>
        <div className={`text-center text-gray-600 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          💡 <strong>טיפ:</strong> {isMobile ? 'גע והחלק במסך כדי להזיז את הסל!' : 'השתמש במקשי החצים במקלדת לניווט מהיר!'}
        </div>
        {!isMobile && (
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>← משחק הבא: {nextGameTitle}</span>
            <span>•</span>
            <span>→ משחק קודם</span>
            <span>•</span>
            <span>ESC דף הבית</span>
          </div>
        )}
        
        {/* אינדיקטורים ויזואליים */}
        <div className="flex justify-center items-center gap-4 mt-2">
          {isMobile ? (
            <>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <span>👆</span>
                <span>גע</span>
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <span>👈👉</span>
                <span>הזז</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <span>🖱️</span>
                <span>עכבר</span>
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <span>⌨️</span>
                <span>חצים</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
