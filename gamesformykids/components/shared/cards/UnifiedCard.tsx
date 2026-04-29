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
  hebrewText,
  ...rest
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
    const textToSpeak = hebrewText || item?.hebrew || rest.name;
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
        {...rest}
        item={item}
        hebrewText={hebrewText}
        finalShowSoundIcon={finalShowSoundIcon}
        handleClick={handleClick}
      />
    );
  }

  return (
    <AdvancedCard
      {...rest}
      item={item}
      hebrewText={hebrewText}
      backgroundPattern={backgroundPattern}
      customContent={customContent}
      finalShowSoundIcon={finalShowSoundIcon}
      handleClick={handleClick}
    />
  );
}
