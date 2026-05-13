import type { GameRegistration } from "@/lib/types/games/base";
import { gamesRegistryBatch1 } from "./registryData/batch1";
import { gamesRegistryBatch2 } from "./registryData/batch2";
import { gamesRegistryBatch3 } from "./registryData/batch3";
import { gamesRegistryBatch4 } from "./registryData/batch4";

// רישום כל המשחקים במקום אחד
export const GAMES_REGISTRY: GameRegistration[] = [
  ...gamesRegistryBatch1,
  ...gamesRegistryBatch2,
  ...gamesRegistryBatch3,
  ...gamesRegistryBatch4,
];