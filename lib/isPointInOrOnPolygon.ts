import { pointToSegmentDistance } from "@tscircuit/math-utils"

export type PolygonPoint = { x: number; y: number }
const EPSILON = 1e-6

export const isPointInOrOnPolygon = (
  point: PolygonPoint,
  polygon: PolygonPoint[],
): boolean => {
  if (!polygon || polygon.length < 3) {
    return false
  }

  // Treat points on the boundary as inside the polygon
  for (let i = 0; i < polygon.length; i++) {
    const start = polygon[i]
    const end = polygon[(i + 1) % polygon.length]
    if (pointToSegmentDistance(point, start!, end!) <= EPSILON) {
      return true
    }
  }

  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const pi = polygon[i]!
    const pj = polygon[j]!

    const intersect =
      pi.y > point.y !== pj.y > point.y &&
      point.x < ((pj.x - pi.x) * (point.y - pi.y)) / (pj.y - pi.y) + pi.x

    if (intersect) {
      inside = !inside
    }
  }

  return inside
}
