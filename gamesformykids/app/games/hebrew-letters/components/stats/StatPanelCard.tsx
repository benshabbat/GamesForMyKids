'use client';

import type { LucideIcon } from 'lucide-react';

interface StatPanelCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  gradientClass: string;
  iconClass: string;
  labelClass: string;
  valueClass: string;
}

export function StatPanelCard({
  icon: Icon,
  label,
  value,
  gradientClass,
  iconClass,
  labelClass,
  valueClass,
}: StatPanelCardProps) {
  return (
    <div className={`${gradientClass} p-4 rounded-lg`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${iconClass}`} />
        <span className={`text-sm font-medium ${labelClass}`}>{label}</span>
      </div>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}
