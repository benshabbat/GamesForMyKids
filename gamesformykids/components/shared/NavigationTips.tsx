/**
 * ===============================================
 * NavigationTips - הוראות שימוש בניווט
 * ===============================================
 * 
 * רכיב שמציג טיפים לשימוש בניווט
 * מופיע במסכי התחלה למשך מספר שניות
 */

import { useState, useEffect } from 'react';
import { Keyboard, Mouse, Home } from 'lucide-react';

interface NavigationTipsProps {
  showDuration?: number; // כמה זמן להציג (במילישניות)
}

export default function NavigationTips({ showDuration = 5000 }: NavigationTipsProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, showDuration);

    return () => clearTimeout(timer);
  }, [showDuration]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-2xl">💡</div>
          <h4 className="font-bold text-gray-800 text-sm">טיפים לניווט</h4>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-auto text-gray-500 hover:text-gray-700 text-sm"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-2 text-xs text-gray-600">
          {/* ניווט עם עכבר */}
          <div className="flex items-center gap-2">
            <Mouse className="w-3 h-3 text-blue-500" />
            <span>לחץ על החצים למעלה למעבר בין משחקים</span>
          </div>
          
          {/* ניווט עם מקלדת */}
          <div className="flex items-center gap-2">
            <Keyboard className="w-3 h-3 text-green-500" />
            <span>חצים במקלדת: ←→ לניווט</span>
          </div>
          
          {/* חזרה הביתה */}
          <div className="flex items-center gap-2">
            <Home className="w-3 h-3 text-purple-500" />
            <span>ESC או לחיצה על הבית לחזרה</span>
          </div>
        </div>
        
        <div className="mt-3 text-center">
          <div className="text-xs text-gray-500">ההודעה תיעלם אוטומטית</div>
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1 overflow-hidden">
            <div 
              className="bg-blue-500 h-1 rounded-full transition-all duration-[5000ms] ease-linear w-full"
              style={{ 
                transform: 'translateX(0%)',
                animation: 'slideOut 5s linear forwards'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
