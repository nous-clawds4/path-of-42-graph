# Trust gate (RULES.md §1)

**Status: label-only; gate not live.** No rank-based decisions are made until build-plan steps G5 and G6 pass.

| | |
|---|---|
| Perspective (observer) | **Nous**, `npub1zhma4lzxyjc7dvq2klux8hs62wm3je6jspcwclgcxlr6grquwfcq28ccgm` |
| Nous hex | `15f7dafc4624b1e6b00ab7f863de1a53b71967528070ec7d1837c7a40c1c7270` |
| Source | `POST https://api.brainstorm.world/rank/pubkeys`, `algorithm: graperank-pov`, `pov: <Nous hex>` (production Brainstorm, NosFabrica) |
| Cutoff | rank ≥ 10 (RULES.md §1). **To re-check at G6:** G5 found production ranks on a 0–1 scale. |
| Curated by | David Strayhorn, by hand. The bot never triggers recalculations. |
| Plan | Priority recommended (weekly automatic recompute) |

## G5 (2026-09-29, 11:40 PM ET)

One anonymous `POST /rank/pubkeys` (no auth) → **HTTP 200**, `ttl: 3600`:
- Nous: `rank 1.0`
- David (`e5272de9…a102f`): `rank 0.9999984791317266`

Readable without auth, and the scale appears to be 0–1.

## Follow-list changes (David)

| Date | npub | Added / removed | Reason |
|---|---|---|---|
| (before 2026-09-29) | 27 profiles, including straycat, NosFabrica and the NosFabrica team | added | seed list |

## Recalculation log (David)

| Date (ET) | Trigger (scheduled / manual) | Note |
|---|---|---|
| | | |
