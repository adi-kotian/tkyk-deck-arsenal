#!/usr/bin/env bash
# da2-cleanup-commits.sh — apply the 2026-05-19 Cowork flatten as 8 granular commits.
#
# Why this script exists:
#   The Cowork sandbox couldn't acquire .git/index.lock (filesystem-mount
#   layer wouldn't allow unlink), so the flatten was done as file changes
#   only. This script lands those changes as 8 commits in the right order.
#
# Usage:
#   ./scripts/da2-cleanup-commits.sh
#
# Safe to re-run: each step checks `git diff --cached --quiet` before
# committing, so a re-run after a successful commit just no-ops that step.
#
# Pre-flight:
#   - Run from DA2 root (or anywhere — the script resolves DA2_ROOT).
#   - Working tree should be the Cowork output (file changes present,
#     no commits yet for the flatten).
#   - If .test-stale-lock exists at DA2 root, it will be removed before
#     the first commit. (A sandbox-test orphan; safe to delete.)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DA2_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$DA2_ROOT"

# ─── sanity ───────────────────────────────────────────────────────────────────
if [[ ! -d .git ]]; then
  echo "✗ Not a git repo (no .git at $DA2_ROOT)" >&2
  exit 1
fi

# Remove stale sandbox orphan if present.
if [[ -f .test-stale-lock ]]; then
  rm -f .test-stale-lock && echo "  cleaned: .test-stale-lock"
fi

# If a stale index.lock survived the sandbox, remove it. (Real git won't
# block our commits if we own the file.)
if [[ -f .git/index.lock ]]; then
  if rm -f .git/index.lock 2>/dev/null; then
    echo "  cleaned: stale .git/index.lock"
  else
    echo "⚠  Could not remove .git/index.lock. If commits below fail with" >&2
    echo "   'Unable to create … index.lock: File exists', remove it" >&2
    echo "   manually: rm -f .git/index.lock" >&2
  fi
fi

# Helper — commit only if there's something staged.
commit_if_staged() {
  local msg="$1"
  if git diff --cached --quiet; then
    echo "  (nothing to commit for: $msg)"
    return 0
  fi
  git commit -m "$msg"
}

echo
echo "── DA2 cleanup commits — 2026-05-19 flatten ──"
echo

# ─── 1. Archive throwaway decks ───────────────────────────────────────────────
echo "[1/8] archive throwaway decks → Projects/_archive/"
# The 9 decks are already moved on disk. Git sees them as deletions
# (at the old paths) + untracked content (at the new path).
git add -A Projects/
commit_if_staged "chore(projects): archive 9 throwaway decks to Projects/_archive/

Master-reference is the sole live deck on the dev server. Smoke /
da2-tour / da2-retrospective / sleep-hygiene / taikyoku-bilingual-ref
/ taikyoku-dark-spike / taikyoku-gallery / taikyoku-darkmode-check /
taikyoku-seed-pack are now under Projects/_archive/<slug>/ and off
the dev-server discovery path (slidesDir globs one level deep).
Their findings live in themes/taikyoku/REFINEMENT.md. Resurrect any
deck by moving it back up to Projects/."

# ─── 2. Root-level / sub-READMEs + engine investigation relocation ────────────
echo "[2/8] relocate ENGINE_INVESTIGATION + refresh sub-READMEs"
git add ENGINE_INVESTIGATION.md 2>/dev/null || true   # the deletion (already moved)
git add briefs/engine-investigation.md \
        themes/README.md \
        themes/taikyoku/README.md \
        Projects/README.md \
        Inbox/README.md \
        engine/apps/demo/open-slide.config.ts
commit_if_staged "chore: relocate ENGINE_INVESTIGATION → briefs/; refresh sub-READMEs

- ENGINE_INVESTIGATION.md is historical Phase-1 docs; moves alongside
  briefs/taikyoku-extensions.md (both useful design history that
  doesn't belong at repo root).
- themes/README.md, themes/taikyoku/README.md, Projects/README.md,
  Inbox/README.md: stripped Phase-1-era 'shipping soon' framing.
- engine config comment updated to point at the new path."

# ─── 3. CLAUDE.md rewrite ─────────────────────────────────────────────────────
echo "[3/8] rewrite CLAUDE.md (phase status + locked constraints + new pointers)"
git add CLAUDE.md
commit_if_staged "docs(CLAUDE): rewrite phase status; add locked constraints; point to HANDOFF

Replaces the stale 'Phase 1–6.3 only' phase status with a Phase 1–11
ladder (incl. dark-mode). Adds a locked-constraints section pulled
from REFINEMENT (gold rule, motion vocab, hook-free invariant,
mono-language production decks, dark wrapper not :root, etc.).
Directory map now lists Projects/_archive/, briefs/, themes/taikyoku/
substructure (COMPOSITION + REFINEMENT + components + assets).
Points new sessions at HANDOFF.md as the entry."

# ─── 4. README.md refresh ─────────────────────────────────────────────────────
echo "[4/8] refresh README.md"
git add README.md
commit_if_staged "docs(README): refresh; point at HANDOFF / CLAUDE / canonical Taikyoku docs

The earlier 'Phase 1 of 5 shipped' framing was months out of date.
Now: current status (Phases 1–11 + dark-mode done), pointers to the
canonical docs (HANDOFF, CLAUDE, taikyoku.md, COMPOSITION.md,
REFINEMENT.md), and a quick-open command for the master-reference
deck."

# ─── 5. REFINEMENT.md restructure ─────────────────────────────────────────────
echo "[5/8] restructure REFINEMENT.md (1953 → 758 lines)"
git add themes/taikyoku/REFINEMENT.md
commit_if_staged "docs(REFINEMENT): restructure as current-state + superseded appendix

Was 1953 lines of chronological log; now 758 lines, organised as:
  §1 Locked constraints — quick index (every rule that holds now,
     with [§N] and [App: …] cross-links)
  §2 Current state by topic (palette · type · motion · components ·
     composition · dark · voice · assets · parked/deferred)
  §3 Appendix — superseded history (every reversal preserved verbatim
     so future operators can see why a rule flipped and not
     re-litigate it)
  §4 Decision provenance (point at git log -p / the pre-flatten
     commit 67a2b80 for chronological detail)

Lossless for locked rules + their supersession trails. Dropped:
chronological narrative that wasn't load-bearing for any current
rule (interim drafts, session-state preambles, 'next: …' handoff
lines now superseded by HANDOFF.md)."

# ─── 6. taikyoku.md + scripts + commands + recipe reconciliation ──────────────
echo "[6/8] reconcile taikyoku.md / scripts / commands / executive-pitch to Phase 11"
git add themes/taikyoku.md \
        scripts/da2-finalize.sh \
        scripts/da2-open.sh \
        scripts/README.md \
        .claude/commands/da2-advance.md \
        recipes/executive-pitch.yaml
commit_if_staged "docs: reconcile taikyoku.md + scripts/commands/recipe to current state

- themes/taikyoku.md: version-header updated (Phase 11 + dark-mode);
  PROVISIONAL/PENDING block trimmed to the still-open gradient
  variants; archive paths updated for da2-retrospective /
  taikyoku-dark-spike / taikyoku-gallery / da2-retrospective
  changelog mention.
- scripts/da2-finalize.sh, da2-open.sh: example slug switched to
  the live deck (2026-05-19_taikyoku-master-reference).
- .claude/commands/da2-advance.md: same.
- recipes/executive-pitch.yaml: removed stale 'subtle breath' and
  'Archivo title' beat-notes; aligned to Phase 8 (breath removed)
  + Phase 7 (Helvetica Neue + Prata card titles) + the locked gold
  doctrine + image-asset convention."

# ─── 7. Add Stream 1/2/3 briefs + this cleanup script ─────────────────────────
echo "[7/8] add stream-1/2/3 briefs + da2-cleanup-commits.sh"
git add briefs/stream-1-font-dedupe.md \
        briefs/stream-2-layout-promotion.md \
        briefs/stream-3-feedback-loop.md \
        scripts/da2-cleanup-commits.sh
commit_if_staged "docs(briefs)+chore(scripts): add stream-1/2/3 briefs + cleanup-commits script

- stream-1-font-dedupe.md: workflow audit + small CC prompt. Confirms
  there's no actual font duplication; documents the three-layer
  workflow (theme source-of-truth · per-deck subset · finalize
  advisory). Optional CC prompt to upgrade the advisory into an
  offer-to-auto-subset.
- stream-2-layout-promotion.md: CC prompt to promote the 10
  master-reference layout primitives (Frame · Rail · Band · TwoUp ·
  Structural · Cards · Stat · Insight · LList · Annote) + 2 new ones
  (AnchoredRail · DenseGrid) into themes/taikyoku/layouts/, migrate
  master-reference to import them, and document the layout-vs-
  component lifecycle asymmetry. Six phases (read → scaffold →
  migrate → docs → verify → commit) with rollback strategy.
- stream-3-feedback-loop.md: design doc for the inspector → apply →
  verify loop. Four proposals (comment-prefix triage / instance-local
  marker anchors / render smoke-check / batched feedback rounds).
  Ship P1 + P3.a first if exactly one round of work goes into this.
- scripts/da2-cleanup-commits.sh: the script that landed these
  commits (self-referencing — its prior runs are this very git log)."

# ─── 8. Refresh HANDOFF.md ────────────────────────────────────────────────────
echo "[8/8] refresh HANDOFF.md (post-flatten state)"
git add HANDOFF.md
commit_if_staged "docs(HANDOFF): refresh after Stream 1 flatten; Streams 2/3 prompts staged

Stream 1 (flatten) is DONE — see commits 1–7 above. Stream 2 (layout
primitive promotion) has a complete CC prompt staged at
briefs/stream-2-layout-promotion.md. Stream 3 (feedback loop) has a
design at briefs/stream-3-feedback-loop.md.

Updates: 'where the project is' now reflects archived decks /
compressed REFINEMENT / refreshed CLAUDE. Canonical-docs table
includes the new briefs. Stream-status section breaks the three
streams into: DONE (Stream 1) / prompt-staged (Stream 2) /
design-ready (Stream 3). Quick-start steps now: read this → run
da2-cleanup-commits.sh (this script's whole job, after the fact) →
pick a stream."

# ─── done ─────────────────────────────────────────────────────────────────────
echo
echo "── done ──"
echo "8 commits applied (or skipped where already committed)."
echo
echo "Git log of the flatten:"
git log --oneline -n 10
