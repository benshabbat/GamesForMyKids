import React from 'react';
import { GameBoardProps } from '../types';

const GameBoard: React.FC<GameBoardProps> = ({ displayBoard }) => (
  <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl p-4 lg:p-6 shadow-2xl border border-white/20">
    <div className="grid grid-cols-10 gap-1 lg:gap-2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-3 lg:p-4 rounded-2xl border border-gray-600/50">
      {displayBoard.map((row, y) =>
        row.map((cell, x) => {
          const isEmpty = !cell || cell === 0;
          return (
            <div
              key={`${y}-${x}`}
              className={`w-5 h-5 lg:w-8 lg:h-8 rounded-lg border-2 border-gray-600/50 ${isEmpty ? '' : 'transform transition-all duration-150'}`}
              style={{
                background: isEmpty 
                  ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' 
                  : cell,
                boxShadow: isEmpty
                  ? 'inset 0 2px 4px rgba(0,0,0,0.3)'
                  : '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                willChange: isEmpty ? 'auto' : 'transform'
              }}
            />
          );
        })
      )}
    </div>
  </div>
);

export default GameBoard;
