import { expect } from "bun:test"
import { PadJunctionSimplificationSolver, type PadJunctionSimplificationInput } from "../../lib/PadJunctionSimplificationSolver"

export function solvePadJunction(
  input: PadJunctionSimplificationInput,
): PadJunctionSimplificationSolver {
  const solver = new PadJunctionSimplificationSolver(input)
  solver.solve()
  expect(solver.failed).toBe(false)
  expect(solver.solved).toBe(true)
  return solver
}
