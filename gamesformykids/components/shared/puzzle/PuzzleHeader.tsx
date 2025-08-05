'use client';

import { Home, HelpCircle } from 'lucide-react';

interface PuzzleHeaderProps {
  onGoHome: () => void;
  onToggleHelp: () => void;
}

export default function PuzzleHeader({ onGoHome, onToggleHelp }: PuzzleHeaderProps) {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-6">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base font-medium"
        >
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">חזרה לבית</span>
          <span className="sm:hidden">בית</span>
        </button>
        
        <div className="order-first sm:order-none">
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">🧩 פאזל מותאם אישית</h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">העלה תמונה וצור פאזל משלך!</p>
        </div>
        
        <button
          onClick={onToggleHelp}
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
