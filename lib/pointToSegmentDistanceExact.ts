import { distance } from "@tscircuit/math-utils"

type Point = { x: number; y: number }

export function pointToSegmentDistanceExact(P: Point, Q1: Point, Q2: Point): number {
  const v = { x: Q2.x - Q1.x, y: Q2.y - Q1.y }
  const w = { x: P.x - Q1.x, y: P.y - Q1.y }

  // Calculate squared length of the segment
  const c1 = w.x * v.x + w.y * v.y
  if (c1 <= 0) {
    // Point is behind Q1
    return distance(P, Q1)
  }

  const c2 = v.x * v.x + v.y * v.y
  if (c2 <= c1) {
    // Point is beyond Q2
    return distance(P, Q2)
  }

  // Point projects onto the segment
  const b = c1 / c2
  const Pb = {
    x: Q1.x + b * v.x,
    y: Q1.y + b * v.y,
  }
  return distance(P, Pb)
}
