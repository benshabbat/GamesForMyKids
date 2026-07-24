'use client';

import { Mouse, RotateCcw, HelpCircle, Eye, Settings } from 'lucide-react';
import { usePuzzleGame } from '../usePuzzleGame';
import HelpModalShell from '@/components/shared/overlays/HelpModalShell';

export default function SimpleHelpModal() {
  const { showHelp, toggleHelp } = usePuzzleGame();

  return (
    <HelpModalShell isOpen={showHelp} onClose={toggleHelp} title="איך לשחק?">
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
    </HelpModalShell>
  );
}
