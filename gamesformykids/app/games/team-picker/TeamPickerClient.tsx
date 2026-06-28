'use client';
import { useTeamPicker } from './useTeamPicker';

const TEAM_COLORS = [
  { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-700', badge: 'bg-red-500', emoji: '🔴' },
  { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-700', badge: 'bg-blue-500', emoji: '🔵' },
  { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-700', badge: 'bg-green-500', emoji: '🟢' },
  { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-700', badge: 'bg-yellow-500', emoji: '🟡' },
  { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-700', badge: 'bg-purple-500', emoji: '🟣' },
  { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-700', badge: 'bg-orange-500', emoji: '🟠' },
];

export default function TeamPickerClient() {
  const {
    namesInput, setNamesInput,
    numTeams, setNumTeams,
    teams, setTeams,
    error, divide, reshuffle,
  } = useTeamPicker();

  return (
    <div
      className="min-h-screen flex flex-col items-center py-8 px-4 gap-6"
      style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}
      dir="rtl"
    >
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow">🎯 מחלק קבוצות</h1>
        <p className="text-gray-600 mt-1 text-sm">הזן שמות, בחר מספר קבוצות — הכלי יחלק בהגינות!</p>
      </div>

      {!teams ? (
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">שמות המשתתפים (שורה לכל שם)</label>
            <textarea
              value={namesInput}
              onChange={(e) => setNamesInput(e.target.value)}
              placeholder={'דן\nמיה\nרועי\nנועה\nיוני'}
              rows={8}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-right focus:outline-none focus:border-teal-400 resize-none font-medium"
              dir="rtl"
            />
            <p className="text-xs text-gray-400 mt-1">
              {namesInput.split('\n').filter((n) => n.trim()).length} שמות
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">מספר קבוצות</label>
            <div className="flex gap-2 flex-wrap">
              {[2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumTeams(n)}
                  className={`w-12 h-12 rounded-xl font-bold text-lg transition-all
                    ${numTeams === n
                      ? 'bg-teal-500 text-white shadow-md scale-110'
                      : 'bg-gray-100 text-gray-600 hover:bg-teal-100'
                    }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            onClick={divide}
            disabled={!namesInput.trim()}
            className="w-full py-3 bg-linear-to-l from-teal-500 to-cyan-500 text-white font-extrabold rounded-2xl text-lg shadow-lg hover:shadow-xl disabled:opacity-40 transition-all active:scale-95"
          >
            🎲 חלק לקבוצות!
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {teams.map((team, i) => {
            const color = TEAM_COLORS[i % TEAM_COLORS.length]!;
            return (
              <div
                key={i}
                className={`${color.bg} border-2 ${color.border} rounded-2xl p-4 shadow-md`}
              >
                <h3 className={`${color.text} font-extrabold text-lg mb-3 flex items-center gap-2`}>
                  <span>{color.emoji}</span>
                  <span>קבוצה {i + 1}</span>
                  <span className={`${color.badge} text-white text-xs px-2 py-0.5 rounded-full me-auto`}>
                    {team.length} חברים
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {team.map((name, j) => (
                    <span
                      key={j}
                      className={`${color.text} bg-white rounded-full px-3 py-1.5 text-sm font-bold shadow-sm`}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex gap-3 mt-2">
            <button
              onClick={reshuffle}
              className="flex-1 py-3 bg-linear-to-l from-purple-500 to-pink-500 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              🔀 ערבב שוב
            </button>
            <button
              onClick={() => setTeams(null)}
              className="flex-1 py-3 bg-white text-gray-600 font-bold rounded-2xl shadow hover:shadow-md transition-all border border-gray-200"
            >
              ✏️ ערוך שמות
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
