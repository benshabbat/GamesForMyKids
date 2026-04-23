'use client';

interface Props {
  hour: number;
  minute: number;
  size?: number;
}

export default function ClockFace({ hour, minute, size = 160 }: Props) {
  const cx = 100, cy = 100;
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;
  const toRad = (deg: number) => (deg - 90) * Math.PI / 180;
  const hourRad = toRad(hourAngle);
  const minuteRad = toRad(minuteAngle);
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <circle cx={cx} cy={cy} r={88} fill="white" stroke="#4f46e5" strokeWidth="5" />
      {[...Array(12)].map((_, i) => {
        const a = toRad(i * 30 + 90);
        const r1 = i % 3 === 0 ? 73 : 78;
        return (
          <line key={i}
            x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
            x2={cx + 88 * Math.cos(a)} y2={cy + 88 * Math.sin(a)}
            stroke="#4f46e5" strokeWidth={i % 3 === 0 ? 3 : 1.5} />
        );
      })}
      {['12', '3', '6', '9'].map((n, i) => {
        const a = toRad(i * 90 + 90);
        return <text key={n} x={cx + 62 * Math.cos(a)} y={cy + 62 * Math.sin(a)}
          textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="bold" fill="#4f46e5">{n}</text>;
      })}
      <line x1={cx} y1={cy}
        x2={cx + 52 * Math.cos(hourRad)} y2={cy + 52 * Math.sin(hourRad)}
        stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
      <line x1={cx} y1={cy}
        x2={cx + 72 * Math.cos(minuteRad)} y2={cy + 72 * Math.sin(minuteRad)}
        stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="6" fill="#1e293b" />
    </svg>
  );
}
