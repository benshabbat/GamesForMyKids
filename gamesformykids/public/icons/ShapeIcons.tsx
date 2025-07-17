interface ShapeIconProps {
  size?: number;
  className?: string;
}

export const CircleIcon = ({ size = 120, className = "" }: ShapeIconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <circle cx="60" cy="60" r="50" fill="currentColor" />
  </svg>
);

export const SquareIcon = ({ size = 120, className = "" }: ShapeIconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <rect x="10" y="10" width="100" height="100" rx="8" fill="currentColor" />
  </svg>
);

export const TriangleIcon = ({ size = 120, className = "" }: ShapeIconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <polygon points="60,10 110,100 10,100" fill="currentColor" />
  </svg>
);

export const RectangleIcon = ({ size = 120, className = "" }: ShapeIconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <rect x="10" y="35" width="100" height="50" rx="8" fill="currentColor" />
  </svg>
);

export const StarIcon = ({ size = 120, className = "" }: ShapeIconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <polygon 
      points="60,10 73,40 105,40 79,60 90,95 60,75 30,95 41,60 15,40 47,40" 
      fill="currentColor" 
    />
  </svg>
);

export const HeartIcon = ({ size = 120, className = "" }: ShapeIconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <path 
      d="M60,105 C60,105 15,75 15,45 C15,30 25,20 40,20 C50,20 60,30 60,30 C60,30 70,20 80,20 C95,20 105,30 105,45 C105,75 60,105 60,105 Z" 
      fill="currentColor" 
    />
  </svg>
);

export const DiamondIcon = ({ size = 120, className = "" }: ShapeIconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <polygon points="60,10 110,60 60,110 10,60" fill="currentColor" />
  </svg>
);

export const OvalIcon = ({ size = 120, className = "" }: ShapeIconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className}>
    <ellipse cx="60" cy="60" rx="50" ry="30" fill="currentColor" />
  </svg>
);