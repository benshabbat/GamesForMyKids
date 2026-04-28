import type { ImageProps } from '../../types';
import { REGION_CLASS } from '../../constants';

export function TreeImage({ fills, onFill }: ImageProps) {
  const f = (id: string, def = '#ffffff') => fills[id] || def;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="84" y="132" width="32" height="58" rx="4"
        fill={f('tree-trunk')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('tree-trunk')} />
      <ellipse cx="70" cy="106" rx="38" ry="34"
        fill={f('tree-crown-left')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('tree-crown-left')} />
      <ellipse cx="130" cy="106" rx="38" ry="34"
        fill={f('tree-crown-right')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('tree-crown-right')} />
      <ellipse cx="100" cy="70" rx="42" ry="36"
        fill={f('tree-crown-top')} stroke="#222" strokeWidth={2.5}
        className={REGION_CLASS} onClick={() => onFill('tree-crown-top')} />
      <circle cx="76" cy="98" r="9" fill="#FF4136" stroke="#aa0000" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      <circle cx="122" cy="110" r="9" fill="#FF4136" stroke="#aa0000" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
      <circle cx="100" cy="64" r="8" fill="#FF4136" stroke="#aa0000" strokeWidth={1.5} style={{ pointerEvents: 'none' }} />
    </svg>
  );
}

export const treeRegions = ['tree-trunk', 'tree-crown-left', 'tree-crown-right', 'tree-crown-top'];
export const treeRegionNames: Record<string, string> = {
  'tree-trunk': 'גזע', 'tree-crown-left': 'כתר שמאל', 'tree-crown-right': 'כתר ימין', 'tree-crown-top': 'כתר עליון',
};
