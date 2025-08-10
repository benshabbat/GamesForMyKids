import {ReactNode} from 'react';

interface AdvancedLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  main: ReactNode;
}

export default function AdvancedLayout({ 
  children, 
  sidebar, 
  main 
}: AdvancedLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* כותרת ראשית */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">
            🎮 משחקים מתקדמים
          </h1>
          <p className="text-center mt-2 text-purple-100">
            משחקים מיוחדים עם אפשרויות מתקדמות
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* תפריט צד */}
          <div className="lg:w-80">
            {sidebar}
          </div>
          
          {/* תוכן ראשי */}
          <div className="flex-1">
            {main}
          </div>
        </div>
        
        {/* תוכן נוסף */}
        {children}
      </div>
    </div>
  );
}
