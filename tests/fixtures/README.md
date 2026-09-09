# Regression fixtures

These plain JSON fixtures preserve the full pad-cleanup input, expected routes,
and expected outcomes from `tscircuit/tscircuit-autorouter` at commit
`0f251d09573877cd8fa4a368f74653268cbd2f2a` (PR #2491).

- `bug103.json`: the raw routed bug103 board prepared by
  `PrepareTraceSimplificationSolver`, before any earlier route cleanup. Exactly
  one pad receives a T junction.
- `srj18-01.json`: `dataset-srj18` 1.0.0 `samples/sample001.json`, routed by
  `AutoroutingPipelineSolver9_PreloadedTraceGraph`. The input was captured when
  its pad-junction stage was created; the expected output was captured after
  that stage completed. Exactly three pads receive T junctions.

`input.netMap` is the original ConnectivityMap's public `netMap` data. Tests
reconstruct `new ConnectivityMap(netMap)` and compare every output route and
outcome, while checking the input remains unchanged. No autorouter package or
network download is needed to run these tests. These are regression checks for
the extracted cleanup stage, not independent whole-board DRC runs.
