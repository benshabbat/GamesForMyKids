/**
 * ===============================================
 * קומפוננט כרטיס צורה צבעונית
 * ===============================================
 */

import React from 'react';
import { Volume2 } from 'lucide-react';
import { SHAPE_ICON_MAP } from '@/lib/constants/ui/shapes';
import { ColoredShapeItem } from '@/lib/constants/gameData/basic';

interface ColoredShapeCardProps {
  item: ColoredShapeItem;
  onClick: (item: ColoredShapeItem) => void;
  className?: string;
}

export default function ColoredShapeCard({ 
  item, 
  onClick, 
  className = "" 
}: ColoredShapeCardProps) {
  
  // קבלת הקומפוננט של הצורה
  const ShapeComponent = SHAPE_ICON_MAP[item.svg as keyof typeof SHAPE_ICON_MAP];

  return (
    <div
      onClick={() => onClick(item)}
      className={`
        relative group bg-white rounded-3xl p-6 shadow-xl 
        hover:shadow-2xl hover:scale-105 
        transform transition-all duration-300 cursor-pointer 
        border-4 border-transparent hover:border-opacity-50
        ${className}
      `}
      style={{
        background: `linear-gradient(135deg, ${item.value}20 0%, ${item.value}40 100%)`,
        borderColor: item.value
      }}
    >
      {/* סמל קול */}
      <Volume2 
        className="absolute top-3 right-3 w-5 h-5 text-gray-600 
                   group-hover:text-gray-800 transition-colors duration-200
                   opacity-70 group-hover:opacity-100" 
      />

      {/* הצורה */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div 
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center
                     rounded-2xl transform group-hover:scale-110 transition-transform duration-300"
          style={{
            backgroundColor: item.value,
            boxShadow: `0 8px 25px ${item.value}40`
          }}
        >
          {ShapeComponent ? (
            <ShapeComponent 
              size={48} 
              className="text-white drop-shadow-md" 
            />
          ) : (
            <span className="text-3xl text-white font-bold">
              {item.emoji}
            </span>
          )}
        </div>

        {/* טקסט בעברית */}
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
            {item.hebrew}
          </h3>
          <p className="text-sm text-gray-600 opacity-80">
            {item.english}
          </p>
        </div>
      </div>

      {/* אפקט ריחוף */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 
                   transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, ${item.value}, transparent)`
        }}
      />
    </div>
  );
}
