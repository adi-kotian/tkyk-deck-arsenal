---
doc: taikyoku-layouts
status: active — Phase 12 (layout-promotion)
owns: theme-level layout primitives + support kit
read-with: ../COMPOSITION.md §1.5 (slide anatomy + multi-component grammar)
  · ../taikyoku.md (theme contract — "Layouts" section)
---

# Taikyoku — Layouts

The 11 layout primitives the composer assembles content into. Each file's
header comment is the authoritative slot/prop contract — read it before
using.

**Imported, not transcribed.** A deck does `import { Frame, Rail, ... }
from '../../themes/taikyoku/layouts'` — the asymmetric counterpart to the
component library, which is transcribed into each deck (COMPOSITION.md
§1). A layout bug-fix DOES propagate to existing decks; treat layouts as
a versioned API.

**Hook-free — mandatory.** No React hooks anywhere in this directory.
(`useState`/`useEffect`/etc. blanked a deck once; permanent ban.)

## Layouts

### Chrome wrappers (one wraps every content slide)

| File | Use |
| --- | --- |
| `Frame.tsx` | Universal content-slide chrome: eyebrow strip · action title (+ sub) · body region · source/method · folio. `jp` prop switches the action title to HomuraM. |
| `Structural.tsx` | Variant of Frame for components that own their own eyebrow + heading (e.g. `deck-contents`). Drops Frame's eyebrow/title so chrome doesn't echo; keeps source + folio + optional support row. |

### Named body layouts (pick one per content beat)

| File | COMPOSITION.md name | Shape |
| --- | --- | --- |
| `Rail.tsx` | `primary-rail` | 62 / 38 — primary left, supporting rail right |
| `Band.tsx` | `primary-band` | Top 64 / bottom 30 — primary, bottom band of equal cells |
| `TwoUp.tsx` | `two-up` | Two co-equal components + shared takeaway strip |
| `AnchoredRail.tsx` | `anchored-rail` | Full-width primary + thin (~26 %) right rail |
| `DenseGrid.tsx` | `dense-grid` | 2×2 / 2×3 grid of small cells (the densest layout) |

The primary zone slots use `display:'block'` so a block-level component
fills 100 % of the zone width — load-bearing; see COMPOSITION.md
"organisation logic" + Phase-11 feedback round 1 in REFINEMENT.md.

### Support kit (slide furniture, composed inline)

| File | Use |
| --- | --- |
| `Cards.tsx` | Row of 2–4 evidence cards — accent kicker + short body |
| `Stat.tsx` | Single stat callout — mono figure + caps label + optional context |
| `Insight.tsx` | Accent dot + one sharp sentence |
| `LList.tsx` | Labelled list — tracked-caps key / mono value rows |
| `Annote.tsx` | Italic-Prata aside (margin-note register) |

These aren't full components (they're slide furniture). Compose them
inside a `Rail`'s `rail`, a `Band`'s `cells`, etc.

## Naming + shape conventions

- **PascalCase per file.** `Frame.tsx` exports `{ Frame }`. Default
  exports are prohibited (asymmetric with the component library, which
  uses default + named; layouts use named only for consistency at the
  barrel).
- **Per-file portability.** Each file redeclares its own `V()` helper +
  the `var(--tk-NAME, <light-hex>)` tokens it uses + the `Fn` font roles
  it uses. Same rule as the component library.
- **No `:root` ever.** Mode tokens (TK_LIGHT / TK_DARK) live on the
  per-slide wrapper in the deck, never `:root`. Layouts only read them
  via `var(--tk-*)`.

## What's intentionally not here

- **`Slide` (the per-slide TK_LIGHT/TK_DARK wrapper + `<style>{KF}</style>`
  injection)** stays deck-side. It's deck infrastructure (one per deck),
  not layout infrastructure (per-content-page).
- **Layout `variant` / `density` props.** Layouts don't variant — that's
  a component concern. If a Rail needs a different ratio, write a new
  layout (or accept a one-off inline div).
- **Content helpers.** `Chart` / `Img` / `Wm` placeholders stay deck-side
  — they're content, not layout.

## Provenance

Promoted from `Projects/2026-05-19_taikyoku-master-reference/index.tsx`
(deck-local definitions, Phase 11). See `briefs/stream-2-layout-
promotion.md` for the design decisions (D1–D7) and REFINEMENT.md §1
(Components & composition) for the locked rule.
