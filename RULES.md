# P3 merge rules v0

*Status: **APPROVED 2026-09-29** (David): every DEFAULT below, the repo name `path-of-42-graph` and the licenses (CC BY 4.0 content, MIT code). The §1 gate defaults were **revised after the Tapestry lead's answers (2026-09-29) and need David's OK**. §5 vs §9 stays open, and the P3 authority row is pending [infinite-harness PR #8](https://github.com/nous-clawds4/infinite-harness/pull/8). This repo was created 2026-09-29; there is no bot yet and no nostr events. Mode: label-only. Sources: Path 42 planning notes (`phase2-pitch.md` rev. 3, `nip34-readiness.md`; not in this repo), `nous-clawds4/infinite-harness` @ `6f02238` (`docs/authority.md`, `docs/hold-axis.md`, `docs/path-of-42.md`, `docs/tapestry-concept-model.md` §8.3), `nous-clawds4/tapestry` @ `97233b5`, `nous-clawds4/path-of-42-viewer` (`build/build.mjs`), live reads of tapestry.brainstorm.world (2026-09-29, ET).*

## Decisions for David (status 2026-09-29)

1. **Gate:** rank ≥ **10** (**APPROVED 2026-09-29**; re-check against production's scale at G5). Perspective: **Nous's scores on api.brainstorm.world (DECIDED 2026-09-29)**. Interim: label-only with no rank decisions (§1).
2. **Thresholds, signer counts and open periods** in the table in §4–§6. **APPROVED 2026-09-29.**
3. **P3 authority:** the P3 row is proposed in [infinite-harness PR #8](https://github.com/nous-clawds4/infinite-harness/pull/8), which is waiting on review by `@wds4` (open, 0 reviews as of 2026-09-29). **Pending your review of PR #8.** Until it merges, the bot still refuses every L0/L1 merge (§8).
4. **Repo name:** `nous-clawds4/path-of-42-graph`. **APPROVED 2026-09-29.** (Also considered: `path42`, `p42-graph`. None existed as of 2026-09-29.)
5. **License:** CC BY 4.0 for content, MIT for code (§11). **APPROVED 2026-09-29.**
6. **Label-only mode** for the first **10** PRs that qualify, plus the exit criteria (§10). **APPROVED 2026-09-29.**
7. **Agents:** agents may propose, but their signals don't count in v0 (§3). **APPROVED 2026-09-29.**
8. **§5 vs §9 backtracking:** **still open.** v0 sends every rejection or demotion of a merged node to you (§12).

## 0. Seed and branches

- **Repo layout:** `question-graph/` in the viewer's format (one YAML or Markdown file per node), plus `decisions/`, `RULES.md` (this document once approved) and `.github/`.
- **Branches:**
  - `community`: Nous merges into it by these rules.
  - `founder`: your canonical view. Only you push to it.
  - Both are protected (see README). On a personal-account repo GitHub cannot limit pushes to named users, so the owner account can write to both; `founder` still needs a PR approved by @wds4.
- **Founder node:** the physics root, text **verbatim** (below). Held at **L0, h = 1**, owned by you. Any rewording, including accepting the optional polish suggestions (`founder-node-polish.md`, planning notes), needs your signed ruling (§8).
- **Pinned hash:** CI pins the SHA-256 of the root body. A PR that changes the body fails CI unless it carries a valid ruling.
- **First children:** *pending*. The physics pilot's retro-map by Ontology hasn't been filed. When it lands it may supply them. **No children are invented here.**

`question-graph/root-theory-of-the-observer.md`:

```markdown
---
id: root-theory-of-the-observer
type: answer
title: A Theory of the Observer
parents: []
status: accepted
hold: L0            # h = 1 (root); David-owned; changes need his signed ruling
owner: e5272de914bd301755c439b88e6959a43c9d2664831f093c51e9c799a16a102f
body_sha256: 97e3a6366bca5d63185f4a227d2750bcc6298e14d07f1cb92df2d6e8875d1597
sources:
  - label: Statement of the Problem v0.5, "Layer 1. A Theory of the Observer" (nous-clawds4/physics@5acf9d3)
    url: https://github.com/nous-clawds4/physics/blob/5acf9d39ee387b8b923bd06cff11a20e1e88532c/public-essays/statement-of-the-problem/versions/v0.5.md
  - label: physics PR #194 (merged 2026-09-29 7:38 PM ET)
    url: https://github.com/nous-clawds4/physics/pull/194
---
For the past century, the pinnacles of our understanding of the physical world are the theories of quantum mechanics and general relativity. Despite the triumphs, modern theoretical physics lacks a precise explanation of what the observer is. Progress requires that we supply that explanation.

Quantum mechanics predicts what observers will see, but never says which physical systems count as observers. Bell put it as a question: "What exactly qualifies some physical systems to play the role of 'measurer'?" What is missing is the observer as a physical system inside the theory: a thing of the same kind as everything else physics describes, not a mind or an agent standing outside the physics.

One may ask whether it is even possible to develop a theory of the observer in the first place. Success, at a minimum, will be the reproduction of known physics, with the cores of QM (the Born rule) and GTR (the Einstein equations) being fully recoverable, whether as suitable approximations or in their exact forms. We begin with the strong opinion, strongly held, that this will be possible, and that its pursuit is justified if only for the ontological satisfaction it may bring. We conjecture that the pursuit of this theory of the observer could be a pathway for the discovery of new physics. 

Consider this program to exist in layers, with the layer 1 as outlined above. In successive laters, we hope to ask questions and select mathematical tools and frameworks as deliberately as possible, selecting those best suited to our goals. We will never fear to challenge and reconsider these choices as needed for progress to be made. (Note: plan to apply the harness for the Path of 42)
```

*`body_sha256` is the SHA-256 of lines 9–15 of that file at `5acf9d3` (LF line endings, final newline included, and the trailing space after "new physics." kept). The viewer uses a Markdown body as the node's synopsis and doesn't require a tag, q or a on a root (`build.mjs:124,136`).*

## 1. Gate

**Perspective: DECIDED 2026-09-29 by David. The gate uses Nous's scores from production Brainstorm** (`api.brainstorm.world`, NosFabrica/brainstorm_server), where Nous's pubkey is `15f7dafc…7270`. David curates Nous's follows (see `GATE.md`). `tapestry.brainstorm.world` is R&D only and **is not used, even as an interim**.

**The call:** `POST https://api.brainstorm.world/rank/pubkeys` with `{"pubkeys":[<hex>…≤1000], "algorithm":"graperank-pov", "pov":"<Nous hex>"}` returns `{results:[{pubkey, rank}], ttl}`. The OpenAPI lists no auth for it but documents an optional authenticated mode (ORE-A). **Whether calls work anonymously is unverified (G5).**

- **Interim, DEFAULT:** until G5 and G6 pass, the bot runs **label-only with no rank-based decisions**. It computes everything else, marks the gate "pending" in records and labels, and never applies `p42:ready`. If G5 shows Nous's scores are readable earlier, the bot records them (`rank_source.perspective: nous`) but still doesn't act on them until G6. Rationale: no decision should rest on an unconfirmed scale or source.
- **DEFAULT: a signal counts only if the signer's rank is ≥ 10. The cutoff must be re-checked at G5.** Rationale: 10 was grounded on tapestry's 0–100 scale, but production's `rank` is an undocumented `number`.
- **DEFAULT: ranks are fetched in one batch at evaluation time, no more than 1 hour before a merge.** On a 202, retry once after `Retry-After` (at least 60 s), then stop for that run. Rationale: follows the provider's etiquette.
- **DEFAULT: fail closed on errors, 401/403/422, or an unreachable API.** Rationale: never merge on missing data.
- **DEFAULT: staleness.** If David's last recalculation, recorded in `GATE.md`, is more than 7 days old, the bot labels `p42:rank-stale` and doesn't merge. The bot never triggers a recalculation. Rationale: the API returns no computed-at time, and recalculation is David's job.

## 2. GitHub ↔ npub link (two-way)

A signal counts only if **both** directions are verified.

**A. nostr → GitHub (any one of these):**
1. **Target:** a kind-39999 "My GitHub Account" tagging by the npub of a GitHub-account element naming the login. **Not usable:** no such concept or tag is live anywhere. Story 7's concept is a draft on feature branches only, though a community list `39998:b83a28b7…:github-accounts` exists (Tapestry lead, 2026-09-29).
2. **Interim, DEFAULT: NIP-39 identity claim.** A kind-10011 event signed by the npub containing `["i", "github:<login-lowercase>", "<gist-id>"]` ([NIP-39](https://github.com/nostr-protocol/nips/blob/master/39.md), updated 2026-09-27). Rationale: an existing standard, signed by the key, and machine-checkable.
3. **Interim fallback, DEFAULT:** a signed statement pasted into a PR comment by the linked GitHub account. It's a fenced block tagged `p42-link` holding the full signed nostr event JSON: kind 1, `content` = `p42-link github:<login> repo:nous-clawds4/<repo>`, and `created_at` within 7 days of posting. The bot verifies the id and signature (nostr-tools `verifyEvent`). Rationale: works for people who won't publish events to relays.

**B. GitHub → nostr (either):** the npub appears in the account's profile bio (`GET /users/<login>`), or in a public gist owned by `<login>` (for NIP-39, the gist named in the `i` tag). **DEFAULT: the gist should contain "Verifying that I control the following Nostr public key: <npub>", but any gist by that login containing the npub is accepted** (NIP-39 says to accept older wordings).

**Rules:**
- Re-verify every **7 days (DEFAULT)** and immediately before a merge. If either side disappears, that person's signals are dropped. Rationale: links can be revoked.
- One npub ↔ one GitHub login. **DEFAULT: a conflict freezes both until resolved.** Rationale: stops one key voting twice.

## 3. Signal format

**DEFAULT: PR comments or review bodies from linked GitHub accounts**, one command per line, at the start of the line:

```
/p42 endorse
/p42 dispute <reason, at least 20 characters>
/p42 needs-crafting <code>: <explanation>      # code ∈ unclear-term | compound | circular | off-scope | duplicate | other
/p42 resolved                                   # withdraws the signer's own needs-crafting flag
/p42 withdraw                                   # withdraws the signer's current endorse/dispute
```

Rationale: GitHub is the MVP home (Q4, decided), so there's nothing extra to install. Nostr signals (e.g. NIP-22 comments) come in Phase 2.

- Only the signer's latest endorse, dispute or withdraw counts. GitHub's own "Approve" and "Request changes" buttons are ignored; only `/p42` lines count.
- **Endorsements are bound to the head commit** at the time of the comment. A later commit touching `question-graph/` voids them (DEFAULT). Rationale: an endorsement covers what was read. Disputes and flags carry over.
- **These signals never count:** the PR author's, Nous's, GitHub accounts of type `Bot`, and any npub whose kind 0 has `"bot": true` (DEFAULT). Rationale: no self-votes, and agents propose only until operator vouching exists (pitch Q11).

## 4. Weighting and thresholds

**Weight (DEFAULT):** `w = rank / 100` for a gated, linked, eligible signer, otherwise 0. **Net = Σ w(endorse) − Σ w(dispute).** v0 uses rank only. The earned-reputation ledger is computed and recorded but has no weight until you approve it. Rationale: reputation needs history before it can be trusted.

**PR level (DEFAULT):** the strongest hold level of any node the PR touches, before or after the change. If any touched node is an answer, answer rules apply. At most **5 node files per PR**. Rationale: the riskiest item decides, and small PRs are reviewable.

| DEFAULT | Question net ≥ | Question signers ≥ | Answer net ≥ | Answer signers ≥ | Open period (min age / quiet after last node commit) |
|---|---|---|---|---|---|
| **L4** | 1.5 | 2 | 2.5 | 3 | 72 h / 48 h |
| **L3** | 2.5 | 3 | 3.5 | 4 | 72 h / 48 h (answers 7 d / 72 h) |
| **L2** | 3.0 and ≥ 3 panel endorsers at rank ≥ 50 | 3 | 4.0 and ≥ 3 panel endorsers | 4 | 7 d / 72 h |
| **L1 / L0** | your ruling (§8) | n/a | your ruling | n/a | n/a |

Rationale: with typical ranks of 50–80, L4 needs about two or three solid endorsers. Each step up adds weight and people, and answers get one extra step because their errors compound down the graph.

**Blockers (DEFAULT), any of which stops a merge:**
- An open needs-crafting flag from a gated signer.
- A dispute from a signer with rank ≥ 50, or from you.
- A failed CI check (`build.mjs --strict`; hold cap at the weakest parent; `reopen_if` present on rejections; root hash).
- Any demotion, or any rejection of a merged node (§12).
- A change to `q`/`a` on a node whose parent is the root. §9: "ratings near the top of the graph need David's signature."
- A `physical-hypothesis` answer is judged under **L2 rules at minimum**, whatever level it declares.

## 5. Distinct signers

- **DEFAULT:** signers are counted by distinct npub **and** distinct GitHub login, excluding the author, Nous and bots. Rationale: one person, one voice.
- **DEFAULT:** at least one counted endorser must be someone who didn't co-author any commit in the PR. Rationale: independent review.

## 6. Open period, staleness, expiry

- **Minimum age and quiet period:** as in the table. Rationale: gives people in all time zones and on weekends a chance to object.
- **Flag expiry (DEFAULT):** a needs-crafting flag expires 7 days after the next node-file commit unless its signer raises it again. Rationale: stops stalling while still forcing a response.
- **Stale / closed (DEFAULT):** no qualifying activity for 30 days → label `p42:stale`. 60 days → Nous closes the PR with a pointer to reopen. Rationale: keeps the queue honest.

## 7. Questions vs answers

The same machinery for both, with stricter parameters for answers (the table and blockers above). Every answer must carry `tag`, `rationale`, `q` and `a`. A rejected answer must also carry `reopen_if` (CI, strict). Rationale: pitch Appendix C. Answers' errors propagate through h and into paper selections.

## 8. L0 / L1: your ruling

The bot acts only on a **kind-39999 event signed by the P3 authority key**, and checks everything in `authority.md` §"How a ruling is verified", in order:
1. **Signature:** `verifyEvent` on a JSON round-trip.
2. **Author:** `pubkey` equals P3's hex key in `authority.md`, read at a pinned commit. It is never read from the graph or the PR. **The P3 row is proposed in [infinite-harness PR #8](https://github.com/nous-clawds4/infinite-harness/pull/8), which is waiting on review by `@wds4`. Until it merges, the bot refuses** (Decision 3).
3. **Scope:** tags name the project and the exact target.
4. **Decision:** `approve`.

**Proposed shape (DEFAULT, until the `ih ruling` concept's fields are published; they aren't on any instance yet, `tapestry-concept-model.md` §8.4):**

```json
{"kind":39999,"pubkey":"e5272de9…102f","tags":[["d","p3-ruling-<pr>-<sha8>"],["z","<ih-ruling concept address: TBD>"],
 ["project","P3"],["repo","nous-clawds4/<repo>"],["decides","<full 40-char head commit SHA>"],
 ["level","L0|L1"],["decision","approve|reject"],["evidence","https://github.com/nous-clawds4/<repo>/pull/<n>"]],
 "content":"<optional reason>"}
```

- **Where the bot looks:** two public relays (DEFAULT: `wss://relay.damus.io`, `wss://nos.lol`), or the event pasted into the PR as a `p42-ruling` fenced block. Rationale: the check is the same wherever the event comes from.
- **Mismatches:** a ruling whose `decides` differs from the PR's current head SHA doesn't count. A ruling that fails any check is ignored and flagged, never repaired.

## 9. Nous merge procedure and audit trail

Runs on PR events and hourly:
1. Stop if `FREEZE` exists on `community` or the PR has the `p42:freeze` label.
2. Require green CI, a base of `community`, no conflicts, and at most 5 node files.
3. Classify the PR level and type (§4), and check the open period.
4. Collect `/p42` signals, re-verify links (§2), and batch-fetch ranks (§1). Compute weights, net, signers and blockers.
5. For L0/L1, verify the ruling (§8).
6. **Label-only mode:** apply `p42:ready` and post the draft decision record as a comment. **Merge mode:** create a merge commit (no squash), then commit `decisions/pr-<n>.yaml` to `community`.
7. Comment a summary with a link to the record.

`decisions/pr-<n>.yaml` holds: `rules_version: v0`, `mode`, `pr`, `head_sha`, `merge_sha`, `as_of` (UTC), `level`, `node_type`, `nodes`, `open_period {opened, last_node_commit}`, `rank_source {url: api.brainstorm.world/rank/pubkeys, algorithm: graperank-pov, pov: <Nous hex>, perspective, fetched_at, last_recalc (GATE.md)}`, `signers: [{github, npub, link {method, verified_at}, rank, weight, signal, comment_url, at}]`, `excluded: [{who, reason}]`, `net`, `thresholds`, `blockers: []`, `ruling_event_id` (L0/L1). The git history of `decisions/` is the audit log.

## 10. Label-only mode

- **DEFAULT: the first 10 PRs that reach `p42:ready`.** You (or your delegate) merge by hand after review. Rationale: check the rules against your judgment before automating.
- **Exit (all required, DEFAULT):**
  - At least 10 labelled PRs, and you agreed with every "ready" label, or any disagreement led to a rules fix and a restart of the count.
  - At least 5 distinct gated signers have taken part.
  - The Nous gate is live (§1).
  - Your written approval in a PR that updates `RULES.md`.
- **Re-entry:** any wrong merge, or your `FREEZE`, sends the bot back to label-only mode.

## 11. License (APPROVED 2026-09-29: CC BY 4.0 content, MIT code)

| Option | For | Against |
|---|---|---|
| **CC BY 4.0** (recommended) | Contributors get credit. Compatible with arXiv and open-access journals, so the graph can feed papers. | Derivatives can be closed. |
| CC BY-SA 4.0 | Derivative graphs stay open. | Share-alike complicates reuse in papers and mixing with other licenses. |
| CC0 | Simplest, maximum reuse. | No attribution, a poor fit for a reputation system built on credit. |

- **Code** (CI, bot): **MIT** (recommended), short and permissive, the same family as the viewer's vendored libraries. Apache-2.0 adds a patent grant, at more length.
- **DEFAULT:** the PR template states "contributions are licensed under the repo's licenses". No CLA. Note that the viewer and infinite-harness repos have no LICENSE file today.

## 12. §5 vs §9 (still open)

`path-of-42.md` §5 says "give up the deepest accepted node whose rejection resolves the problem". §9 says "give up the step with the lowest q × a first". **v0 does not choose between them.** A backtracking proposal is an ordinary PR that rejects a merged node, and v0 treats every such PR, and every demotion, as needing your decision: labelled `p42:needs-david`, never auto-merged. The PR must still state which rule it relied on. Rationale: hold-axis §4 puts weakening under stricter control, and this avoids pre-deciding the rule.

## Unverified

- The published field layout of the `ih ruling` concept and its `z` address.
- Whether production `/rank/pubkeys` answers anonymously, and its `rank` scale (G5).
- Nous's kind-10040 / kind-30382 events: none found on three relays checked.
