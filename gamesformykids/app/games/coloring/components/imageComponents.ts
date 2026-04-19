import type { ComponentType } from 'react';
import type { ImageId } from '../store/coloringStore';
import {
  CatImage, catRegions, catRegionNames,
  HouseImage, houseRegions, houseRegionNames,
  SunImage, sunRegions, sunRegionNames,
  ButterflyImage, butterflyRegions, butterflyRegionNames,
  FlowerImage, flowerRegions, flowerRegionNames,
} from './coloringImages';

export type ImageComponentType = ComponentType<{
  fills: Record<string, string>;
  onFill: (id: string) => void;
  selectedRegion?: string;
}>;

export interface ImageMeta {
  Component: ImageComponentType;
  regions: string[];
  names: Record<string, string>;
}

export const IMAGE_COMPONENTS: Record<ImageId, ImageMeta> = {
  cat: { Component: CatImage, regions: catRegions, names: catRegionNames },
  house: { Component: HouseImage, regions: houseRegions, names: houseRegionNames },
  sun: { Component: SunImage, regions: sunRegions, names: sunRegionNames },
  butterfly: { Component: ButterflyImage, regions: butterflyRegions, names: butterflyRegionNames },
  flower: { Component: FlowerImage, regions: flowerRegions, names: flowerRegionNames },
};
