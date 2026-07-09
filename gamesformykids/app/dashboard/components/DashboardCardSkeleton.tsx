'use client';

/** שלד טעינה משותף לכרטיסי הדשבורד — כותרת + שורות placeholder */
export function DashboardCardSkeleton({
  containerClassName = 'bg-white rounded-2xl shadow-md p-6',
  titleWidthClassName = 'w-1/2',
  rows = 3,
  rowClassName = 'h-8 bg-gray-100 rounded',
  rowsWrapperClassName = 'space-y-3',
  dir,
}: {
  containerClassName?: string;
  titleWidthClassName?: string;
  rows?: number;
  rowClassName?: string;
  rowsWrapperClassName?: string;
  dir?: 'rtl' | 'ltr';
}) {
  return (
    <div className={`${containerClassName} animate-pulse`} dir={dir}>
      <div className={`h-4 bg-gray-200 rounded ${titleWidthClassName} mb-4`} />
      <div className={rowsWrapperClassName}>
        {[...Array(rows)].map((_, i) => <div key={i} className={rowClassName} />)}
      </div>
    </div>
  );
}
