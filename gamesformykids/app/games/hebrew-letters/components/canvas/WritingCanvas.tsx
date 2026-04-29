'use client';

import { useWritingCanvas } from './useWritingCanvas';
import { WritingCanvasProvider } from './WritingCanvasContext';
import CanvasToolbar from './CanvasToolbar';
import CanvasColorPicker from './CanvasColorPicker';
import CanvasStrokeWidthPicker from './CanvasStrokeWidthPicker';
import CanvasDrawArea from './CanvasDrawArea';

interface WritingCanvasProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  guideLetter?: string | undefined;
}

export default function WritingCanvas({
  width = 800,
  height = 400,
  backgroundColor = '#ffffff',
  guideLetter,
}: WritingCanvasProps) {
  const canvasValue = useWritingCanvas({ width, height, backgroundColor });

  return (
    <WritingCanvasProvider value={canvasValue} guideLetter={guideLetter}>
      <div className="bg-white rounded-xl border-2 border-green-500 p-4 shadow-lg">
        <div className="mb-4 space-y-4">
          <CanvasToolbar />
          <CanvasColorPicker />
          <CanvasStrokeWidthPicker />
        </div>

        <CanvasDrawArea />

        <div className="mt-4 text-center space-y-2">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-3 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">
              💡 <strong>טיפ:</strong> השתמש בעכבר או במגע כדי לכתוב על המסך
            </p>
            <p className="text-sm text-orange-700">
              ✍️ זכור לכתוב מימין לשמאל כמו בעברית
            </p>
          </div>
        </div>
      </div>
    </WritingCanvasProvider>
  );
}
