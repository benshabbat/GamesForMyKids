'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // אל תציג breadcrumbs בעמוד הבית
  if (pathname === '/') return null;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathArray = pathname.split('/').filter(path => path);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: '🏠 עמוד הבית', href: '/' }
    ];

    let currentPath = '';
    
    pathArray.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // מיפוי נתיבים לתוויות בעברית
      const pathLabels: Record<string, string> = {
        'games': '🎮 משחקים',
        'advanced': '🎯 מתקדמים',
        'hebrew-letters': '📝 אותיות עבריות',
        'memory': '🧠 זיכרון',
        'puzzles': '🧩 פאזלים',
        'math': '🔢 מתמטיקה',
        'drawing': '🎨 ציור',
        'builder': '🏗️ בנייה',
        'animals': '🐶 חיות',
        'colors': '🎨 צבעים',
        'fruits': '🍎 פירות',
        'vegetables': '🥕 ירקות',
        'shapes': '🔴 צורות',
        'numbers': '🔢 מספרים',
        'letters': '🔤 אותיות',
        'weather': '☀️ מזג אוויר',
        'transport': '🚗 תחבורה',
        'space': '🚀 חלל',
        'house': '🏠 בית',
        'clothing': '👕 בגדים',
        'instruments': '🎵 כלי נגינה',
        'professions': '👩‍⚕️ מקצועות',
        'emotions': '😊 רגשות',
        'tools': '🔧 כלי עבודה',
        'smells-tastes': '👃 ריחות וטעמים',
        'vehicles': '🚗 כלי רכב',
      };

      // עבור אותיות עבריות ספציפיות
      if (pathArray[index - 1] === 'hebrew-letters' && path.length <= 3) {
        breadcrumbs.push({
          label: `📝 אות ${path}`,
          href: currentPath
        });
      } else {
        const label = pathLabels[path] || path;
        breadcrumbs.push({
          label,
          href: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // אל תציג אם יש רק פריט אחד (עמוד הבית)
  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="bg-white/70 backdrop-blur-sm rounded-xl p-3 mb-4 shadow-sm border border-white/50">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronLeft className="w-4 h-4 text-gray-400 mx-2" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-purple-700 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
