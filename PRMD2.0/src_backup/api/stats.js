import { statsCards, modificationDist, methodDist, speciesDist, regionDist, motifSummary } from "../data/mockStats";

export async function getStats() {
  return Promise.resolve({ statsCards, modificationDist, methodDist, speciesDist, regionDist, motifSummary });
}
