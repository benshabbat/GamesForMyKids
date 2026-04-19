import type { ImageId } from '../store/coloringStore';
import type { ImageComponentType, ImageMeta } from '../types';
import {
  CatImage, catRegions, catRegionNames,
  HouseImage, houseRegions, houseRegionNames,
  SunImage, sunRegions, sunRegionNames, SUN_RAY_IDS,
  ButterflyImage, butterflyRegions, butterflyRegionNames,
  FlowerImage, flowerRegions, flowerRegionNames,
  FishImage, fishRegions, fishRegionNames,
  TreeImage, treeRegions, treeRegionNames,
  CarImage, carRegions, carRegionNames,
} from './coloringImages';

export type { ImageComponentType, ImageMeta };

export const IMAGE_COMPONENTS: Record<ImageId, ImageMeta> = {
  cat: { Component: CatImage, regions: catRegions, names: catRegionNames },
  house: {
    Component: HouseImage, regions: houseRegions, names: houseRegionNames,
    groups: [{ id: 'house-windows-all', name: 'כל החלונות', members: ['house-window-left', 'house-window-right'] }],
  },
  sun: {
    Component: SunImage, regions: sunRegions, names: sunRegionNames,
    groups: [{ id: 'sun-rays-all', name: 'כל הקרניים', members: SUN_RAY_IDS }],
  },
  butterfly: {
    Component: ButterflyImage, regions: butterflyRegions, names: butterflyRegionNames,
    groups: [
      { id: 'butterfly-wings-top', name: 'כנפיים עליונות', members: ['butterfly-wing-top-left', 'butterfly-wing-top-right'] },
      { id: 'butterfly-wings-bottom', name: 'כנפיים תחתונות', members: ['butterfly-wing-bottom-left', 'butterfly-wing-bottom-right'] },
    ],
  },
  flower: {
    Component: FlowerImage, regions: flowerRegions, names: flowerRegionNames,
    groups: [{ id: 'flower-petals-all', name: 'כל העלים', members: ['flower-petal-0', 'flower-petal-60', 'flower-petal-120', 'flower-petal-180', 'flower-petal-240', 'flower-petal-300'] }],
  },
  fish: { Component: FishImage, regions: fishRegions, names: fishRegionNames },
  tree: {
    Component: TreeImage, regions: treeRegions, names: treeRegionNames,
    groups: [{ id: 'tree-crown-all', name: 'כל הכתר', members: ['tree-crown-left', 'tree-crown-right', 'tree-crown-top'] }],
  },
  car: {
    Component: CarImage, regions: carRegions, names: carRegionNames,
    groups: [
      { id: 'car-windows-all', name: 'כל החלונות', members: ['car-window-left', 'car-window-right'] },
      { id: 'car-wheels-all', name: 'כל הגלגלים', members: ['car-wheel-left', 'car-wheel-right'] },
    ],
  },
};
