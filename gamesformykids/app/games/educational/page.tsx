"use client";

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

// משחקים חינוכיים
const EDUCATIONAL_GAME_IDS = [
  "memory", "counting", "math", "hebrew-letters", "colored-shapes", 
  "letters", "numbers", "shapes", "colors"
];

export default function EducationalGamesPage() {
  // קבלת המשחקים החינוכיים מהרישום
  const allGames = GamesRegistry.getAllGameRegistrations();
  const educationalGames = allGames.filter(game => 
    EDUCATIONAL_GAME_IDS.includes(game.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* כותרת חינוכית */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 mb-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-4xl">🎓</span>
            <h2 className="text-3xl font-bold">משחקים חינוכיים</h2>
            <span className="text-4xl">📚</span>
          </div>
          <p className="text-center text-lg text-blue-100">
            משחקים שמפתחים כישורים קוגניטיביים, מתמטיים ולשוניים
          </p>
        </div>
      </div>

      {/* תוכן המשחקים */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-bold text-blue-800">פיתוח זיכרון</h3>
              <p className="text-sm text-blue-600">חיזוק היכולת לזכור ולחשוב</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl mb-2">🔢</div>
              <h3 className="font-bold text-green-800">למידת מספרים</h3>
              <p className="text-sm text-green-600">מתמטיקה בצורה מהנה</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-purple-800">ריכוז וקשב</h3>
              <p className="text-sm text-purple-600">שיפור הקשב והריכוז</p>
            </div>
          </div>
        </div>

        {/* רשת המשחקים */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {educationalGames.map((game) => (
            <div key={game.id} className="relative">
              {game.available ? (
                <Link href={game.href}>
                  <div
                    className={`
                      relative p-8 rounded-3xl shadow-xl transition-all duration-300 
                      transform hover:scale-105 cursor-pointer hover:shadow-2xl
                      ${game.color}
                    `}
                  >
                    <div className="text-center text-white">
                      <div className="mb-6 flex justify-center">
                        {React.createElement(game.icon, { className: "w-12 h-12" })}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        {game.title}
                      </h3>
                      <p className="text-lg opacity-90 mb-4">
                        {game.description}
                      </p>
                      
                      {/* תגית חינוכית */}
                      <div className="bg-white bg-opacity-20 rounded-full py-2 px-4 inline-block">
                        <span className="text-sm font-bold text-white">
                          🧠 משחק חינוכי
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Star className="w-6 h-6 text-yellow-300 fill-current" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative p-8 rounded-3xl shadow-xl bg-gray-300 cursor-not-allowed">
                  <div className="absolute inset-0 bg-gray-400 bg-opacity-50 rounded-3xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">בקרוב!</span>
                  </div>
                  <div className="text-center text-white">
                    <div className="mb-6 flex justify-center">
                      {React.createElement(game.icon, { className: "w-12 h-12" })}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {game.title}
                    </h3>
                    <p className="text-lg opacity-90">
                      {game.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* כפתור חזרה */}
        <div className="text-center mb-8">
          <Link 
            href="/games"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors"
          >
            ← חזרה לכל המשחקים
          </Link>
        </div>

        {/* מספר המשחקים */}
        <div className="text-center">
          <div className="bg-blue-50 rounded-2xl p-6 inline-block">
            <p className="text-blue-800 text-lg">
              <span className="font-bold text-2xl">{educationalGames.length}</span> משחקים חינוכיים
            </p>
            <p className="text-blue-600 text-sm mt-2">
              משחקים שמפתחים כישורי חשיבה ולמידה
            </p>
          </div>
        </div>
      </div>

      {/* פוטר חינוכי */}
      <footer className="mt-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-indigo-100">
            💡 טיפ: שחקו 15-20 דקות בכל פעם לתוצאות הטובות ביותר
          </p>
        </div>
      </footer>
    </div>
  );
}
