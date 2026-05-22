---
doc: da2-handoff
updated: 2026-05-19 (post-flatten)
purpose: single orientation entry point for a fresh session.
  Read this first, then the canonical docs it points to.
---

# Deck Arsenal 2 — Handoff

The brief's four-phase arc (Phase 7 refinement · Phase 8 Japanese ·
Phase 9 library · Phase 10 integration) is complete. Phase 11 added
composition-density (slide anatomy + multi-component layout grammar).
Dark mode is productionised via CSS-variable token indirection. As of
2026-05-19 a **Cowork flatten pass** consolidated docs, archived
throwaway decks, and staged prompts for the next two improvements
(Streams 2 & 3, below).

## 1. Where the project is

The DA1-style pipeline (order → memo → storyboard → compose →
finalize) on the vendored open-slide engine works end-to-end. The
**Taikyoku** theme is a production system:

- **19-component Tier 1 library** at `themes/taikyoku/components/`
  (Phase 9). Each hook-free, self-contained, variant + density per
  archetype.
- **Slide anatomy + named layouts** at `themes/taikyoku/COMPOSITION.md`
  §1.5 (Phase 11). Every content slide carries chrome + action title +
  primary + ≥2 supporting + source + folio; fills ≈85–90% of the
  canvas; lone centred components forbidden.
- **Per-deck light/dark** via `var(--tk-*)` token indirection
  (productionised 2026-05-19). Mode lives on a per-slide wrapper —
  never `:root`. Components keep light hex as the fallback so
  portability + standalone rendering survive.
- **Per-deck JP font subsetting** via `scripts/da2-subset-fonts.sh`
  (~97% reduction proven on the bilingual reference deck).

The live deck (the substrate for the next refinement round) is
**`Projects/2026-05-19_taikyoku-master-reference/`** — open with
`./scripts/da2-open.sh 2026-05-19_taikyoku-master-reference`. Every
other deck is archived at `Projects/_archive/<slug>/` and off the
dev-server's discovery path.

## 2. Canonical docs

| Doc | Role | Notes |
| --- | --- | --- |
| `CLAUDE.md` | operator manual, directory map, phase ladder, locked Taikyoku constraints, slash commands, subagents, skills | refreshed 2026-05-19 |
| `README.md` | one-screen overview for someone who's never seen DA2 | refreshed 2026-05-19 |
| `themes/taikyoku.md` | the theme **contract** — palette, type, motion, tokens, fixed components, gold rule, dark variant, voice, image-asset convention | Phase 11 reconciled (1145 lines) |
| `themes/taikyoku/COMPOSITION.md` | the **composition spec** — §1.5 = anatomy + density floor + named layouts + support kit; beat → component map; locked doctrine; mono-language model; image-asset / font-subsetting at finalize | authoritative (266 lines) |
| `themes/taikyoku/REFINEMENT.md` | the **decision log** — current state on top, superseded history in appendix | restructured 2026-05-19 (1953 → 758 lines, lossless for locked rules + supersession trails) |
| `.claude/agents/{memo,storyboard,compose-deck}.md` | pipeline subagents — current, anatomy/density + dark-aware | |
| `briefs/taikyoku-extensions.md` | the original Phase 7–10 brief | historical, delivered |
| `briefs/engine-investigation.md` | Phase 1 slidesDir/themesDir analysis | historical, technically still correct |
| `briefs/stream-1-font-dedupe.md` | font workflow audit + small CC prompt (no real duplication exists) | new 2026-05-19 |
| `briefs/stream-2-layout-promotion.md` | **CC prompt** — promote layout primitives into the theme | new 2026-05-19 (Stream 2 staged) |
| `briefs/stream-3-feedback-loop.md` | design doc — inspector-comment triage, render smoke-check, marker convention | new 2026-05-19 (Stream 3 design) |
| `briefs/stream-4-blueprint-stage.md` | **CC prompt** — new pipeline stage between storyboard and compose: per-beat content-grid blueprints + per-beat approval + companion wireframe deck | new 2026-05-19 (Stream 4 staged) |
| `themes/taikyoku/components/*.tsx` | 19 Tier-1 components | header comment per file is the slot/prop truth |
| `Projects/2026-05-19_taikyoku-master-reference/` | the **visual reference catalogue** (v2 — dense composition) | only live deck |

## 3. Locked Taikyoku constraints

The condensed set (full detail: `CLAUDE.md` § "Locked Taikyoku
constraints" + `REFINEMENT.md` §1):

- Single purple accent; **gold rationed to one moment per deck**
  (deck-level assignment, never auto-claimed).
- Three reds, disjoint roles: `accent-negative` (data-negative +
  blocked step), `brand-red` (reserved, unused — KanjiSeal deferred),
  decorative stays purple.
- Motion vocabulary: `tk-fadeUp · tk-fadeIn · tk-grow · tk-growY ·
  tk-rise · tk-draw`. **No breath / no ambient motion.** Uniform
  cross-fade page transition. Total settle ≤1.6 s per page.
- **Count-up sanctioned on large metric figures only** (headline-
  metric + quarterly-metrics hero-lead). **HOOK-FREE — mandatory**
  (ref-callback + rAF; no React hooks anywhere in the library).
- Caps face = Helvetica Neue (Inter fallback) — **not Archivo**. Prata
  display + card titles + plotted-item labels. Prata-italic =
  person/attribution roles + card role-kicker only. JP: HomuraM
  display + Noto Sans JP body.
- Headlines & page headings = Title Case; eyebrow/folio = tracked
  CAPS; body = sentence case.
- Production decks are **mono-language**. References / galleries: EN
  then JP on **separate** consecutive slides.
- Dark = per-deck, mono-mode, scoped to a per-slide wrapper. Components
  use `var(--tk-NAME, <light-hex>)` so standalone rendering works.
- compose-deck **transcribes** components into the deck's one-file
  `index.tsx` (specialised to variant/density). Library bug-fixes do
  NOT auto-propagate. Layouts (if promoted via Stream 2) would
  **import** — different lifecycle.

## 4. Stream status (Cowork work streams)

### Stream 1 — Flatten / compress / clean up — **DONE 2026-05-19**

What landed:
- **9 throwaway decks archived** to `Projects/_archive/<slug>/`. Off
  the dev server. README in archive explains what's where, why, and
  how to resurrect. Only `master-reference` is the live deck.
- **`REFINEMENT.md` restructured**: 1953 → 758 lines (61% reduction).
  Top = locked-constraints index + current state by topic. Appendix =
  every superseded entry preserved verbatim. Decision provenance
  available via `git log -p` on the pre-flatten commit `67a2b80`.
- **`CLAUDE.md` rewritten**: stale Phase 1–6.3 status section replaced
  with a Phase 1–11 ladder, locked-constraints summary, current
  directory map (incl. archive + layouts placeholder), and pointer
  to HANDOFF as the fresh-session entry.
- **`README.md` refreshed**: phase-1-of-5 framing gone; current
  status, canonical docs, master-reference quick-open.
- **`ENGINE_INVESTIGATION.md` relocated** to
  `briefs/engine-investigation.md` (alongside `taikyoku-extensions.md`
  — both historical-but-useful design docs). Config comment updated.
- **Sub-READMEs refreshed**: `themes/`, `themes/taikyoku/`,
  `Projects/`, `Inbox/` — all stripped of Phase-1-era "shipping soon"
  framing.
- **`executive-pitch.yaml` recipe updated**: removed stale "subtle
  breath" + "Archivo title" references; aligned to the locked Phase 11
  doctrine.
- **Archive-path references swept**: `taikyoku.md` references to
  `da2-retrospective` / `taikyoku-dark-spike` / `taikyoku-gallery`
  point at `Projects/_archive/...`. Script + command examples
  switched to `2026-05-19_taikyoku-master-reference`.
- **Doc reconciliation pass**: `taikyoku.md` ↔ `COMPOSITION.md` ↔
  `REFINEMENT.md` ↔ agents — verified no contradictions on locked
  rules.

What did NOT land here:
- **Granular commits** — the Cowork sandbox couldn't run `git commit`
  (filesystem-mount layer wouldn't let it acquire `.git/index.lock`).
  All file changes are staged on disk; commits are queued in
  `scripts/da2-cleanup-commits.sh` for the user to run locally. **One
  user-facing step before continuing**: run that script (8 granular
  commits) so the flatten enters git history.
- **`.test-stale-lock`** (empty file at repo root from a sandbox test)
  needs deletion (the same lock issue blocks it). `git clean -fdx` or
  `rm -f .test-stale-lock` outside the sandbox.

### Stream 2 — Promote layout primitives into the theme — **DONE 2026-05-22**

The 10 layout primitives from master-reference + 2 new ones
(`AnchoredRail · DenseGrid`) landed at `themes/taikyoku/layouts/`.
Master-reference now `import`s them and is ~100 lines lighter (429 →
331). All four contracts (taikyoku.md / COMPOSITION.md / compose-deck
agent / REFINEMENT.md) document the asymmetry: **layouts are imported
(stable infrastructure); components remain transcribed (per-deck
specialisation, frozen-with-deck)**. REFINEMENT.md §3 has a Phase-12
appendix entry.

**Branch / commits (now on `main`):**
- `8cab174` `feat(layouts): scaffold themes/taikyoku/layouts/ with 11 primitives`
- `9ffaded` `refactor(master-reference): import layouts from theme`
- `d6b02e5` `docs: document layouts in taikyoku.md / COMPOSITION.md / compose-deck / REFINEMENT.md`

**Brief (historical reference):** `briefs/stream-2-layout-promotion.md`.

### Stream 4 — Blueprint stage (new pipeline layer between storyboard and compose) — **DONE 2026-05-22**

A new pipeline stage between `storyboard` and `compose` produces a
per-beat structural blueprint of each slide's content area; gates
compose-deck behind per-beat blueprint approval. After this lands the
empty-slide failure mode moves from "spotted at render time" to
"spotted at blueprint review, before any composition." What's now in
the repo:

- **New subagent `.claude/agents/blueprint.md`** — reads memo +
  storyboard + theme + COMPOSITION.md + each component's header
  comment; writes `Projects/<slug>/blueprint.yaml` + a deterministic
  wireframe deck at `Projects/<slug>-blueprint/index.tsx`. Validates
  grid coverage, refuses on failure, supports per-beat approval.
- **Storyboard contract rewritten (D2).** `.claude/agents/storyboard.md`
  + `Templates/STORYBOARD.yaml` drop `primary` / `supporting` /
  `layout`. Per-beat shape is now `key_message` + `action_title` +
  `sub` + `source` + `facts[]` + `quotes[]` + `notes` — content only.
  Hard rule 7 reverses: storyboard MUST NOT declare components,
  layouts, or grids.
- **compose-deck reads blueprint as structural truth (D9).** Input #7
  is the approved blueprint. New "Phase 13 — Blueprint-driven
  composition" section in `.claude/agents/compose-deck.md`. Refusal
  conditions extended (missing / draft / stale blueprint,
  content-summary unmatched).
- **`/da2-advance` state machine extended (D10).** Two new rows for
  blueprint draft + approved; full approval-phrase detection for
  `approve blueprint <id>` / `approve blueprint all` /
  `revise blueprint <id>: …`.
- **ContentArea theme primitive (D4).** `themes/taikyoku.md` "Content
  Area" section: locked geometry `1720 × 720`, action-title clamp 2
  lines, source-strip 40 px. CLAUDE.md "Locked Taikyoku constraints"
  gains the ContentArea bullet.
- **COMPOSITION.md §1.5** cross-links each named layout to its
  blueprint grid (`primary-rail` → `Rail.tsx` · grid 12×6: primary
  col 1..7 · rail col 8..12). New "two surfaces" paragraph
  distinguishes the named-layout vocabulary from the blueprint
  instantiations.
- **Phase-I verification artifacts** — `Projects/2026-05-19_taikyoku-
  master-reference/blueprint.yaml` (manually constructed; 4 beats
  covering 3 layout presets, one beat APPROVED to demo the badge
  flip) + the companion wireframe deck at
  `Projects/2026-05-19_taikyoku-master-reference-blueprint/`. HTTP
  200, no transform errors. Note: `storyboard_version: 0` marks
  this as a manual blueprint (master-reference has no upstream
  storyboard).

**Brief (historical reference):** `briefs/stream-4-blueprint-stage.md`.

**Stream 3 remains:** the inspector-feedback loop polish. Briefs at
`briefs/stream-3-feedback-loop.md` — design ready, no implementation
yet.

### Stream 3 — Tighter inspector → apply → verify loop — **design ready**

Four proposed conventions / one tiny tool, addressing the Phase-11
feedback frictions:

- **P1** comment-prefix triage (`fix:` / `decide:` / `brief:` /
  `ask:`) — biggest single win, eliminates doctrine-comments slipping
  through the slide-edit sweep.
- **P2** instance-local marker anchors (`data-anchor="slide-05/cards"`)
  — kills the hoist-to-helper ambiguity.
- **P3** render smoke-check in verify (a. dev-server log poll, b.
  headless render, c. visual diff) — catches the count-up class of
  runtime regressions.
- **P4** batched feedback rounds (`begin sweep` keyword) — collapses
  the comments-stream-faster-than-sweep race.

Design only — `briefs/stream-3-feedback-loop.md`. P1 + P3.a are the
recommended "ship first" pair if exactly one round of work goes into
this; P2 + P4 are quality-of-life.

## 5. Quick start for a fresh session

1. Read this file end-to-end (you're here).
2. **First action:** run `./scripts/da2-cleanup-commits.sh` to commit
   the staged flatten work (8 commits in granular order). Then
   `rm .test-stale-lock` for tidiness.
3. Pick a stream. If continuing the build arc: Stream 2 is the next
   highest-value piece (promotes the anatomy to first-class theme
   infrastructure, makes future agent/compose work easier).
4. Read `themes/taikyoku/COMPOSITION.md` §1.5 + skim `taikyoku.md` +
   the tail of `REFINEMENT.md` if context matters.
5. `cd engine && pnpm dev` (background) → open the master-reference
   to see the live substrate.
6. Honor the locked constraints (§3 above + `CLAUDE.md`'s expanded
   version). Log any reversal in `REFINEMENT.md` as a superseded
   entry in the appendix — don't delete history.

## 6. Open future work (none of this is in flight)

- `component-from-screenshot` skill (deferred since Phase 9).
- Reserved component slot #15 / new archetypes (no gap surfaced
  during Phase 9; opportunistic).
- The two unspecified gradient variants (`earth`, `warm-energy`) —
  taikyoku.md still says PENDING.
