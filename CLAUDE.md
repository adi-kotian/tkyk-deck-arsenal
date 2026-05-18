# Deck Arsenal 2 — operator manual

DA2 produces decks (and minutes, and one-pagers) from a single canonical
context document called the memo. open-slide is the rendering engine — it
lives vendored under `engine/`. The workflow on top (order → memo →
storyboard → compose → finalize) is DA2's contribution.

DA1 (the production pipeline at the same level of the filesystem) is
preserved and untouched. Do not modify it from this folder.

## Directory map

```
engine/                          Vendored open-slide. Pinned via engine/VERSION.
  apps/demo/                     Workspace root (where pnpm dev runs).
    open-slide.config.ts         ← the one engine file we modify (slidesDir/themesDir).
  packages/                      open-slide framework source. Read-only reference.

Templates/                       Blank schemas to copy when starting work.
  ORDER.md
  MEMO.md
  STORYBOARD.yaml

Inbox/                           Drop filled ORDER.md here; /da2-new picks them up.

recipes/                         Reusable storyboard templates (one .yaml each).

Projects/<YYYY-MM-DD_slug>/      One folder per deck. Flat files, git = version log.
  order.md                       Stage 1 — production brief.
  memo.md                        Stage 2 — canonical context. Feeds deck AND minutes AND one-pager.
  storyboard.yaml                Stage 3 — references a recipe + fills content.
  index.tsx                      Stage 4 — React slide, picked up by open-slide.
  assets/                        Images, videos, fonts imported by index.tsx.
  sources/                       Raw research, transcripts, screenshots.
  artifacts/                     minutes.md, one-pager.md (derived from memo).
  exports/                       deck.html, deck.pdf after finalize.
  log.md                         Project log.

themes/                          Per-theme markdown (Taikyoku, etc.). Discovered by open-slide.

scripts/                         Operational scripts.
  sync-engine.sh                 Upgrade engine to a new pinned tag.

.claude/skills/                  DA2-specific Claude Code skills (additive on top of engine's).
```

## Workflow (mirrors DA1; rendering substrate is different)

1. **Order** — user fills `Templates/ORDER.md` and drops the copy in `Inbox/`,
   or invokes `/da2-new` and answers questions inline.
2. **Memo** — `memo` subagent reads order + sources, drafts `memo.md`.
   **Pauses for user approval.** Memo is universal context — same document
   feeds deck, minutes, one-pager.
3. **Storyboard** — `storyboard` subagent reads approved memo + chosen recipe,
   drafts `storyboard.yaml`. **Pauses for user approval.** If approval reveals
   memo gaps, dispatch `memo` again, then re-run storyboard.
4. **Compose** — `compose-deck` skill reads memo + storyboard + theme + the
   engine's `slide-authoring` skill. Writes `Projects/<slug>/index.tsx`. Opens
   `http://localhost:5173/s/<slug>` in the browser.
5. **Edit** — entirely in open-slide. Inspector clicks → comments → ask Claude
   Code to "apply comments" → the engine's `apply-comments` skill sweeps them.
6. **Finalize** — `/da2-finalize` runs open-slide's HTML and PDF export, lands
   files in `Projects/<slug>/exports/`, writes closing log entry.

Approvals are explicit: the user types "approve" before the next stage
runs. No auto-advance.

## Universal memo

The memo (`memo.md`) is shared input for three artifact types. Each artifact
skill reads the same memo and applies its own transformation:

- **Deck** (`compose-deck`) reads thesis, key points, tone, sources, and the
  deck-specific section (preferred recipe, theme, density override).
- **Minutes** (`memo-to-minutes`) reads thesis, key points, open questions,
  sources. Emits decisions / action items / parking lot at
  `artifacts/minutes.md`.
- **One-pager** (`memo-to-one-pager`) reads pitch, thesis, key points.
  Emits a polished distributable single-page document at
  `artifacts/one-pager.md`.

The memo never bakes in artifact-specific content. It stores project
context; each artifact transforms it.

## Recipes (storyboard templates)

A recipe at `recipes/<name>.yaml` defines a reusable beat sequence:

```yaml
name: pitch-classic
description: Cover → problem → solution → demo → validation → ask
default_theme: taikyoku
beats:
  - { purpose: cover,     density: low }
  - { purpose: problem,   density: medium }
  - { purpose: solution,  density: medium }
  - { purpose: demo,      density: medium }
  - { purpose: validation, density: high }
  - { purpose: ask,       density: low }
```

A storyboard references it:

```yaml
recipe: pitch-classic
theme: taikyoku
brief: ./memo.md
content:
  cover:    { key_message: "..." }
  problem:  { key_message: "..." }
  # one entry per beat
```

The composer merges structure (recipe) + content (storyboard) at compose
time. Recipes do not version with their consumers — past decks are frozen
in git.

Recipes ship empty in Phase 1. Phase 2 introduces the first recipe.

## Rules

1. **Don't edit `engine/` except `apps/demo/open-slide.config.ts`.** Every
   other file in `engine/` is part of the vendored snapshot. Upgrades go
   through `scripts/sync-engine.sh`. The config file is the one exception
   because that's open-slide's documented user-facing override surface.
2. **Filesystem is the state machine.** `memo.md` exists ⇒ memo drafted.
   `storyboard.yaml` exists ⇒ storyboarded. `index.tsx` exists ⇒ composed.
   `exports/deck.pdf` exists ⇒ finalized. No status file.
3. **Approval is explicit user input.** Never infer from silence.
4. **One canonical document per role per project.** `memo.md`,
   `storyboard.yaml`, `index.tsx` are singular. Versions live in git
   history, not `v1`/`v2` filenames.
5. **Relative paths only inside DA2.** This folder is portable — if it
   moves, internal references must still resolve. No absolute paths in
   config, scripts, or templates. References to DA1 (or anything outside
   DA2) live in prose for humans to interpret, not in machine-read paths.

## Running it

From DA2 root:

```bash
cd engine && pnpm install        # first time only
cd engine && pnpm dev            # turbo builds core + cli, then runs the demo
```

(Run `pnpm dev` from `engine/`, not `engine/apps/demo/`. The dev task is a
turbo target that builds the workspace packages first; running directly from
the demo bypasses that build and you'll get "open-slide command not found".)

The dev server is the in-browser editor. After composing a deck, open
`http://localhost:5173/s/<slug>` (the compose-deck skill does this for
you).

## Upgrading the engine

`engine/` is pinned via `engine/VERSION`. To upgrade:

```bash
./scripts/sync-engine.sh @open-slide/core@<new-version>
```

The script fetches a fresh clone, checks out the requested tag, and swaps
in. The `open-slide.config.ts` override is preserved across the swap.

## Phase status

> **⚠️ This section below covers Phases 1–6.3 only and is STALE.**
> Phases 7–11 + dark mode happened (Taikyoku refinement interview,
> Japanese rendering, the 19-component Tier 1 library, integration,
> dark-mode token indirection, composition-density anatomy/grammar).
> **Start at `HANDOFF.md` (repo root).** Live authoritative docs:
> `themes/taikyoku/REFINEMENT.md` (decisions), `themes/taikyoku.md`
> (contract), `themes/taikyoku/COMPOSITION.md` (composition spec).
> Treat the 1–6.3 list below as historical.

- [x] **Phase 1 — skeleton.** Directory structure, vendored engine, blank
  templates, slidesDir investigation.
- [x] **Phase 2 — memo + storyboard.** `memo` and `storyboard` subagents
  at `.claude/agents/`. `/da2-new` and `/da2-advance` slash commands at
  `.claude/commands/`. Two recipes shipped: `pitch-classic` and
  `explainer`. Reference deck artifacts (order, memo, storyboard) at
  `Projects/2026-05-14_da2-tour/`.
- [x] **Phase 3 — compose-deck.** `compose-deck` subagent at
  `.claude/agents/`. `/da2-advance` updated to dispatch it when
  storyboard is approved and no `index.tsx` exists. `scripts/da2-open.sh`
  opens `/s/<slug>` after composition. Reference `index.tsx` at
  `Projects/2026-05-14_da2-tour/index.tsx` (4 pages, default-fallback
  theme).
- [x] **Phase 4 — finalize.** `/da2-finalize` slash command at
  `.claude/commands/`. `scripts/da2-finalize.sh` moves
  browser-downloaded HTML+PDF from `~/Downloads` to
  `Projects/<slug>/exports/`. Export is half-manual by design: open-slide's
  HTML+PDF export is browser-side (Download button + `window.print()`);
  the script handles the move + log.
- [x] **Phase 5 — non-deck artifacts.** `memo-to-minutes` and
  `memo-to-one-pager` skills at `.claude/skills/`. Both read the
  approved memo, write into `Projects/<slug>/artifacts/`. Reference
  outputs at `Projects/2026-05-14_da2-tour/artifacts/`. No formal
  approval gate — derived artifacts are drafts the user edits.
- [x] **Phase 6.1 — Taikyoku theme.** `themes/taikyoku.md` (theme
  contract) and `themes/taikyoku.demo.tsx` (6-page demo) shipped.
  Synthesis aesthetic: cool→warm gradient on cover and section,
  paper-white content, Prata serif headlines, Archivo caps, Inter body,
  single purple `#7030A0` accent, gold `#FFE1A4` for one moment per
  deck. Fonts via Google Fonts at runtime; no bundled assets. Brand
  brief's kanji-seal / wordmark-lockup complexity deferred to a future
  "Taikyoku Full" theme.
- [x] **Phase 6.2 — `executive-pitch` recipe + compose-deck awareness.**
  Six-beat recipe at `recipes/executive-pitch.yaml`
  (cover/section/value/workflow/architecture/closing) with
  `default_theme: taikyoku`. `compose-deck` subagent gained a "Phase 6 —
  Taikyoku-aware composition" section: canvas selection per purpose,
  section/closing layout heuristics, motion vocabulary restriction to
  `tk-*` keyframes, and the one-gold-moment rule.
- [x] **Phase 6.3 — Taikyoku reference deck.** Six-page deck at
  `Projects/2026-05-15_da2-retrospective/` — order → memo → storyboard →
  composed `index.tsx` — rendering the DA2 build retrospective against
  Taikyoku + executive-pitch. Validates the full pipeline on the new
  aesthetic. Same-content comparison against the earlier `da2-tour`
  project (default-fallback theme + explainer recipe).

Subsequent phases do not exist yet. If you're invoked to do Phase 3+ work
without those skills/files in place, stop and surface that.

## Slash commands (Phase 2)

| Command | Does |
| --- | --- |
| `/da2-new` | Scaffolds a project from Inbox/ or inline answers; dispatches `memo`; pauses for approval. |
| `/da2-advance` | Detects the current stage from filesystem; runs the next stage; one stage per invocation. |
| `/da2-finalize` | Opens the editor, prompts for browser-side HTML+PDF download, runs `scripts/da2-finalize.sh` to land them in `exports/`. |

Both commands live at `.claude/commands/`. Read those files for the full
contract.

## Subagents (Phase 2)

| Agent | Reads | Writes | Approval phrase |
| --- | --- | --- | --- |
| `memo` | `order.md`, sources, prior `memo.md` if revising | `memo.md` only | `approve memo` |
| `storyboard` | approved `memo.md`, chosen `recipes/<name>.yaml` | `storyboard.yaml` only | `approve storyboard` |
| `compose-deck` | approved memo + storyboard + theme + engine's `slide-authoring` skill | `index.tsx` only | _(no gate)_ |

The memo and storyboard subagents end with a structured approval prompt —
the exact phrase above (case-insensitive). Anything else is treated as
revision feedback and re-dispatches the subagent.

`compose-deck` has **no approval gate** by design. Editing happens in the
browser via open-slide's inspector loop. The user reaches "approval" by
choosing to run `/da2-finalize` (Phase 4) when satisfied with the rendered
deck. After compose-deck returns, `/da2-advance` invokes
`scripts/da2-open.sh <slug>` to open the editor at
`http://localhost:5173/s/<slug>` (provided `pnpm dev` is running in
`engine/`).

Subagent definitions live at `.claude/agents/`. They reach into the engine
via relative paths (e.g., compose-deck reads
`engine/apps/demo/.claude/skills/slide-authoring/SKILL.md` for the
technical contract).

## DA2 skills (Phase 5)

| Skill | Reads | Writes | Trigger phrases |
| --- | --- | --- | --- |
| `memo-to-minutes` | approved `memo.md`, `order.md` | `artifacts/minutes.md` | "draft minutes", "meeting minutes", "minutes for ..." |
| `memo-to-one-pager` | approved `memo.md`, `order.md` | `artifacts/one-pager.md` | "draft one-pager", "make a one-pager", "summary doc for ..." |

Skills sit at `.claude/skills/<skill-name>/SKILL.md`. They have no
formal approval gate — derived artifacts are drafts the user edits. Both
skills check for staleness: if the artifact already exists for the
current `memo_version`, they ask before overwriting.

Triggered either by user phrasing or via the `/da2-finalize` post-export
hand-off (the slash command offers to draft minutes/one-pager/both
after the deck is finalized).
