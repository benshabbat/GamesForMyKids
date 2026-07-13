import type { ComponentType } from 'react';

/** Props for every SVG image component */
export interface ImageProps {
  fills: Record<string, string>;
  onFill: (id: string) => void;
}

/** React component type matching ImageProps */
export type ImageComponentType = ComponentType<ImageProps>;

/** Click-to-fill-region picture: hand-authored SVG with named colorable shapes */
export interface RegionImageMeta {
  kind: 'regions';
  Component: ImageComponentType;
  regions: string[];
  names: Record<string, string>;
  /** Optional region groups — one click fills all members */
  groups?: { id: string; name: string; members: string[] }[];
}

/** Flood-fill (paint-bucket) picture: static line-art image rasterized onto a canvas */
export interface FloodFillImageMeta {
  kind: 'floodfill';
  /** public/ path to the line-art image */
  src: string;
  /** native canvas raster resolution (not CSS display size) */
  width: number;
  height: number;
}

/** Metadata per image — either a named-region SVG or a flood-fill scene */
export type ImageMeta = RegionImageMeta | FloodFillImageMeta;
