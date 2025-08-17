import { Home, RotateCcw } from "lucide-react";
import { ReactNode } from "react";
import { useGameInfo, useGameActions } from "@/hooks/shared/useGameContext";

interface EnhancedUnifiedHeaderProps {
  // תצוגת כותרת (למסכי התחלה)
  title?: string;
  subTitle?: string;
  textColorHeader?: string;
  textColorSubHeader?: string;
  
  // עיצוב כללי
  variant?: "start-screen" | "game-header";
  className?: string;
  children?: ReactNode;
  
  // עקיפת קונטקסט (אופציונלי)
  overrideScore?: number;
  overrideLevel?: number;
  levelColor?: string;
  
  // פעולות מותאמות אישית (אופציונלי)
  customOnHome?: () => void;
  customOnReset?: () => void;
}

/**
 * Enhanced UnifiedHeader - גרסה משופרת ללא Props Drilling
 * 
 * 🎯 יתרונות:
 * - אוטומטית שולפת score ו-level מהקונטקסט
 * - פעולות אוטומטיות לחזרה ואיפוס
 * - אפשרות לעקיפת קונטקסט במצורך
 * - אפס props drilling!
 * 
 * 📝 שימוש:
 * <EnhancedUnifiedHeader variant="game-header" />
 * <EnhancedUnifiedHeader variant="start-screen" title="שלום" />
 */
export default function EnhancedUnifiedHeader({
  // Start screen props
  title,
  subTitle,
  textColorHeader = "text-purple-800",
  textColorSubHeader = "text-purple-600",
  
  // General props
  variant = "start-screen",
  className = "",
  children,
  
  // Override props (עקיפת קונטקסט)
  overrideScore,
  overrideLevel,
  levelColor = "text-purple-600",
  
  // Custom actions
  customOnHome,
  customOnReset,
}: EnhancedUnifiedHeaderProps) {
  
  // 🎮 שימוש בקונטקסט - ללא props drilling!
  const gameInfo = useGameInfo();
  const gameActions = useGameActions();
  
  // החלטה על הערכים הסופיים
  const finalScore = overrideScore ?? gameInfo?.score;
  const finalLevel = overrideLevel ?? gameInfo?.level;
  
  // פעולות (עם אפשרות לעקיפה)
  const handleHome = customOnHome || (() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  });
  
  const handleReset = customOnReset || gameActions?.pause || (() => {
    if (typeof window !== 'undefined' && window.confirm('האם אתה בטוח שאתה רוצה לאפס את המשחק?')) {
      window.location.reload();
    }
  });
  
  // רינדור עבור מסך התחלה
  if (variant === "start-screen") {
    return (
      <div className={`mb-8 ${className}`}>
        {title && (
          <h1 className={`text-5xl md:text-7xl font-bold ${textColorHeader} mb-4`}>
            {title}
          </h1>
        )}
        {subTitle && (
          <p className={`text-xl md:text-2xl ${textColorSubHeader} font-semibold mb-8`}>
            {subTitle}
          </p>
        )}
        {children}
      </div>
    );
  }
  
  // רינדור עבור כותרת משחק
  if (variant === "game-header") {
    return (
      <div className={`sticky top-0 z-40 bg-gradient-to-r from-white/90 via-purple-50/80 to-blue-50/80 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl mx-auto max-w-5xl mb-6 transform hover:scale-[1.01] transition-all duration-300 ${className}`}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 md:p-6">
          {/* כפתור בית - תמיד קיים */}
          <button
            onClick={handleHome}
            className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-100/80 to-blue-100/80 hover:from-purple-200/90 hover:to-blue-200/90 backdrop-blur-sm rounded-xl shadow-lg text-base md:text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-300 border border-purple-200/50 hover:border-purple-300/70 hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-[120px] justify-center"
          >
            <Home className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline">חזרה</span>
          </button>

          {/* תצוגת ניקוד ורמה - מהקונטקסט */}
          {(finalScore !== undefined || finalLevel !== undefined) && (
            <div className="text-center bg-gradient-to-br from-white/70 to-purple-50/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 min-w-[160px]">
              {finalScore !== undefined && (
                <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  ניקוד: {finalScore.toLocaleString()}
                </div>
              )}
              {finalLevel !== undefined && (
                <div className={`text-sm md:text-base font-semibold ${levelColor} mt-1 opacity-90`}>
                  רמה: {finalLevel}
                </div>
              )}
            </div>
          )}

          {/* כפתור איפוס - תמיד קיים */}
          <button
            onClick={handleReset}
            className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-100/80 to-red-100/80 hover:from-orange-200/90 hover:to-red-200/90 backdrop-blur-sm rounded-xl shadow-lg text-base md:text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-300 border border-orange-200/50 hover:border-orange-300/70 hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-[120px] justify-center"
          >
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden sm:inline">מחדש</span>
          </button>
        </div>
        
        {/* תוכן נוסף */}
        {children}
      </div>
    );
  }
  
  return null;
}
