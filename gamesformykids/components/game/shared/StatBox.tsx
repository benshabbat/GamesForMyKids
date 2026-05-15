import { ReactNode } from 'react';

interface Props {
  value: ReactNode;
  label: string;
  icon?: ReactNode;
  bgClass?: string;
  textClass?: string;
  labelClass?: string;
}

export function StatBox({
  value,
  label,
  icon,
  bgClass = 'bg-white',
  textClass = 'text-xl font-bold text-gray-800',
  labelClass = 'text-sm text-gray-600',
}: Props) {
  return (
    <div className={`${bgClass} rounded-lg p-3 shadow-md text-center`}>
      {icon}
      <div className={textClass}>{value}</div>
      <div className={labelClass}>{label}</div>
    </div>
  );
}
