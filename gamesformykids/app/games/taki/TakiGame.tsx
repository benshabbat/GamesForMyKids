'use client';

import {
  useTakiGame,
  canPlay,
  getValueLabel,
  getValueEmoji,
  COLOR_BG,
  COLOR_BORDER,
  COLOR_TEXT,
  getColorName,
  type TakiCard,
  type CardColor,
} from './useTakiGame';

// ─── Single Card ────────────────────────────────────────────
function TakiCardView({
  card,
  onClick,
  disabled,
  small,
}: {
  card: TakiCard;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
}) {
  const bg = COLOR_BG[card.color];
  const border = COLOR_BORDER[card.color];
  const text = COLOR_TEXT[card.color];
  const isWild = card.color === 'wild';
  const label = getValueLabel(card.value);
  const emoji = getValueEmoji(card.value);
  const isNum = typeof card.value === 'number';

  const size = small
    ? 'w-10 h-14 text-xs rounded-lg'
    : 'w-16 h-24 text-sm rounded-xl';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        size,
        isWild ? 'bg-gradient-to-br from-purple-500 to-pink-500' : bg,
        border,
        text,
        'border-2 flex flex-col items-center justify-center font-bold shadow-md',
        'transition-transform duration-100',
        disabled ? 'opacity-60 cursor-default' : 'hover:scale-110 hover:-translate-y-1 cursor-pointer active:scale-95',
      ].join(' ')}
      aria-label={`${getColorName(card.color)} ${label}`}
    >
      {isNum ? (
        <span className={small ? 'text-lg leading-none' : 'text-3xl leading-none'}>{label}</span>
      ) : (
        <>
          <span className={small ? 'text-base leading-none' : 'text-xl leading-none'}>{emoji}</span>
          <span className={small ? 'text-[9px] mt-0.5 leading-tight' : 'text-[10px] mt-1 leading-tight text-center px-0.5'}>{label}</span>
        </>
      )}
    </button>
  );
}

// ─── Face-Down Card ──────────────────────────────────────────
function FaceDownCard({ small }: { small?: boolean }) {
  const size = small
    ? 'w-10 h-14 rounded-lg'
    : 'w-16 h-24 rounded-xl';
  return (
    <div
      className={`${size} bg-gradient-to-br from-indigo-800 to-indigo-950 border-2 border-indigo-600 shadow-md flex items-center justify-center`}
    >
      <span className="text-indigo-400 text-xl select-none">🂠</span>
    </div>
  );
}

// ─── Color Picker ────────────────────────────────────────────
const COLORS: { color: CardColor; label: string; cls: string }[] = [
  { color: 'red',    label: '🔴 אדום',  cls: 'bg-red-500 hover:bg-red-400' },
  { color: 'green',  label: '🟢 ירוק',  cls: 'bg-green-500 hover:bg-green-400' },
  { color: 'blue',   label: '🔵 כחול',  cls: 'bg-blue-500 hover:bg-blue-400' },
  { color: 'yellow', label: '🟡 צהוב',  cls: 'bg-yellow-400 hover:bg-yellow-300 text-gray-900' },
];

function ColorPicker({ onPick }: { onPick: (c: CardColor) => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl text-center max-w-xs w-full mx-4">
        <p className="text-white text-lg font-bold mb-4">🌈 בחר צבע</p>
        <div className="grid grid-cols-2 gap-3">
          {COLORS.map(({ color, label, cls }) => (
            <button
              key={color}
              onClick={() => onPick(color)}
              className={`${cls} text-white font-bold py-3 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Game ───────────────────────────────────────────────
export default function TakiGame() {
  const { state, startGame, playCard, closeTaki, chooseColor, drawCard } = useTakiGame();
  const { phase, playerHand, computerHand, topCard, effectiveColor, inTakiSequence, takiColor, needsColorChoice, message, playerScore, computerScore, currentTurn, deck } = state;

  // Which player cards are currently playable
  const playableIds = new Set(
    phase === 'playing' && currentTurn === 'player' && !needsColorChoice
      ? playerHand
          .filter(c => canPlay(c, topCard, effectiveColor, inTakiSequence, takiColor))
          .map(c => c.id)
      : [],
  );

  // Top card display color (effective)
  const displayColor = (inTakiSequence && takiColor) ? takiColor : effectiveColor ?? topCard.color;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-950 to-teal-950 select-none" dir="rtl">
      {/* Color Picker Overlay */}
      {needsColorChoice && currentTurn === 'player' && (
        <ColorPicker onPick={chooseColor} />
      )}

      {/* ── MENU SCREEN ─────────────────────────────────────── */}
      {phase === 'menu' && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 text-center">
          <div className="text-8xl">🃏</div>
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">טאקי</h1>
          <p className="text-green-200 text-lg max-w-sm">
            משחק הקלפים הישראלי הקלאסי — שחק נגד המחשב!<br />
            שחק קלפים באותו צבע או ערך, השתמש בקלפים מיוחדים,<br />
            וריקן את היד ראשון כדי לנצח! 🏆
          </p>
          {(playerScore > 0 || computerScore > 0) && (
            <div className="flex gap-6 text-white text-lg font-semibold">
              <span>🧑 אתה: {playerScore}</span>
              <span>🤖 מחשב: {computerScore}</span>
            </div>
          )}
          <button
            onClick={startGame}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            🎮 התחל משחק
          </button>
          <div className="bg-black/30 rounded-xl p-4 text-green-200 text-sm max-w-sm text-right space-y-1">
            <p className="font-bold text-white mb-2">כללים בקצרה:</p>
            <p>🃏 <strong>טאקי</strong> — שחק קלפים באותו צבע ולחץ &ldquo;סגור&rdquo;</p>
            <p>✋ <strong>עצור</strong> — המתנגד מדלג תור</p>
            <p>+2 <strong>פלוס</strong> — המתנגד מושך 2 קלפים</p>
            <p>🌈 <strong>שנה צבע</strong> — בחר צבע חדש</p>
            <p>👑 <strong>מלך</strong> — שנה צבע + עצור</p>
            <p>⭐ <strong>סופר טאקי</strong> — טאקי עם כל צבע</p>
          </div>
        </div>
      )}

      {/* ── WIN / LOSE SCREEN ───────────────────────────────── */}
      {(phase === 'won' || phase === 'lost') && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
          <div className="text-8xl">{phase === 'won' ? '🎉' : '😢'}</div>
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
            {phase === 'won' ? 'ניצחת!' : 'המחשב ניצח!'}
          </h2>
          <p className="text-green-200 text-xl">{message}</p>
          <div className="flex gap-6 text-white text-xl font-semibold">
            <span>🧑 אתה: {playerScore}</span>
            <span>🤖 מחשב: {computerScore}</span>
          </div>
          <button
            onClick={startGame}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold text-xl px-10 py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95 mt-2"
          >
            🔄 שחק שוב
          </button>
        </div>
      )}

      {/* ── PLAYING SCREEN ──────────────────────────────────── */}
      {phase === 'playing' && (
        <div className="flex flex-col min-h-screen p-3 gap-3">

          {/* Score bar */}
          <div className="flex justify-between items-center text-white text-sm font-semibold px-1">
            <span>🧑 אתה: {playerScore}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentTurn === 'player' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-gray-300'}`}>
              {currentTurn === 'player' ? '← תורך' : 'תור המחשב...'}
            </span>
            <span>🤖 מחשב: {computerScore}</span>
          </div>

          {/* Computer hand (face-down) */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-gray-400 text-xs">🤖 מחשב — {computerHand.length} קלפים</p>
            <div className="flex flex-wrap justify-center gap-1 max-w-full">
              {computerHand.map((_, i) => (
                <FaceDownCard key={i} small />
              ))}
            </div>
          </div>

          {/* Table: deck + top card */}
          <div className="flex justify-center items-center gap-8 flex-1">
            {/* Deck */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-gray-400 text-xs">{deck.length} קלפים</p>
              <button
                onClick={drawCard}
                disabled={currentTurn !== 'player' || inTakiSequence || needsColorChoice}
                className="relative"
                title="משוך קלף"
              >
                <FaceDownCard />
                <span className="absolute -bottom-5 left-0 right-0 text-center text-gray-300 text-[10px]">משוך</span>
              </button>
            </div>

            {/* Top card */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-400 text-xs">קלף עליון</p>
              <div className="relative">
                <TakiCardView card={{ ...topCard, color: displayColor }} disabled />
                {effectiveColor && effectiveColor !== topCard.color && (
                  <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-white ${COLOR_BG[effectiveColor]}`} />
                )}
              </div>
              {inTakiSequence && (
                <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  🃏 רצף טאקי
                </span>
              )}
            </div>
          </div>

          {/* Message area */}
          <div className="text-center px-4">
            <p className="text-yellow-200 text-sm font-medium bg-black/30 rounded-xl py-2 px-3 inline-block max-w-xs">
              {message}
              {playerHand.length <= 2 && phase === 'playing' && (
                <span className="ml-2 font-bold text-yellow-400 animate-bounce inline-block">טאקי! 🃏</span>
              )}
            </p>
          </div>

          {/* Action buttons */}
          {currentTurn === 'player' && (
            <div className="flex justify-center gap-2">
              {inTakiSequence && (
                <button
                  onClick={closeTaki}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-2 rounded-xl shadow text-sm transition-transform hover:scale-105 active:scale-95"
                >
                  ✅ סגור טאקי
                </button>
              )}
              {!inTakiSequence && !needsColorChoice && (
                <button
                  onClick={drawCard}
                  disabled={deck.length === 0}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl shadow text-sm transition-transform hover:scale-105 active:scale-95"
                >
                  🂠 משוך קלף
                </button>
              )}
            </div>
          )}

          {/* Player hand */}
          <div className="flex flex-col items-center gap-2 pb-2">
            <p className="text-gray-400 text-xs">🧑 הקלפים שלך — {playerHand.length} קלפים</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-full">
              {playerHand.map(card => {
                const canPlayIt = playableIds.has(card.id);
                return (
                  <div key={card.id} className="relative">
                    <TakiCardView
                      card={card}
                      onClick={() => canPlayIt && playCard(card)}
                      disabled={!canPlayIt || currentTurn !== 'player' || needsColorChoice}
                    />
                    {canPlayIt && currentTurn === 'player' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
