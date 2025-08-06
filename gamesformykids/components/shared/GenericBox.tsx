import { ReactNode } from "react";

interface GenericBoxProps {
  // תוכן הקופסה
  title: string;
  icon?: string;
  children: ReactNode;
  
  // עיצוב
  variant?: "celebration" | "challenge" | "tips" | "error" | "info";
  size?: "small" | "medium" | "large";
  
  // פעולות
  onClick?: () => void;
  onClose?: () => void;
  
  // עיצוב מותאם
  className?: string;
  titleColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  
  // אנימציות
  animation?: "bounce" | "pulse" | "none";
}

/**
 * GenericBox - קומפוננט Box גנרי שמחליף את כל ה-Box קומפוננטים
 * 
 * מחליף:
 * - CelebrationBox
 * - ChallengeBox  
 * - TipsBox
 * - כל Box עתידי
 */
export default function GenericBox({
  title,
  icon,
  children,
  variant = "info",
  size = "medium",
  onClick,
  onClose,
  className = "",
  titleColor,
  backgroundColor,
  borderColor,
  animation = "none",
}: GenericBoxProps) {
  
  // הגדרת עיצוב לפי variant
  const variantStyles = {
    celebration: {
      bg: "bg-gradient-to-r from-yellow-200 to-orange-200",
      title: "text-orange-800",
      border: "border-orange-300",
      defaultIcon: "🎉",
      animation: "animate-bounce-gentle",
    },
    challenge: {
      bg: "bg-white",
      title: "text-gray-800", 
      border: "border-gray-200",
      defaultIcon: "🎯",
      animation: "",
    },
    tips: {
      bg: "bg-white bg-opacity-80",
      title: "text-gray-700",
      border: "border-gray-300",
      defaultIcon: "💡",
      animation: "",
    },
    error: {
      bg: "bg-red-50",
      title: "text-red-600",
      border: "border-red-200",
      defaultIcon: "⚠️",
      animation: "",
    },
    info: {
      bg: "bg-blue-50",
      title: "text-blue-800",
      border: "border-blue-200", 
      defaultIcon: "ℹ️",
      animation: "",
    },
  };
  
  // הגדרת גדלים
  const sizeStyles = {
    small: "p-4 text-lg",
    medium: "p-6 text-xl md:text-2xl", 
    large: "p-8 text-2xl md:text-3xl",
  };
  
  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];
  
  // בניית className סופית
  const boxClassName = `
    ${backgroundColor || currentVariant.bg}
    ${borderColor || `border-2 ${currentVariant.border}`}
    ${animation !== "none" ? currentVariant.animation : ""}
    rounded-3xl shadow-xl mb-8
    ${currentSize}
    ${onClick ? "cursor-pointer hover:scale-105 transition-transform duration-300" : ""}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  const titleClassName = `
    ${currentSize.includes('text-lg') ? 'text-2xl md:text-3xl' : 
      currentSize.includes('text-xl') ? 'text-3xl md:text-4xl' : 
      'text-4xl md:text-5xl'}
    font-bold mb-4
    ${titleColor || currentVariant.title}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={boxClassName} onClick={onClick}>
      {/* כפתור סגירה אם נדרש */}
      {onClose && (
        <div className="flex justify-end mb-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
      )}
      
      {/* כותרת עם אייקון */}
      <h2 className={titleClassName}>
        {icon || currentVariant.defaultIcon} {title}
      </h2>
      
      {/* תוכן */}
      {children}
    </div>
  );
}
