import { ConnectivityMap } from "circuit-json-to-connectivity-map"
import { PadJunctionSimplificationSolver } from "../../lib/PadJunctionSimplificationSolver"
import type { Obstacle } from "../../lib/routeTypes"
import type { HighDensityRoute } from "../../lib/routeTypes"

type Input = ConstructorParameters<typeof PadJunctionSimplificationSolver>[0]
export type PadJunctionFixture = Input & {
  hdRoutes: HighDensityRoute[]
  obstacles: Obstacle[]
}

export function createPadJunctionFixture(): PadJunctionFixture {
  return {
    hdRoutes: [-2, 2].map((x, index) => ({
      connectionName: `branch${index}`,
      rootConnectionName: "signal",
      traceThickness: 0.2,
      viaDiameter: 0.3,
      startPcbPortId: `anchor${index}`,
      endPcbPortId: "target",
      route: [
        { x, y: 4, z: 0, pcb_port_id: `anchor${index}` },
        { x: 0, y: 0, z: 0, pcb_port_id: "target" },
      ],
      vias: [],
    })),
    obstacles: [
      {
        type: "rect",
        obstacleId: "target-pad",
        center: { x: 0, y: 0 },
        width: 2,
        height: 2,
        layers: ["top"],
        connectedTo: ["pad-port"],
      },
    ],
    connMap: new ConnectivityMap({
      signal: ["branch0", "branch1", "pad-port"],
    }),
    layerCount: 2,
  }
}
