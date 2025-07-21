interface HebrewIconProps {
  size?: number;
  className?: string;
}

// קומפוננט פשוט שמציג את האות א׳ בעברית
export const HebrewLettersIcon = ({ size = 24, className = "" }: HebrewIconProps) => (
  <div 
    className={`flex items-center justify-center font-bold text-2xl ${className}`}
    style={{ fontSize: `${size * 0.8}px` }}
  >
    א
  </div>
);
