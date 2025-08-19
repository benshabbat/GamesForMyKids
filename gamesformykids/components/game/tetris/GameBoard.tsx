import { GameBoardProps } from '../../../app/games/tetris/types';

const GameBoard = ({ displayBoard }: GameBoardProps) => (
  <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl p-3 lg:p-4 shadow-2xl border border-white/20">
    <div className="grid grid-cols-10 gap-0.5 lg:gap-1 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-2 lg:p-3 rounded-2xl border border-gray-600/50">
      {displayBoard.map((row, y) =>
        row.slice().reverse().map((cell, x) => {
          const actualX = row.length - 1 - x; // הפיכת סדר X
          const isEmpty = !cell || cell === 0;
          return (
            <div
              key={`${y}-${actualX}`}
              className={`w-4 h-4 lg:w-6 lg:h-6 rounded-md border border-gray-600/50 ${isEmpty ? '' : 'transform transition-all duration-150'}`}
              style={{
                background: isEmpty 
                  ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' 
                  : cell,
                boxShadow: isEmpty
                  ? 'inset 0 1px 2px rgba(0,0,0,0.3)'
                  : '0 1px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
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
