'use client';

import { type ReactNode } from 'react';

type StatColor = 'blue' | 'purple' | 'green' | 'orange';

const colorMap: Record<StatColor, { bg: string; icon: string; label: string; value: string }> = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   label: 'text-blue-600',   value: 'text-blue-800' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', label: 'text-purple-600', value: 'text-purple-800' },
  green:  { bg: 'bg-green-50',  icon: 'text-green-600',  label: 'text-green-600',  value: 'text-green-800' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', label: 'text-orange-600', value: 'text-orange-800' },
};

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  color: StatColor;
}

export default function StatCard({ icon, label, value, color }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={`${c.bg} p-3 rounded-lg text-center`}>
      <div className="flex items-center justify-center mb-1">
        <span className={`${c.icon} mr-1`}>{icon}</span>
        <span className={`text-xs font-medium ${c.label}`}>{label}</span>
      </div>
      <div className={`text-lg font-bold ${c.value}`}>{value}</div>
    </div>
  );
}
