import UnifiedCard from "./cards/UnifiedCard";
import { ComponentTypes } from "@/lib/types";

/**
 * @deprecated השתמש ב-UnifiedCard עם variant="simple" במקום
 * קומפוננט זה נשמר לתאימות לאחור
 */
export default function GameItem({
  hebrewText,
  secondaryText,
  color,
  icon,
  shape = "rounded",
  size = "medium",
  onClick,
  hideSoundIcon = true,
  textColor = "text-white",
  borderColor = "border-white/70"
}: ComponentTypes.GameItemProps) {
  return (
    <UnifiedCard
      variant="simple"
      hebrewText={hebrewText}
      secondaryText={secondaryText}
      color={color}
      icon={icon}
      shape={shape}
      size={size}
      onClick={onClick}
      hideSoundIcon={hideSoundIcon}
      textColor={textColor}
      borderColor={borderColor}
      autoSpeak={false}
    />
  );
}
