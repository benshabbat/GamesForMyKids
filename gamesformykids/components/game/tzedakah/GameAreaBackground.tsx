import React from 'react';

interface GameAreaBackgroundProps {
  isMobile: boolean;
}

export default function GameAreaBackground({ isMobile }: GameAreaBackgroundProps) {
  return (
    <div className="absolute inset-0">
      {/* עננים מעוצבים */}
      <div className={`absolute ${isMobile ? 'top-4 left-6 w-12 h-8' : 'top-8 left-12 w-20 h-12'} bg-white rounded-full opacity-80 shadow-lg animate-pulse`}></div>
      <div className={`absolute ${isMobile ? 'top-8 right-8 w-14 h-9' : 'top-16 right-16 w-24 h-14'} bg-white rounded-full opacity-70 shadow-md animate-pulse`} style={{ animationDelay: '1s' }}></div>
      <div className={`absolute ${isMobile ? 'top-2 right-16 w-10 h-6' : 'top-4 right-32 w-16 h-10'} bg-white rounded-full opacity-60 shadow-sm animate-pulse`} style={{ animationDelay: '2s' }}></div>
      <div className={`absolute ${isMobile ? 'top-10 left-1/2 w-11 h-7' : 'top-20 left-1/2 w-18 h-11'} bg-white rounded-full opacity-75 shadow-md animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
      
      {/* שמש מעוצבת */}
      <div className={`absolute ${isMobile ? 'top-3 right-3 w-12 h-12' : 'top-6 right-6 w-16 h-16'} bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-spin`} style={{ animationDuration: '20s' }}>
        <div className={`absolute ${isMobile ? 'inset-1' : 'inset-2'} bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-600">
            <span className={isMobile ? 'text-sm' : 'text-lg'}>☀️</span>
          </div>
        </div>
        
        {/* קרני שמש */}
        <div className="absolute bg-yellow-300 opacity-60" style={{ width: '2px', height: isMobile ? '8px' : '12px', top: isMobile ? '-6px' : '-8px', left: '50%', transformOrigin: `1px ${isMobile ? '18px' : '24px'}`, transform: 'translateX(-50%) rotate(0deg)' }} />
        <div className="absolute bg-yellow-300 opacity-60" style={{ width: '2px', height: isMobile ? '8px' : '12px', top: isMobile ? '-6px' : '-8px', left: '50%', transformOrigin: `1px ${isMobile ? '18px' : '24px'}`, transform: 'translateX(-50%) rotate(45deg)' }} />
        <div className="absolute bg-yellow-300 opacity-60" style={{ width: '2px', height: isMobile ? '8px' : '12px', top: isMobile ? '-6px' : '-8px', left: '50%', transformOrigin: `1px ${isMobile ? '18px' : '24px'}`, transform: 'translateX(-50%) rotate(90deg)' }} />
        <div className="absolute bg-yellow-300 opacity-60" style={{ width: '2px', height: isMobile ? '8px' : '12px', top: isMobile ? '-6px' : '-8px', left: '50%', transformOrigin: `1px ${isMobile ? '18px' : '24px'}`, transform: 'translateX(-50%) rotate(135deg)' }} />
        <div className="absolute bg-yellow-300 opacity-60" style={{ width: '2px', height: isMobile ? '8px' : '12px', top: isMobile ? '-6px' : '-8px', left: '50%', transformOrigin: `1px ${isMobile ? '18px' : '24px'}`, transform: 'translateX(-50%) rotate(180deg)' }} />
        <div className="absolute bg-yellow-300 opacity-60" style={{ width: '2px', height: isMobile ? '8px' : '12px', top: isMobile ? '-6px' : '-8px', left: '50%', transformOrigin: `1px ${isMobile ? '18px' : '24px'}`, transform: 'translateX(-50%) rotate(225deg)' }} />
        <div className="absolute bg-yellow-300 opacity-60" style={{ width: '2px', height: isMobile ? '8px' : '12px', top: isMobile ? '-6px' : '-8px', left: '50%', transformOrigin: `1px ${isMobile ? '18px' : '24px'}`, transform: 'translateX(-50%) rotate(270deg)' }} />
        <div className="absolute bg-yellow-300 opacity-60" style={{ width: '2px', height: isMobile ? '8px' : '12px', top: isMobile ? '-6px' : '-8px', left: '50%', transformOrigin: `1px ${isMobile ? '18px' : '24px'}`, transform: 'translateX(-50%) rotate(315deg)' }} />
      </div>

      {/* גרדיאנט רקע נוסף */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-200/20 to-blue-300/30 pointer-events-none"></div>
      
      {/* כוכבים קטנים */}
      <div className="absolute text-yellow-300 opacity-70 animate-twinkle" style={{ left: '15%', top: '10%', animationDelay: '0s', fontSize: isMobile ? '8px' : '12px' }}>✨</div>
      <div className="absolute text-yellow-300 opacity-70 animate-twinkle" style={{ left: '30%', top: '30%', animationDelay: '0.5s', fontSize: isMobile ? '8px' : '12px' }}>✨</div>
      <div className="absolute text-yellow-300 opacity-70 animate-twinkle" style={{ left: '45%', top: '10%', animationDelay: '1s', fontSize: isMobile ? '8px' : '12px' }}>✨</div>
      <div className="absolute text-yellow-300 opacity-70 animate-twinkle" style={{ left: '60%', top: '30%', animationDelay: '1.5s', fontSize: isMobile ? '8px' : '12px' }}>✨</div>
      <div className="absolute text-yellow-300 opacity-70 animate-twinkle" style={{ left: '75%', top: '10%', animationDelay: '2s', fontSize: isMobile ? '8px' : '12px' }}>✨</div>
      <div className="absolute text-yellow-300 opacity-70 animate-twinkle" style={{ left: '90%', top: '30%', animationDelay: '2.5s', fontSize: isMobile ? '8px' : '12px' }}>✨</div>
    </div>
  );
}
