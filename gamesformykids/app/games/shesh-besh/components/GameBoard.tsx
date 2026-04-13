import { useSheshBeshStore } from '../sheshBeshGameStore';
import { BoardPoint } from './BoardPoint';
import { Bar } from './Bar';
import { BorneOff } from './BorneOff';

const TOP_POINTS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const BOT_POINTS = [12, 11, 10,  9,  8,  7,  6,  5,  4,  3,  2,  1];

export function GameBoard() {
  const points = useSheshBeshStore(s => s.points);
  const barPlayer = useSheshBeshStore(s => s.barPlayer);
  const barComputer = useSheshBeshStore(s => s.barComputer);
  const selected = useSheshBeshStore(s => s.selected);
  const validMoves = useSheshBeshStore(s => s.validMoves);
  const selectPoint = useSheshBeshStore(s => s.selectPoint);
  const validTargets = new Set(validMoves.map(m => m.to));
  return (
    <div className="flex bg-green-950 border-[3px] border-amber-700 rounded-2xl overflow-hidden shadow-2xl">

      {/* Left quad: 13–18 top / 12–7 bottom */}
      <div className="flex flex-col">
        <div className="flex border-b-2 border-amber-700/70">
          {TOP_POINTS.slice(0, 6).map(i => (
            <BoardPoint key={i} idx={i} pt={points[i]} isTop
              isSelected={selected === i} isTarget={validTargets.has(i)}
              onClick={() => selectPoint(i)} />
          ))}
        </div>
        <div className="flex-1 flex items-center justify-center bg-green-950/80 min-h-[1.5rem]">
          <span className="text-[9px] text-amber-600/50 font-bold rotate-90 whitespace-nowrap tracking-widest">מחשב←</span>
        </div>
        <div className="flex border-t-2 border-amber-700/70">
          {BOT_POINTS.slice(0, 6).map(i => (
            <BoardPoint key={i} idx={i} pt={points[i]} isTop={false}
              isSelected={selected === i} isTarget={validTargets.has(i)}
              onClick={() => selectPoint(i)} />
          ))}
        </div>
      </div>

      {/* Bar */}
      <Bar
        playerBar={barPlayer} compBar={barComputer}
        isSelected={selected === -1}
        onClickPlayer={() => barPlayer > 0 && selectPoint(-1)}
      />

      {/* Right quad: 19–24 top / 6–1 bottom */}
      <div className="flex flex-col">
        <div className="flex border-b-2 border-amber-700/70">
          {TOP_POINTS.slice(6).map(i => (
            <BoardPoint key={i} idx={i} pt={points[i]} isTop
              isSelected={selected === i} isTarget={validTargets.has(i)}
              onClick={() => selectPoint(i)} />
          ))}
        </div>
        <div className="flex-1 flex items-center justify-center bg-green-950/80 min-h-[1.5rem]">
          <span className="text-[9px] text-amber-600/50 font-bold rotate-90 whitespace-nowrap tracking-widest">→אתה</span>
        </div>
        <div className="flex border-t-2 border-amber-700/70">
          {BOT_POINTS.slice(6).map(i => (
            <BoardPoint key={i} idx={i} pt={points[i]} isTop={false}
              isSelected={selected === i} isTarget={validTargets.has(i)}
              onClick={() => selectPoint(i)} />
          ))}
        </div>
      </div>

      {/* Borne-off tray */}
      <BorneOff
        playerCount={points[0].player}
        compCount={points[25].computer}
        onBearOff={() => selectPoint(0)}
        isBearOffTarget={validTargets.has(0) && selected !== null}
      />
    </div>
  );
}
