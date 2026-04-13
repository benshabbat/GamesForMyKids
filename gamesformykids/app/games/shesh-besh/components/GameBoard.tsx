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
    /* Walnut outer frame */
    <div
      className="rounded-2xl p-[7px] shadow-[0_24px_64px_rgba(0,0,0,0.9)] ring-1 ring-black/60"
      style={{ background: 'linear-gradient(155deg,#92400e 0%,#3b1505 45%,#92400e 100%)' }}
    >
      {/* Felt surface */}
      <div className="flex bg-[#0b3d1b] rounded-xl overflow-hidden border border-black/40">

        {/* Left quad: 13–18 top / 12–7 bottom */}
        <div className="flex flex-col">
          <div className="flex">
            {TOP_POINTS.slice(0, 6).map(i => (
              <BoardPoint key={i} idx={i} pt={points[i]} isTop
                isSelected={selected === i} isTarget={validTargets.has(i)}
                onClick={() => selectPoint(i)} />
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[2rem]">
            <span className="text-[9px] text-amber-700/40 font-bold tracking-widest select-none">← מחשב</span>
          </div>
          <div className="flex">
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
          <div className="flex">
            {TOP_POINTS.slice(6).map(i => (
              <BoardPoint key={i} idx={i} pt={points[i]} isTop
                isSelected={selected === i} isTarget={validTargets.has(i)}
                onClick={() => selectPoint(i)} />
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[2rem]">
            <span className="text-[9px] text-amber-700/40 font-bold tracking-widest select-none">אתה →</span>
          </div>
          <div className="flex">
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
    </div>
  );
}
