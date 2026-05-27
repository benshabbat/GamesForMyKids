import { BaseIconProps } from '@/lib/types/components/icons';

// קומפוננט פשוט שמציג את האות א׳ בעברית
export const HebrewLettersIcon = ({ size = 24, className = "" }: BaseIconProps) => (
  <div 
    className={`flex items-center justify-center font-bold ${className}`}
    style={{ fontSize: `${size * 1.2}px`, lineHeight: 1 }}
  >
    א
  </div>
);
