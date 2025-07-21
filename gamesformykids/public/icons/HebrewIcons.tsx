interface HebrewIconProps {
  size?: number;
  className?: string;
}

// אייקון המציג את האות א׳ בעברית
export const HebrewAlefIcon = ({ size = 24, className = "" }: HebrewIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12.5 4L9 20M12.5 4L16 20M9 14H16" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// אייקון המשלב את האותיות א׳ ב׳
export const HebrewLettersIcon = ({ size = 24, className = "" }: HebrewIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M6 6L4.5 18M6 6L7.5 18M4.5 12H7.5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M14 6C16 6 18 7 18 9.5C18 12 16 13 14 13H12V18" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);
