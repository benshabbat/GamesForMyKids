import type { ImageId } from '../store/coloringStore';
import type { ImageComponentType, ImageMeta } from '../types';
import {
  CatImage, catRegions, catRegionNames,
  HouseImage, houseRegions, houseRegionNames,
  SunImage, sunRegions, sunRegionNames,
  ButterflyImage, butterflyRegions, butterflyRegionNames,
  FlowerImage, flowerRegions, flowerRegionNames,
} from './coloringImages';

export type { ImageComponentType, ImageMeta };

export const IMAGE_COMPONENTS: Record<ImageId, ImageMeta> = {
  cat: { Component: CatImage, regions: catRegions, names: catRegionNames },
  house: { Component: HouseImage, regions: houseRegions, names: houseRegionNames },
  sun: { Component: SunImage, regions: sunRegions, names: sunRegionNames },
  butterfly: { Component: ButterflyImage, regions: butterflyRegions, names: butterflyRegionNames },
  flower: { Component: FlowerImage, regions: flowerRegions, names: flowerRegionNames },
};
