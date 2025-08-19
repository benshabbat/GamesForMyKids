'use client';

import { useBuildingContext } from '@/app/games/building/contexts/BuildingContext';
import { SHAPE_ICONS } from '@/app/games/building/constants';

export default function ShapeCreator() {
  const { 
    SHAPES, 
    selectedColor, 
    selectedTool,
    createBlock, 
    handleToolSelect 
  } = useBuildingContext();

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-4">
      <h3 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3 text-center">צורות</h3>
      <div className="grid grid-cols-4 gap-1 md:gap-2 mb-2 md:mb-3">
        {SHAPES.map(shape => (
          <button
            key={shape}
            onClick={() => createBlock(shape)}
            className={`w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white hover:scale-110 rounded-xl shadow-lg transition-all flex items-center justify-center text-base md:text-lg border-2 border-transparent hover:border-gray-300 touch-manipulation ${
              shape === 'heart' ? 'hover:animate-pulse' : ''
            }`}
            style={{ 
              color: selectedColor,
              ...(shape === 'heart' && {
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,182,193,0.3) 100%)'
              })
            }}
          >
            <span className={shape === 'heart' ? 'animate-bounce' : ''}>
              {SHAPE_ICONS[shape]}
            </span>
          </button>
        ))}
      </div>
      
      {/* Tool Selection */}
      <div className="flex gap-1">
        <button
          onClick={() => handleToolSelect('normal')}
          className={`flex-1 py-2 px-1 md:px-2 rounded-lg text-xs font-bold transition-all touch-manipulation ${
            selectedTool === 'normal' ? 'bg-blue-500 text-white' : 'bg-white/50 text-gray-700 hover:bg-white/70'
          }`}
        >
          רגיל
        </button>
        <button
          onClick={() => handleToolSelect('magic')}
          className={`flex-1 py-2 px-1 md:px-2 rounded-lg text-xs font-bold transition-all touch-manipulation ${
            selectedTool === 'magic' ? 'bg-purple-500 text-white' : 'bg-white/50 text-gray-700 hover:bg-white/70'
          }`}
        >
          קסם ✨
        </button>
        <button
          onClick={() => handleToolSelect('rainbow')}
          className={`flex-1 py-2 px-1 md:px-2 rounded-lg text-xs font-bold transition-all touch-manipulation ${
            selectedTool === 'rainbow' ? 'bg-pink-500 text-white' : 'bg-white/50 text-gray-700 hover:bg-white/70'
          }`}
        >
          קשת 🌈
        </button>
      </div>
    </div>
  );
}
