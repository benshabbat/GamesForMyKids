'use client';

import { X, Mouse, RotateCcw, HelpCircle, Eye, Settings, Upload, Shuffle } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';

interface UnifiedHelpModalProps {
  showHelp?: boolean;
  onToggleHelp?: () => void;
  type?: 'simple' | 'custom';
}

export default function UnifiedHelpModal({ 
  showHelp: overrideShowHelp, 
  onToggleHelp: customOnToggleHelp, 
  type = 'simple' 
}: UnifiedHelpModalProps) {
  const { state, dispatch } = usePuzzleContext();
  
  // Use context values unless overridden
  const showHelp = overrideShowHelp ?? state.showHelp;
  const onToggleHelp = customOnToggleHelp || (() => dispatch({ type: 'TOGGLE_HELP' }));
  if (!showHelp) return null;

  if (type === 'simple') {
    // Simple help modal
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onToggleHelp}>
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">איך לשחק?</h3>
            <button
              onClick={onToggleHelp}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-3 text-right">
            <div className="flex items-center gap-2">
              <Mouse className="w-5 h-5 text-blue-500" />
              <span>גרור חלקים לכיוונים הנכונים</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-green-500" />
              <span>לחץ על R להתחלה מחדש</span>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-500" />
              <span>לחץ על H לעזרה</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-500" />
              <span>לחץ על Shift+H לרמזים</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-500" />
              <span>לחץ על D למצב ניפוי באגים</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">🎯 המטרה:</h4>
            <p className="text-blue-700 text-sm">
              גרור את כל חלקי הפאזל למקומם הנכון כדי להשלים את התמונה. 
              חלקים נכונים יהיו ירוקים וחלקים שגויים יהיו אדומים.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Detailed help modal for custom puzzles
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onToggleHelp}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🧩 איך לשחק?</h2>
          <button 
            onClick={onToggleHelp}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
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
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span><strong>תמונה חדשה:</strong> החלף תמונה</span>
              </div>
              <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4" />
                <span><strong>ערבב חלקים:</strong> מערבב סדר</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span><strong>התחל מחדש:</strong> מאפס משחק</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span><strong>רמזים:</strong> עזרות ויזואליות</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span><strong>ניפוי באגים:</strong> מידע טכני</span>
              </div>
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
            onClick={onToggleHelp}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            סגירה
          </button>
        </div>
      </div>
    </div>
  );
}
