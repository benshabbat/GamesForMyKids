'use client';

import React from 'react';

export interface StatItem {
  value: React.ReactNode;
  label?: string;
  valueClass?: string;
  labelClass?: string;
}

interface CanvasScoreBarProps {
  stats: StatItem[];
  gap?: string;
  mb?: string;
  className?: string;
  separator?: React.ReactNode;
}

export function CanvasScoreBar({
  stats,
  gap = "gap-6",
  mb = "mb-2",
  className = "",
  separator,
}: CanvasScoreBarProps) {
  return (
    <div className={`flex ${gap} ${mb} text-center ${className}`}>
      {stats.map((stat, i) => (
        <React.Fragment key={i}>
          {i > 0 && separator}
          <div>
            <p className={stat.valueClass ?? "text-2xl font-black"}>{stat.value}</p>
            {stat.label && <p className={stat.labelClass ?? "text-xs"}>{stat.label}</p>}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
