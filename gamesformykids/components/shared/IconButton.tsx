import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  label?: string;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * IconButton - A reusable button component with an icon
 * 
 * This component can be used for sound buttons, home buttons, etc.
 */
export default function IconButton({
  icon,
  label,
  onClick,
  className = "",
  ariaLabel,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center p-2 rounded-full 
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${className}`}
      aria-label={ariaLabel || label || "Button"}
    >
      <span className="sr-only">{label}</span>
      {icon}
    </button>
  );
}
