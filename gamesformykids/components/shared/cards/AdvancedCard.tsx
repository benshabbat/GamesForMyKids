import { Volume2 } from "lucide-react";
import { ComponentTypes } from "@/lib/types";

type AdvancedCardProps = Pick<
  ComponentTypes.UnifiedCardProps,
  | 'item'
  | 'hebrewText'
  | 'secondaryText'
  | 'name'
  | 'icon'
  | 'color'
  | 'gradientFrom'
  | 'gradientTo'
  | 'hoverFrom'
  | 'hoverTo'
  | 'borderColor'
  | 'borderWidth'
  | 'size'
  | 'aspectRatio'
  | 'borderRadius'
  | 'showEmoji'
  | 'showHebrew'
  | 'showEnglish'
  | 'animation'
  | 'shadow'
  | 'hoverEffect'
  | 'backgroundPattern'
  | 'description'
  | 'digit'
  | 'customDecoration'
  | 'customContent'
  | 'className'
> & {
  finalShowSoundIcon: boolean;
  handleClick: () => void;
};

export function AdvancedCard({
  item,
  hebrewText,
  secondaryText,
  name,
  icon,
  color = "bg-blue-500",
  gradientFrom = "blue-400",
  gradientTo = "blue-600",
  hoverFrom = "blue-500",
  hoverTo = "blue-700",
  borderColor = "border-white/70",
  borderWidth = "4",
  size = "medium",
  aspectRatio = "square",
  borderRadius = "xl",
  showEmoji = true,
  showHebrew = true,
  showEnglish = false,
  animation = "none",
  shadow = "lg",
  hoverEffect = "scale",
  backgroundPattern = "none",
  description,
  digit,
  customDecoration,
  customContent,
  className = "",
  finalShowSoundIcon,
  handleClick,
}: AdvancedCardProps) {
  const advancedSizeClasses = {
    small: "text-4xl md:text-5xl",
    medium: "text-6xl md:text-8xl",
    large: "text-7xl md:text-9xl",
  };

  const aspectClasses = {
    square: "aspect-square",
    wide: "aspect-[4/3]",
    tall: "aspect-[3/4]",
  };

  const animationClasses = {
    bounce: "animate-bounce-in",
    pulse: "animate-pulse",
    none: "",
  };

  const hoverClasses = {
    scale: "hover:scale-110",
    lift: "hover:-translate-y-2",
    glow: "hover:shadow-2xl",
    none: "",
  };

  const shadowClasses: Record<string, string> = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    none: "",
  };

  const backgroundClass =
    gradientFrom === gradientTo && hoverFrom === hoverTo
      ? `${color || `bg-${gradientFrom}`}`
      : `bg-gradient-to-br from-${gradientFrom} to-${gradientTo} hover:from-${hoverFrom} hover:to-${hoverTo}`;

  const ariaLabel =
    hebrewText || item?.hebrew || name || (digit ? String(digit) : undefined);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
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

      {customDecoration}

      <div className="w-full h-full flex flex-col items-center justify-center text-white relative z-10">
        {customContent || (
          <>
            {showEmoji && item?.emoji && (
              <div className={`${advancedSizeClasses[size]} mb-2 ${animationClasses[animation]}`}>
                {item.emoji}
              </div>
            )}

            {icon && !item?.emoji && (
              <div className="text-3xl mb-2">{icon}</div>
            )}

            {digit && (
              <div className={`${advancedSizeClasses[size]} font-bold mb-2`}>
                {digit}
              </div>
            )}

            {showHebrew && (
              <div className="text-xl md:text-2xl font-bold text-center px-2">
                {hebrewText || item?.hebrew}
              </div>
            )}

            {showEnglish && item?.english && (
              <div className="text-lg md:text-xl font-semibold mt-1">
                {item.english}
              </div>
            )}

            {description && (
              <div className="text-sm text-center mt-2 px-2 opacity-90">
                {description}
              </div>
            )}

            {secondaryText && (
              <div className="text-sm text-center mt-1 px-2 opacity-80">
                {secondaryText}
              </div>
            )}

            {finalShowSoundIcon && (
              <Volume2 className="w-4 h-4 opacity-70 mt-2" aria-hidden="true" />
            )}
          </>
        )}
      </div>
    </button>
  );
}
