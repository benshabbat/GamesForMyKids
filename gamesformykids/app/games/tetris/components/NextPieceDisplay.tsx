import { NextPieceDisplayProps } from '../types';

const NextPieceDisplay = ({ nextPiece, isMobile = false }: NextPieceDisplayProps) => {
  if (!nextPiece) {
    return (
      <div className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 ${isMobile ? 'p-4 flex-1 max-w-[180px]' : 'p-6'}`}>
        <h3 className={`font-black text-center text-white drop-shadow-lg ${isMobile ? 'text-xl mb-2' : 'text-2xl mb-4'}`}>
          ⏭️ הבא
        </h3>
        <div className={`grid grid-cols-4 justify-center mx-auto ${isMobile ? 'gap-1' : 'gap-2'}`} style={{width: 'fit-content'}}>
          {Array(16).fill(0).map((_, index) => (
            <div
              key={index}
              className={`border-2 border-white/30 rounded-lg shadow-lg ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`}
              style={{
                background: 'rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 ${isMobile ? 'p-4 flex-1 max-w-[180px]' : 'p-6'}`}>
      <h3 className={`font-black text-center text-white drop-shadow-lg ${isMobile ? 'text-xl mb-2' : 'text-2xl mb-4'}`}>
        ⏭️ הבא
      </h3>
      <div className={`grid grid-cols-4 justify-center mx-auto ${isMobile ? 'gap-1' : 'gap-2'}`} style={{width: 'fit-content'}}>
        {[0, 1, 2, 3].map(y => 
          [0, 1, 2, 3].map(x => {
            const hasBlock = nextPiece && 
                           nextPiece.blocks && 
                           Array.isArray(nextPiece.blocks) &&
                           nextPiece.blocks[y] && 
                           Array.isArray(nextPiece.blocks[y]) &&
                           nextPiece.blocks[y][x];
            
            return (
              <div
                key={`${y}-${x}`}
                className={`border-2 border-white/30 rounded-lg shadow-lg ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`}
                style={{
                  background: hasBlock && nextPiece?.color
                    ? nextPiece.color 
                    : 'rgba(255,255,255,0.1)',
                  boxShadow: hasBlock
                    ? '0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)' 
                    : 'inset 0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default NextPieceDisplay;
