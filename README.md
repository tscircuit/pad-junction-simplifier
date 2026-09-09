# Pad junction simplifier

`@tscircuit/pad-junction-simplifier` replaces two same-net routes converging at a rectangular PCB pad with a straight head and a shared perpendicular stem. It supports the V case through direct geometry, without a routing search.

```text
Before                    After
  \       /                 \       /
   \     /                   o---+---o  head
    \   /                        |
  +--\-/--+                 gap  | stem
  |   o   | pad              +---|---+
  +-------+                  |   o   | pad
                             +-------+
```

The gap between the head's copper edge and the pad edge is at least half the trace width. The stem crosses this gap to reach the original terminal.

## Usage

```ts
import { ConnectivityMap } from "circuit-json-to-connectivity-map"
import {
  PadJunctionSimplificationSolver,
  type HighDensityRoute,
} from "@tscircuit/pad-junction-simplifier"

const hdRoutes: HighDensityRoute[] = [-2, 2].map((x, index) => ({
  connectionName: `branch${index}`,
  traceThickness: 0.2,
  viaDiameter: 0.3,
  route: [{ x, y: 4, z: 0 }, { x: 0, y: 0, z: 0 }],
  vias: [],
}))

const solver = new PadJunctionSimplificationSolver({
  hdRoutes,
  obstacles: [{
    type: "rect",
    center: { x: 0, y: 0 },
    width: 2,
    height: 2,
    layers: ["top"],
    connectedTo: ["pad-port"],
  }],
  connMap: new ConnectivityMap({ signal: ["branch0", "branch1", "pad-port"] }),
  layerCount: 2,
})

solver.solve()
if (solver.failed) throw new Error(solver.error ?? "Pad simplification failed")
const routes = solver.getOutput()
const graphics = solver.visualize()
```

`getOutput()` returns routes after completion. Original input data, terminal coordinates, route identities, and metadata are preserved. Both point-to-point routes contain the shared stem; it represents one physical piece of copper. `outcomes` reports accepted replacements and rejected candidates with reasons.

## Algorithm and visualization

The solver extends `BasePipelineSolver` with three stages:

1. `FindPadVsSolver` uses terminals indexed by connectivity, finds pads with exactly two eligible runs, and highlights the detected V geometry.
2. `ConstructPadTsSolver` intersects both runs with the nearest feasible head and shows the proposed T. It preserves copper before each cut and places the junction directly outside the terminal.
3. `ApplyPadTsSolver` checks existing copper, vias, pads, taps, and board clearances before applying replacements. Its visualization shows the result and candidate diagnostics.

Call `step()` to advance incrementally and `visualize()` to inspect the current stage. After completion, `findPadVsSolver.visualize()`, `constructPadTsSolver.visualize()`, and `applyPadTsSolver.visualize()` expose the individual stage views as `GraphicsObject` values.

## Scope

Supported inputs have an axis-aligned rectangular pad and two equal, constant-width terminal runs on the same layer. The runs must form an acute or right-angle V on opposite sides of a horizontal or vertical stem. Terminal coordinates may differ by at most 0.001 mm.

The head must fit within the existing straight runs, keep the junction in its middle half, and add no more than 10% unique copper length. Unsupported or blocked candidates keep their existing routes. Rotated pads, unsupported route metadata, jumpers, and more than two terminal branches are excluded. A route participates in at most one accepted replacement per solve.

Pass fixed routes as `otherHdRoutes`. `minTraceToPadEdgeClearance` defaults to 0.15 mm, and `minBoardEdgeClearance` defaults to 0. An explicit `outline` takes precedence over rectangular `bounds`. The head-to-pad gap is fixed at half a trace width and is separate from clearance to unrelated copper.

## Development

Use Bun 1.3.14:

```sh
bun install
bun test --timeout 9999999
bun run typecheck
bun run build
```

The build produces ESM and TypeScript declarations in `dist/`. The `prepare` script builds the package when installed from Git; consumers can pin an immutable commit. CI runs tests, type checking, and the build. Generated videos and large artifacts stay outside Git.

MIT licensed.
