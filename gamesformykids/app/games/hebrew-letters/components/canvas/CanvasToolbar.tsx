'use client';

import { Button } from '@/components/ui/button';
import { Eraser, RotateCcw, Download, Eye, EyeOff } from 'lucide-react';

interface CanvasToolbarProps {
  pathsLength: number;
  showLetterGuide: boolean;
  guideLetter?: string;
  onUndo: () => void;
  onClear: () => void;
  onReset: () => void;
  onDownload: () => void;
  onToggleGuide: () => void;
}

export default function CanvasToolbar({
  pathsLength,
  showLetterGuide,
  guideLetter,
  onUndo,
  onClear,
  onReset,
  onDownload,
  onToggleGuide,
}: CanvasToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        onClick={onUndo}
        disabled={pathsLength === 0}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        בטל צעד אחרון
      </Button>

      <Button
        onClick={onClear}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 hover:bg-red-50 transition-colors"
      >
        <Eraser className="w-4 h-4" />
        נקה הכל
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 hover:bg-red-100 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        איפוס מלא
      </Button>

      <Button
        onClick={onDownload}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 hover:bg-green-50 transition-colors"
      >
        <Download className="w-4 h-4" />
        שמור יצירה
      </Button>

      {guideLetter && (
        <Button
          onClick={onToggleGuide}
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 transition-all ${
            showLetterGuide
              ? 'bg-green-100 border-green-400 text-green-700'
              : 'hover:bg-gray-50'
          }`}
        >
          {showLetterGuide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showLetterGuide ? 'הסתר מדריך' : 'הצג מדריך'}
        </Button>
      )}
    </div>
  );
}
