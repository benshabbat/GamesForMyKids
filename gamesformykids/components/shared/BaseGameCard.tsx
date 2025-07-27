import { ReactNode } from "react";
import { BaseGameItem } from "@/lib/types/base";

interface BaseGameCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
  
  // עיצוב הכרטיס
  gradientFrom?: string;
  gradientTo?: string;
  hoverFrom?: string;
  hoverTo?: string;
  borderColor?: string;
  borderWidth?: string;
  
  // תוכן הכרטיס
  showEmoji?: boolean;
  showHebrew?: boolean;
  showEnglish?: boolean;
  customContent?: ReactNode;
  
  // גודל וצורה
  size?: "small" | "medium" | "large";
  aspectRatio?: "square" | "wide" | "tall";
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  
  // אנימציות ואפקטים
  animation?: "bounce" | "pulse" | "none";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  hoverEffect?: "scale" | "lift" | "glow" | "none";
  
  // אפקטים מיוחדים
  backgroundPattern?: "stars" | "dots" | "none";
  customDecoration?: ReactNode;
  
  // עבור כרטיסי מקצועות
  description?: string;
  
  // עבור כרטיסי מספרים
  digit?: string;
  
  // CSS classes נוספים
  className?: string;
}

/**
 * BaseGameCard - קארד גנרי DRY לכל המשחקים
 * 
 * מחליף את כל הקארדים הקודמים עם API גמיש ועקבי
 */
export default function BaseGameCard({
  item,
  onClick,
  
  // עיצוב ברירת מחדל
  gradientFrom = "blue-400",
  gradientTo = "blue-600",
  hoverFrom = "blue-500",
  hoverTo = "blue-700",
  borderColor = "white",
  borderWidth = "8",
  
  // תוכן ברירת מחדל
  showEmoji = true,
  showHebrew = true,
  showEnglish = false,
  customContent,
  
  // גודל וצורה ברירת מחדל
  size = "medium",
  aspectRatio = "square",
  borderRadius = "3xl",
  
  // אנימציות ברירת מחדל
  animation = "bounce",
  shadow = "xl",
  hoverEffect = "scale",
  
  // אפקטים מיוחדים
  backgroundPattern = "none",
  customDecoration,
  
  // מאפיינים מיוחדים
  description,
  digit,
  
  className = "",
}: BaseGameCardProps) {
  
  // מיפוי גדלים
  const sizeClasses = {
    small: "text-4xl md:text-5xl",
    medium: "text-6xl md:text-8xl", 
    large: "text-7xl md:text-9xl"
  };
  
  // מיפוי יחס גובה-רוחב
  const aspectClasses = {
    square: "aspect-square",
    wide: "aspect-[4/3]",
    tall: "aspect-[3/4]"
  };
  
  // מיפוי אנימציות
  const animationClasses = {
    bounce: "animate-bounce-in",
    pulse: "animate-pulse",
    none: ""
  };
  
  // מיפוי אפקטי hover
  const hoverClasses = {
    scale: "hover:scale-110",
    lift: "hover:-translate-y-2",
    glow: "hover:shadow-2xl",
    none: ""
  };
  
  // מיפוי shadows
  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md", 
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    none: ""
  };
  
  // יצירת רקע דינמי
  const backgroundClass = `bg-gradient-to-br from-${gradientFrom} to-${gradientTo} hover:from-${hoverFrom} hover:to-${hoverTo}`;
  
  return (
    <div
      onClick={() => onClick(item)}
      className={`
        ${aspectClasses[aspectRatio]} 
        rounded-${borderRadius} 
        cursor-pointer 
        transition-all 
        duration-300 
        transform 
        ${hoverClasses[hoverEffect]}
        ${shadowClasses[shadow]}
        hover:shadow-2xl
        ${backgroundClass}
        border-${borderWidth} 
        border-${borderColor}
        relative 
        overflow-hidden
        ${className}
      `}
    >
      {/* רקע מיוחד */}
      {backgroundPattern === "stars" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-3 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
        </div>
      )}
      
      {backgroundPattern === "dots" && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5">
          <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-2 w-1 h-1 bg-white/40 rounded-full"></div>
        </div>
      )}
      
      {/* דקורציה מותאמת אישית */}
      {customDecoration}
      
      {/* תוכן הכרטיס */}
      <div className="w-full h-full flex flex-col items-center justify-center text-white relative z-10">
        
        {/* תוכן מותאם אישית או תוכן ברירת מחדל */}
        {customContent || (
          <>
            {/* אימוג'י */}
            {showEmoji && (
              <div className={`${sizeClasses[size]} mb-2 ${animationClasses[animation]}`}>
                {item.emoji}
              </div>
            )}
            
            {/* ספרה (למשחק מספרים) */}
            {digit && (
              <div className={`${sizeClasses[size]} font-bold mb-2`}>
                {digit}
              </div>
            )}
            
            {/* טקסט עברי */}
            {showHebrew && (
              <div className="text-xl md:text-2xl font-bold text-center px-2">
                {item.hebrew}
              </div>
            )}
            
            {/* טקסט אנגלי */}
            {showEnglish && (
              <div className="text-lg md:text-xl font-semibold mt-1">
                {item.english}
              </div>
            )}
            
            {/* תיאור (למקצועות) */}
            {description && (
              <div className="text-sm text-center mt-2 px-2 opacity-90">
                {description}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
