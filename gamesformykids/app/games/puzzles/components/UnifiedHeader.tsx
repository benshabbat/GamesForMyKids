'use client';

import { Home, HelpCircle } from 'lucide-react';
import { usePuzzleContext } from '@/contexts';

interface UnifiedHeaderProps {
  title?: string;
  subtitle?: string;
  onGoHome?: () => void;
  onToggleHelp?: () => void;
  type?: 'simple' | 'custom';
}

export default function UnifiedHeader({ 
  title: overrideTitle,
  subtitle: overrideSubtitle,
  onGoHome: customOnGoHome, 
  onToggleHelp: customOnToggleHelp,
  type = 'simple'
}: UnifiedHeaderProps) {
  const { toggleHelp, goHome } = usePuzzleContext();
  
  // Use context values with defaults unless overridden
  const title = overrideTitle ?? (
    type === 'simple' ? '🧩 פאזלים פשוטים' : '🧩 פאזל מותאם אישית'
  );
  const subtitle = overrideSubtitle ?? (
    type === 'simple' ? 'בחר פאזל ותתחיל לשחק!' : 'העלה תמונה וצור פאזל משלך!'
  );
  
  // Use custom handlers if provided, otherwise use context handlers
  const finalOnGoHome = customOnGoHome || goHome;
  const finalOnToggleHelp = customOnToggleHelp || toggleHelp;
  if (type === 'custom') {
    // More elaborate header for custom puzzles
    return (
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-6">
          <button
            onClick={finalOnGoHome}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base font-medium"
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">חזרה לבית</span>
            <span className="sm:hidden">בית</span>
          </button>
          
          <div className="order-first sm:order-none">
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium">{subtitle}</p>
          </div>
          
          <button
            onClick={finalOnToggleHelp}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base font-medium"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="hidden sm:inline">עזרה</span>
            <span className="sm:hidden">?</span>
          </button>
        </div>
      </div>
    );
  }

  // Simple header for simple puzzles
  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <button
          onClick={finalOnGoHome}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">חזרה לבית</span>
          <span className="sm:hidden">בית</span>
        </button>
        
        <div className="order-first sm:order-none w-full sm:w-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{subtitle}</p>
        </div>
        
        <button
          onClick={finalOnToggleHelp}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden sm:inline">עזרה</span>
          <span className="sm:hidden">?</span>
        </button>
      </div>
    </div>
  );
}
