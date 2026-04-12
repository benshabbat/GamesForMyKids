'use client';

import { useSheshBeshGame, type PointState } from './useSheshBeshGame';

const DIE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// ── Single point column ──────────────────────────────────────
function BoardPoint({
  idx, pt, isTop, isSelected, isTarget, onClick
}: {
  idx: number; pt: PointState;
  isTop: boolean; isSelected: boolean; isTarget: boolean;
  onClick: () => void;
}) {
  // Points 1-6 = player home (bottom right), 19-24 = computer home (top right)
  const isPlayerHome = idx >= 1 && idx <= 6;
  const isCompHome = idx >= 19 && idx <= 24;
  const triColor = (idx % 2 === 0) ? 'border-t-red-700 border-b-red-700' : 'border-t-amber-400 border-b-amber-400';

  const pieces: ('player' | 'computer')[] = [];
  for (let i = 0; i < pt.player; i++) pieces.push('player');
  for (let i = 0; i < pt.computer; i++) pieces.push('computer');

  return (
    <button
      onClick={onClick}
      className={[
        'relative flex flex-col w-9 sm:w-10 items-center cursor-pointer',
        isTop ? 'justify-start pt-0.5' : 'justify-end pb-0.5',
        isTarget ? 'bg-green-500/30 rounded' : '',
        isSelected ? 'bg-yellow-400/30 rounded' : '',
        isPlayerHome ? 'bg-blue-900/20' : isCompHome ? 'bg-red-900/20' : '',
      ].join(' ')}
      style={{ minHeight: '5.5rem' }}
      aria-label={`point ${idx}`}
    >
      {/* Triangle */}
      <div className={[
        'absolute bottom-0 left-1 right-1',
        isTop
          ? 'top-0 border-t-[4.5rem] border-l-[18px] border-r-[18px] border-b-0 border-l-transparent border-r-transparent'
          : 'bottom-0 border-b-[4.5rem] border-l-[18px] border-r-[18px] border-t-0 border-l-transparent border-r-transparent',
        triColor,
      ].join(' ')} />

      {/* Point number */}
      <span className={[
        'absolute text-[8px] text-white/60 font-mono z-10',
        isTop ? 'bottom-0.5' : 'top-0.5',
      ].join(' ')}>{idx}</span>

      {/* Pieces stacked */}
      <div className={[
        'relative z-10 flex flex-col gap-0.5',
        isTop ? 'mt-0.5' : 'mb-0.5 flex-col-reverse',
      ].join(' ')}>
        {pieces.map((side, i) => (
          <div key={i} className={[
            'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow',
            side === 'player'
              ? 'bg-red-500 border-red-300 text-white'
              : 'bg-slate-100 border-slate-400 text-gray-800',
          ].join(' ')}>
            {pieces.filter(p => p === side).length > 5 && i === 0
              ? `×${pieces.filter(p => p === side).length}` : ''}
          </div>
        ))}
      </div>
    </button>
  );
}

// ── Bar ───────────────────────────────────────────────────────
function Bar({ playerBar, compBar, isSelected, onClick }: {
  playerBar: number; compBar: number; isSelected: boolean; onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between h-full w-8 bg-amber-900 border-x border-amber-600 cursor-pointer" onClick={onClick}>
      {/* Computer bar (top) */}
      <div className="flex flex-col items-center gap-0.5 pt-1">
        {Array.from({ length: compBar }).map((_, i) => (
          <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border border-slate-400" />
        ))}
      </div>
      <span className="text-amber-400 text-xs font-bold">בר</span>
      {/* Player bar (bottom) */}
      <div className={[
        'flex flex-col-reverse items-center gap-0.5 pb-1',
        isSelected ? 'ring-2 ring-yellow-400 rounded' : '',
      ].join(' ')}
        onClick={e => { e.stopPropagation(); onClick(); }}>
        {Array.from({ length: playerBar }).map((_, i) => (
          <div key={i} className="w-6 h-6 rounded-full bg-red-500 border border-red-300" />
        ))}
      </div>
    </div>
  );
}

// ── Borne-off area ────────────────────────────────────────────
function BorneOff({ playerCount, compCount }: { playerCount: number; compCount: number }) {
  return (
    <div className="flex flex-col items-center justify-between bg-black/20 rounded-lg p-2 w-12 h-full">
      <div className="text-center">
        <p className="text-white/60 text-[8px]">♟</p>
        <p className="text-slate-300 font-bold text-sm">{compCount}</p>
      </div>
      <div className="text-center">
        <p className="text-white/60 text-[8px]">🔴</p>
        <p className="text-red-300 font-bold text-sm">{playerCount}</p>
      </div>
    </div>
  );
}

// ── Main Game ─────────────────────────────────────────────────
export default function SheshBeshGame() {
  const { state, startGame, rollDice, selectPoint } = useSheshBeshGame();
  const {
    phase, points, barPlayer, barComputer,
    dice, rolledDice, currentTurn,
    playerScore, computerScore, message,
    selected, validMoves,
  } = state;

  const validTargets = new Set(validMoves.map(m => m.to));
  const isPlaying = phase === 'rolling' || phase === 'moving' || phase === 'computer';

  // Board: top row = points 13..24 (left to right), bottom row = points 12..1 (left to right)
  const topPoints = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const botPoints = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 flex flex-col items-center justify-center p-3 select-none" dir="rtl">

      {/* ── MENU ───────────────────────────────────────────── */}
      {phase === 'menu' && (
        <div className="flex flex-col items-center gap-8 text-center max-w-sm">
          <div className="text-8xl">🎲</div>
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">שש-בש</h1>
          <p className="text-amber-200 text-lg">
            משחק השש-בש הקלאסי נגד המחשב!<br />
            הטל קוביות, הזז אסימונים אדומים, ותהיה ראשון לרוקן הלוח!
          </p>
          {(playerScore > 0 || computerScore > 0) && (
            <div className="flex gap-6 text-white text-lg font-semibold">
              <span>🔴 אתה: {playerScore}</span>
              <span>⚪ מחשב: {computerScore}</span>
            </div>
          )}
          <button onClick={startGame} className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95">
            🎮 התחל משחק
          </button>
          <div className="bg-black/30 rounded-xl p-4 text-amber-200 text-sm text-right space-y-1">
            <p className="font-bold text-white mb-1">כללים:</p>
            <p>🔴 אתה = אדום, זזים מ-24 ל-1</p>
            <p>⚪ מחשב = לבן, זזים מ-1 ל-24</p>
            <p>🎲 הטל קוביות ובחר אסימון להזזה</p>
            <p>💥 הנחת אסימון על יחיד = שולח אותו לבר!</p>
            <p>🏠 בית: נקודות 1-6 (אתה) | 19-24 (מחשב)</p>
            <p>✅ כשכל האסימונים בבית — אפשר לצאת</p>
          </div>
        </div>
      )}

      {/* ── WIN / LOSE ─────────────────────────────────────── */}
      {(phase === 'won' || phase === 'lost') && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-8xl">{phase === 'won' ? '🎉' : '😢'}</div>
          <h2 className="text-4xl font-extrabold text-white">{message}</h2>
          <div className="flex gap-6 text-white text-xl font-semibold">
            <span>🔴 אתה: {playerScore}</span>
            <span>⚪ מחשב: {computerScore}</span>
          </div>
          <button onClick={startGame} className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95">
            🔄 שחק שוב
          </button>
        </div>
      )}

      {/* ── PLAYING ─────────────────────────────────────────── */}
      {isPlaying && (
        <div className="flex flex-col items-center gap-2 w-full max-w-[520px]">

          {/* Score + turn */}
          <div className="flex justify-between w-full text-white text-xs font-semibold px-1">
            <span>🔴 {playerScore} ניצ׳</span>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${currentTurn === 'player' ? 'bg-amber-400 text-gray-900' : 'bg-gray-700 text-gray-300'}`}>
              {currentTurn === 'player' ? '← תורך' : 'מחשב...'}
            </span>
            <span>⚪ {computerScore} ניצ׳</span>
          </div>

          {/* Dice display */}
          <div className="flex gap-2 items-center justify-center min-h-8">
            {(rolledDice.length > 0 ? rolledDice : []).map((d, i) => (
              <span key={i} className={`text-3xl ${dice.includes(d) ? 'text-white' : 'text-white/30 line-through'}`}>
                {DIE_FACES[d]}
              </span>
            ))}
          </div>

          {/* Board */}
          <div className="flex bg-green-900 border-2 border-amber-700 rounded-xl overflow-hidden shadow-2xl">
            {/* Top half (points 13-24) */}
            <div className="flex flex-col">
              <div className="flex border-b-2 border-amber-700">
                {topPoints.slice(0, 6).map(i => (
                  <BoardPoint
                    key={i} idx={i} pt={points[i]} isTop
                    isSelected={selected === i}
                    isTarget={validTargets.has(i)}
                    onClick={() => selectPoint(i)}
                  />
                ))}
              </div>
              <div className="flex border-t-2 border-amber-700">
                {botPoints.slice(0, 6).map(i => (
                  <BoardPoint
                    key={i} idx={i} pt={points[i]} isTop={false}
                    isSelected={selected === i}
                    isTarget={validTargets.has(i)}
                    onClick={() => selectPoint(i)}
                  />
                ))}
              </div>
            </div>

            {/* Bar */}
            <Bar
              playerBar={barPlayer} compBar={barComputer}
              isSelected={selected === -1}
              onClick={() => barPlayer > 0 && selectPoint(-1)}
            />

            {/* Right half (points 19-24 top, 6-1 bottom) */}
            <div className="flex flex-col">
              <div className="flex border-b-2 border-amber-700">
                {topPoints.slice(6).map(i => (
                  <BoardPoint
                    key={i} idx={i} pt={points[i]} isTop
                    isSelected={selected === i}
                    isTarget={validTargets.has(i)}
                    onClick={() => selectPoint(i)}
                  />
                ))}
              </div>
              <div className="flex border-t-2 border-amber-700">
                {botPoints.slice(6).map(i => (
                  <BoardPoint
                    key={i} idx={i} pt={points[i]} isTop={false}
                    isSelected={selected === i}
                    isTarget={validTargets.has(i)}
                    onClick={() => selectPoint(i)}
                  />
                ))}
              </div>
            </div>

            {/* Borne-off */}
            <BorneOff playerCount={points[0].player} compCount={points[25].computer} />
          </div>

          {/* Message */}
          <p className="text-amber-200 text-xs font-medium bg-black/30 rounded-xl py-1.5 px-3 text-center max-w-xs">
            {message}
          </p>

          {/* Roll button */}
          {phase === 'rolling' && currentTurn === 'player' && (
            <button
              onClick={rollDice}
              className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-8 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-base"
            >
              🎲 הטל קוביות
            </button>
          )}
        </div>
      )}
    </div>
  );
}
