import { expect } from "bun:test"
import type { PadJunctionSimplificationSolver } from "../../lib/PadJunctionSimplificationSolver"

export function expectSharedPerpendicularStem(
  solver: PadJunctionSimplificationSolver,
): void {
  expect(
    solver.outcomes.some((outcome) => outcome.outcome === "accepted"),
  ).toBe(true)
  const [first, second] = solver.getOutput()
  if (!first || !second) throw new Error("Expected two branches")
  const junction = first.route.at(-2)
  const terminal = first.route.at(-1)
  const a = first.route.at(-3)
  const b = second.route.at(-3)
  if (!junction || !terminal || !a || !b)
    throw new Error("Expected a T junction")
  expect(second.route.at(-2)).toEqual(junction)
  const dx = terminal.x - junction.x
  const dy = terminal.y - junction.y
  expect(Math.hypot(dx, dy)).toBeGreaterThan(0.1)
  expect((a.x - junction.x) * dx + (a.y - junction.y) * dy).toBeCloseTo(0, 8)
  expect((b.x - junction.x) * dx + (b.y - junction.y) * dy).toBeCloseTo(0, 8)
  expect(
    (a.x - junction.x) * (b.x - junction.x) +
      (a.y - junction.y) * (b.y - junction.y),
  ).toBeLessThan(0)
}
