"use client";

import React, { useState, lazy, Suspense } from 'react';
import { Camera, Puzzle, Home } from 'lucide-react';

// Lazy load heavy components
const CustomPuzzleGame = lazy(() => import('./CustomPuzzleGame'));
const SimplePuzzleGame = lazy(() => import('./SimplePuzzleGame'));

// Loading component
const GameLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p className="text-xl text-purple-600">טוען משחק...</p>
    </div>
  </div>
);

export default function PuzzleGamePage() {
  const [gameMode, setGameMode] = useState<'menu' | 'simple' | 'custom'>('menu');

  if (gameMode === 'simple') {
    return (
      <Suspense fallback={<GameLoading />}>
        <SimplePuzzleGame />
      </Suspense>
    );
  }

  if (gameMode === 'custom') {
    return (
      <Suspense fallback={<GameLoading />}>
        <CustomPuzzleGame />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 p-4">
        <div className="max-w-4xl mx-auto">
        {/* כותרת */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-800 mb-4">
            🧩 משחקי פאזלים 🎨
          </h1>
          <p className="text-xl text-purple-600">
            בחר את סוג הפאזל שאתה רוצה לשחק!
          </p>
          <p className="text-sm text-purple-500 mt-2">
            💡 על מכשירים ניידים: געו וגררו את החלקים למקומם
          </p>
        </div>

        {/* בחירת סוג המשחק */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* פאזל פשוט */}
          <div
            onClick={() => setGameMode('simple')}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Puzzle className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                פאזל תמונות
              </h3>
              <p className="text-gray-600 mb-4">
                פאזלים עם תמונות יפות של שועלים, נסיכות, ובעלי חיים חמודים - מושלם לילדים!
              </p>
              <div className="flex justify-center gap-2 text-2xl mb-4">
                <span>🦊</span>
                <span>�</span>
                <span>�</span>
                <span>🍄</span>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                מתאים לגילאי 3-6
              </div>
            </div>
          </div>

          {/* פאזל תמונות מותאמות אישית */}
          <div
            onClick={() => setGameMode('custom')}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                פאזל תמונות מותאמות
              </h3>
              <p className="text-gray-600 mb-4">
                העלה תמונה משלך ובנה ממנה פאזל מותאם אישית!
              </p>
              <div className="flex justify-center gap-2 text-2xl mb-4">
                <span>📸</span>
                <span>🖼️</span>
                <span>🎨</span>
                <span>✨</span>
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold">
                מתאים לגילאי 5+
              </div>
            </div>
          </div>
        </div>

        {/* מידע נוסף */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
            ✨ מה תלמדו במשחק? ✨
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🧠</div>
              <h4 className="font-bold text-gray-700">חשיבה לוגית</h4>
              <p className="text-sm text-gray-600">פיתוח יכולת פתרון בעיות</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">👁️</div>
              <h4 className="font-bold text-gray-700">תפיסה חזותית</h4>
              <p className="text-sm text-gray-600">זיהוי צורות וצבעים</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-bold text-gray-700">ריכוז וסבלנות</h4>
              <p className="text-sm text-gray-600">שיפור הקשב והתמדה</p>
            </div>
          </div>
        </div>

        {/* כפתור חזרה */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-purple-700 mx-auto"
          >
            <Home className="w-5 h-5" />
            חזרה לתפריט הראשי
          </button>
        </div>
      </div>
    </div>
  );
}