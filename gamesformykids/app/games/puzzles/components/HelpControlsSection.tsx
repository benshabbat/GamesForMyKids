import { RotateCcw, Eye, Settings, Upload, Shuffle } from 'lucide-react';
import HelpSection from './HelpSection';

export default function HelpControlsSection() {
  return (
    <HelpSection color="purple" title="🎮 פקדים:">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
    </HelpSection>
  );
}
