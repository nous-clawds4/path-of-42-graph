# Contributing (stub; the full guide comes in build-plan M8)

- **Label-only mode:** nothing merges automatically. A bot will label PRs; a human merges.
- **Where:** open PRs against `community`. Use your own GitHub account. Touch at most 5 node files per PR.
- **Format:** one file per node in `question-graph/`, in the [viewer format](https://github.com/nous-clawds4/path-of-42-viewer#data-format). Every node needs `hold`. Answers need `tag`, `rationale`, `q` and `a`. Rejected answers also need `reopen_if`.
- **CI must pass:** the validator (`build.mjs --strict`), the founder hash, the hold cap (a child is never held more strongly than its weakest parent), and L0/L1 parity with `founder`.
- **Signals and trust:** `/p42 endorse`, `/p42 dispute <reason>`, `/p42 needs-crafting <code>: <text>`. Your GitHub account must be linked to your npub in both directions (NIP-39 kind 10011, plus the npub in your GitHub bio or a public gist). See RULES.md §2–§3.
- **License:** contributions are CC BY 4.0 for graph and docs, MIT for code.
