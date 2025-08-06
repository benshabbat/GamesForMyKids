/**
 * GameLayout - קומפוננט layout מרכזי עבור כל המשחקים
 * מבטיח עיצוב עקבי ומרכוז נכון בכל המשחקים
 */

import { ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
  backgroundStyle?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  className?: string;
}

export default function GameLayout({ 
  children, 
  backgroundStyle = "min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100",
  maxWidth = '4xl',
  className = ""
}: GameLayoutProps) {
  const maxWidthClass = {
    'sm': 'max-w-sm',
    'md': 'max-w-md', 
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }[maxWidth];

  return (
    <div className={`${backgroundStyle} ${className}`}>
      <div className={`${maxWidthClass} mx-auto px-4 py-8`}>
        {children}
      </div>
    </div>
  );
}
