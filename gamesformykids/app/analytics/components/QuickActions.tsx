const QUICK_ACTIONS = [
  { href: '/sitemap.xml', bg: 'bg-blue-50 hover:bg-blue-100', titleColor: 'text-blue-800', descColor: 'text-blue-600', emoji: '📄', title: 'צפייה ב-Sitemap', description: 'בדוק את מפת האתר' },
  { href: '/robots.txt', bg: 'bg-green-50 hover:bg-green-100', titleColor: 'text-green-800', descColor: 'text-green-600', emoji: '🤖', title: 'צפייה ב-Robots.txt', description: 'בדוק הוראות זחילה' },
  { href: '/manifest.json', bg: 'bg-purple-50 hover:bg-purple-100', titleColor: 'text-purple-800', descColor: 'text-purple-600', emoji: '📱', title: 'צפייה ב-Manifest', description: 'בדוק הגדרות PWA' },
];

export function QuickActions() {
  return (
    <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        🚀 פעולות מהירות
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {QUICK_ACTIONS.map(({ href, bg, titleColor, descColor, emoji, title, description }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            className={`p-4 ${bg} rounded-lg text-center transition-colors`}
          >
            <h3 className={`font-bold ${titleColor} mb-2`}>{emoji} {title}</h3>
            <p className={`${descColor} text-sm`}>{description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
