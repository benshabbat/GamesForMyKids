'use client';
import { useClockGame } from './useClockGame';
import { ClockQuestion } from './data/times';

function ClockFace({ hour, minute, size = 160 }: { hour: number; minute: number; size?: number }) {
  const cx = 100, cy = 100;
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;
  const toRad = (deg: number) => (deg - 90) * Math.PI / 180;
  const hourRad = toRad(hourAngle);
  const minuteRad = toRad(minuteAngle);
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <circle cx={cx} cy={cy} r={88} fill="white" stroke="#4f46e5" strokeWidth="5" />
      {[...Array(12)].map((_, i) => {
        const a = toRad(i * 30 + 90);
        const r1 = i % 3 === 0 ? 73 : 78;
        return (
          <line key={i}
            x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
            x2={cx + 88 * Math.cos(a)} y2={cy + 88 * Math.sin(a)}
            stroke="#4f46e5" strokeWidth={i % 3 === 0 ? 3 : 1.5} />
        );
      })}
      {['12','3','6','9'].map((n, i) => {
        const a = toRad(i * 90 + 90);
        return <text key={n} x={cx + 62 * Math.cos(a)} y={cy + 62 * Math.sin(a)}
          textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="bold" fill="#4f46e5">{n}</text>;
      })}
      {/* Hour hand */}
      <line x1={cx} y1={cy}
        x2={cx + 52 * Math.cos(hourRad)} y2={cy + 52 * Math.sin(hourRad)}
        stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1={cx} y1={cy}
        x2={cx + 72 * Math.cos(minuteRad)} y2={cy + 72 * Math.sin(minuteRad)}
        stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="6" fill="#1e293b" />
    </svg>
  );
}

export default function ClockGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, startGame, selectAnswer, next, goMenu, restart } = useClockGame();

  // ── MENU ──
  if (phase === 'menu') return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-6 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="flex justify-center mb-4">
          <ClockFace hour={10} minute={10} size={160} />
        </div>
        <h1 className="text-3xl font-bold text-indigo-800 mb-3">הכרת השעון</h1>
        <p className="text-indigo-600 mb-8">ראה את השעון — בחר את השעה הנכונה!</p>
        <button onClick={startGame}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-violet-500 to-indigo-600 shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🕐 התחל!
        </button>
      </div>
    </div>
  );

  // ── PLAYING ──
  if (phase === 'playing' && current) return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goMenu} className="text-indigo-500 text-sm bg-indigo-100 rounded-full px-3 py-1">← חזור</button>
          <span className="font-bold text-indigo-700">{index + 1} / {total}</span>
          <span className="font-bold text-indigo-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-indigo-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5 text-center">
          <p className="text-lg font-bold text-gray-600 mb-4">מה השעה?</p>
          <div className="flex justify-center">
            <ClockFace hour={current.hour} minute={current.minute} size={180} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(choices as ClockQuestion[]).map(c => {
            const isRight = c.id === current.id;
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50';
            if (selected !== null) {
              if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (c.id === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={c.id} onClick={() => selectAnswer(c.id)} disabled={selected !== null}
                className={`py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${style}`}>
                <div className="text-2xl font-black">{c.digital}</div>
                <div className="text-sm opacity-75 mt-0.5">{c.description}</div>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! ${current.digital} — ${current.description}` : `💙 ${current.digital} — ${current.description}`}
            </div>
            <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-violet-500 to-indigo-600 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULT ──
  const correct = Math.round(score / 10);
  const pct = Math.round((correct / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-3"><ClockFace hour={12} minute={0} size={100} /></div>
        <h1 className="text-2xl font-bold mb-4">{pct >= 80 ? '🏆 כל הכבוד!' : '💪 תמשיך להתאמן!'}</h1>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-indigo-700">{correct} / {total}</p>
          <div className="mt-2 h-3 bg-indigo-100 rounded-full"><div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} /></div>
          <p className="text-indigo-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-violet-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">🏠 תפריט</button>
        </div>
      </div>
    </div>
  );
}
