# Deck Arsenal 2 — operator manual

> **Fresh session?** Start at `HANDOFF.md` for the latest state-of-the-
> work and the live work streams. This file is the durable operator
> manual; HANDOFF is the per-session snapshot.

DA2 produces decks (and minutes, and one-pagers) from a single
canonical context document called the memo. open-slide is the
rendering engine — it lives vendored under `engine/`. The workflow on
top (order → memo → storyboard → compose → finalize) is DA2's
contribution.

DA1 (the production pipeline at the same level of the filesystem) is
preserved and untouched. Do not modify it from this folder.

## Directory map

```
engine/                          Vendored open-slide. Pinned via engine/VERSION.
  apps/demo/open-slide.config.ts ← the one engine file DA2 modifies (slidesDir / themesDir).
  packages/                       open-slide framework source. Read-only reference.

CLAUDE.md                        this file — operator manual.
HANDOFF.md                       fresh-session entry point. State of the project NOW.
README.md                        one-screen overview for someone who's never seen DA2.

Templates/                       Blank schemas to copy when starting work.
  ORDER.md · MEMO.md · STORYBOARD.yaml

Inbox/                           Drop filled ORDER.md here; /da2-new picks them up.

recipes/                         Reusable storyboard templates (one .yaml each).
                                 Shipped: pitch-classic · explainer · executive-pitch.

Projects/<YYYY-MM-DD_slug>/      One folder per live deck. Flat files, git = version log.
  order.md · memo.md · storyboard.yaml · index.tsx
  assets/ · sources/ · artifacts/ · exports/ · log.md
Projects/_archive/<slug>/        Historical / one-off / spike decks (Phases 2–11). Off
                                 the dev server (slidesDir globs one level deep).

themes/                          Per-theme markdown. Discovered by open-slide.
  taikyoku.md                    THE THEME CONTRACT (authoritative).
  taikyoku.demo.tsx              frozen Phase-6.1 baseline deck.
  taikyoku.gallery.tsx           Phase-9 component gallery (33 pages, all variants).
  taikyoku/
    COMPOSITION.md               THE COMPOSITION SPEC — how compose-deck assembles
                                 decks from the library (§1.5 = slide anatomy +
                                 density floor + named layouts).
    REFINEMENT.md                decision log (current state + superseded appendix).
    components/                  19 Tier-1 components (.tsx, one per archetype).
    assets/fonts/                bundled HomuraM ×3 (~14 MB source-of-truth).
    assets/logos/                TKYK brand mark (dark/white).

briefs/                          Historical & forward-looking design docs.
  taikyoku-extensions.md         the original Phase 7–10 brief (delivered).
  engine-investigation.md        Phase-1 slidesDir/themesDir analysis.
  stream-1-font-dedupe.md        Stream-1 prompt: dedupe font payloads.
  stream-2-layout-promotion.md   Stream-2 prompt: promote layout primitives.
  stream-3-feedback-loop.md      Stream-3 design: inspector-comment triage.

scripts/                         Operational scripts.
  da2-open.sh                    open /s/<slug> in the dev server.
  da2-finalize.sh                move ~/Downloads exports into Projects/<slug>/exports/.
  da2-subset-fonts.sh            per-deck HomuraM subset (~97% reduction).
  sync-engine.sh                 upgrade engine to a new pinned tag.
  da2-cleanup-commits.sh         (one-off) commit the recent flatten in granular steps.

.claude/agents/                  memo · storyboard · compose-deck (subagents).
.claude/commands/                da2-new · da2-advance · da2-finalize (slash commands).
.claude/skills/                  memo-to-minutes · memo-to-one-pager (Phase-5 skills).
```

## Workflow

1. **Order** — user fills `Templates/ORDER.md` and drops it in `Inbox/`,
   or invokes `/da2-new` and answers questions inline.
2. **Memo** — `memo` subagent reads order + sources, drafts `memo.md`.
   **Pauses for `approve memo`.** Memo is universal context — feeds
   deck, minutes, one-pager.
3. **Storyboard** — `storyboard` subagent reads approved memo + chosen
   recipe, drafts `storyboard.yaml`. **Content only** (Stream 4 / D2):
   per beat = `key_message` + `action_title` + `sub` + `source` +
   `facts[]` + `quotes[]` + `notes`. No component or layout picks —
   those live in blueprint. **Pauses for `approve storyboard`.**
4. **Blueprint** — `blueprint` subagent reads approved storyboard +
   COMPOSITION.md, drafts `blueprint.yaml` (per-beat grid + shadows)
   AND a companion wireframe deck at `Projects/<slug>-blueprint/`
   served at `/s/<slug>-blueprint`. **Per-beat approval:**
   `approve blueprint <beat-id>` / `approve blueprint all` /
   `revise blueprint <beat-id>: …`. compose-deck is gated behind
   top-level `status: approved`.
5. **Compose** — `compose-deck` subagent reads memo + storyboard +
   blueprint + theme + COMPOSITION.md + the engine's `slide-authoring`
   skill. Writes one file: `Projects/<slug>/index.tsx`. Executes the
   blueprint: each shadow's grid cell renders the named component
   with content drawn from the storyboard's facts/quotes/notes.
   Refuses if any shadow's content can't be matched. Transcribes
   library components into the one-file deck (COMPOSITION.md §1 —
   transcribe-not-import).
6. **Edit** — entirely in open-slide. Inspector clicks → comments →
   "apply comments" → the engine's `apply-comments` skill sweeps them.
7. **Finalize** — `/da2-finalize` runs open-slide's HTML + PDF export
   (browser-side), `scripts/da2-finalize.sh` lands files in
   `Projects/<slug>/exports/`. JP decks: run
   `scripts/da2-subset-fonts.sh <slug>` first (the finalize script
   advises if the deck still imports the shared 14 MB theme fonts).

Approvals are explicit. No auto-advance.

## Universal memo

The memo feeds three artifacts via three different skills:

- **Deck** (`compose-deck`) — thesis, key points, tone, sources, plus
  the `deck:` block (preferred_recipe, preferred_theme,
  density_override).
- **Minutes** (`memo-to-minutes`) — thesis, key points, open questions,
  sources → `artifacts/minutes.md`.
- **One-pager** (`memo-to-one-pager`) — pitch, thesis, key points →
  `artifacts/one-pager.md`.

The memo never bakes in artifact-specific shape. It stores project
context; each artifact transforms it.

## Recipes

A recipe at `recipes/<name>.yaml` defines a reusable beat sequence
(purpose × density per beat, with notes). Storyboards reference one
recipe by name; the storyboard's `content:` block fills each beat to
the anatomy. The composer merges structure (recipe) + content
(storyboard) + theme (taikyoku.md + COMPOSITION.md) at compose time.
Recipes are immutable per project — past decks are frozen in git.

| Recipe | Shape |
| --- | --- |
| `pitch-classic` | cover → problem → solution → demo → validation → ask |
| `explainer` | cover → value → workflow → architecture |
| `executive-pitch` | cover → section → value → workflow → architecture → closing (default_theme: taikyoku) |

Add a recipe when **three projects organically converge** on the same
beat sequence — not before.

## Taikyoku theme — authoritative docs

Three files own the theme. Read them in this order when working on
Taikyoku:

1. **`themes/taikyoku.md`** — the **contract** (palette · type · motion ·
   tokens · components index · voice · dark variant). Largest of the
   three; the implementable truth.
2. **`themes/taikyoku/COMPOSITION.md`** — the **composition spec**.
   §1.5 = slide anatomy + density floor + named layouts
   (`primary-rail` · `primary-band` · `two-up` · `anchored-rail` ·
   `dense-grid`) + the support kit (`stat-callout` · `insight` ·
   `labelled-list` · `annotation` · `mini-source`). compose-deck reads
   this whenever theme = taikyoku.
3. **`themes/taikyoku/REFINEMENT.md`** — the **decision log**. Top: the
   current state (every locked rule). Bottom: the superseded-history
   appendix (load-bearing — proves we won't re-litigate the
   reversals).

## Locked Taikyoku constraints (don't silently reverse)

These are the rules `compose-deck` enforces. Listed here so an
operator sees them without reading three docs.

- **Palette** — single purple accent `#7030A0`. One **rationed gold**
  `#FFE1A4` moment per deck (deck-level assignment; `closing`
  defaults `goldMoment: false`). Three reds with non-overlapping
  roles: `accent-negative #9B2226` (data-negative + blocked step),
  `brand-red #C00000` (reserved, unused — KanjiSeal deferred),
  decorative accent stays purple. Never substitute one red for
  another.
- **Type** — Prata display (incl. card titles + plotted-item labels).
  Helvetica Neue tracked caps (Inter fallback) for eyebrow/folio —
  **not Archivo**. Prata-italic for person-attribution roles + card
  role-kicker only. Cinzel = the (parked) WordmarkLockup only.
  HomuraM display + Noto Sans JP body for Japanese.
- **Motion** — vocabulary is exactly `tk-fadeUp · tk-fadeIn · tk-grow ·
  tk-growY · tk-rise · tk-draw`. **No `tk-breath`. No ambient/looping
  motion.** Page transition is one uniform ~300–400 ms cross-fade.
  Total per-page settle ≤1.6 s; at most one long motion (`tk-draw`,
  structural strokes only).
- **Count-up** — sanctioned on **large metric figures only**
  (`headline-metric` value + `quarterly-metrics` hero-lead). **HOOK-
  FREE — mandatory.** Implemented via ref-callback + rAF; honours
  `prefers-reduced-motion`; tabular-nums.
- **Casing** — headlines & page headings = Title Case. Eyebrow / folio
  = tracked CAPS. Body = sentence case.
- **Language** — production decks are **mono-language** (all-EN or
  all-JP, limited relevant cross-language allowed). No same-slide
  bilingual mirror. References/galleries: EN then JP on **separate**
  consecutive slides.
- **Light / dark** — per-deck, mono-mode. Components reference
  `var(--tk-*, <light-hex>)`. **Scope mode vars to a per-slide wrapper,
  NEVER `:root`** (`:root` leaks globally — confirmed bug). Declare
  `TK_LIGHT` / `TK_DARK` objects, wrap every Page's content. Light
  deck = `TK_LIGHT`; dark deck = `TK_DARK`.
- **Components** — the 19 Tier-1 components live at
  `themes/taikyoku/components/`. Each is **hook-free** (no `react`
  import); each redeclares its own `c` (tokens) and `f` (fonts) inline
  for portability. compose-deck **transcribes** them into the deck's
  one-file `index.tsx`, specialised to the chosen variant/density
  (not `import`ed — see COMPOSITION.md §1).
- **Slide anatomy** — every content slide has all five: eyebrow strip,
  action title (the so-what), body (primary + ≥2 supporting), source/
  method line, folio. Fills ≈85–90% of the canvas. A lone centred
  component is the empty-slide bug — **forbidden**.
- **Content Area (Stream 4)** — the body region between action title
  and source strip is a locked-geometry `1720 × 720` rectangle,
  absolute across slides. Blueprint shadows declare grid placement
  inside this rectangle; the action title clamps to 2 lines; the
  source strip is always 40 px tall. See `themes/taikyoku.md`
  "Content Area" + `Projects/<slug>/blueprint.yaml`.

## Rules

1. **Don't edit `engine/` except `apps/demo/open-slide.config.ts`.**
   Every other file in `engine/` is part of the vendored snapshot.
   Upgrades go through `scripts/sync-engine.sh`.
2. **Filesystem is the state machine.** `memo.md` exists ⇒ memo
   drafted. `storyboard.yaml` exists ⇒ storyboarded. `index.tsx`
   exists ⇒ composed. `exports/deck.pdf` exists ⇒ finalized. No
   status file.
3. **Approval is explicit user input.** Never infer from silence.
4. **One canonical document per role per project.** `memo.md`,
   `storyboard.yaml`, `index.tsx` are singular. Versions live in git
   history, not `v1`/`v2` filenames.
5. **Relative paths only inside DA2.** This folder is portable. No
   absolute paths in config, scripts, or templates.
6. **Don't put new work in `Projects/_archive/`.** Archive is read-
   only by convention.

## Running it

From DA2 root:

```bash
cd engine && pnpm install   # first time only
cd engine && pnpm dev        # turbo builds core + cli, then runs the demo
```

(Run `pnpm dev` from `engine/`, not `engine/apps/demo/`. The dev task
is a turbo target that builds the workspace packages first; running
directly from the demo bypasses that build and you'll get "open-slide
command not found".)

Dev server: `http://localhost:5173`. Open a specific deck with
`scripts/da2-open.sh <slug>`. Master-reference (the live substrate):
`scripts/da2-open.sh 2026-05-19_taikyoku-master-reference`.

## Upgrading the engine

`engine/` is pinned via `engine/VERSION`. To upgrade:

```bash
./scripts/sync-engine.sh @open-slide/core@<new-version>
```

The script fetches a fresh clone, checks out the requested tag, and
swaps in. The `open-slide.config.ts` override is preserved across the
swap.

## Phase ladder (durable)

| Phase | What shipped | Status |
| --- | --- | --- |
| 1 | Skeleton: directory tree, vendored engine, blank templates. | done |
| 2 | `memo` + `storyboard` subagents, `/da2-new` + `/da2-advance`, recipes (pitch-classic, explainer). | done |
| 3 | `compose-deck` subagent, dev-server open script. | done |
| 4 | `/da2-finalize` + `scripts/da2-finalize.sh`. | done |
| 5 | `memo-to-minutes` + `memo-to-one-pager` skills. | done |
| 6 | Taikyoku synthesis theme (`.demo.tsx` + `taikyoku.md` v0). | done |
| 7 | Refinement interview (Sessions A · B · C) → production-grade theme contract. | done |
| 8 | Japanese rendering: bundled HomuraM + Noto Sans JP body; logos copied in; brand-brief reconciliation (6 conflicts resolved). | done |
| 9 | Tier-1 component library (19 components × variant + density), gallery, per-deck font subsetting, accepted dark-reference palette. | done |
| 10 | Integration capstone (seed-pack deck through the full pipeline) + the compose-deck ↔ library wiring. | done |
| 11 | Composition-density: slide **anatomy** + **multi-component layout grammar** in COMPOSITION.md §1.5; agents upgraded; master-reference rebuilt dense. | done |
| Dark-mode | Productionised via CSS-variable token indirection (`var(--tk-*)`, per-slide `TK_LIGHT`/`TK_DARK` wrapper). | done |
| Stream 2 | Layout primitive promotion: 11 layouts at `themes/taikyoku/layouts/` (Frame · Structural · Rail · Band · TwoUp · AnchoredRail · DenseGrid + Cards · Stat · Insight · LList · Annote). Imported, not transcribed. | done |
| Stream 4 | Blueprint stage between storyboard and compose. New `blueprint` subagent. Storyboard rewritten to content-only. ContentArea (1720×720) theme primitive locked. compose-deck reads blueprint as structural truth. | done |
| Future | `component-from-screenshot` skill · reserved slot #15 / new archetypes · Stream-3 inspector-feedback loop. | not started |

`HANDOFF.md` carries the granular state of any in-flight work between
sessions.

## Slash commands

| Command | Does |
| --- | --- |
| `/da2-new` | Scaffolds a project from Inbox/ or inline answers; dispatches `memo`; pauses for approval. |
| `/da2-advance` | Detects the current stage from filesystem; runs the next stage; one stage per invocation. |
| `/da2-finalize` | Opens the editor, prompts for browser-side HTML+PDF download, runs `scripts/da2-finalize.sh`. |

Full contracts: `.claude/commands/da2-*.md`.

## Subagents

| Agent | Reads | Writes | Approval phrase |
| --- | --- | --- | --- |
| `memo` | `order.md`, sources | `memo.md` | `approve memo` |
| `storyboard` | approved `memo.md`, recipe (content-only per Stream 4) | `storyboard.yaml` | `approve storyboard` |
| `blueprint` | approved memo + storyboard + theme + COMPOSITION.md §1.5 + components | `blueprint.yaml` + `Projects/<slug>-blueprint/index.tsx` | `approve blueprint <beat-id>` / `approve blueprint all` |
| `compose-deck` | approved memo + storyboard + **approved blueprint** + theme + COMPOSITION.md + components + slide-authoring skill | `index.tsx` | _(no gate; gated by blueprint upstream)_ |

`compose-deck` has no approval gate by design. Editing happens in the
browser via open-slide's inspector loop. "Approval" = the user runs
`/da2-finalize` when satisfied.

Subagent definitions: `.claude/agents/`. compose-deck reads
`engine/apps/demo/.claude/skills/slide-authoring/SKILL.md` for the
generic open-slide contract (read-only engine reference).

## Skills

| Skill | Reads | Writes | Trigger phrases |
| --- | --- | --- | --- |
| `memo-to-minutes` | approved `memo.md`, `order.md` | `artifacts/minutes.md` | "draft minutes", "meeting minutes" |
| `memo-to-one-pager` | approved `memo.md`, `order.md` | `artifacts/one-pager.md` | "draft one-pager", "summary doc" |
| `apply-comments-triage` | `Projects/<slug>/index.tsx`, `@slide-comment` markers | `Projects/<slug>/{index.tsx, log.md}` + `themes/<theme>/REFINEMENT.md` queue sections; runs `scripts/da2-smoke-check.sh` after `fix:` sweeps | "apply comments", "sweep comments", "apply marker comments" |

Skills sit at `.claude/skills/<skill-name>/SKILL.md`. No formal
approval gate — derived artifacts are drafts the user edits.

## Inspector loop (Stream 3)

The browser inspector lets the user click a rendered element and
attach a comment, persisted as a `@slide-comment` JSX marker in
`Projects/<slug>/index.tsx`. When the user says "apply comments", the
`apply-comments-triage` skill (above) splits markers by **prefix**
before doing anything destructive:

| Prefix | What happens |
| --- | --- |
| `fix:` (default if no prefix) | Apply the edit in place via the engine's `apply-comments` skill. After the sweep, `scripts/da2-smoke-check.sh` provokes HMR and tails `engine/.dev-server.log` for 3 s to catch transform / runtime errors. |
| `decide:` | **Never auto-edits the slide.** Routed to `Projects/<slug>/log.md` under a "Pending decisions" section. Resolve with `approve decision <id-short>` or `reject decision <id-short>: <reason>`. |
| `brief:` | **Never auto-edits the theme contract.** Routed to `themes/<theme>/REFINEMENT.md` "Pending brief changes (open for user ruling)". Same approval phrases. |
| `ask:` | Answered in the chat reply. Marker removed; no file edit. |

The smoke-check requires the dev server to be started via
`./scripts/da2-dev.sh` (not bare `pnpm dev`), so its stdout is tee'd
to `engine/.dev-server.log` for the check to read.

**Open follow-ups (future rounds):** P2 (instance-local marker
anchors via `data-anchor` — kills the helper-hoist ambiguity); P3.b
(headless render check via Playwright — catches blank slides that
log clean); P3.c (visual diff vs baseline); P4 (batched
`begin sweep` keyword — collapses the comments-faster-than-sweep
race). See `briefs/stream-3-feedback-loop.md`.
