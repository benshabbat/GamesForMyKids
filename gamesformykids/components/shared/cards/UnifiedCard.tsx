import { ComponentTypes } from "@/lib/types";
import { speakHebrew } from "@/lib/utils/speech/enhancedSpeechUtils";
import { SimpleCard } from "./SimpleCard";
import { AdvancedCard } from "./AdvancedCard";

export default function UnifiedCard({
  variant = "auto",
  showSoundIcon,
  hideSoundIcon = true,
  autoSpeak = false,
  onSpeak,
  onClick,
  item,
  backgroundPattern = "none",
  customContent,
  customDecoration,
  hebrewText,
  secondaryText,
  name,
  icon,
  color,
  gradientFrom,
  gradientTo,
  hoverFrom,
  hoverTo,
  borderColor,
  borderWidth,
  textColor,
  size,
  shape,
  aspectRatio,
  borderRadius,
  showEmoji,
  showHebrew,
  showEnglish,
  animation,
  shadow,
  hoverEffect,
  description,
  digit,
  className,
  isSelected,
}: ComponentTypes.UnifiedCardProps) {
  let actualVariant = variant;
  if (variant === "auto") {
    actualVariant =
      (item && !hebrewText) || customContent || backgroundPattern !== "none"
        ? "advanced"
        : "simple";
  }

  const finalShowSoundIcon =
    showSoundIcon !== undefined ? showSoundIcon : !hideSoundIcon;

  const handleAudioClick = async () => {
    const textToSpeak = hebrewText || item?.hebrew || name;
    if (textToSpeak && autoSpeak) await speakHebrew(textToSpeak);
    if (onSpeak) onSpeak();
  };

  const handleClick = async () => {
    if (autoSpeak) await handleAudioClick();
    if (onClick) {
      if (item) onClick(item);
      else onClick();
    }
  };

  if (actualVariant === "simple") {
    return (
      <SimpleCard
        item={item}
        hebrewText={hebrewText}
        secondaryText={secondaryText}
        name={name}
        icon={icon}
        color={color}
        borderColor={borderColor}
        borderWidth={borderWidth}
        textColor={textColor}
        size={size}
        shape={shape}
        shadow={shadow}
        hoverEffect={hoverEffect}
        className={className}
        finalShowSoundIcon={finalShowSoundIcon}
        handleClick={handleClick}
      />
    );
  }

  return (
    <AdvancedCard
      item={item}
      hebrewText={hebrewText}
      secondaryText={secondaryText}
      name={name}
      icon={icon}
      color={color}
      gradientFrom={gradientFrom}
      gradientTo={gradientTo}
      hoverFrom={hoverFrom}
      hoverTo={hoverTo}
      borderColor={borderColor}
      borderWidth={borderWidth}
      size={size}
      aspectRatio={aspectRatio}
      borderRadius={borderRadius}
      showEmoji={showEmoji}
      showHebrew={showHebrew}
      showEnglish={showEnglish}
      animation={animation}
      shadow={shadow}
      hoverEffect={hoverEffect}
      backgroundPattern={backgroundPattern}
      description={description}
      digit={digit}
      customDecoration={customDecoration}
      customContent={customContent}
      className={className}
      isSelected={isSelected}
      finalShowSoundIcon={finalShowSoundIcon}
      handleClick={handleClick}
    />
  );
}
