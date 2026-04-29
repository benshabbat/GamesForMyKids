import { Volume2 } from "lucide-react";
import { ComponentTypes } from "@/lib/types";

type SimpleCardProps = Pick<
  ComponentTypes.UnifiedCardProps,
  | 'item'
  | 'hebrewText'
  | 'secondaryText'
  | 'name'
  | 'icon'
  | 'color'
  | 'borderColor'
  | 'borderWidth'
  | 'textColor'
  | 'size'
  | 'shape'
  | 'shadow'
  | 'hoverEffect'
  | 'className'
> & {
  finalShowSoundIcon: boolean;
  handleClick: () => void;
};

export function SimpleCard({
  item,
  hebrewText,
  secondaryText,
  name,
  icon,
  color = "bg-blue-500",
  borderColor = "border-white/70",
  borderWidth = "4",
  textColor = "text-white",
  size = "medium",
  shape = "rounded",
  shadow = "lg",
  hoverEffect = "scale",
  className = "",
  finalShowSoundIcon,
  handleClick,
}: SimpleCardProps) {
  const shapeClasses = {
    rounded: "rounded-xl",
    circle: "rounded-full",
    square: "rounded-md",
  };

  const sizeClasses = {
    small: "w-14 h-14 text-xs",
    medium: "w-16 h-16 text-sm",
    large: "w-20 h-20 text-base",
  };

  const ariaLabel = hebrewText || item?.hebrew || name || undefined;

  return (
    <button
      type="button"
      className={`
        ${sizeClasses[size]} ${shapeClasses[shape]}
        shadow-${shadow} ${color} ${textColor} border-${borderWidth} ${borderColor}
        transform ${hoverEffect === "scale" ? "hover:scale-110" : ""}
        transition-all duration-300 cursor-pointer
        flex flex-col items-center justify-center p-2
        ${className}
      `}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {icon && <div className="mb-1">{icon}</div>}
      <div className="font-bold text-center">
        {hebrewText || item?.hebrew}
      </div>
      {secondaryText && (
        <div className="text-xs opacity-80 mt-0.5">{secondaryText}</div>
      )}
      {finalShowSoundIcon && <Volume2 className="w-3 h-3 opacity-70 mt-1" aria-hidden="true" />}
    </button>
  );
}
