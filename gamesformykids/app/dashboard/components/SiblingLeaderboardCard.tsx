'use client';
import { useState } from 'react';
import { useFamilyLeaderboard } from '@/hooks/shared/user/useFamilyLeaderboard';
import { getGameLabel } from './gameLabels';

export function SiblingLeaderboardCard() {
  const { familyGroupId, members, leaderboard, loading, error, create, join, leave } = useFamilyLeaderboard();
  const [joinInput, setJoinInput] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(false);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse" dir="rtl">
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-8 bg-gray-100 rounded" />)}
        </div>
      </div>
    );
  }

  // No family group yet
  if (!familyGroupId) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 col-span-2" dir="rtl">
        <h2 className="text-lg font-bold text-gray-800 mb-1">🏆 תחרות משפחתית</h2>
        <p className="text-gray-500 text-sm mb-4">השווה ניקוד עם אח/אחות — צור קבוצה משפחתית כדי להתחיל!</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex flex-col gap-3">
          <button
            onClick={create}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors"
          >
            ✨ צור קבוצה חדשה
          </button>

          {showJoinForm ? (
            <div className="flex gap-2">
              <input
                value={joinInput}
                onChange={e => setJoinInput(e.target.value)}
                placeholder="הכנס קוד קבוצה..."
                className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm text-right"
                dir="ltr"
              />
              <button
                onClick={() => { if (joinInput.trim()) join(joinInput); }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-xl text-sm"
              >
                הצטרף
              </button>
              <button
                onClick={() => setShowJoinForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-3 rounded-xl text-sm"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowJoinForm(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-xl text-sm transition-colors"
            >
              🔗 הצטרף לקבוצה קיימת
            </button>
          )}
        </div>
      </div>
    );
  }

  // Has family group — show group code and leaderboard
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 col-span-2" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">🏆 תחרות משפחתית</h2>
        <button
          onClick={leave}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          עזוב קבוצה
        </button>
      </div>

      {/* Group code to share */}
      <div className="bg-purple-50 rounded-xl p-3 mb-4 text-center">
        <p className="text-xs text-purple-600 mb-1">קוד הקבוצה שלך — שתף עם אח/אחות:</p>
        <code className="text-purple-800 font-mono text-sm break-all select-all">{familyGroupId}</code>
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {leaderboard.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm">
          <p>עדיין אין משחקים משותפים.</p>
          <p className="mt-1">ברגע שגם הצד השני ישחק, הטבלה תתמלא!</p>
          {members.length <= 1 && (
            <p className="mt-3 text-xs text-purple-500">
              ממתין לחבר/ת קבוצה… ({members.length} חבר/ים כרגע)
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Legend */}
          <div className="flex justify-end gap-4 mb-2 text-xs text-gray-500">
            <span>אני</span>
            <span>אח/אחות</span>
          </div>

          {/* Table */}
          <ul className="space-y-2">
            {leaderboard.map(row => {
              const { name, emoji } = getGameLabel(row.gameType);
              return (
                <li key={row.gameType} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                  <span className="text-base">{emoji}</span>
                  <span className="flex-1 text-sm text-gray-700 truncate">{name}</span>
                  <span className={`text-sm font-bold w-12 text-center ${row.winner === 'me' ? 'text-purple-600' : 'text-gray-500'}`}>
                    {row.myBest}
                    {row.winner === 'me' && ' 🏆'}
                  </span>
                  <span className={`text-sm font-bold w-12 text-center ${row.winner === 'sibling' ? 'text-blue-600' : 'text-gray-500'}`}>
                    {row.siblingBest}
                    {row.winner === 'sibling' && ' 🏆'}
                  </span>
                  {row.winner === 'tie' && <span className="text-xs text-yellow-500">🤝</span>}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
