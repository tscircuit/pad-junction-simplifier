# Pad junction simplifier

- Support the V case with direct deterministic construction. Do not add generalized routing search.
- Use BasePipelineSolver and keep each stage's visualization independently useful.
- Keep the terminology dictionary and ASCII geometry diagram at the top of the main solver.
- One exported function per file; solver classes may implement their required lifecycle methods.
- Keep types near the start of files and declare return types for new functions.
- One test per file. Run tests locally with `bun test --timeout 9999999`.
- Run `bun run typecheck` and `bun run build` before committing code changes.
- Do not silently recover from invalid solver state; throw a specific error.
- Preserve input data, terminal metadata, existing taps, pad gaps, and copper/board clearances.
- Keep videos and other large generated artifacts out of Git.
