# Path of 42: question graph (P3, the Path 42 Project)

A public question graph built with David Strayhorn's **Path of 42** method ([infinite-harness `docs/path-of-42.md`](https://github.com/nous-clawds4/infinite-harness/blob/main/docs/path-of-42.md)). Humans and agents propose questions and answers as pull requests. Merges are decided by the rules in [`RULES.md`](RULES.md), weighted by nostr web of trust (see [`GATE.md`](GATE.md)).

**Status: label-only mode. Nothing merges automatically, and the trust gate is not live yet.**

## Founder node

[`question-graph/root-theory-of-the-observer.md`](question-graph/root-theory-of-the-observer.md) is David's "Layer 1. A Theory of the Observer", **verbatim** from [`nous-clawds4/physics` `v0.5.md` @ `5acf9d3`](https://github.com/nous-clawds4/physics/blob/5acf9d39ee387b8b923bd06cff11a20e1e88532c/public-essays/statement-of-the-problem/versions/v0.5.md) ([PR #194](https://github.com/nous-clawds4/physics/pull/194)).
- It is held at **L0, with h = 1**, and owned by David.
- CI checks its SHA-256 against [`p42/founder.json`](p42/founder.json).
- Any change needs David's signed ruling (RULES.md §8). The P3 authority row is pending in [infinite-harness PR #8](https://github.com/nous-clawds4/infinite-harness/pull/8), so L0/L1 changes currently fail CI.

## Branches

- **`community`** (default): open PRs here. Merges follow RULES.md, and during label-only mode a human merges.
- **`founder`**: David's canonical view. Changes need a PR approved by @wds4 as code owner.
- CI requires every L0/L1 node on `community` to match `founder` exactly.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`RULES.md`](RULES.md). Node format: the [path-of-42-viewer](https://github.com/nous-clawds4/path-of-42-viewer#data-format) format, one file per node in `question-graph/`.

## Licenses: what covers what

| Covered | License |
|---|---|
| The graph (`question-graph/`), docs (`README.md`, `RULES.md`, `GATE.md`, `CONTRIBUTING.md`) and other non-code content | **CC BY 4.0**: [`LICENSE`](LICENSE) |
| Code: `tools/`, `scripts/`, `.github/workflows/` | **MIT**: [`LICENSE-CODE`](LICENSE-CODE) |
| `tools/vendor/build.mjs` | Vendored from [`nous-clawds4/path-of-42-viewer`](https://github.com/nous-clawds4/path-of-42-viewer) (same owner). Distributed here under MIT; the upstream repo has no LICENSE file yet. |

The founder node's text is David Strayhorn's, included with his approval and offered under CC BY 4.0 like the rest of the graph.

## Local checks

`npm ci && npm run validate && npm test` (Node ≥ 18).
