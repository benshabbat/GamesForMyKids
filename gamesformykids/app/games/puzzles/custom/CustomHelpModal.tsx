'use client';

import { RotateCcw, Eye, Settings, Upload, Shuffle } from 'lucide-react';
import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';

export default function CustomHelpModal() {
  const { showHelp, toggleHelp } = usePuzzleStore();
  if (!showHelp) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={toggleHelp}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🧩 איך לשחק?</h2>
          <button onClick={toggleHelp} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div className="space-y-4 text-right">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">📋 שלבי המשחק:</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>העלה תמונה מהמחשב שלך</li>
              <li>בחר רמת קושי (2x2 עד 5x5)</li>
              <li>גרור את החלקים למקום הנכון בלוח</li>
              <li>השלם את הפאזל במהירות הגבוהה ביותר!</li>
            </ol>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">💡 טיפים:</h3>
            <ul className="list-disc list-inside space-y-2 text-green-700">
              <li>חלקים נכונים יוצגו עם מסגרת ירוקה וכוכב</li>
              <li>חלקים שגויים יוצגו עם מסגרת אדומה וX</li>
              <li>ניתן לגרור חלקים מהלוח אם הם לא במקום הנכון</li>
              <li>השתמש בכפתור &ldquo;רמזים&rdquo; לעזרה נוספת</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-purple-800 mb-2">🎮 פקדים:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-purple-700">
              <div className="flex items-center gap-2"><Upload className="w-4 h-4" /><span><strong>תמונה חדשה:</strong> החלף תמונה</span></div>
              <div className="flex items-center gap-2"><Shuffle className="w-4 h-4" /><span><strong>ערבב חלקים:</strong> מערבב סדר</span></div>
              <div className="flex items-center gap-2"><RotateCcw className="w-4 h-4" /><span><strong>התחל מחדש:</strong> מאפס משחק</span></div>
              <div className="flex items-center gap-2"><Eye className="w-4 h-4" /><span><strong>רמזים:</strong> עזרות ויזואליות</span></div>
              <div className="flex items-center gap-2"><Settings className="w-4 h-4" /><span><strong>ניפוי באגים:</strong> מידע טכני</span></div>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-bold text-orange-800 mb-2">⌨️ קיצורי מקלדת:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-orange-700">
              <div><strong>H:</strong> הפעל/כבה רמזים</div>
              <div><strong>D:</strong> הפעל/כבה מצב ניפוי באגים</div>
              <div><strong>S:</strong> ערבב חלקים</div>
              <div><strong>R:</strong> התחל מחדש</div>
              <div><strong>?:</strong> פתח/סגור עזרה</div>
              <div><strong>Escape:</strong> סגור עזרה</div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={toggleHelp}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            סגירה
          </button>
        </div>
      </div>
    </div>
  );
}
