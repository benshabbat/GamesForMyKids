'use client';
import { ReactNode } from 'react';

interface StatCellProps {
  label: string;
  value: string | number;
  bgClass?: string;
  textClass?: string;
  labelClass?: string;
}

export function StatCell({
  label,
  value,
  bgClass = 'bg-gray-50',
  textClass = 'text-gray-700',
  labelClass = 'text-gray-400',
}: StatCellProps) {
  return (
    <div className={`${bgClass} rounded-2xl p-3`}>
      <p className={`text-3xl font-black ${textClass}`}>{value}</p>
      <p className={`text-xs ${labelClass}`}>{label}</p>
    </div>
  );
}

interface StatGridProps {
  cols?: 2 | 3;
  children: ReactNode;
}

export function StatGrid({ cols = 2, children }: StatGridProps) {
  return (
    <div className={`grid ${cols === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
      {children}
    </div>
  );
}
