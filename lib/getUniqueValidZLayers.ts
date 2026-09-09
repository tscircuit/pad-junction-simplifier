export function getUniqueValidZLayers(
  zLayers: readonly number[],
  layerCount: number,
): number[] {
  return [...new Set(zLayers)]
    .filter((z) => Number.isInteger(z) && z >= 0 && z < layerCount)
    .sort((a, b) => a - b)
}
