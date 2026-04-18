import { annotationEnrichment, expressionHeatmapRows } from "../data/mockAnnotation";

export async function getAnnotation() {
  return Promise.resolve({ annotationEnrichment, expressionHeatmapRows });
}
