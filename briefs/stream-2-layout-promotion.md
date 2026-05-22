---
doc: stream-2-layout-promotion
status: shipped 2026-05-22 — commits 8cab174 · 9ffaded · d6b02e5 (on main)
written: 2026-05-19 (Cowork flatten pass)
audience: historical reference — the design + CC prompt that produced themes/taikyoku/layouts/
related: HANDOFF.md (§4 Stream 2) · themes/taikyoku/COMPOSITION.md §1.5 ·
  Projects/2026-05-19_taikyoku-master-reference/index.tsx (source)
---

# Stream 2 — Promote layout primitives to theme-level

## The goal in one sentence

Take the 10 layout primitives that currently live deck-local in
`Projects/2026-05-19_taikyoku-master-reference/index.tsx`
(`Frame`, `Rail`, `Band`, `TwoUp`, `Structural`, `Cards`, `Stat`,
`Insight`, `LList`, `Annote`) and promote them into
`themes/taikyoku/layouts/` so future decks assemble from named
layouts instead of re-deriving anatomy chrome per deck.

After this lands, `compose-deck` says "use `primary-rail`" and gets
the same `Rail` primitive every other Taikyoku deck uses. The COMPOSITION.md
§1.5 anatomy stops being deck-local scaffolding and becomes
first-class theme infrastructure.

## Why now

- The anatomy (eyebrow + action title + body + source + folio) is
  locked doctrine (COMPOSITION.md §1.5). Every content slide builds
  it. Inlining it per-deck creates copy drift.
- The named layouts (`primary-rail`, `primary-band`, `two-up`,
  `anchored-rail`, `dense-grid`) are referenced by name in
  `storyboard.yaml` and `compose-deck`, but the reference
  implementations live in *one* deck. The next deck either copies
  master-reference or re-derives them — either way fragile.
- Components have the same lifecycle pattern (`themes/taikyoku/
  components/`) and it works. Layouts deserve the same.

## Why this is **risk-medium** and gets prompts, not direct edits

- The master-reference deck is the live feedback substrate. Breaking
  it breaks the inspector loop.
- Layout primitives are load-bearing: every page sits inside one.
  Subtle changes (padding, gap, flex-basis) cascade.
- The transcribe-vs-import question (COMPOSITION.md §1) needs an
  explicit answer before promotion, not after.
- Worth running in Claude Code where there's a full repo view and
  the dev server is reachable to render-verify.

---

## Design decisions (lock these BEFORE you start)

### D1 — Source-of-truth lives in `themes/taikyoku/layouts/`

Mirror the `themes/taikyoku/components/` pattern:

```
themes/taikyoku/layouts/
  README.md              # what each layout is for, when to use it
  Frame.tsx              # the universal content-page chrome
  Structural.tsx         # variant of Frame for components owning their own chrome
  Rail.tsx               # primary-rail (62/38) layout
  Band.tsx               # primary-band (top 64 / bottom 30) layout
  TwoUp.tsx              # two co-equal components + shared takeaway
  Cards.tsx              # support kit: row of cards
  Stat.tsx               # support kit: stat callout
  Insight.tsx            # support kit: accent-dot + one sentence
  LList.tsx              # support kit: labelled list
  Annote.tsx             # support kit: italic-Prata aside
```

Each `.tsx`: a single named export, hook-free, redeclares its
`var(--tk-*, <light>)` token references inline (same portability rule
as components), and a header comment with slot/prop contract.

Naming: PascalCase per file (already how master-reference names
them). Default-export prohibited (consistency with components — the
file `Frame.tsx` exports `{ Frame }`).

### D2 — `anchored-rail` and `dense-grid` join the kit

Master-reference defines `Rail` (primary-rail) and `Band`
(primary-band) but the other two named layouts in COMPOSITION.md §1.5
(`anchored-rail`, `dense-grid`) only exist as ad-hoc shapes inside
master-reference's slides. Promote them properly:

- **`AnchoredRail`** — full-width primary + thin (~26 %) right
  annotation rail.
- **`DenseGrid`** — action title + 2×2 / 2×3 grid of small cells. The
  pushed-density slide in master-reference (`'Density · pushed'`,
  lines ~407–422) is the reference implementation.

So total = **11 primitives + 1 directory README**.

### D3 — Decks **import** from layouts/. Components stay **transcribed**.

This is the **transcribe-not-import** question (COMPOSITION.md §1 +
REFINEMENT.md App: Phase-10 finding). Resolution:

- **Components remain transcribed.** Per-deck specialisation
  (variant/density branches dropped) and frozen-with-deck semantics
  are valuable.
- **Layouts are imported.** Layouts have no `variant` / `density`
  props (they're the chrome, not the content), they're stable, and
  their whole purpose is consistency across decks. Decks `import
  { Frame, Rail, Band, ... } from '../../themes/taikyoku/layouts'`
  exactly like master-reference imports the component library today.
- Document this asymmetry in COMPOSITION.md §1 with a one-paragraph
  explanation: "layouts are theme infrastructure (imported);
  components are deck content (transcribed)."

Knock-on: a future layout bug-fix DOES propagate to existing decks
(unlike a component fix). Treat layouts as a versioned API — breaking
changes need a deliberate beat.

### D4 — Preserve every load-bearing master-reference detail

The Phase-11 feedback-round-1 fixes are in here. Don't accidentally
revert any of:

- `Rail`/`TwoUp`/`Band` zone slots are `display:block` so a block
  component fills the zone width. *Do not* change to `display:flex`.
- `Structural` for components that own their eyebrow+heading
  (`deck-contents` etc.) — no echoing Frame eyebrow.
- `Frame` has a `jp?:boolean` prop: when true, action title uses
  HomuraM display (`Fn.jpD`) and sub uses Noto Sans JP (`Fn.jpB`).
  Preserve verbatim.
- The token helper `V(name, fallback)` returns
  `var(--tk-<name>, <fallback>)` — every layout uses it. Carry it
  into each layout file (per the portability rule each file
  redeclares its own).

### D5 — Master-reference migrates to the new imports

After the layouts exist, replace master-reference's deck-local
definitions with `import { Frame, Rail, ... } from '../../themes/
taikyoku/layouts'`. This:

- Validates the promotion (renders identically).
- Becomes the reference example for "how a deck uses theme
  layouts."
- Cuts ~100 lines of duplication from the deck.

Master-reference is *already* the documented exception to the
one-file rule (it imports the component library). Importing layouts
slots in.

### D6 — compose-deck instructions add the layouts

Both subagents need updates:

- **`storyboard`**: already references the named layouts by string
  (`primary-rail` etc.). No code change; just verify it still
  works after the layouts land.
- **`compose-deck`**: gets a new "Phase 12 — Theme layouts" section
  pointing at `themes/taikyoku/layouts/<Name>.tsx` for the slot/prop
  contracts, and a one-paragraph note on transcribe-vs-import
  (components transcribed; layouts imported).

### D7 — `themes/taikyoku.md` gets a "Layouts" section

A new section just under "Fixed components" titled "Layouts (Phase
12)" listing the 11 layouts with one-line descriptions and a usage
example (the master-reference's first Frame is a good example).

---

## The CC prompt

Paste this into Claude Code at the repo root. Includes phased
verification.

---

> Promote the 10 layout primitives from
> `Projects/2026-05-19_taikyoku-master-reference/index.tsx`
> (`Frame` · `Rail` · `Band` · `TwoUp` · `Structural` · `Cards` ·
> `Stat` · `Insight` · `LList` · `Annote`) into
> `themes/taikyoku/layouts/`, add two more (`AnchoredRail` and
> `DenseGrid`), migrate master-reference to import from the new
> location, and document everything. Operate in one branch:
> `git checkout -b stream-2-layout-promotion`.
>
> ### Phase A — read first, don't write
>
> 1. Read `briefs/stream-2-layout-promotion.md` (this file) end-to-
>    end. The D1–D7 decisions are the spec — don't re-derive them.
> 2. Read `themes/taikyoku/COMPOSITION.md` §1 + §1.5 entirely. Note
>    the layout names already named in §1.5: `primary-rail`,
>    `primary-band`, `two-up`, `anchored-rail`, `dense-grid`.
> 3. Read `Projects/2026-05-19_taikyoku-master-reference/index.tsx`
>    lines 1–172. Those define `TK_LIGHT`/`TK_DARK`, the KF keyframes
>    string, `Fn` (fonts), `V()` helper, the token aliases (INK,
>    SOFT, MUT, ACC, TINT, T2, LINE, PAPER), the `Slide` wrapper,
>    and the 10 deck-local layouts. **Lines 173–186** also define a
>    `Chart` SVG helper and `Img` placeholder — those are content,
>    NOT layouts; leave them in master-reference.
> 4. Read `themes/taikyoku/components/opening-hero.tsx` and
>    `closing.tsx` as the canonical "how a theme component file is
>    structured" — header comment, hook-free, self-contained `c`/`f`
>    blocks, named export. Match that shape for layouts.
> 5. Read `.claude/agents/compose-deck.md` "Phase 7–9 — Taikyoku
>    composition" section — note that it currently lists the five
>    fixed primitives (`GradientCanvas`, `PaperCanvas`, `Eyebrow`,
>    `AccentRule`, `Folio`) as the chrome; you'll extend it to
>    reference the new layouts/.
>
> ### Phase B — scaffold `themes/taikyoku/layouts/`
>
> Create `themes/taikyoku/layouts/` with twelve files: README.md and
> 11 layout `.tsx` files.
>
> Each layout file follows this shape (drop `Frame` in here as the
> template):
>
> ```tsx
> // ────────────────────────────────────────────────────────────────
> // Frame — the universal content-slide chrome.
> // Production-slide anatomy (COMPOSITION.md §1.5):
> //   eyebrow strip · action title (+ optional subhead) · body region ·
> //   source/method line · folio.
> // Slots:
> //   eyebrow:  string                 — caps eyebrow label
> //   meta?:    string                 — right-side meta string (default: 'Taikyoku')
> //   action:   string                 — the so-what headline (Title Case)
> //   sub?:     string                 — optional one-line subhead
> //   source:   string                 — citation/method line above the folio
> //   folio:    string                 — page X / Y or section · page
> //   jp?:      boolean                — if true: action in HomuraM, sub in Noto Sans JP
> //   children: ReactNode              — the body region (use Rail/Band/TwoUp/AnchoredRail/DenseGrid)
> // Token usage: var(--tk-*, <light>) for every color; fonts are not tokenized.
> // Hook-free — mandatory.
> // ────────────────────────────────────────────────────────────────
> import type { ReactNode } from 'react';
>
> const V = (n: string, f: string) => `var(--tk-${n},${f})`;
> const INK   = V('ink', '#0A0A0A');
> const SOFT  = V('ink-soft', '#3F3F3F');
> const MUT   = V('ink-muted', '#6B6B6B');
> const ACC   = V('accent', '#7030A0');
> const LINE  = V('line', 'rgba(0,0,0,0.12)');
> const PAPER = V('paper', '#FFFFFF');
> const Fn = {
>   display: "'Prata',Georgia,serif",
>   caps:    "'Helvetica Neue','Inter',system-ui,sans-serif",
>   body:    "'Inter',system-ui,sans-serif",
>   mono:    "'JetBrains Mono','SF Mono',monospace",
>   jpD:     "'HomuraM','Noto Serif JP',serif",
>   jpB:     "'Noto Sans JP',system-ui,sans-serif",
> };
>
> export const Frame = ({ eyebrow, meta, action, sub, source, folio, jp, children }: {
>   eyebrow: string; meta?: string; action: string; sub?: string;
>   source: string; folio: string; jp?: boolean; children: ReactNode;
> }) => (
>   /* ... exact body from master-reference lines 73–99, verbatim ... */
> );
> ```
>
> Copy the body verbatim from master-reference. Do NOT touch padding,
> gaps, animation strings, or border widths. Do this for each of the
> 11 layouts. Re-check D4 — every load-bearing detail preserved.
>
> For `AnchoredRail`: a new layout. Spec —
> ```
> flex row, gap 48, height 100%.
> primary: flex 1 1 74%, minWidth 0, minHeight 0, display: 'block'.
> rail:    flex 1 1 26%, minWidth 0, display: 'flex', flexDirection: 'column', gap: 18.
> ```
> Same prop shape as `Rail` (`{ primary, rail }`).
>
> For `DenseGrid`: a new layout. Spec —
> ```
> Props: { cells: ReactNode[]; columns?: 2 | 3 }
> grid container: display: 'grid', gridTemplateColumns: `repeat(${columns ?? 3}, 1fr)`,
>                 gridTemplateRows: '1fr 1fr', gap: 22, height: '100%'.
> each cell:      background alternates TINT / T2 by index, borderTop 1px LINE, padding '22px 24px',
>                 display flex column gap 8, animation `500ms ease-out ${150+i*100}ms both tk-rise`.
> ```
> The reference is master-reference lines 407–422 (the "Density ·
> pushed" slide).
>
> Write `themes/taikyoku/layouts/README.md` as an index — name, one-
> line purpose, when to use it. Mirror `themes/taikyoku/components/`
> if such a README exists there; otherwise create a simple table.
>
> ### Phase C — migrate master-reference to import the layouts
>
> In `Projects/2026-05-19_taikyoku-master-reference/index.tsx`:
>
> 1. Add imports near the top:
>    ```tsx
>    import { Frame, Structural, Rail, Band, TwoUp, AnchoredRail, DenseGrid,
>             Cards, Stat, Insight, LList, Annote }
>      from '../../themes/taikyoku/layouts';
>    ```
> 2. Delete the deck-local definitions (current lines ~67–171, the
>    `Slide` wrapper through `TwoUp`). Keep:
>    - The `TK_LIGHT` / `TK_DARK` constants
>    - The `KF` keyframes string
>    - The `Slide` wrapper component (it owns the per-slide
>      `<style>{KF}</style>` + TK_LIGHT/TK_DARK wrapper — it's the
>      bridge from theme tokens to a slide, not a layout)
>    - The `Fn` constant if it's used by `Chart`/`Img`/inline slides
>      (probably yes — confirm)
>    - `Chart`, `Img`, `Wm` helpers — they're content
> 3. Verify nothing else in the deck references the removed names
>    except via the new imports.
>
> ### Phase D — update the contracts
>
> 1. In `themes/taikyoku.md`, add a "## Layouts" section right after
>    "## Fixed components". List the 11 layouts in a table (name,
>    one-line purpose, named-layout name from COMPOSITION.md §1.5).
>    Add a code example showing the master-reference's first Frame
>    usage (Phase A.3, the "Field" slide). State the
>    transcribe-vs-import asymmetry: "Layouts are imported from
>    `themes/taikyoku/layouts/`. Components remain transcribed into
>    the deck (one-file rule). See COMPOSITION.md §1."
> 2. In `themes/taikyoku/COMPOSITION.md` §1, add a paragraph at the
>    end about layouts:
>    > **Layouts vs components — different lifecycle.** Components
>    > are transcribed into the deck (per-variant specialisation,
>    > frozen-with-deck). Layouts are imported from
>    > `themes/taikyoku/layouts/` (stable theme infrastructure;
>    > consistent across decks). A layout bug-fix DOES propagate to
>    > existing decks — treat layouts as a versioned API.
>    Update §1.5's "Named layouts" subsection to cross-link each
>    layout name to its file (`primary-rail` → `Rail.tsx`, etc.).
> 3. In `.claude/agents/compose-deck.md`, add a new "Phase 12 —
>    Theme layouts" subsection (or extend "Phase 7–9 — Taikyoku
>    composition"):
>    > **Layouts.** The 11 layout primitives at
>    > `themes/taikyoku/layouts/` are theme infrastructure — IMPORT
>    > them, do not transcribe. Each file's header comment is the
>    > authoritative slot/prop contract. The named layouts in
>    > COMPOSITION.md §1.5 map to: `primary-rail` → `Rail`,
>    > `primary-band` → `Band`, `two-up` → `TwoUp`, `anchored-rail`
>    > → `AnchoredRail`, `dense-grid` → `DenseGrid`. `Frame` /
>    > `Structural` wrap each Page; the support kit (`Cards`,
>    > `Stat`, `Insight`, `LList`, `Annote`) composes inside the
>    > body region.
> 4. In `themes/taikyoku/REFINEMENT.md`, add to §1 (the locked
>    constraints index) under "Components & composition" — one bullet
>    referencing the new layouts and the asymmetric lifecycle, with
>    its own appendix entry below recording Phase 12 = layout
>    promotion.
>
> ### Phase E — verify
>
> Run all of these. STOP if any fails.
>
> 1. **Type-check:** `cd engine && pnpm dev` in the background, then
>    in another terminal: `curl -fsS http://localhost:5173/s/2026-05-19_taikyoku-master-reference`
>    returns 200. (Vite will compile on demand; transform errors will
>    show in the dev-server log.)
> 2. **Visual diff:** Open
>    `http://localhost:5173/s/2026-05-19_taikyoku-master-reference`
>    in the browser. Every page must render identically to pre-
>    migration. Pay attention to: zone-fill (the `display:block`
>    rule), the JP slide's HomuraM action title, the dense-grid
>    page's alternating tint/tint-2 cells, the closing's one gold
>    moment.
> 3. **Master-reference line count:** Should drop ~100 lines
>    (deck-local definitions gone).
> 4. **Grep for accidental imports of `react` hooks** inside
>    `themes/taikyoku/layouts/`:
>    `grep -rE "useState|useEffect|useRef|useMemo|useCallback|useReducer|useContext" themes/taikyoku/layouts/`
>    Must return zero. (The HOOK-FREE invariant — REFINEMENT App:
>    count-up hook regression.)
> 5. **Grep for hardcoded hex** inside layouts:
>    `grep -rE '#[0-9A-Fa-f]{6}' themes/taikyoku/layouts/`
>    Every hit should be inside a `var(--tk-NAME, …)` fallback. Bare
>    hex (not in a fallback) means the dark wrapper won't flip it.
>
> ### Phase F — commit
>
> Three commits on the branch:
>
> 1. `feat(layouts): scaffold themes/taikyoku/layouts/ with 11
>    primitives` — Phase B output.
> 2. `refactor(master-reference): import layouts from theme` —
>    Phase C output.
> 3. `docs: document layouts in taikyoku.md / COMPOSITION.md /
>    compose-deck agent / REFINEMENT.md` — Phase D output.
>
> Then open a PR / hand back to the user.
>
> ### Rollback strategy
>
> If Phase E render-diffs (Phase E.2) reveal visual changes that
> can't be explained:
> 1. Revert commit 2 (master-reference back to deck-local
>    definitions) — keeps the new layouts but restores the
>    canonical render.
> 2. Diff `themes/taikyoku/layouts/Frame.tsx` against master-
>    reference's original `Frame` definition character-by-character.
>    Something drifted.
> 3. Don't try to "fix" the layouts to match the new render — the
>    canonical is the pre-migration master-reference.

---

## Out of scope (intentional)

- **Layouts for non-Taikyoku themes.** This file shape is theme-
  specific. If a second theme ever ships, that theme gets its own
  `themes/<theme-id>/layouts/`.
- **Layout `variant` props.** Layouts are deliberately not
  variantable — that's a component concern. If a Rail needs a
  different ratio, write a new layout (or accept it as a one-off
  inline div in the deck).
- **Promoting `Slide` (the per-slide wrapper) into layouts.** `Slide`
  is the bridge from `TK_LIGHT`/`TK_DARK` token objects to a slide
  root, plus the `<style>{KF}</style>` injection. That's deck
  infrastructure (one per deck), not layout infrastructure
  (per-content-page). Keep it in the deck.
- **Auto-migrating archived decks** under `Projects/_archive/`.
  They're frozen historical; don't touch.

## What lands after this

- `themes/taikyoku/layouts/` exists with 11 named exports.
- Master-reference imports them; ~100 lines lighter.
- Every doc tells the same story.
- Next deck (or stream — composition agent, anatomy enforcement
  in compose-deck, etc.) builds on a real first-class layout
  surface, not deck-local scaffolding.
