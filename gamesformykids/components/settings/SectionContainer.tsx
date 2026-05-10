import type { SectionContainerProps } from '@/lib/types/components';

export function SectionContainer({ title, emoji, children }: SectionContainerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>{emoji}</span>
        <span>{title}</span>
      </h2>
      {children}
    </div>
  );
}
