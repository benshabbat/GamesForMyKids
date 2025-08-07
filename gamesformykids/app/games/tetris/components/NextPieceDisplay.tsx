import React from 'react';
import { NextPieceDisplayProps } from '../types';

const NextPieceDisplay: React.FC<NextPieceDisplayProps> = ({ nextPiece, isMobile = false }) => (
  <div className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 ${isMobile ? 'p-4 flex-1 max-w-[180px]' : 'p-6'}`}>
    <h3 className={`font-black text-center text-white drop-shadow-lg ${isMobile ? 'text-xl mb-2' : 'text-2xl mb-4'}`}>
      ⏭️ הבא
    </h3>
    <div className={`grid grid-cols-4 justify-center mx-auto ${isMobile ? 'gap-1' : 'gap-2'}`} style={{width: 'fit-content'}}>
      {[0, 1, 2, 3].map(y => 
        [0, 1, 2, 3].map(x => (
          <div
            key={`${y}-${x}`}
            className={`border-2 border-white/30 rounded-lg shadow-lg ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`}
            style={{
              background: 
                nextPiece.blocks[y] && nextPiece.blocks[y][x] 
                  ? nextPiece.color 
                  : 'rgba(255,255,255,0.1)',
              boxShadow: nextPiece.blocks[y] && nextPiece.blocks[y][x] 
                ? '0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)' 
                : 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        ))
      )}
    </div>
  </div>
);

export default NextPieceDisplay;
