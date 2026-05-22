---
doc: taikyoku-composition
status: active
owns: how compose-deck assembles a deck from the Tier 1 component library
read-with: ../taikyoku.md (theme contract) · ./REFINEMENT.md (decision log)
  · engine slide-authoring SKILL.md (generic open-slide technical truth)
authored: 2026-05-19 (Phase 10 prep — the compose-deck ↔ library wiring)
---

# Taikyoku — composition spec

The Tier 1 component library (`themes/taikyoku/components/`, 19
components) is the assembly kit. **This doc owns the *how*: storyboard
beat → component(s) → assembled Pages.** It does not redefine the theme
(that's `taikyoku.md`) or generic open-slide mechanics (that's the
engine `slide-authoring` skill). It supersedes the compose-deck agent's
old "Phase 6 — Taikyoku-aware composition" section wherever they differ
(the old section predates Phases 7–9 and is stale on breath, gold,
fonts, and the library's existence).

## 1. The component model

Two kinds of components — this is the central assembly rule:

- **Full-slide archetypes own their canvas.** `opening-hero`,
  `section-divider`, `closing`, `image-led` render the whole slide
  (gradient or paper, padding, the lot). One of these *is* a Page —
  drop it in directly.
- **Canvas-agnostic content blocks.** The other 15 render only their
  content and assume a parent supplies the paper canvas + 100px
  padding. A Page that uses one (or composes a few) wraps them in a
  `PaperCanvas`. This is the Phase 7 "components compose into Pages"
  decision.

Every component is **self-contained** (redeclares its `c` tokens + `f`
font roles inline — never import shared tokens; portability rule).

**Transcribe, don't import (Phase 10 finding — important).** A composed
`Projects/<slug>/index.tsx` is **one file** (compose-deck hard rule #1).
It does **not** `import` from `themes/taikyoku/components/`. You
**transcribe** the components a deck uses *into* `index.tsx`,
**specialised to the chosen variant/density** (drop the variant
branches the deck doesn't use), sharing one token/`styles` block. The
library is the **spec / source-of-truth**, not a runtime dependency.
Consequence to accept: a composed deck is frozen — later library
bug-fixes do **not** propagate to decks already composed (decks are
git-versioned artifacts; re-compose if a deck must pick up a library
change). Reproduce dimensions/motion faithfully — they are load-bearing.

Naming is **by intended use**, not layout. The catalog:

| Component | Use | Variants | Density | Canvas |
| --- | --- | --- | --- | --- |
| `opening-hero` | deck cover | — | fixed (text+graphics; **no visual slot**) | full (gradient) |
| `section-divider` | chapter divider | — (gradient-variant prop) | fixed | full (gradient) |
| `closing` | sign-off | — | fixed | full (paper) |
| `image-led` | image carries it | full-bleed / framed | fixed | full (own) |
| `deck-contents` | "what's in this deck" | agenda-grid / progress-map | fixed | block |
| `quarterly-metrics` | metrics row | hero-supporting / metric-delta | lean/standard/rich | block |
| `headline-metric` | the one number | — | fixed | block |
| `chart-hero` | chart + interpretation | narrative side / below | lean/standard/rich | block |
| `quadrant` | 2×2 positioning | — (highlightQuadrant) | lean/standard/rich | block |
| `product-comparison` | A-vs-B w/ a pick | (rowLabels + accentColumn) | lean/standard/rich | block |
| `before-after` | transformation | stacked-overlay / diff-list | lean/standard/rich | block |
| `value-grid` | 3 value cards | (surface bare/tint/tint2) | lean/standard/rich | block |
| `timeline` | past event sequence | milestones / phased | lean/standard/rich | block |
| `roadmap` | forward plan | quarter-columns / swimlanes / now-next-later | lean/standard/rich | block |
| `process-flow` | linear workflow | — (per-step status) | lean/standard/rich | block |
| `methodology` | conceptual framework | stack / loop / pillars | lean/standard/rich | block |
| `customer-voice` | testimonial | — | lean/standard/rich | block |
| `bio-card` | people | spotlight / grid / lead-supporting | fixed | block |
| `logo-cluster` | social proof | — (monochrome toggle) | lean/standard/rich | block |

Per-component slots/props: read the header comment in each component
file (authoritative). Per-archetype design intent: REFINEMENT.md
Session B.

**Layouts vs components — different lifecycle.** Components are
transcribed into the deck (per-variant specialisation,
frozen-with-deck). **Layouts are imported from
`themes/taikyoku/layouts/`** (stable theme infrastructure; consistent
across decks). A layout bug-fix DOES propagate to existing decks —
treat layouts as a versioned API; breaking changes need a deliberate
beat. See `themes/taikyoku/layouts/README.md`.

## 1.5 Slide anatomy + multi-component grammar (Phase 11 — READ THIS)

**The empty-slide failure mode and its fix.** A beat mapped to one
austere component, dropped alone on a centred canvas, reads as *empty*,
not restrained. Components keep their approved (deliberately austere)
densities — **fullness is achieved by COMPOSITION, never by inflating a
component**. Every content slide is built to a fixed *anatomy* and a
named *layout*; a lone centred component is **forbidden**.

### Production-slide anatomy (every content slide has all five)

1. **Eyebrow strip** — section/eyebrow label + right-side meta. Always.
2. **Action title** — a Prata headline that states the *conclusion*
   (the "so-what"), not a topic label ("Pipeline shifted to self-serve",
   not "Pipeline"). Optional one-line descriptive subhead beneath.
3. **Body region** — a **primary** element (the beat's hero component)
   **plus a supporting cluster of ≥2 secondary elements**: a secondary
   component, a stat callout, an annotation/insight, a short labelled
   list, a mini-comparison. The body fills the region — no vast centred
   air.
4. **Source / method line** — a small mono/caps line above the folio
   (production decks always cite: "Source: …", "n = …", "FY25→26").
5. **Folio** — section name + page X / Y. Always on content slides.

Full-slide archetypes (`opening-hero`, `section-divider`, `closing`,
`image-led`) are the exception — they ARE the slide and keep their own
composition (but a cover/closing still earns a sub/meta line).

### Density floor (hard rule)

A content slide carries **chrome + action title + ≥3 distinct content
elements (primary + ≥2 supporting) + a source line**, and fills
**≈85–90 %** of the 1920×1080 canvas (≤ ~120px true dead margin). If a
beat only yields one element, the storyboard is under-planned — surface
it; do not ship the sparse slide.

### Named layouts (the organisation logic — pick one per beat)

Each is a zone map with size budgets (after the 100px pad; usable ≈
1720×880 under the action title):

- **`primary-rail` (62 / 38)** — primary component left ~62%; a right
  rail (~38%) stacked with 2–3 supports (stat callout, insight, source
  block). The default for chart/metric/comparison beats. → `Rail.tsx`
- **`primary-band` (top 64 / bottom 30)** — primary across the top; a
  bottom band of 2–4 equal support cells (mini-stats, takeaways). →
  `Band.tsx`
- **`two-up`** — two co-equal components side by side under one action
  title + a shared takeaway strip (e.g. chart ⟷ comparison). →
  `TwoUp.tsx`
- **`anchored-rail`** — full-width primary with a thin (~26%) right
  annotation/footnote rail (insights, definitions, source). →
  `AnchoredRail.tsx`
- **`dense-grid`** — action title + a 2×2 / 2×3 grid of small
  components or callout cells; the densest layout. → `DenseGrid.tsx`

(All five live at `themes/taikyoku/layouts/`. `Frame.tsx` / `Structural.tsx`
wrap each Page; the support kit — `Cards`, `Stat`, `Insight`, `LList`,
`Annote` — composes inside the body region.)

Supporting elements draw from a small **support kit** (compose inline,
theme-token styled): *stat-callout* (mono figure + caps label),
*insight* (accent dot + one sharp sentence), *labelled-list* (3–4
tracked-caps items + values), *annotation* (italic-Prata aside),
*mini-source* (mono). These are not new library components — they are
slide furniture the composer assembles to satisfy the density floor.

### Mode + chrome still apply

The whole slide sits inside the per-deck `TK_LIGHT`/`TK_DARK` wrapper
(§1.x / taikyoku.md). Chrome (eyebrow, action title, source, folio) uses
`var(--tk-*)` tokens so it flips with the deck.

## 2. Beat → component mapping

The storyboard gives beats with `purpose`, `key_message`, optional
`bullets`/`notes`. Map purpose (and the notes' intent) to a component:

| Storyboard purpose / intent | Component (variant) |
| --- | --- |
| cover | `opening-hero` |
| section / divider | `section-divider` |
| closing / thanks / CTA | `closing` |
| agenda / contents | `deck-contents` (agenda-grid; progress-map if re-shown) |
| metrics / KPIs / "the numbers" | `quarterly-metrics` (metric-delta if deltas; hero-supporting if one lead) |
| a single decisive number | `headline-metric` |
| chart / trend | `chart-hero` |
| landscape / positioning | `quadrant` |
| us-vs-them / option compare | `product-comparison` |
| before/after / migration | `before-after` |
| value props / why-this-matters | `value-grid` |
| history / "how we got here" | `timeline` |
| plan / roadmap | `roadmap` |
| process / how we engage | `process-flow` |
| framework / model | `methodology` |
| quote / testimonial | `customer-voice` |
| team / founders | `bio-card` |
| customers / partners proof | `logo-cluster` |
| big image / field shot | `image-led` |

Density from the storyboard's beat density (recipe) where the component
has a density prop; fixed-density components ignore it. Variant from
the beat's notes/intent; if ambiguous pick the most restrained and
flag it in the return summary. A beat may compose **two** blocks on one
PaperCanvas (e.g. a `headline-metric` + a small `logo-cluster`) — keep
the 1920×1080 vertical budget (engine slide-authoring math still
applies).

## 3. Locked doctrine (corrects the stale agent section)

These are the Phase 7–9 decisions the composer MUST honor — they
**reverse** the compose-deck agent's pre-Phase-7 "Phase 6" text:

- **Gold is a deck-level assignment.** `accent-hot #FFE1A4` is used
  **once per deck**, and `compose-deck` must *consciously choose* the
  one slide — it is NOT auto-claimed by the closing. `closing`'s
  `goldMoment` prop defaults **false**; set it true on exactly one
  Page, or assign gold to one other deliberate spot, and flag the
  choice. A deck may ship with no gold; never two.
- **No breath. No ambient motion.** `tk-breath` was removed entirely.
  The cover does **not** breathe. Motion vocabulary is exactly:
  `tk-fadeUp`, `tk-fadeIn`, `tk-grow`, `tk-growY`, `tk-rise`,
  `tk-draw`. `tk-growY` (vertical structural lines) was added Phase 9.
  Nothing loops. **Exception (2026-05-19):** a one-time **count-up** is
  sanctioned on **large metric figures only** — the `headline-metric`
  value and `quarterly-metrics` hero-lead (built into those components;
  reduced-motion-aware, no layout shift). Never elsewhere. See
  taikyoku.md → "Count-up — SANCTIONED".
- **Fonts:** Helvetica Neue (Inter fallback) for caps/eyebrow/folio —
  **not Archivo**. Prata = display + card titles + plotted labels.
  Prata-italic = person/attribution roles + card role-kicker only.
  Cinzel = the (parked) wordmark only. JP: HomuraM display/headline,
  **Noto Sans JP body**.
- **`WordmarkLockup` and `KanjiSeal` are parked/deferred** — do not
  build them and do not "refuse" decks that want a wordmark/seal;
  instead use the brand logo as an **image asset** (below) and flag.
- **Surfaces:** flat ramp `paper / paper-tint / paper-tint-2`, no
  shadows, no gradient card fills. **Three reds**: `accent`
  (purple, decorative), `accent-negative #9B2226` (data-negative /
  blocked step only), `brand-red #C00000` (reserved, unused — seal
  deferred). Never substitute one red for another.
- **Headlines = Title Case.** Eyebrow/folio = tracked CAPS. Body =
  sentence case.
- **Light / dark is per-deck (mono-mode, like language).** Components
  reference `var(--tk-*, <light>)`. **Scope the mode vars to a
  per-slide wrapper, NEVER `:root`** (a `:root` block leaks globally and
  contaminates light pages — confirmed bug 2026-05-19). Declare
  `TK_LIGHT` / `TK_DARK` objects (taikyoku.md → "Theming tokens") and
  wrap **every Page's content** in
  `<div style={{ ...(TK_DARK|TK_LIGHT), width:'100%', height:'100%' }}>`.
  Light deck → wrap in `TK_LIGHT`; dark deck → wrap in `TK_DARK`. One
  decision per deck; everything (gradient, ink, accent, paper-tint, the
  monochrome-logo filter) flips from the wrapper — no per-component
  work. Never mix modes in one deck. Keep the components'
  `var(--tk-*, …)` values **verbatim** when transcribing (never
  re-hardcode the hex).

## 4. Language model (Phase 8/Session C)

- A production deck is **mono-language**: all-English (with limited,
  relevant Japanese) **or** all-Japanese (with limited, relevant
  English). There is **no same-slide bilingual mirror** in production
  (Session C C13 superseded). The storyboard/memo's language stance
  decides; default English.
- Separate-slide EN→JP is a **reference/gallery convention only**, not
  production.
- English voice: 60/40 institutional-lean; measured body (~15–25
  words/sentence), punch rationed to the headline + one accent line;
  forbidden hype + AI-tell word-lists apply; **em-dashes are permitted
  house style — never flag or strip them**. Japanese: role-mapped
  register (常体/体言止め headlines, 丁寧語 body, 敬語 external-only);
  strict typeset, katakana-tolerant. Full lists: taikyoku.md "Voice &
  language".

## 5. Assets & finalize

- **Images/logos** ship as **per-deck image assets** imported via Vite
  from `Projects/<slug>/assets/` (e.g. `import logo from
  './assets/tkyk-mark.svg'`). A relative `url()` in a `<style>` string
  is NOT served — use the import form. Single-file HTML is sacrificed
  (accepted).
- **Japanese decks:** the deck imports its **own subset** HomuraM from
  `./assets/fonts/` (see taikyoku.md font-loading — the Vite-import
  `@font-face` form). After composing a JP deck, the finalize step runs
  `scripts/da2-subset-fonts.sh <slug>` (≈97% smaller) before browser
  export; `da2-finalize.sh` warns if a deck still imports the shared
  14MB theme fonts. compose-deck should emit this reminder in its
  return summary for any JP deck.

## 6. compose-deck return summary additions

On top of the existing return contract, the composer must also report:
which library components (+ variants/density) each beat mapped to; the
chosen gold slide (or "no gold"); language mode; any beat where the
variant was ambiguous and the restrained default was used; and — for
JP decks — the `da2-subset-fonts.sh` reminder.
