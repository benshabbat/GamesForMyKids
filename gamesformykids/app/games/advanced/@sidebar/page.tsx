import Link from 'next/link';

const ADVANCED_GAMES = [
  {
    id: 'memory',
    name: 'משחק זיכרון',
    emoji: '🧠',
    description: 'פתח את הזיכרון שלך',
    difficulty: 'בינוני',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'puzzles',
    name: 'פאזלים מתקדמים',
    emoji: '🧩',
    description: 'הרכב תמונות מורכבות',
    difficulty: 'קשה',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'math',
    name: 'מתמטיקה מתקדמת',
    emoji: '➕',
    description: 'פתר תרגילים מאתגרים',
    difficulty: 'קשה',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'drawing',
    name: 'ציור דיגיטלי',
    emoji: '🎨',
    description: 'צייר יצירות אמנות',
    difficulty: 'קל',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'builder',
    name: 'בונה עולמות',
    emoji: '🏗️',
    description: 'בנה עולמות וירטואליים',
    difficulty: 'מתקדם',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function AdvancedGamesSidebar() {
  return (
    <aside className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          🎯 משחקים מתקדמים
        </h3>
        <p className="text-gray-600 text-sm">
          בחרו משחק מהרשימה למטה
        </p>
      </div>

      <nav className="space-y-3">
        {ADVANCED_GAMES.map((game) => (
          <Link
            key={game.id}
            href={`/games/advanced/${game.id}`}
            className="block group"
          >
            <div className={`bg-gradient-to-r ${game.color} p-4 rounded-xl text-white hover:shadow-lg transform hover:scale-105 transition-all duration-200`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{game.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{game.name}</h4>
                  <p className="text-sm opacity-90">{game.description}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-white border-opacity-30">
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {game.difficulty}
                </span>
                <span className="text-sm opacity-75">
                  לחצו לשחק ←
                </span>
              </div>
            </div>
          </Link>
        ))}
      </nav>

      {/* סטטיסטיקות */}
      <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
        <h4 className="font-bold text-gray-700 mb-3">📊 הסטטיסטיקות שלי</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">משחקים שוחקו:</span>
            <span className="font-bold text-blue-600">127</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ניקוד הכי גבוה:</span>
            <span className="font-bold text-green-600">2,450</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">זמן משחק כולל:</span>
            <span className="font-bold text-purple-600">45 שעות</span>
          </div>
        </div>
      </div>

      {/* העדפות */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
        <h4 className="font-bold text-yellow-800 mb-2">⚙️ הגדרות מהירות</h4>
        <div className="space-y-2">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span className="text-yellow-700">הפעל צלילים</span>
          </label>
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" />
            <span className="text-yellow-700">מצב מתקדם</span>
          </label>
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span className="text-yellow-700">שמור התקדמות</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
