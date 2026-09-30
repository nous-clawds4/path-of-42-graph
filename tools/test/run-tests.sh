#!/usr/bin/env bash
# Local tests for the P3 checks: the real tree must pass; tampered trees must fail. MIT.
set -u
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
TOOLS="$REPO/tools"
pass=0; fail=0
ok()   { echo "PASS: $1"; pass=$((pass+1)); }
bad()  { echo "FAIL: $1"; fail=$((fail+1)); }
checks() { # $1 = dir; runs every CI check; returns non-zero if any fails
  local d="$1" rc=0
  node "$TOOLS/vendor/build.mjs" --in "$d/question-graph" --out "$(mktemp)" --strict >/dev/null 2>&1 || rc=1
  node "$TOOLS/check-graph.mjs" --repo "$d" >/dev/null 2>&1 || rc=1
  node "$TOOLS/check-founder-parity.mjs" --repo "$d" --founder-ref founder --base-ref founder >/dev/null 2>&1 || rc=1
  return $rc
}
scratch() { # fresh clone with a local 'founder' branch
  local d; d="$(mktemp -d)"; git clone -q "$REPO" "$d/r"; git -C "$d/r" branch -q founder origin/founder 2>/dev/null || true
  git -C "$d/r" checkout -q -B pr origin/community 2>/dev/null || git -C "$d/r" checkout -q -B pr
  echo "$d/r"
}
commit() { git -C "$1" -c user.name=t -c user.email=t@t add -A && git -C "$1" -c user.name=t -c user.email=t@t commit -qm test; }

# Positive: the tree as committed.
d=$(scratch); if checks "$d"; then ok "committed tree passes all checks"; else bad "committed tree should pass"; fi

# Negative 1: tampered founder text (one character appended to the body).
d=$(scratch); printf 'x' >> "$d/question-graph/root-theory-of-the-observer.md"; commit "$d"
if node "$TOOLS/check-graph.mjs" --repo "$d" >/dev/null 2>&1; then bad "tampered root should fail the hash check"; else ok "tampered root fails the hash check"; fi

# Negative 2: L0 edit that keeps the body hash (title changed) must fail parity with founder.
d=$(scratch); sed -i 's/^title: A Theory of the Observer$/title: A Theory of Observers/' "$d/question-graph/root-theory-of-the-observer.md"; commit "$d"
if node "$TOOLS/check-founder-parity.mjs" --repo "$d" --founder-ref founder >/dev/null 2>&1; then bad "L0 edit should fail parity"; else ok "L0 edit fails the founder-parity check"; fi

# Negative 3: hold cap (L1 answer under an L3 question).
d=$(scratch)
printf 'id: q-test\ntype: question\ntitle: Test question\nparents: [root-theory-of-the-observer]\nhold: L3\n' > "$d/question-graph/q-test.yaml"
printf 'id: a-test\ntype: answer\ntitle: Test answer\nparents: [q-test]\nstatus: open\nhold: L1\ntag: method\nrationale: test\nq: 0.8\na: 0.8\n' > "$d/question-graph/a-test.yaml"; commit "$d"
if node "$TOOLS/check-graph.mjs" --repo "$d" >/dev/null 2>&1; then bad "hold-cap violation should fail"; else ok "hold-cap violation fails"; fi

# Negative 4: rejected answer without reopen_if.
d=$(scratch)
printf 'id: q-test\ntype: question\ntitle: Test question\nparents: [root-theory-of-the-observer]\nhold: L3\n' > "$d/question-graph/q-test.yaml"
printf 'id: a-test\ntype: answer\ntitle: Test answer\nparents: [q-test]\nstatus: rejected\nhold: L3\ntag: method\nrationale: test\nq: 0.8\na: 0.5\n' > "$d/question-graph/a-test.yaml"; commit "$d"
if node "$TOOLS/check-graph.mjs" --repo "$d" >/dev/null 2>&1; then bad "rejected without reopen_if should fail"; else ok "rejected without reopen_if fails"; fi

# Positive 2: a well-formed L3 child passes graph checks and parity.
d=$(scratch)
printf 'id: q-test\ntype: question\ntitle: Test question\nparents: [root-theory-of-the-observer]\nhold: L3\n' > "$d/question-graph/q-test.yaml"; commit "$d"
if checks "$d"; then ok "well-formed L3 child passes"; else bad "well-formed L3 child should pass"; fi

echo "tests: $pass passed, $fail failed"; [ "$fail" -eq 0 ]
