import UnifiedCard from "./cards/UnifiedCard";
import { ReactNode } from "react";

interface GameItemProps {
  key?: string | number;
  name?: string;
  hebrewText: string;
  secondaryText?: string;
  color: string;
  icon?: ReactNode;
  shape?: "rounded" | "circle" | "square";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  hideSoundIcon?: boolean;
  textColor?: string;
  borderColor?: string;
}

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
  hideSoundIcon = false,
  textColor = "text-white",
  borderColor = "border-white/70"
}: GameItemProps) {
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
      autoSpeak={!hideSoundIcon}
    />
  );
}
