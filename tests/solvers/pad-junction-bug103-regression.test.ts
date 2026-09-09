import { expect, test } from "bun:test"
import { ConnectivityMap } from "circuit-json-to-connectivity-map"
import { PadJunctionSimplificationSolver, type PadJunctionSimplificationInput, type PadJunctionOutcome } from "../../lib/PadJunctionSimplificationSolver"
import fixture from "../fixtures/bug103.json"

test("raw bug103 full-board pad cleanup matches the autorouter exactly", () => {
  const { netMap, ...data } = structuredClone(fixture.input)
  const input = {
    ...data,
    connMap: new ConnectivityMap(netMap),
  } as PadJunctionSimplificationInput
  const original = structuredClone(data)
  const solver = new PadJunctionSimplificationSolver(input)
  solver.solve()
  expect(solver.failed).toBe(false)
  expect(solver.solved).toBe(true)
  expect(solver.getOutput()).toEqual(fixture.output)
  expect(solver.outcomes).toEqual(fixture.outcomes as PadJunctionOutcome[])
  expect(solver.outcomes.filter((outcome) => outcome.outcome === "accepted")).toHaveLength(1)
  expect(data).toEqual(original)
})
