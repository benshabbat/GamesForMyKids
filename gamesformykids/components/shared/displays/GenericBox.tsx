import type { ComponentTypes } from "@/lib/types";

/**
 * GenericBox - קומפוננט Box גנרי
 */
export default function GenericBox({ 
  title,
  icon,
  children,
  variant = "default",
  size = "medium",
  animation,
  className = ""
}: ComponentTypes.GenericBoxProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "celebration":
        return "bg-green-50 border-green-200 text-green-800";
      case "challenge":
        return "bg-orange-50 border-orange-200 text-orange-800";
      case "tips":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "p-2 text-sm";
      case "large":
        return "p-6 text-lg";
      default:
        return "p-4 text-base";
    }
  };

  const animationClass = animation ? animation : "";

  return (
    <div className={`rounded-lg border-2 ${getVariantStyles()} ${getSizeStyles()} ${animationClass} ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className="text-xl">{icon}</span>}
          {title && (
            <h3 className="font-bold text-lg">
              {title}
            </h3>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
