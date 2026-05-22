---
doc: stream-4-blueprint-stage
status: design + CC prompt — ready to execute
written: 2026-05-19 (Cowork)
audience: future Claude Code session adding the blueprint stage to the pipeline
related: HANDOFF.md (§4 streams) · themes/taikyoku/COMPOSITION.md §1.5 ·
  .claude/agents/{memo,storyboard,compose-deck}.md ·
  briefs/stream-2-layout-promotion.md (sibling; orthogonal)
---

# Stream 4 — Blueprint stage: per-slide structural draft + approval

## The goal in one sentence

Insert a new pipeline stage between `storyboard` and `compose` whose
job is to produce a **per-beat column/row blueprint** of each slide's
content area (with each grid cell naming a component + a one-line
content summary), render the whole deck as a wireframe companion in
the dev server, and gate compose-deck behind per-beat blueprint
approval.

After this lands, deck composition becomes: pick recipe → fill content
(storyboard) → draft structural blueprint (new) → approve per beat →
render. The empty-slide failure mode moves from "spotted late at render
time" to "spotted at blueprint review, before any content rendering
happens."

## Why this is a new stage, not a storyboard extension

Today the storyboard subagent does double duty: it captures content
(key messages, sources, real numbers) AND structural decisions
(`primary` + `supporting` + `layout`). That conflation is why a beat
can ship "approved" but produce an empty slide — the storyboard's
content-shape and the slide's canvas-shape were never reviewed
separately. Splitting them gives the user a clean approval surface for
each: "do these claims make the case?" (storyboard) versus "do these
cells carry the claims in the right places?" (blueprint).

The named-layouts vocabulary in `COMPOSITION.md §1.5` (primary-rail /
primary-band / two-up / anchored-rail / dense-grid) becomes a **preset
shortcut for blueprints**, not the only layout language. Custom grids
are first-class.

---

## Design decisions (locked)

### D1 — New subagent: `blueprint`

Sits at `.claude/agents/blueprint.md`. Reads:

- approved memo (`Projects/<slug>/memo.md`)
- approved storyboard (`Projects/<slug>/storyboard.yaml`)
- the theme contract (`themes/<theme-id>.md`)
- the composition spec when theme = taikyoku (`themes/taikyoku/COMPOSITION.md`)
- each component's header comment in `themes/taikyoku/components/<name>.tsx`
  (for slot/prop contracts)
- any inline context/briefs the user passes in
- the layout primitives (Stream 2; if not yet promoted, the
  master-reference's deck-local `Frame`/`Rail`/etc. as reference)

Writes exactly two files:

1. `Projects/<slug>/blueprint.yaml` — the structured spec (see D5).
2. `Projects/<slug>-blueprint/index.tsx` — the companion wireframe
   deck (see D6).

Approval phrase: `approve blueprint <beat-id>` (per beat — D8).
Re-dispatched for `revise blueprint <beat-id>: <feedback>`.

### D2 — Storyboard drops `primary` / `supporting` / `layout`

The storyboard subagent contract (`.claude/agents/storyboard.md`)
gets a surgical rewrite. After the change:

`storyboard.yaml`'s per-beat `content:` block carries content only:

```yaml
content:
  validation:
    key_message: "Pipeline shifted to self-serve in two quarters."
    action_title: "73% Of Pipeline Is Now Self-Serve"
    sub: "Up from 41% a year ago. The retention base alone funds the next stage."
    source: "1,240 closed-won, FY25→26, ex-migrations"
    facts:
      - { label: "Self-serve share now", value: "73%" }
      - { label: "Self-serve share a year ago", value: "41%" }
      - { label: "YoY change", value: "+32pp", note: "no added sales headcount" }
    quotes: []
    notes: "Self-serve is now the default path; sales-assist is the exception."
```

What's gone: `primary`, `supporting[]`, `layout`. Those become blueprint
concerns. The `notes` field stays as freeform direction the blueprint
subagent reads.

Storyboard subagent gets a hard rule: **no component or layout names
in storyboard.yaml**. If the user describes layout intent in
revision feedback, route it to blueprint (don't edit storyboard).

### D3 — Blueprint owns layout selection

The blueprint subagent reads the storyboard's beats and selects:

- **Components** per beat — using the COMPOSITION.md beat → component
  map as the default (e.g., "validation" purpose with metric-shaped
  facts → `headline-metric` or `quarterly-metrics`).
- **Grid** per beat — columns × rows × gap inside the fixed content
  area.
- **Shadows** — each grid cell's component name + one-line content
  summary distilled from the storyboard's facts/quotes/notes.

It surfaces ambiguity rather than guessing silently (e.g., "two
defensible component picks for this beat: `quarterly-metrics
hero-supporting` or `headline-metric` with a rail. Defaulting to the
former — flag if you'd rather the latter").

### D4 — `ContentArea` is the locked-geometry theme primitive

A new theme-level concept added to `themes/taikyoku.md` (and codified
in `themes/taikyoku/layouts/` if Stream 2 has landed):

- **Width**: `1720 px` (canvas 1920 minus 100 px L/R padding).
- **Height**: `720 px` (the canvas vertical between a guaranteed 2-line
  action title + sub region and a guaranteed source-line strip).
- **Tokens**: `--tk-content-w: 1720; --tk-content-h: 720;`
  `--tk-content-grid-cols: 12; --tk-content-grid-rows: 6;` (defaults;
  per-beat override allowed).
- **Frame contract**: the body region of `Frame` is a `<ContentArea>`
  slot at exactly these dimensions. Action title clamps to 2 lines
  (CSS `-webkit-line-clamp: 2; overflow: hidden`). Source line is a
  fixed 40 px strip. No drift across slides.

This makes "col 1..4" mean the same pixel rectangle on every slide.
That's the precision the blueprint layer exists to deliver.

### D5 — Blueprint YAML schema

`Projects/<slug>/blueprint.yaml`:

```yaml
storyboard: ./storyboard.yaml
storyboard_version: 1               # detect storyboard revisions
theme: taikyoku
status: draft                       # deck-level: all beats approved → flips to approved

content_area:                       # informational; locked by theme contract
  width: 1720
  height: 720
  default_grid: { columns: 12, rows: 6, gap: 24 }

beats:
  - id: validation                  # matches storyboard beat purpose / id
    status: draft                   # per-beat (D8)
    layout_preset: primary-rail     # optional shortcut; null = custom grid
    grid: { columns: 12, rows: 6, gap: 24 }
    shadows:
      - id: hero-metric
        span: { col: 1..7, row: 1..4 }
        component: headline-metric
        density: standard
        content_summary: |
          Big 73% mono value; eyebrow "Headline";
          context "Up from 41% a year ago."
      - id: rail-supports
        span: { col: 8..12, row: 1..6 }
        kind: layout-zone           # not a Tier-1 component; a sub-region
        children:
          - { kind: stat-callout, content_summary: "41% — a year ago" }
          - { kind: stat-callout, content_summary: "+32pp YoY — no added sales headcount" }
          - { kind: insight,      content_summary: "Self-serve is now the default path." }
      - id: chart-context
        span: { col: 1..7, row: 5..6 }
        kind: labelled-list
        content_summary: "Pricing change wk 0 · Onboarding v2 wk 6 · Inflection wk 8"

  - id: ask
    status: draft
    # ...
```

Three shadow kinds:
- **`component:`** — a Tier-1 library component fills the cell.
- **`kind: layout-zone`** + `children` — a sub-grid of support-kit
  primitives (the rail pattern).
- **`kind: <support-primitive>`** — a single support-kit primitive
  (`stat-callout`, `insight`, `labelled-list`, `annotation`,
  `mini-source`).

`span` uses inclusive ranges (`col: 1..7`) — readable, validates
trivially against the grid bounds.

**Validation rules** the subagent enforces on emit:
- Every cell of `grid.columns × grid.rows` is covered by exactly one
  shadow (or explicitly marked `kind: empty` if intentional whitespace).
- No two shadows overlap.
- Every shadow's `component` exists in `themes/taikyoku/components/`
  or is a known support-kit primitive.
- Every component receives its required props from `content_summary` +
  storyboard's `facts`/`quotes`/`notes` (no rendering-time surprises).

If validation fails, the subagent surfaces the gap and refuses to
write the file. (Same "surface, don't auto-fix" pattern as memo
under-supported-beat flagging.)

### D6 — Companion wireframe deck

`Projects/<slug>-blueprint/index.tsx` — a real open-slide deck served
at `/s/<slug>-blueprint`. Each Page mirrors a beat in `blueprint.yaml`:

- Same Frame chrome as the final deck (eyebrow + action title + sub +
  source + folio — pulled from storyboard, so the context is real)
- The content area renders as an **empty grid**: hairline cell
  borders, each shadow's `id` in tracked caps top-left, the
  `component` name (or `kind`) below, the `content_summary` in muted
  serif filling the cell
- A small status badge in the eyebrow strip: `BLUEPRINT • DRAFT` or
  `BLUEPRINT • APPROVED` (mode-aware via `var(--tk-accent-negative)`
  for draft, `var(--tk-accent)` for approved)
- Layout-zone shadows render with their sub-cells visible (the
  rail's stacked supports show as smaller cells inside the parent
  span)

It's a real deck, so inspector markup works — `@blueprint-comment`
markers can be left, "apply blueprint comments" sweeps them via the
blueprint subagent (not compose-deck). Per the inspector loop, a
sweep re-emits `blueprint.yaml` AND re-renders the wireframe.

After `approve blueprint all`, the wireframe deck **stays** as the
canonical layout reference for the project. It's exported alongside
the final deck if `/da2-finalize` is run with `--include-blueprint`
(optional). Otherwise it lives on disk as part of the project record.

### D7 — Per-beat approval

Each beat in `blueprint.yaml` carries its own `status: draft |
approved`. Phrases:

- `approve blueprint <beat-id>` — flips one beat's status to
  `approved`; the wireframe deck re-renders that page's badge.
- `approve blueprint all` — flips every still-draft beat to
  `approved` in one go.
- `revise blueprint <beat-id>: <feedback>` — re-dispatches the
  blueprint subagent on just that beat; the rest of the file is
  preserved.

`/da2-advance` dispatches `compose-deck` only when:
1. `blueprint.yaml` exists, AND
2. every beat's `status == approved`.

The top-level `blueprint.yaml status` field flips to `approved` only
when (2) is satisfied — this is the trigger compose-deck reads.

### D8 — Recipe + named-layout integration

Recipes (`recipes/<name>.yaml`) unchanged — they declare beat
sequence + density + notes; no layout in recipes either.

Named layouts in COMPOSITION.md §1.5 become **blueprint presets**.
The blueprint subagent maps each preset to a canonical grid:

| layout_preset | grid | shadow shape |
| --- | --- | --- |
| `primary-rail` | 12×6 | primary col 1..7 row 1..6 · rail col 8..12 row 1..6 |
| `primary-band` | 12×6 | primary col 1..12 row 1..4 · band col 1..12 row 5..6 (split into 2-4 cells) |
| `two-up` | 12×6 | a col 1..6 row 1..5 · b col 7..12 row 1..5 · takeaway col 1..12 row 6 |
| `anchored-rail` | 12×6 | primary col 1..9 row 1..6 · annot col 10..12 row 1..6 |
| `dense-grid` | 12×6 | 6 cells, 3×2 grid, each spanning col 1..4/5..8/9..12 × row 1..3/4..6 |

If the storyboard's beat carries a `layout_hint` in its `notes` field
(or if the user passes one inline), the blueprint subagent emits the
preset grid. Otherwise it derives a sensible default from the beat's
content (one decisive number → primary-rail with headline-metric +
support rail; comparison → primary-rail with product-comparison +
support rail; etc.).

### D9 — compose-deck reads blueprint as structural truth

The compose-deck subagent (`.claude/agents/compose-deck.md`) is
amended:

- New input: `Projects/<slug>/blueprint.yaml` (must exist with
  `status: approved`).
- Per beat, compose-deck:
  1. Reads the storyboard's content for that beat (`key_message`,
     `action_title`, `sub`, `source`, `facts`, `quotes`, `notes`).
  2. Reads the blueprint's grid + shadows for that beat.
  3. Emits a Page wrapping the storyboard's chrome (eyebrow + action
     title + source + folio) around a `ContentArea` populated with
     the shadows in their grid cells.
  4. For each shadow: instantiate the named component with the
     concrete content from the storyboard's facts/quotes/notes. If a
     shadow's content_summary can't be matched to concrete storyboard
     data, refuse — do not invent content.
- Refusal conditions: missing blueprint, draft blueprint, grid-shadow
  validation failure, content-summary unmatched.

The "transcribe components into the deck" rule (COMPOSITION.md §1)
still applies. compose-deck transcribes; the blueprint just dictates
which components and where.

### D10 — `/da2-advance` learns the new stage

The state-machine table grows:

| State | Next action |
| --- | --- |
| `storyboard.yaml` `status: approved`, no `blueprint.yaml` | dispatch `blueprint` |
| `blueprint.yaml` `status: draft` (any beat draft) | stop — show which beats await approval |
| `blueprint.yaml` `status: approved`, no `index.tsx` | dispatch `compose-deck` |

The existing memo/storyboard approval phrases continue to work
unchanged. Two new ones: `approve blueprint <beat-id>` and
`approve blueprint all`.

---

## What ships with this stream

After landing, the repo has:

- New: `.claude/agents/blueprint.md` (subagent definition)
- New: `Projects/<slug>/blueprint.yaml` (per-project artifact, written by the subagent)
- New: `Projects/<slug>-blueprint/index.tsx` (per-project wireframe deck)
- Updated: `.claude/agents/storyboard.md` (drops layout fields from the contract)
- Updated: `.claude/agents/compose-deck.md` (reads blueprint as structural truth)
- Updated: `.claude/commands/da2-advance.md` (new state-machine row)
- Updated: `themes/taikyoku.md` (new "Content Area" section + tokens)
- Updated: `themes/taikyoku/COMPOSITION.md` (§1.5 cross-links to blueprint presets)
- Updated: `CLAUDE.md` (workflow section gains the blueprint stage)
- Updated: `HANDOFF.md` (Stream 4 → done)
- Updated: `Templates/STORYBOARD.yaml` (per D2's simpler schema)
- New (optional): `Templates/BLUEPRINT.yaml` (the structural template)

## Sequencing with other streams

- **Independent of Stream 2** (layout primitives). Stream 4 can land
  first — `ContentArea` is documented contractually in `taikyoku.md`
  and master-reference's Frame is updated to honor the dimensions.
  When Stream 2 lands, `ContentArea` becomes a real layout primitive
  with no code change at the deck level.
- **Stream 3** (feedback loop) is a quality-of-life upgrade for the
  inspector loop on top of *any* rendered deck. Stream 4's wireframe
  deck benefits from Stream 3's P1 (comment-prefix triage —
  `@blueprint-comment fix:` vs `decide:`) and P3.a (render smoke-
  check) immediately. Land Stream 3 first or alongside.

Recommended order: **Stream 2 → Stream 4 → Stream 3**. Stream 2 gives
ContentArea a clean home; Stream 4 builds on it; Stream 3 polishes the
loop.

---

## The CC prompt

Paste this into Claude Code at repo root. Operates on a single branch:
`git checkout -b stream-4-blueprint-stage`.

---

> Add the blueprint stage to DA2's pipeline per
> `briefs/stream-4-blueprint-stage.md` (this file). D1–D10 are the
> spec — don't re-derive them. Execute in phases; STOP between
> phases A and B for user review of the storyboard contract change
> (D2 is the most disruptive piece).
>
> ### Phase A — read first
>
> 1. Read this brief end-to-end. The D1–D10 decisions are locked.
> 2. Read `.claude/agents/{memo,storyboard,compose-deck}.md` in full
>    — note the existing contract shapes.
> 3. Read `.claude/commands/da2-advance.md` — note the state-machine
>    table you'll extend.
> 4. Read `themes/taikyoku/COMPOSITION.md` §1.5 entirely.
> 5. Read `Projects/2026-05-19_taikyoku-master-reference/index.tsx`
>    — specifically the `Frame` definition (the body-region slot is
>    what becomes `ContentArea`).
> 6. Read `Templates/STORYBOARD.yaml` — note what's there to be
>    pruned per D2.
>
> ### Phase B — STOP for approval
>
> Surface to the user:
> > "Stream 4 design is locked per the brief. The biggest change is
> > storyboard dropping `primary`/`supporting`/`layout` (D2). Existing
> > projects in `Projects/_archive/` will be untouched, but the
> > storyboard subagent will refuse to emit those fields on new
> > projects. Confirm: proceed with the storyboard contract rewrite?
> > Reply **`yes, rewrite storyboard contract`** or describe a
> > concern."
>
> If the user says yes, continue. If anything else, stop and revise
> the plan based on their feedback.
>
> ### Phase C — write the blueprint subagent
>
> Create `.claude/agents/blueprint.md`. Mirror the shape of the
> existing memo/storyboard/compose-deck agent files:
> - Frontmatter (`name: blueprint`, description, tools).
> - "Inputs" section listing all six reads per D1.
> - "Output" section: exactly two files — `blueprint.yaml` and
>   `Projects/<slug>-blueprint/index.tsx`.
> - "Schema" section with the full YAML shape per D5, including
>   validation rules.
> - "Companion wireframe" section per D6 — what the .tsx renders,
>   how status badges work.
> - "Approval" section per D7 — three phrases, what each does.
> - "Hard rules" section (don't edit storyboard, don't edit
>   recipes, don't write outside the project folder, don't invent
>   layouts not in the named presets unless a custom grid is
>   declared, etc.).
> - "Return contract" — 3-5 line summary + the exact approval
>   prompt.
>
> ### Phase D — rewrite the storyboard subagent
>
> Edit `.claude/agents/storyboard.md`:
> - Remove from the "Filling the content block" section: the
>   `primary`, `supporting`, `layout` field definitions.
> - Replace with a "Content-only" instruction: the storyboard
>   captures `key_message`, `action_title`, `sub`, `source`,
>   `facts`/`quotes`/`notes`. Layout is the blueprint stage's
>   concern.
> - Update the "Mismatch handling" section: a beat with sparse
>   content is still flagged as `[NEEDS CONTENT]`, but the "density
>   floor" rule (≥2 supporting components per beat) moves to the
>   blueprint subagent's contract.
> - Update the "Hard rules" section: hard-rule 7 (density floor)
>   becomes "Don't declare components, layouts, or grids — those
>   live in blueprint."
>
> Update `Templates/STORYBOARD.yaml` to the new shape per D2.
>
> ### Phase E — amend the compose-deck subagent
>
> Edit `.claude/agents/compose-deck.md`:
> - Add `Projects/<slug>/blueprint.yaml` to "Inputs" — required;
>   must have `status: approved`.
> - Add a "Phase 12 — Blueprint-driven composition" section after
>   the existing "Phase 7–9 — Taikyoku composition" section,
>   describing D9: read blueprint, read storyboard content, emit
>   Page per beat with ContentArea wrapping the shadows in their
>   grid cells, refuse on validation failure.
> - Refusal conditions list: extend with "missing or draft
>   blueprint", "content-summary unmatched to storyboard data".
>
> ### Phase F — extend `/da2-advance`
>
> Edit `.claude/commands/da2-advance.md`:
> - Add the two new rows to the state-machine table per D10.
> - Add approval-phrase detection for `approve blueprint <beat-id>`
>   and `approve blueprint all` and `revise blueprint <beat-id>:`.
> - On per-beat approval: rewrite that beat's `status` field in
>   `blueprint.yaml` AND regenerate the wireframe deck's status
>   badge for that page.
>
> ### Phase G — theme contract: ContentArea
>
> Edit `themes/taikyoku.md`:
> - Add a new section "Content Area" after "## Fixed components".
>   State the dimensions (1720 × 720), the tokens
>   (`--tk-content-w`, `--tk-content-h`, `--tk-content-grid-cols`,
>   `--tk-content-grid-rows`), the action-title clamp (2 lines), the
>   source-strip fixed height (40 px).
> - In the "Layout" section, add a paragraph: "The Frame's body
>   region IS the content area — a fixed 1720×720 slot. Per-beat
>   grids declared in `blueprint.yaml` live entirely inside this
>   slot."
> - Add to "Locked Taikyoku constraints" in CLAUDE.md: "Content area
>   is 1720×720, absolute across slides; blueprint shadows declare
>   grid placement within."
>
> Edit `themes/taikyoku/COMPOSITION.md`:
> - In §1.5, cross-link each named layout to its blueprint preset
>   (per D8's table).
> - Add a new paragraph: "Layouts now have two surfaces: this spec
>   defines the named-layout vocabulary; the blueprint stage
>   instantiates them as grids in `blueprint.yaml`. A custom
>   blueprint can declare any grid; named presets are the fast
>   path."
>
> ### Phase H — wireframe template
>
> The blueprint subagent emits the wireframe deck on every run.
> Don't hand-write the wireframe; write a small generator inside
> the blueprint subagent's logic that produces a deterministic
> `index.tsx` from the `blueprint.yaml`. Header comment notes it's
> generated and lists the regeneration trigger (any blueprint
> change).
>
> Make sure the wireframe imports the same theme tokens as a real
> deck so dark/light mode applies (per the per-slide wrapper
> rule). Status badges use `--tk-accent-negative` for draft, the
> `--tk-accent` purple for approved.
>
> ### Phase I — verify on master-reference
>
> Master-reference is the test bed:
>
> 1. Generate a `blueprint.yaml` for master-reference from its
>    existing storyboard (you'll need to back-fill a storyboard if
>    master-reference doesn't have one — check
>    `Projects/2026-05-19_taikyoku-master-reference/`). If no
>    storyboard exists, this verification step is "manual blueprint
>    construction" instead.
> 2. Generate the wireframe deck at
>    `Projects/2026-05-19_taikyoku-master-reference-blueprint/`.
> 3. Open it in the dev server. Every page should show: chrome
>    matching the final deck, content area as an empty grid with
>    shadow labels, DRAFT badge.
> 4. Approve a single beat (`approve blueprint <beat-id>`); badge
>    flips to APPROVED.
> 5. Approve all (`approve blueprint all`); `blueprint.yaml`'s
>    top-level status flips to `approved`.
> 6. Run `/da2-advance` — should dispatch compose-deck, which
>    re-emits the deck's `index.tsx` from blueprint + storyboard.
>    Final render should match the existing master-reference within
>    layout drift tolerance.
>
> ### Phase J — commit + HANDOFF refresh
>
> Three commits on the branch:
>
> 1. `feat(blueprint): add blueprint subagent + ContentArea theme
>    primitive + state-machine extension`
> 2. `refactor(storyboard): drop layout fields per Stream 4 (D2);
>    blueprint owns layout`
> 3. `docs: update CLAUDE.md, HANDOFF.md, COMPOSITION.md §1.5 with
>    the blueprint stage`
>
> Then open a PR / hand back to the user.

---

## Out of scope (intentional)

- **Auto-approval based on rules.** Even a blueprint that passes every
  validation rule still requires the human approval phrase. The point
  is reviewable structural intent, not automation.
- **Re-blueprinting archived decks.** `Projects/_archive/` stays
  frozen. The new stage applies to new projects only.
- **Per-shadow approval.** Per-beat is the granularity (D7). A beat is
  the natural review unit — splitting further means reviewing a single
  cell, which dilutes the "does this slide work?" question.
- **Non-Taikyoku themes.** The ContentArea concept is theme-agnostic
  in principle, but the dimensions (1720×720) are Taikyoku-specific.
  A second theme would declare its own ContentArea contract.
- **Auto-resolving storyboard-blueprint drift.** If storyboard is
  revised after blueprint approval, blueprint becomes stale.
  `blueprint.yaml`'s `storyboard_version` field detects this; the
  subagent surfaces the drift and the user re-runs blueprint. No
  automatic re-derivation.

## What lands after this

- A new pipeline stage that makes structural intent reviewable
  separately from content intent.
- A wireframe deck per project — the "newspaper layout before the
  editors fill it in" the user asked for.
- A cleaner storyboard subagent (pure content) and a cleaner compose-
  deck subagent (executes a plan, doesn't make layout decisions).
- The empty-slide failure mode caught at blueprint review, before
  any composition.
- A precise vocabulary (content area, content shadows, grid) that
  makes future agent work and future Tier-1 component additions
  easier to specify against.
