export interface DotPoint {
  x: number;
  y: number;
}

export type DotToDotTheme = 'space' | 'animals' | 'vehicles';

export interface DotToDotPicture {
  id: string;
  title: string;
  emoji: string;
  theme: DotToDotTheme;
  viewBox: string;
  points: DotPoint[];
  /** Whether the last point connects back to the first to close the outline. */
  closed: boolean;
  /** Path under /public to the real source illustration, if one exists. */
  imageSrc?: string;
}
