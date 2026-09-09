import { getUniqueValidZLayers } from "./getUniqueValidZLayers"
import { getUniqueValidZLayersFromLayerNames } from "./getUniqueValidZLayersFromLayerNames"

type LayerMappedObject = { __zLayers?: number[]; layers?: string[] }

/** Derive canonical layers without mutating the caller's objects. */
export function createObjectsWithZLayers<T extends LayerMappedObject>(
  objects: ReadonlyArray<T>,
  layerCount: number = 2,
): Array<T & { __zLayers: number[] }> {
  const allZLayers = Array.from({ length: layerCount }, (_, i) => i)
  return objects.map((object) => {
    let candidateZLayers = object.__zLayers
    if (candidateZLayers === undefined && object.layers) {
      candidateZLayers = getUniqueValidZLayersFromLayerNames(
        object.layers,
        layerCount,
      )
    }
    if (candidateZLayers === undefined) candidateZLayers = allZLayers
    let zLayers = getUniqueValidZLayers(candidateZLayers, layerCount)
    if (zLayers.length === 0) zLayers = allZLayers
    return { ...object, __zLayers: zLayers }
  })
}
