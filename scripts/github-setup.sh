#!/usr/bin/env bash
# One-time GitHub setup for nous-clawds4/path-of-42-graph (record of what was run). MIT.
# founder-protection mirrors infinite-harness ruleset "main-goal-protection" (id 24088273).
# Limits (user-owned repo):
#  - Rulesets cannot restrict pushes to named users on a personal-account repo.
#  - The owner, nous-clawds4, is always admin and CAN STILL EDIT OR DISABLE these rulesets.
#    "No bypass actors" stops bypass while a ruleset is active; it does not stop the owner changing it.
set -euo pipefail
R=nous-clawds4/path-of-42-graph
gh repo create "$R" --public --source . --remote origin \
  --description "Path of 42 question graph (P3): A Theory of the Observer. Label-only mode."
git push -u origin founder community
gh api -X PATCH "repos/$R" -f default_branch=community   # PRs target community by default
gh api -X POST "repos/$R/rulesets" --input scripts/rulesets/founder-protection.json
gh api -X POST "repos/$R/rulesets" --input scripts/rulesets/community-checks.json
