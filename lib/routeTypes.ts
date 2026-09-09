export type CircuitJsonMetadata = {
  pcb_smtpad_id?: string
  pcb_plated_hole_id?: string
  pcb_port_id?: string
  pcb_via_id?: string
  source_component_name?: string
  source_port_name?: string
}

export interface Obstacle {
  obstacleId?: string
  /** Optional source component identifier associated with this obstacle. */
  componentId?: string
  /**
   * Optional Circuit JSON provenance carried through SRJ.
   * Routing algorithms must not use this field.
   */
  circuitJsonMetadata?: CircuitJsonMetadata
  type: "rect"
  layers: string[]
  /** Public z-layer indexes supplied by SimpleRouteJson producers. */
  zLayers?: number[]
  /** Canonicalized z-layer indexes used by autorouter internals. */
  __zLayers?: number[]
  center: { x: number; y: number }
  width: number
  height: number
  /** Optional counter-clockwise rotation metadata in degrees. */
  ccwRotationDegrees?: number
  connectedTo: string[]
  isCopperPour?: boolean
  netIsAssignable?: boolean
  offBoardConnectsTo?: string[]
}

export type HighDensityRoutePoint = {
  x: number
  y: number
  z: number
  traceThickness?: number
  /** Keeps routed terminals fixed during post-route DRC optimization. */
  pcb_port_id?: string
  insideJumperPad?: boolean
  toNextSegmentType?: "through_obstacle"
  toNextSegmentCircuitJsonMetadata?: CircuitJsonMetadata
}

export type HighDensityRoute = {
  connectionName: string
  rootConnectionName?: string
  /** Terminal identities in route order, kept inert until terminal locking. */
  startPcbPortId?: string
  endPcbPortId?: string
  traceThickness: number
  viaDiameter: number
  route: HighDensityRoutePoint[]
  vias: Array<{ x: number; y: number }>
  jumpers?: Jumper[]
  regionId?: string
}


export type Jumper = {
  route_type: "jumper"
  /** Starting point of the jumper */
  start: { x: number; y: number }
  /** Ending point of the jumper */
  end: { x: number; y: number }
  /** Footprint size */
  footprint: "0603" | "1206" | "1206x4_pair"
}
