import type { ComponentType } from 'react';

/** Props for every SVG image component */
export interface ImageProps {
  fills: Record<string, string>;
  onFill: (id: string) => void;
  selectedRegion?: string;
}

/** React component type matching ImageProps */
export type ImageComponentType = ComponentType<ImageProps>;

/** Metadata per image: component, region ids, Hebrew region names */
export interface ImageMeta {
  Component: ImageComponentType;
  regions: string[];
  names: Record<string, string>;
}
