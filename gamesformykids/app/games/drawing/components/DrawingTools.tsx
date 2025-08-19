/**
 * ===============================================
 * Drawing Tools Component - כלי הציור
 * ===============================================
 * 
 * קומפוננט נפרד לניהול כלי הציור
 */

import { buildButtonClasses } from '@/lib/constants';

interface DrawingToolsProps {
  currentColor: string;
  brushSize: number;
  isErasing: boolean;
  eraserSize: number;
  colors: string[];
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
  onEraserToggle: () => void;
  onEraserSizeChange: (size: number) => void;
  onClearCanvas: () => void;
  onSaveImage: () => void;
  isMobile?: boolean;
}

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  currentColor,
  brushSize,
  isErasing,
  eraserSize,
  colors,
  onColorChange,
  onBrushSizeChange,
  onEraserToggle,
  onEraserSizeChange,
  onClearCanvas,
  onSaveImage,
  isMobile = false
}) => {
  return (
    <div className={`drawing-tools ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* בחירת צבעים */}
      <div className="color-palette">
        <h3 className="text-lg font-bold mb-2">🎨 צבעים</h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                currentColor === color && !isErasing
                  ? 'border-gray-800 border-4'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => {
                onColorChange(color);
                if (isErasing) onEraserToggle();
              }}
              title={`בחר צבע ${color}`}
            />
          ))}
        </div>
      </div>

      {/* גודל מברשת */}
      <div className="brush-controls mb-4">
        <h4 className="font-semibold mb-2">🖌️ גודל מברשת</h4>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
          className="w-full mb-2"
          disabled={isErasing}
        />
        <span className="text-sm text-gray-600">{brushSize}px</span>
      </div>

      {/* כלי מחיקה */}
      <div className="eraser-controls mb-4">
        <button
          className={`w-full mb-2 ${buildButtonClasses(isErasing ? 'danger' : 'secondary')}`}
          onClick={onEraserToggle}
        >
          {isErasing ? '🎨 מעבר לציור' : '🧽 מחק'}
        </button>
        
        {isErasing && (
          <div>
            <h4 className="font-semibold mb-2">גודל מחק</h4>
            <input
              type="range"
              min="5"
              max="100"
              value={eraserSize}
              onChange={(e) => onEraserSizeChange(Number(e.target.value))}
              className="w-full mb-2"
            />
            <span className="text-sm text-gray-600">{eraserSize}px</span>
          </div>
        )}
      </div>

      {/* פעולות */}
      <div className="canvas-actions space-y-2">
        <button
          className={buildButtonClasses('danger')}
          onClick={onClearCanvas}
        >
          🗑️ נקה הכל
        </button>
        
        <button
          className={buildButtonClasses('success')}
          onClick={onSaveImage}
        >
          💾 שמור ציור
        </button>
      </div>

      {/* תצוגה נוכחית */}
      <div className="current-tool-display mt-4 p-3 bg-gray-100 rounded-lg">
        <h4 className="font-semibold mb-2">כלי נוכחי:</h4>
        {isErasing ? (
          <div className="flex items-center space-x-2">
            <span>🧽 מחק</span>
            <div 
              className="bg-gray-400 border-2 border-gray-600 rounded-full"
              style={{ 
                width: `${Math.min(eraserSize / 2, 20)}px`, 
                height: `${Math.min(eraserSize / 2, 20)}px` 
              }}
            />
            <span className="text-sm">{eraserSize}px</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span>🖌️ מברשת</span>
            <div 
              className="rounded-full border border-gray-300"
              style={{ 
                backgroundColor: currentColor,
                width: `${Math.min(brushSize, 20)}px`, 
                height: `${Math.min(brushSize, 20)}px` 
              }}
            />
            <span className="text-sm">{brushSize}px</span>
          </div>
        )}
      </div>
    </div>
  );
};
