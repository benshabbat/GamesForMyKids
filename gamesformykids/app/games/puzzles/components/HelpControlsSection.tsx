import { RotateCcw, Eye, Settings, Upload, Shuffle } from 'lucide-react';

export default function HelpControlsSection() {
  return (
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
  );
}
