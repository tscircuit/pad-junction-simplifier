interface Point {
  x: number
  y: number
}

import { pointToSegmentDistanceExact } from "./pointToSegmentDistanceExact"

import { doSegmentsIntersect } from "@tscircuit/math-utils"

/**
 * Calculates the minimum distance between two line segments.
 * @param A1 First point of the first line segment
 * @param A2 Second point of the first line segment
 * @param B1 First point of the second line segment
 * @param B2 Second point of the second line segment
 * @returns The minimum distance between the two line segments
 */
export function minimumDistanceBetweenSegments(
  A1: Point,
  A2: Point,
  B1: Point,
  B2: Point,
): number {
  // Check if segments intersect
  if (doSegmentsIntersect(A1, A2, B1, B2)) {
    return 0
  }

  // Calculate distances from each endpoint to the other segment
  const distA1 = pointToSegmentDistanceExact(A1, B1, B2)
  const distA2 = pointToSegmentDistanceExact(A2, B1, B2)
  const distB1 = pointToSegmentDistanceExact(B1, A1, A2)
  const distB2 = pointToSegmentDistanceExact(B2, A1, A2)

  // Return the minimum of the four distances
  return Math.min(distA1, distA2, distB1, distB2)
}
