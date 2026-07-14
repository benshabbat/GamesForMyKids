import type { ImageId } from '../constants';
import type { ImageComponentType, ImageMeta } from '../types';

import { CatImage, catRegions, catRegionNames } from './images/cat';
import { HouseImage, houseRegions, houseRegionNames } from './images/house';
import { SunImage, sunRegions, sunRegionNames, SUN_RAY_IDS } from './images/sun';
import { ButterflyImage, butterflyRegions, butterflyRegionNames } from './images/butterfly';
import { FlowerImage, flowerRegions, flowerRegionNames } from './images/flower';
import { FishImage, fishRegions, fishRegionNames } from './images/fish';
import { TreeImage, treeRegions, treeRegionNames } from './images/tree';
import { CarImage, carRegions, carRegionNames } from './images/car';
import { StarImage, starRegions, starRegionNames } from './images/star';
import { BalloonImage, balloonRegions, balloonRegionNames } from './images/balloon';
import { RobotImage, robotRegions, robotRegionNames } from './images/robot';
import { DogImage, dogRegions, dogRegionNames } from './images/dog';
import { BoatImage, boatRegions, boatRegionNames } from './images/boat';

export type { ImageComponentType, ImageMeta };

export const IMAGE_COMPONENTS: Record<ImageId, ImageMeta> = {
  cat: { kind: 'regions', Component: CatImage, regions: catRegions, names: catRegionNames },
  house: {
    kind: 'regions', Component: HouseImage, regions: houseRegions, names: houseRegionNames,
    groups: [{ id: 'house-windows-all', name: 'כל החלונות', members: ['house-window-left', 'house-window-right'] }],
  },
  sun: {
    kind: 'regions', Component: SunImage, regions: sunRegions, names: sunRegionNames,
    groups: [{ id: 'sun-rays-all', name: 'כל הקרניים', members: SUN_RAY_IDS }],
  },
  butterfly: {
    kind: 'regions', Component: ButterflyImage, regions: butterflyRegions, names: butterflyRegionNames,
    groups: [
      { id: 'butterfly-wings-top', name: 'כנפיים עליונות', members: ['butterfly-wing-top-left', 'butterfly-wing-top-right'] },
      { id: 'butterfly-wings-bottom', name: 'כנפיים תחתונות', members: ['butterfly-wing-bottom-left', 'butterfly-wing-bottom-right'] },
    ],
  },
  flower: {
    kind: 'regions', Component: FlowerImage, regions: flowerRegions, names: flowerRegionNames,
    groups: [{ id: 'flower-petals-all', name: 'כל העלים', members: ['flower-petal-0', 'flower-petal-60', 'flower-petal-120', 'flower-petal-180', 'flower-petal-240', 'flower-petal-300'] }],
  },
  fish: { kind: 'regions', Component: FishImage, regions: fishRegions, names: fishRegionNames },
  tree: {
    kind: 'regions', Component: TreeImage, regions: treeRegions, names: treeRegionNames,
    groups: [{ id: 'tree-crown-all', name: 'כל הכתר', members: ['tree-crown-left', 'tree-crown-right', 'tree-crown-top'] }],
  },
  car: {
    kind: 'regions', Component: CarImage, regions: carRegions, names: carRegionNames,
    groups: [
      { id: 'car-windows-all', name: 'כל החלונות', members: ['car-window-left', 'car-window-right'] },
      { id: 'car-wheels-all', name: 'כל הגלגלים', members: ['car-wheel-left', 'car-wheel-right'] },
    ],
  },
  star: { kind: 'regions', Component: StarImage, regions: starRegions, names: starRegionNames },
  balloon: {
    kind: 'regions', Component: BalloonImage, regions: balloonRegions, names: balloonRegionNames,
    groups: [{ id: 'balloons-all', name: 'כל הבלונים', members: ['balloon-left', 'balloon-right'] }],
  },
  robot: {
    kind: 'regions', Component: RobotImage, regions: robotRegions, names: robotRegionNames,
    groups: [{ id: 'robot-arms-all', name: 'כל הידיים', members: ['robot-arm-left', 'robot-arm-right'] }],
  },
  dog: {
    kind: 'regions', Component: DogImage, regions: dogRegions, names: dogRegionNames,
    groups: [{ id: 'dog-ears-all', name: 'כל האוזניים', members: ['dog-ear-left', 'dog-ear-right'] }],
  },
  boat: {
    kind: 'regions', Component: BoatImage, regions: boatRegions, names: boatRegionNames,
    groups: [{ id: 'boat-sails-all', name: 'כל המפרשים', members: ['boat-sail-main', 'boat-sail-small'] }],
  },
  forest: { kind: 'floodfill', src: '/images/coloring-scenes/forest.svg', width: 800, height: 800 },
  'forest-friends': { kind: 'floodfill', src: '/images/coloring-scenes/forest-friends.png', width: 1408, height: 768 },
  fruits: { kind: 'floodfill', src: '/images/coloring-scenes/fruits.png', width: 1408, height: 768 },
  'superheroes-team': { kind: 'floodfill', src: '/images/coloring-scenes/superheroes-team.png', width: 1408, height: 768 },
  lion: { kind: 'floodfill', src: '/images/coloring-scenes/lion.png', width: 1408, height: 768 },
  'woodland-park': { kind: 'floodfill', src: '/images/coloring-scenes/woodland-park.png', width: 1408, height: 768 },
  'superheroes-kids': { kind: 'floodfill', src: '/images/coloring-scenes/superheroes-kids.png', width: 1408, height: 768 },
  'superheroes-team-2': { kind: 'floodfill', src: '/images/coloring-scenes/superheroes-team-2.png', width: 1408, height: 768 },
  elephant: { kind: 'floodfill', src: '/images/coloring-scenes/elephant.png', width: 1408, height: 768 },
  'jungle-animals': { kind: 'floodfill', src: '/images/coloring-scenes/jungle-animals.png', width: 1408, height: 768 },
  'jungle-animals-2': { kind: 'floodfill', src: '/images/coloring-scenes/jungle-animals-2.png', width: 1408, height: 768 },
  giraffe: { kind: 'floodfill', src: '/images/coloring-scenes/giraffe.png', width: 1408, height: 768 },
  'princess-garden': { kind: 'floodfill', src: '/images/coloring-scenes/princess-garden.png', width: 1408, height: 768 },
  'woodland-friends': { kind: 'floodfill', src: '/images/coloring-scenes/woodland-friends.png', width: 1408, height: 768 },
  'princess-library': { kind: 'floodfill', src: '/images/coloring-scenes/princess-library.png', width: 1408, height: 768 },
  'princess-picnic': { kind: 'floodfill', src: '/images/coloring-scenes/princess-picnic.png', width: 1408, height: 768 },
  'jungle-panda': { kind: 'floodfill', src: '/images/coloring-scenes/jungle-panda.png', width: 1408, height: 768 },
};
