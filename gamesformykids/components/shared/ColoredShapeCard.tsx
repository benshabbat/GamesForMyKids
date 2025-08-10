/**
 * ===============================================
 * קומפוננט כרטיס צורה צבעונית
 * ===============================================
 */
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
        relative group bg-white rounded-3xl p-8 shadow-xl 
        hover:shadow-2xl hover:scale-105 
        transform transition-all duration-300 cursor-pointer 
        border-2 border-gray-100 hover:border-gray-200
        ${className}
      `}
    >
      {/* סמל קול */}
      <Volume2 
        className="absolute top-3 right-3 w-5 h-5 text-gray-500 
                   group-hover:text-gray-700 transition-colors duration-200
                   opacity-70 group-hover:opacity-100" 
      />

      {/* הצורה */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center justify-center">
          {ShapeComponent ? (
            <div 
              style={{ 
                color: item.value,
                filter: `drop-shadow(0 6px 12px ${item.value}30)`
              }}
            >
              <ShapeComponent 
                size={120} 
                className={`transform group-hover:scale-110 transition-transform duration-300`}
              />
            </div>
          ) : (
            <span 
              className="text-8xl md:text-9xl font-bold transform group-hover:scale-110 transition-transform duration-300"
              style={{ 
                color: item.value,
                filter: `drop-shadow(0 6px 12px ${item.value}30)`
              }}
            >
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
