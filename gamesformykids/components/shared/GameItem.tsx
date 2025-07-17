import { Volume2 } from "lucide-react";
import { ReactNode } from "react";
import { speakHebrew } from "@/lib/utils/enhancedSpeechUtils";

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
  const handleItemClick = async () => {
    await speakHebrew(hebrewText);
    if (onClick) onClick();
  };

  // נקבע את המחלקות לפי הצורה
  const shapeClasses = {
    rounded: "rounded-xl",
    circle: "rounded-full",
    square: "rounded-md"
  };

  // נקבע את הגודל
  const sizeClasses = {
    small: "w-14 h-14 text-xs",
    medium: "w-16 h-16 text-sm",
    large: "w-20 h-20 text-base"
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} ${shapeClasses[shape]}
        shadow-lg ${color} ${textColor} border-4 ${borderColor}
        transform hover:scale-110 transition-all duration-300
        cursor-pointer flex flex-col items-center justify-center p-2
      `}
      onClick={handleItemClick}
    >
      {icon && <div className="mb-1">{icon}</div>}
      <div className="font-bold text-center">
        {hebrewText}
      </div>
      {secondaryText && (
        <div className="text-xs opacity-80 mt-0.5">
          {secondaryText}
        </div>
      )}
      {!hideSoundIcon && <Volume2 className="w-3 h-3 opacity-70 mt-1" />}
    </div>
  );
}
