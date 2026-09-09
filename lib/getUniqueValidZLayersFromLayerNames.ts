import { getUniqueValidZLayers } from "./getUniqueValidZLayers"

export function getUniqueValidZLayersFromLayerNames(
  layerNames: readonly string[],
  layerCount: number,
): number[] {
  const zLayers: number[] = []
  for (const layerName of layerNames) {
    switch (layerName) {
      case "top":
        zLayers.push(0)
        break
      case "bottom":
        zLayers.push(layerCount - 1)
        break
      default:
        zLayers.push(parseInt(layerName.slice(5)))
    }
  }
  return getUniqueValidZLayers(zLayers, layerCount)
}
