---
doc: da2-handoff
updated: 2026-05-19
purpose: single orientation entry point for a fresh session (Cowork).
  Read this first, then the canonical docs it points to.
---

# Deck Arsenal 2 — Handoff

Hand-off after a long build run (Phases 7–11 + dark mode + a master
reference catalogue + several inspector feedback rounds). Work continues
in **Cowork** on three streams (bottom of this doc). Nothing in the
Phase 7–11 work is committed yet — see "Git state".

## 1. Where the project is

The DA1-style pipeline (order → memo → storyboard → compose → finalize)
on the vendored open-slide engine is intact. On top of it, the
**Taikyoku** theme went from "synthesis baseline" to a production
system:

- **Phase 7** — refinement interview (Sessions A/B/C), all approved.
- **Phase 8** — Japanese rendering: HomuraM bundled (3 woff2),
  per-role CJK scale, bilingual primitives; WordmarkLockup/KanjiSeal
  **parked/deferred** (brand mark ships as an image asset).
- **Phase 9** — Tier 1 **component library** (19 components,
  `themes/taikyoku/components/`), gallery, per-deck font subsetting
  (`scripts/da2-subset-fonts.sh`).
- **Phase 10** — integration capstone (seed-pack deck) + the
  `compose-deck`↔library wiring (`COMPOSITION.md`).
- **Dark mode** — productionised via CSS-variable token indirection
  (`--tk-*`, per-slide `TK_LIGHT`/`TK_DARK` wrapper; **never `:root`**).
- **Phase 11** — composition-density: a slide **anatomy + multi-
  component layout grammar** (`COMPOSITION.md §1.5`), agents upgraded,
  master reference rebuilt dense.

Full chronological decision log with rationale + every superseding
reversal: `themes/taikyoku/REFINEMENT.md` (1.9k lines — the source of
truth for *why*; also the #1 compression target, see stream 1).

## 2. Canonical docs (authoritative vs reference)

| Doc | Role | Status |
| --- | --- | --- |
| `CLAUDE.md` | operator manual / rules | **stale below Phase 6.3** — pointer added; treat REFINEMENT/COMPOSITION as live |
| `themes/taikyoku.md` | the theme **contract** (palette, type, motion, tokens, components index, voice, dark) | authoritative; large (1145 ln) |
| `themes/taikyoku/COMPOSITION.md` | the **composition spec** — §1.5 anatomy + grammar; beat→component map; locked doctrine; language; dark wrapper | authoritative |
| `themes/taikyoku/REFINEMENT.md` | the **decision log** (every choice + rationale + supersessions) | authoritative history; bloated |
| `.claude/agents/{memo,storyboard,compose-deck}.md` | pipeline subagents | upgraded for anatomy/density + dark; current |
| `briefs/taikyoku-extensions.md` | the original Phase 7–10 brief | historical (delivered) |
| `themes/taikyoku/components/*.tsx` | the 19 Tier-1 components | authoritative; each header comment is the slot/prop truth |
| `Projects/2026-05-19_taikyoku-master-reference/` | the **visual reference catalogue** (v2, dense) | the current feedback substrate |

Hard locked constraints (do not silently reverse — see REFINEMENT for
the full set): single purple accent + one rationed gold; **no breath /
no ambient motion**; motion vocab `tk-fadeUp/fadeIn/grow/growY/rise/
tk-draw`; Helvetica-Neue caps (not Archivo); Prata display incl. card
titles; mono-language production decks; Title Case headlines;
`var(--tk-*)` tokens; **component library is HOOK-FREE** (React hooks
blanked a deck — count-up is ref-callback + rAF only); count-up is
sanctioned **only** on large metric figures.

## 3. Open threads / risks

- **Git: nothing committed.** All Phase 7–11 work is untracked +
  `CLAUDE.md`/`taikyoku.md`/agents/`da2-finalize.sh` modified. A
  deliberate commit (or commits) is an early Cowork step — decide
  granularity (one "Phase 7–11" commit vs per-phase).
- **Deferred future phases (not started, intentional):**
  `component-from-screenshot` skill; reserved component slot #15 / new
  archetypes; (dark-mode is done).
- **The anatomy/grammar is deck-local.** `Frame · Rail · Band · TwoUp ·
  Structural · Cards · Stat/Insight/LList/Annote` (the support kit) live
  *inside* `Projects/2026-05-19_taikyoku-master-reference/index.tsx`, not
  in the theme. They are the de-facto reference implementation of
  COMPOSITION §1.5 and should be promoted to real theme primitives —
  this is the crux of stream 2.
- **Feedback loop friction:** inspector comments arrive faster than an
  apply-comments sweep; decision-class vs mechanical comments are not
  separated; markers hoist to shared helpers (ambiguous targeting).
  Stream 3.
- **dev server:** `cd engine && pnpm dev` (background) serving at
  `:5173`; decks open via `scripts/da2-open.sh <slug>`.

## 4. Cowork work streams

### Stream 1 — Flatten / compress / clean up

**Goal:** streamline the codebase + docs without losing the decision
trail.

Concrete targets (from the 2026-05-19 inventory):
- **Projects/ has 10 decks; ~8 are throwaway reference/spike/
  validation artifacts** (`smoke`, `da2-tour`, `da2-retrospective`,
  `sleep-hygiene`, `taikyoku-bilingual-ref` (396K — carries subset
  fonts), `taikyoku-dark-spike`, `taikyoku-gallery`,
  `taikyoku-darkmode-check`, `taikyoku-seed-pack`). Only
  `master-reference` is the live substrate. Decide: keep a curated few
  as canonical references, archive/delete the rest (their findings are
  in REFINEMENT).
- **`REFINEMENT.md` is 1.9k lines** — chronological, repetitive,
  full of superseded entries. Compress to: a "current state of
  decisions" section (what holds now) + a thin superseded-history
  appendix. Don't lose the supersession trail (it's load-bearing for
  "don't re-litigate locked calls").
- **`CLAUDE.md` phase status is stale** (Phases 1–6.3 only). Update
  to reflect 7–11 + point to the live docs.
- **14 MB bundled fonts** + duplicated inline component code across
  reference decks (one-file rule). Consider: dedupe strategy, the
  transcribe-not-import reality (COMPOSITION §1), font subsetting as
  the default at finalize.
- **Doc relevance pass:** reconcile any contradictions; ensure
  taikyoku.md ↔ COMPOSITION.md ↔ agents ↔ REFINEMENT agree (they did at
  handoff; verify after compression).

### Stream 2 — Frameworks/subagents for deck composition using anatomy

**Goal:** make the Phase 11 anatomy + grammar a first-class,
reusable framework, not deck-local scaffolding.

Starting points:
- The spec exists: `COMPOSITION.md §1.5` (anatomy: eyebrow · action
  title · primary + ≥2 supporting · source · folio; density floor;
  named layouts `primary-rail`/`primary-band`/`two-up`/`anchored-rail`/
  `dense-grid`; support kit).
- The reference implementation exists, deck-local, in
  `Projects/2026-05-19_taikyoku-master-reference/index.tsx`
  (`Frame/Rail/Band/TwoUp/Structural/Cards/Stat/Insight/LList/Annote` —
  note the recently-fixed rules: zone slots are `display:block` so a
  block component fills the zone; `Structural` for components that own
  their own eyebrow/heading to avoid double chrome; `Frame jp` for
  Japanese slides).
- The agents (`storyboard.md`, `compose-deck.md`) already require
  planning/assembling to the anatomy + density floor.

Likely shape of the work (Cowork to design): promote the layout
primitives + support kit into the theme (e.g.
`themes/taikyoku/layouts/` or documented in taikyoku.md as fixed
components), so `compose-deck` *assembles from a named layout +
components* instead of re-deriving Frame/Rail per deck; possibly a
dedicated **anatomy/compose subagent** that takes a storyboard beat and
emits an anatomy-conformant Page. Reconcile with the one-file/
transcribe-not-import rule (COMPOSITION §1) — decide whether layouts are
transcribed like components or imported.

### Stream 3 — Better iteration & feedback loop

**Goal:** a tighter inspector → apply → verify loop.

Observed problems this run: comments stream faster than a sweep;
mechanical vs decision-class comments aren't triaged (decisions —
e.g. "update brief, allow count-up" — got mixed with "add a card");
markers hoist to shared helpers so targeting is ambiguous; no batching
/ no "this is a brief change, confirm separately" channel; verifying
"renders" (not just "compiles") needed a manual dev-log + runtime
reasoning step (a transform-200 hid a hooks runtime crash).

Directions to explore (Cowork to design): a triage step that splits
inspector comments into *mechanical* (auto-apply) vs *decision/brief-
change* (queue for explicit confirm + REFINEMENT log); a render smoke-
check (not just transform) in the verify step; a convention so markers
land on identifiable slide instances not hoisted helpers; a batched
"feedback round" cadence instead of per-marker chase.

## 5. Quick start for a fresh session

1. Read this file, then `themes/taikyoku/COMPOSITION.md` (§1.5) and
   skim `themes/taikyoku.md` (contract) + the tail of
   `themes/taikyoku/REFINEMENT.md` (latest decisions).
2. `cd engine && pnpm dev` (background) → `scripts/da2-open.sh
   2026-05-19_taikyoku-master-reference` to see the current substrate.
3. Pick a stream above. Honor the locked constraints (§2). Log any
   reversal in REFINEMENT as superseding (don't delete history).
