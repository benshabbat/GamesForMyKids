import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function RobotImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="100" y1="30" x2="100" y2="21" stroke="#222" strokeWidth={3} style={{ pointerEvents: 'none' }} />
      <circle cx="100" cy="15" r="8"
        fill={f('robot-antenna')} stroke="#222" strokeWidth={2}
        className={REGION_CLASS} onClick={() => onFill('robot-antenna')} />
      <rect x="25" y="95" width="25" height="50" rx="8"
        fill={f('robot-arm-left')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('robot-arm-left')} />
      <rect x="150" y="95" width="25" height="50" rx="8"
        fill={f('robot-arm-right')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('robot-arm-right')} />
      <rect x="55" y="85" width="90" height="70" rx="12"
        fill={f('robot-body')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('robot-body')} />
      <rect x="70" y="30" width="60" height="50" rx="10"
        fill={f('robot-head')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('robot-head')} />
      <rect x="82" y="46" width="10" height="10" fill="#222" style={{ pointerEvents: 'none' }} />
      <rect x="108" y="46" width="10" height="10" fill="#222" style={{ pointerEvents: 'none' }} />
      <line x1="88" y1="66" x2="112" y2="66" stroke="#222" strokeWidth="2.5" strokeLinecap="round" style={{ pointerEvents: 'none' }} />
      <line x1="75" y1="105" x2="125" y2="105" stroke="#88888899" strokeWidth="2" style={{ pointerEvents: 'none' }} />
      <line x1="75" y1="118" x2="125" y2="118" stroke="#88888899" strokeWidth="2" style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const robotRegions = ['robot-head', 'robot-body', 'robot-arm-left', 'robot-arm-right', 'robot-antenna'];
export const robotRegionNames: Record<string, string> = {
  'robot-head': 'ראש', 'robot-body': 'גוף', 'robot-arm-left': 'יד שמאל',
  'robot-arm-right': 'יד ימין', 'robot-antenna': 'אנטנה',
};
