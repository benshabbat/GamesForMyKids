interface HebrewIconProps {
  size?: number;
  className?: string;
}

// אייקון המציג את האות א׳ בעברית
export const HebrewAlefIcon = ({ size = 24, className = "" }: HebrewIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* האות א בעברית */}
    <path 
      d="M8 6 C8 6 9 8 10 10 L12 8 C12 8 13 6 15 6 C15 6 15 8 14 10 L16 12 C16 12 18 14 18 16 C18 16 16 16 14 14 L12 16 C12 16 10 18 8 18 C8 18 8 16 10 14 L8 12 C8 12 6 10 6 8 C6 8 7 6 8 6 Z M10 10 L14 10"
      fillRule="evenodd"
    />
  </svg>
);

// אייקון שמציג את האות א׳ בעברית בצורה גרפית
export const HebrewLettersIcon = ({ size = 24, className = "" }: HebrewIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* ציור האות א בעברית */}
    <path d="M6 18 L6 12 L8 8 L10 12 L10 18" strokeWidth="1.5" stroke="currentColor" fill="none"/>
    <path d="M14 8 L16 8 L18 12 L18 18" strokeWidth="1.5" stroke="currentColor" fill="none"/>
    <path d="M8 12 L18 12" strokeWidth="1.5" stroke="currentColor" fill="none"/>
    <path d="M10 8 L14 8" strokeWidth="1.5" stroke="currentColor" fill="none"/>
  </svg>
);
