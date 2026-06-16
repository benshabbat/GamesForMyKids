'use client';
import { LADDERS, SNAKES, type Player } from '../snakesLaddersStore';

const BOARD: number[][] = (() => {
  const board: number[][] = [];
  for (let gridRow = 0; gridRow < 10; gridRow++) {
    const boardRow = 9 - gridRow;
    const start = boardRow * 10 + 1;
    const row = Array.from({ length: 10 }, (_, i) => start + i);
    if (boardRow % 2 === 1) row.reverse();
    board.push(row);
  }
  return board;
})();

const LADDER_BOTTOMS = new Set(Object.keys(LADDERS).map(Number));
const SNAKE_HEADS = new Set(Object.keys(SNAKES).map(Number));

interface Props {
  players: [Player, Player];
}

export default function GameBoard({ players }: Props) {
  return (
    <div className="w-full aspect-square border-2 border-gray-700 rounded-lg overflow-hidden">
      <div className="grid grid-cols-10 h-full">
        {BOARD.flatMap((row, rIdx) =>
          row.map((sq, cIdx) => {
            const isLadder = LADDER_BOTTOMS.has(sq);
            const isSnake = SNAKE_HEADS.has(sq);
            const isWin = sq === 100;
            const tokensHere = players.filter(p => p.position === sq);

            let bg = (rIdx + cIdx) % 2 === 0 ? 'bg-amber-50' : 'bg-white';
            if (isLadder) bg = 'bg-green-200';
            if (isSnake) bg = 'bg-red-200';
            if (isWin) bg = 'bg-yellow-300';

            return (
              <div
                key={sq}
                className={`${bg} relative border border-gray-200 flex flex-col items-center justify-center`}
              >
                <span className="text-[7px] sm:text-[9px] font-bold text-gray-500 leading-none">{sq}</span>
                {isLadder && <span className="text-[8px] sm:text-[10px] leading-none">🪜</span>}
                {isSnake && <span className="text-[8px] sm:text-[10px] leading-none">🐍</span>}
                {isWin && <span className="text-[8px] sm:text-[10px] leading-none">⭐</span>}
                {tokensHere.length > 0 && (
                  <div className="absolute bottom-0.5 flex gap-0.5">
                    {tokensHere.map((p, i) => (
                      <span key={i} className="text-[10px] sm:text-sm leading-none">{p.emoji}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
