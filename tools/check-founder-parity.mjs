#!/usr/bin/env node
// L0/L1 parity with `founder` (RULES.md §0, §8) and PR size (RULES.md §4). MIT (see LICENSE-CODE).
//   node tools/check-founder-parity.mjs --repo <dir> --founder-ref <ref> [--base-ref <ref>]
// Every node file that is L0/L1 on `founder` or in the working tree must be byte-identical to
// `founder`, unless a valid signed ruling exists. Ruling verification needs P3's row in
// infinite-harness docs/authority.md (pending in PR #8), so this check FAILS CLOSED for now.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { parseNode, walkNodes, isNodePath, arg } from './lib.mjs';

const repo = arg('--repo', '.');
const founderRef = arg('--founder-ref', 'origin/founder');
const baseRef = arg('--base-ref');
const git = (...a) => execFileSync('git', ['-C', repo, ...a], { encoding: 'utf8', maxBuffer: 64 << 20 });
const errors = [];
const strong = (d) => d && (d.hold === 'L0' || d.hold === 'L1');

const founderFiles = git('ls-tree', '-r', '--name-only', founderRef).split('\n').filter(isNodePath);
const founderText = new Map(founderFiles.map((f) => [f, git('show', `${founderRef}:${f}`)]));
const work = new Map(walkNodes(repo).map((f) => [f, fs.readFileSync(path.join(repo, f), 'utf8')]));

for (const [f, t] of founderText) {
  if (!strong(parseNode(t, f))) continue;
  if (!work.has(f)) errors.push(`${f}: L0/L1 node on founder is missing here`);
  else if (work.get(f) !== t) errors.push(`${f}: L0/L1 node differs from founder`);
}
for (const [f, t] of work) {
  if (strong(parseNode(t, f)) && founderText.get(f) !== t && founderText.has(f) === false) errors.push(`${f}: new L0/L1 node not on founder`);
}
if (errors.length) errors.push('no valid ruling can be verified yet: P3 authority row pending (https://github.com/nous-clawds4/infinite-harness/pull/8); failing closed');

if (baseRef) {
  const changed = git('diff', '--name-only', `${baseRef}...HEAD`).split('\n').filter(isNodePath);
  if (changed.length > 5) errors.push(`PR touches ${changed.length} node files; the limit is 5 (RULES.md §4)`);
}

if (errors.length) { for (const e of errors) console.error(`error: ${e}`); console.error(`check-founder-parity: ${errors.length} error(s)`); process.exit(1); }
console.log(`check-founder-parity: ok (L0/L1 nodes match ${founderRef})`);
