import UnifiedCard from "./UnifiedCard";
import { BaseGameItem } from "@/lib/types/base";
import { ReactNode } from "react";

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
 * @deprecated השתמש ב-UnifiedCard עם variant="advanced" במקום
 * קומפוננט זה נשמר לתאימות לאחור
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
  return (
    <UnifiedCard
      item={item}
      onClick={(clickedItem) => onClick(clickedItem || item)}
      variant="advanced"
      gradientFrom={gradientFrom}
      gradientTo={gradientTo}
      hoverFrom={hoverFrom}
      hoverTo={hoverTo}
      borderColor={`border-${borderColor}`}
      borderWidth={borderWidth}
      showEmoji={showEmoji}
      showHebrew={showHebrew}
      showEnglish={showEnglish}
      customContent={customContent}
      size={size}
      aspectRatio={aspectRatio}
      borderRadius={borderRadius}
      animation={animation}
      shadow={shadow}
      hoverEffect={hoverEffect}
      backgroundPattern={backgroundPattern}
      customDecoration={customDecoration}
      description={description}
      digit={digit}
      className={className}
    />
  );
}
