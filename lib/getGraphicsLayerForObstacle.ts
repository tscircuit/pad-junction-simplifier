import type { Obstacle } from "./routeTypes"
import { getUniqueValidZLayers } from "./getUniqueValidZLayers"
import { getUniqueValidZLayersFromLayerNames } from "./getUniqueValidZLayersFromLayerNames"

export function getGraphicsLayerForObstacle(
  obstacle: Obstacle,
  layerCount: number,
): string {
  let zLayers: number[]
  if (obstacle.__zLayers && obstacle.__zLayers.length > 0) {
    zLayers = getUniqueValidZLayers(obstacle.__zLayers, layerCount)
  } else {
    zLayers = getUniqueValidZLayersFromLayerNames(obstacle.layers, layerCount)
  }
  return `z${zLayers.join(",")}`
}
