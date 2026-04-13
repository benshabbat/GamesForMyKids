"use client";

import styles from '../drawing.module.css';

export default function DrawingStartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center ${styles.drawingContainer}`}>
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-4 text-center">
        <div className="text-8xl mb-6 animate-bounce">🎨</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          משחק ציורים
        </h1>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          בואו ניצור יצירות אמנות יפות!<br />
          בחרו צבעים, ציירו ומחקו כל מה שבא לכם
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span>🖌️</span>
              <span>ציור עם מברשות בגדלים שונים</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🧹</span>
              <span>מחיקה מדויקת בגדלים שונים</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🎨</span>
              <span>12 צבעים יפים לבחירה</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>💾</span>
              <span>שמירת הציור למחשב</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-200 w-full"
        >
          🎨 בואו נתחיל לצייר!
        </button>
      </div>
    </div>
  );
}
