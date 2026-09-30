// Shared helpers for P3 checks. MIT (see LICENSE-CODE).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import yaml from 'js-yaml';

export const LEVELS = ['L0', 'L1', 'L2', 'L3', 'L4'];
export const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

// Split a node file into frontmatter data and the exact body bytes after the closing '---\n'.
export function splitMd(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---\n', 3);
  if (end < 0) return null;
  return { data: yaml.load(text.slice(4, end)) || {}, body: text.slice(end + 5) };
}

export function parseNode(text, file) {
  if (/\.(md|markdown)$/i.test(file)) { const s = splitMd(text); return s ? s.data : null; }
  const d = yaml.load(text);
  return d && typeof d === 'object' && d.id ? d : null;
}

// Node files under question-graph/, excluding graph metadata and paper versions.
export function isNodePath(p) {
  return p.startsWith('question-graph/') && /\.(ya?ml|md|markdown)$/i.test(p)
    && !p.startsWith('question-graph/versions/') && !/\/_?graph\.ya?ml$/i.test(p);
}

export function walkNodes(repo) {
  const out = [];
  const rec = (dir) => {
    for (const e of fs.readdirSync(path.join(repo, dir), { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      const rel = path.posix.join(dir, e.name);
      if (e.isDirectory()) rec(rel); else if (isNodePath(rel)) out.push(rel);
    }
  };
  rec('question-graph');
  return out.sort();
}

export function arg(name, def = null) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : def;
}
