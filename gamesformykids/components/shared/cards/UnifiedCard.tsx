import { ReactNode } from "react";
import { Volume2 } from "lucide-react";
import { BaseGameItem, ComponentTypes } from "@/lib/types";
import { speakHebrew } from "@/lib/utils/speech/enhancedSpeechUtils";

type UnifiedCardProps = ComponentTypes.UnifiedCardProps & {
  // Additional props specific to this implementation
  onClick?: (item?: BaseGameItem) => void;
  
  // Simple mode (like GameItem)
  hebrewText?: string;
  secondaryText?: string;
  name?: string;
  icon?: ReactNode;
  
  // Advanced mode (like BaseGameCard)
  customContent?: ReactNode;
  
  // Appearance - Colors
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  hoverFrom?: string;
  hoverTo?: string;
  borderColor?: string;
  borderWidth?: string;
  textColor?: string;
  
  // Appearance - Layout
  variant?: "simple" | "advanced" | "auto";
  size?: "small" | "medium" | "large";
  shape?: "rounded" | "circle" | "square";
  aspectRatio?: "square" | "wide" | "tall";
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  
  // Content display
  showEmoji?: boolean;
  showHebrew?: boolean;
  showEnglish?: boolean;
  showSoundIcon?: boolean;
  hideSoundIcon?: boolean;
  
  // Effects
  animation?: "bounce" | "pulse" | "none";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  hoverEffect?: "scale" | "lift" | "glow" | "none";
  backgroundPattern?: "stars" | "dots" | "none";
  
  // Special content
  description?: string;
  digit?: string;
  customDecoration?: ReactNode;
  
  // Audio
  onSpeak?: () => void;
  autoSpeak?: boolean;
  
  // CSS
  className?: string;
}

/**
 * UnifiedCard - קומפוננט Card אחוד שמחליף:
 * - BaseGameCard (variant="advanced") 
 * - GameItem (variant="simple")
 * 
 * מתאים עצמו אוטומטית לפי הפרמטרים שמועברים
 */
export default function UnifiedCard({
  // Data
  item,
  onClick,
  
  // Simple mode
  hebrewText,
  secondaryText,
  name,
  icon,
  
  // Advanced mode
  customContent,
  
  // Colors - defaults for backward compatibility
  color = "bg-blue-500",
  gradientFrom = "blue-400",
  gradientTo = "blue-600", 
  hoverFrom = "blue-500",
  hoverTo = "blue-700",
  borderColor = "border-white/70",
  borderWidth = "4",
  textColor = "text-white",
  
  // Layout
  variant = "auto", // Auto-detect based on props
  size = "medium",
  shape = "rounded",
  aspectRatio = "square",
  borderRadius = "xl",
  
  // Content
  showEmoji = true,
  showHebrew = true,
  showEnglish = false,
  showSoundIcon,
  hideSoundIcon = false,
  
  // Effects
  animation = "none",
  shadow = "lg",
  hoverEffect = "scale",
  backgroundPattern = "none",
  
  // Special
  description,
  digit,
  customDecoration,
  
  // Audio
  onSpeak,
  autoSpeak = true,
  
  className = "",
}: UnifiedCardProps) {
  
  // Auto-detect variant if not specified
  let actualVariant = variant;
  if (variant === "auto") {
    actualVariant = (item && !hebrewText) || customContent || backgroundPattern !== "none" 
      ? "advanced" 
      : "simple";
  }
  
  // Handle audio
  const handleAudioClick = async () => {
    const textToSpeak = hebrewText || item?.hebrew || name;
    if (textToSpeak && autoSpeak) {
      await speakHebrew(textToSpeak);
    }
    if (onSpeak) onSpeak();
  };
  
  // Handle main click
  const handleClick = async () => {
    if (autoSpeak) await handleAudioClick();
    if (onClick) {
      if (item) onClick(item);
      else onClick();
    }
  };
  
  // Determine final showSoundIcon value
  const finalShowSoundIcon = showSoundIcon !== undefined 
    ? showSoundIcon 
    : !hideSoundIcon;
  
  // === SIMPLE VARIANT (like GameItem) ===
  if (actualVariant === "simple") {
    const shapeClasses = {
      rounded: "rounded-xl",
      circle: "rounded-full", 
      square: "rounded-md"
    };
    
    const sizeClasses = {
      small: "w-14 h-14 text-xs",
      medium: "w-16 h-16 text-sm",
      large: "w-20 h-20 text-base"
    };
    
    return (
      <div
        className={`
          ${sizeClasses[size]} ${shapeClasses[shape]}
          shadow-${shadow} ${color} ${textColor} border-${borderWidth} ${borderColor}
          transform ${hoverEffect === "scale" ? "hover:scale-110" : ""} 
          transition-all duration-300 cursor-pointer 
          flex flex-col items-center justify-center p-2
          ${className}
        `}
        onClick={handleClick}
      >
        {icon && <div className="mb-1">{icon}</div>}
        <div className="font-bold text-center">
          {hebrewText || item?.hebrew}
        </div>
        {secondaryText && (
          <div className="text-xs opacity-80 mt-0.5">
            {secondaryText}
          </div>
        )}
        {finalShowSoundIcon && <Volume2 className="w-3 h-3 opacity-70 mt-1" />}
      </div>
    );
  }
  
  // === ADVANCED VARIANT (like BaseGameCard) ===
  
  // Size classes for advanced mode
  const advancedSizeClasses = {
    small: "text-4xl md:text-5xl",
    medium: "text-6xl md:text-8xl",
    large: "text-7xl md:text-9xl"
  };
  
  // Aspect ratio classes
  const aspectClasses = {
    square: "aspect-square",
    wide: "aspect-[4/3]",
    tall: "aspect-[3/4]"
  };
  
  // Animation classes
  const animationClasses = {
    bounce: "animate-bounce-in",
    pulse: "animate-pulse", 
    none: ""
  };
  
  // Hover effect classes
  const hoverClasses = {
    scale: "hover:scale-110",
    lift: "hover:-translate-y-2",
    glow: "hover:shadow-2xl",
    none: ""
  };
  
  // Shadow classes
  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg", 
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    none: ""
  };
  
  // Background class
  const backgroundClass = gradientFrom === gradientTo && hoverFrom === hoverTo
    ? `${color || `bg-${gradientFrom}`}`
    : `bg-gradient-to-br from-${gradientFrom} to-${gradientTo} hover:from-${hoverFrom} hover:to-${hoverTo}`;
  
  return (
    <div
      onClick={handleClick}
      className={`
        ${aspectClasses[aspectRatio]}
        rounded-${borderRadius}
        cursor-pointer transition-all duration-300 transform
        ${hoverClasses[hoverEffect]}
        ${shadowClasses[shadow]} hover:shadow-2xl
        ${backgroundClass}
        border-${borderWidth} ${borderColor}
        relative overflow-hidden
        ${className}
      `}
    >
      {/* Background patterns */}
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
      
      {/* Custom decoration */}
      {customDecoration}
      
      {/* Card content */}
      <div className="w-full h-full flex flex-col items-center justify-center text-white relative z-10">
        {customContent || (
          <>
            {/* Emoji */}
            {showEmoji && item?.emoji && (
              <div className={`${advancedSizeClasses[size]} mb-2 ${animationClasses[animation]}`}>
                {item.emoji}
              </div>
            )}
            
            {/* Icon (for simple mode compatibility) */}
            {icon && !item?.emoji && (
              <div className="text-3xl mb-2">
                {icon}
              </div>
            )}
            
            {/* Digit */}
            {digit && (
              <div className={`${advancedSizeClasses[size]} font-bold mb-2`}>
                {digit}
              </div>
            )}
            
            {/* Hebrew text */}
            {showHebrew && (
              <div className="text-xl md:text-2xl font-bold text-center px-2">
                {hebrewText || item?.hebrew}
              </div>
            )}
            
            {/* English text */}
            {showEnglish && item?.english && (
              <div className="text-lg md:text-xl font-semibold mt-1">
                {item.english}
              </div>
            )}
            
            {/* Description */}
            {description && (
              <div className="text-sm text-center mt-2 px-2 opacity-90">
                {description}
              </div>
            )}
            
            {/* Secondary text */}
            {secondaryText && (
              <div className="text-sm text-center mt-1 px-2 opacity-80">
                {secondaryText}
              </div>
            )}
            
            {/* Sound icon */}
            {finalShowSoundIcon && (
              <Volume2 className="w-4 h-4 opacity-70 mt-2" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
