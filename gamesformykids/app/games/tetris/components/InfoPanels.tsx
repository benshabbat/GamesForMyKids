import NextPieceDisplay from './NextPieceDisplay';
import { useTetrisGame } from '../hooks/useTetrisGame';

export const MobileInfoPanel = () => {
  const { gameState } = useTetrisGame();
  const { score, level, linesCleared, nextPiece } = gameState;
  
  return (
    <div className="xl:hidden flex flex-row gap-4 w-full justify-center">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20 flex-1 max-w-[180px]">
        <h2 className="text-xl font-black mb-2 text-center text-white drop-shadow-lg">📊 מידע</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-white/90">ניקוד:</span>
            <span className="font-black text-yellow-300 text-lg drop-shadow-lg">{score.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/90">רמה:</span>
            <span className="font-black text-cyan-300 text-lg drop-shadow-lg">{level}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/90">שורות:</span>
            <span className="font-black text-green-300 text-lg drop-shadow-lg">{linesCleared}</span>
          </div>
        </div>
      </div>
      
      <NextPieceDisplay nextPiece={nextPiece} isMobile />
    </div>
  );
};

export const DesktopInfoPanel = () => {
  const { gameState } = useTetrisGame();
  const { score, level, linesCleared, nextPiece } = gameState;
  
  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-purple-600/80 to-purple-800/80 backdrop-blur-lg p-6 rounded-2xl border border-purple-300/30 shadow-2xl">
        <h3 className="text-white font-bold text-2xl mb-4 text-center">Score</h3>
        <p className="text-yellow-300 text-3xl font-black text-center">{score.toLocaleString()}</p>
      </div>
      
      {/* Level & Lines */}
      <div className="bg-gradient-to-br from-blue-600/80 to-blue-800/80 backdrop-blur-lg p-6 rounded-2xl border border-blue-300/30 shadow-2xl">
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-white font-bold text-lg">Level</h4>
            <p className="text-cyan-300 text-2xl font-black">{level}</p>
          </div>
          <div className="border-t border-blue-400/30 pt-4 text-center">
            <h4 className="text-white font-bold text-lg">Lines</h4>
            <p className="text-cyan-300 text-2xl font-black">{linesCleared}</p>
          </div>
        </div>
      </div>
      
      {/* Next Piece */}
      <div className="bg-gradient-to-br from-green-600/80 to-green-800/80 backdrop-blur-lg p-6 rounded-2xl border border-green-300/30 shadow-2xl">
        <h3 className="text-white font-bold text-xl mb-4 text-center">Next Piece</h3>
        <div className="flex justify-center">
          <NextPieceDisplay nextPiece={nextPiece} />
        </div>
      </div>
    </div>
  );
};
