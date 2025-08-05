import React from 'react';

interface Coin {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
}

interface CharityCoinProps {
  coin: Coin;
  isMobile: boolean;
}

export default function CharityCoin({ coin, isMobile }: CharityCoinProps) {
  return (
    <div
      className={`absolute flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-12 h-12'} animate-pulse`}
      style={{
        left: coin.x,
        top: coin.y,
        transform: `rotate(${coin.rotation}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className={`w-full h-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 rounded-full ${
        isMobile ? 'border-2' : 'border-3'
      } border-yellow-800 shadow-lg flex items-center justify-center relative hover:scale-110 transition-transform`}>
        <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-80"></div>
        <span className={`text-yellow-900 font-bold ${
          isMobile ? 'text-sm' : 'text-lg'
        } relative z-10 drop-shadow-sm`}>₪</span>
        <div className={`absolute top-1 ${
          isMobile ? 'left-1 w-1 h-1' : 'left-2 w-2 h-2'
        } bg-yellow-100 rounded-full opacity-90`}></div>
        
        {/* אפקט ברק */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
}
