import { Volume2 } from "lucide-react";
import { ComponentTypes } from "@/lib/types";
import { useAudioSettingsStore } from "@/lib/stores/audioSettingsStore";
import {
  advancedSizeClasses,
  aspectClasses,
  animationClasses,
  hoverClasses,
  shadowClasses,
  borderRadiusClasses,
  borderWidthClasses,
} from "./cardStyleMaps";

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
  | 'isSelected'
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
  gradientFrom: _gradientFrom = "blue-400",
  gradientTo: _gradientTo = "blue-600",
  hoverFrom: _hoverFrom = "blue-500",
  hoverTo: _hoverTo = "blue-700",
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
  isSelected = false,
  finalShowSoundIcon,
  handleClick,
}: AdvancedCardProps) {
  const showNikud = useAudioSettingsStore((s) => s.showNikud);
  const showEnglishFromStore = useAudioSettingsStore((s) => s.showEnglish);
  // store value overrides the prop so a single toggle affects all cards
  const resolvedShowEnglish = showEnglishFromStore || showEnglish;

  // item.color takes priority (contains full static class strings from game data)
  // fallback: solid color prop (avoids dynamic from-/to- class generation issues)
  const backgroundClass = item?.color || color;

  const resolvedHebrew = hebrewText ?? (showNikud && item?.hebrewNikud ? item.hebrewNikud : item?.hebrew);
  const ariaLabel =
    resolvedHebrew || name || (digit ? String(digit) : undefined);

  // For letter items: emoji and hebrew are identical (e.g. "א") — only show once
  const displayedEmoji = item?.emoji;
  const hebrewIsSameAsEmoji = displayedEmoji && displayedEmoji === resolvedHebrew;

  const displayDigit = digit || item?.digit;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`
        w-full
        ${aspectClasses[aspectRatio]}
        ${borderRadiusClasses[borderRadius] ?? "rounded-xl"}
        cursor-pointer transition-[transform,box-shadow] duration-300 transform
        ${hoverClasses[hoverEffect]}
        ${shadowClasses[shadow]} hover:shadow-2xl
        ${backgroundClass}
        ${borderWidthClasses[borderWidth] ?? "border-4"} ${borderColor}
        relative overflow-hidden
        ${isSelected ? "ring-4 ring-green-400 ring-offset-2 scale-105" : ""}
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
            {showEmoji && displayedEmoji && (
              <div className={`${advancedSizeClasses[size]} mb-2 ${animationClasses[animation]}`}>
                {displayedEmoji}
              </div>
            )}

            {icon && !displayedEmoji && (
              <div className="text-3xl mb-2">{icon}</div>
            )}

            {displayDigit && (
              <div className={`${advancedSizeClasses[size]} font-bold mb-2`}>
                {displayDigit}
              </div>
            )}

            {showHebrew && !hebrewIsSameAsEmoji && resolvedHebrew && (
              <div className="text-xl md:text-2xl font-bold text-center px-2">
                {resolvedHebrew}
              </div>
            )}

            {resolvedShowEnglish && item?.english && (
              <div className="text-lg md:text-xl font-semibold mt-1" dir="ltr">
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
