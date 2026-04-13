'use client';

import { X, Mouse, RotateCcw, HelpCircle, Eye, Settings } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';

export default function SimpleHelpModal() {
  const { state, toggleHelp: onToggleHelp } = usePuzzleContext();
  if (!state.showHelp) return null;
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
