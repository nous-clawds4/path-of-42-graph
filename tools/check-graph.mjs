#!/usr/bin/env node
// P3 graph checks (RULES.md §0, §4, §7): founder hash, hold levels and hold cap,
// required fields on answers, reopen_if on rejections. MIT (see LICENSE-CODE).
//   node tools/check-graph.mjs --repo <dir>
import fs from 'node:fs';
import path from 'node:path';
import { LEVELS, sha256, splitMd, parseNode, walkNodes, arg } from './lib.mjs';

const repo = arg('--repo', '.');
const errors = [];
const err = (m) => errors.push(m);

// 1. Founder node: pinned hash, L0 root.
const pin = JSON.parse(fs.readFileSync(path.join(repo, 'p42/founder.json'), 'utf8'));
const rootPath = path.join(repo, pin.file);
if (!fs.existsSync(rootPath)) err(`founder: ${pin.file} is missing`);
else {
  const s = splitMd(fs.readFileSync(rootPath, 'utf8'));
  if (!s) err(`founder: ${pin.file} has no frontmatter`);
  else {
    const h = sha256(s.body);
    if (h !== pin.body_sha256) err(`founder: body hash ${h} != pinned ${pin.body_sha256} (the founder text is verbatim and L0; changes need David's signed ruling)`);
    if (s.data.body_sha256 !== pin.body_sha256) err('founder: frontmatter body_sha256 differs from p42/founder.json');
    if (s.data.id !== pin.id) err(`founder: id must be ${pin.id}`);
    if (s.data.hold !== 'L0') err('founder: hold must be L0');
    if (!Array.isArray(s.data.parents) || s.data.parents.length) err('founder: parents must be []');
    if (s.data.status !== 'accepted' || s.data.type !== 'answer') err('founder: must be an accepted answer node');
  }
}

// 2. All nodes.
const nodes = new Map();
for (const rel of walkNodes(repo)) {
  const d = parseNode(fs.readFileSync(path.join(repo, rel), 'utf8'), rel);
  if (d && d.id) nodes.set(String(d.id), { ...d, _file: rel });
}
const lvl = (n) => LEVELS.indexOf(n.hold);
for (const n of nodes.values()) {
  const id = n.id, parents = Array.isArray(n.parents) ? n.parents : [];
  if (lvl(n) < 0) err(`${id}: hold must be one of ${LEVELS.join('|')} (got ${JSON.stringify(n.hold)})`);
  if (!parents.length && id !== pin.id) err(`${id}: only the founder node may be a root`);
  // Hold cap: never held more strongly (lower L-number) than the weakest parent (path-of-42 §2).
  for (const p of parents) {
    const pn = nodes.get(String(p));
    if (pn && lvl(pn) >= 0 && lvl(n) >= 0 && lvl(n) < lvl(pn)) err(`${id}: hold ${n.hold} is stronger than parent ${p} (${pn.hold}); a child is capped by its weakest parent`);
  }
  if (n.type === 'answer' && parents.length) {
    for (const f of ['tag', 'rationale']) if (!n[f]) err(`${id}: answer needs ${f} (RULES.md §7)`);
    for (const f of ['q', 'a']) if (n[f] == null) err(`${id}: answer needs ${f} (RULES.md §7)`);
  }
  if (n.status === 'rejected') {
    if (!n.rationale) err(`${id}: rejected answer needs rationale (path-of-42 §3)`);
    if (!n.reopen_if) err(`${id}: rejected answer needs reopen_if (path-of-42 §3)`);
  }
}

if (errors.length) { for (const e of errors) console.error(`error: ${e}`); console.error(`check-graph: ${errors.length} error(s)`); process.exit(1); }
console.log(`check-graph: ok (${nodes.size} node(s); founder hash ${pin.body_sha256.slice(0, 12)}…)`);
