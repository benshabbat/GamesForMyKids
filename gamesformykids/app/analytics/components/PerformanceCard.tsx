const PERFORMANCE_ITEMS = [
  'Next.js App Router',
  'Turbopack (Dev)',
  'Image Optimization',
  'Service Worker',
];

export function PerformanceCard() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        ⚡ ביצועים
      </h2>
      <div className="space-y-3">
        {PERFORMANCE_ITEMS.map((item) => (
          <div key={item} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-800">{item}</span>
            <span className="text-green-600 font-bold">✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}
