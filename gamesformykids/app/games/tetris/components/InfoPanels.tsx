import React from 'react';
import { InfoPanelProps } from '../types';
import NextPieceDisplay from './NextPieceDisplay';

export const MobileInfoPanel: React.FC<InfoPanelProps> = ({ score, level, linesCleared, nextPiece }) => (
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
    
    {nextPiece && <NextPieceDisplay nextPiece={nextPiece} isMobile />}
  </div>
);

export const DesktopInfoPanel: React.FC<InfoPanelProps> = ({ score, level, linesCleared, nextPiece }) => (
  <div className="hidden xl:flex flex-col gap-6">
    <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 min-w-[250px]">
      <h2 className="text-2xl font-black mb-4 text-center text-white drop-shadow-lg">📊 מידע</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-lg">ניקוד:</span>
          <span className="font-black text-yellow-300 text-2xl drop-shadow-lg">{score.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-lg">רמה:</span>
          <span className="font-black text-cyan-300 text-2xl drop-shadow-lg">{level}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-lg">שורות:</span>
          <span className="font-black text-green-300 text-2xl drop-shadow-lg">{linesCleared}</span>
        </div>
      </div>
    </div>
    
    {nextPiece && <NextPieceDisplay nextPiece={nextPiece} />}
  </div>
);
