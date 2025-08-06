import React from 'react';

interface CharityBasketProps {
  basketX: number;
  basketWidth: number;
  basketHeight: number;
  gameStarted: boolean;
  isMobile: boolean;
}

export default function CharityBasket({ 
  basketX, 
  basketWidth, 
  basketHeight, 
  gameStarted, 
  isMobile 
}: CharityBasketProps) {
  return (
    <div
      className="absolute bottom-0 flex items-center justify-center z-10"
      style={{
        left: basketX,
        width: basketWidth,
        height: basketHeight,
      }}
    >
      <div className="w-full h-full relative">
        {/* גוף הסל - מעוצב יותר */}
        <div 
          className="w-full h-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 rounded-t-3xl border-4 border-amber-900 shadow-2xl relative overflow-hidden"
          style={{ clipPath: 'polygon(15% 0%, 85% 0%, 80% 100%, 20% 100%)' }}
        >
          {/* דוגמת קליעה משופרת */}
          <div className="absolute inset-2 opacity-50">
            <div className="w-full h-full bg-amber-700 rounded-t-2xl"></div>
            {/* קווים אופקיים */}
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="absolute left-2 right-2 h-px bg-amber-900 opacity-60"
                style={{ top: `${(i + 1) * 20}%` }}
              />
            ))}
            {/* קווים אנכיים */}
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-2 bottom-2 w-px bg-amber-900 opacity-40"
                style={{ left: `${(i + 1) * 25}%` }}
              />
            ))}
          </div>

          {/* ברק זהב בקצוות */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-80"></div>
        </div>
        
        {/* תווית הסל - גדולה יותר ובולטת יותר */}
        <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-95 rounded-xl shadow-xl border-2 border-amber-400 ${
          isMobile ? 'px-2 py-1' : 'px-3 py-2'
        }`}>
          <div className={`text-amber-800 font-bold text-center ${
            isMobile ? 'text-xs' : 'text-sm'
          } flex items-center gap-1`}>
            <span className="text-red-500">💝</span>
            <span>קופת צדקה</span>
            <span className="text-red-500">💝</span>
          </div>
        </div>
        
        {/* אפקט ברק כאשר תופסים מטבע */}
        {gameStarted && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-bounce">
            <span className={isMobile ? 'text-xl' : 'text-2xl'}>✨</span>
          </div>
        )}

        {/* אפקט זוהר סביב הסל */}
        <div className="absolute inset-0 rounded-t-3xl shadow-inner pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent rounded-t-3xl"></div>
        </div>

        {/* חץ מנחה */}
        {gameStarted && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className={`text-green-500 ${isMobile ? 'text-lg' : 'text-xl'}`}>
              ⬇️
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
