---
name: Taikyoku
description: Light editorial deck — cool→warm gradient on cover and section, paper-white content slides, Prata headlines, Helvetica Neue caps, single purple accent with gold as a one-moment hot, plus a Japanese/bilingual register. Synthesis of Aurora's structural restraint and a Stripe/Linear product-launch tone, refined to a production brand system in Phase 7.
---

# Taikyoku

> **Contract version: Phase 7-reconciled (2026-05-18).** This document
> was reconciled from the approved Phase 7 refinement interview
> (`themes/taikyoku/REFINEMENT.md`, Sessions A + B + C). For the full
> decision rationale and the Phase 8/9 `PENDING` work queue, read
> REFINEMENT.md — it is the source of truth; this file is the
> implementable contract.
>
> **Compatibility note (no regression):** `themes/taikyoku.demo.tsx`
> and `Projects/2026-05-15_da2-retrospective/` predate this contract
> version. They use Archivo caps and sentence-case headlines. That is
> **frozen historical reference, not a regression** — per the brief's
> no-breaking-change constraint they are not re-cased or re-fonted
> unless deliberately touched later. New decks follow this contract.
>
> **Provisional values:** new color hexes below tagged `PROVISIONAL`
> are starting points; exact values are confirmed in Phase 8/9 against
> the brand assets / rendered fonts (tracked as `PENDING` in
> REFINEMENT.md).

The visual identity is a **two-canvas** deck. Cover and section dividers
carry the signature cool→warm gradient. Content slides drop to paper
white. Across both canvases, one purple accent, one gold "hot" assigned
to a single deliberately-chosen moment per deck, and motion that's
considered but not austere.

Reads like a Stripe or Linear product-launch deck rendered in McKinsey
ink — sharp, confident, with one moment of visual delight per page. The
voice leans 60/40 toward institutional credibility (see Voice &
language).

## Palette

| Role               | Value                          | Notes                                                       |
| ------------------ | ------------------------------ | ----------------------------------------------------------- |
| bg-gradient-cool   | `#A6C9EB`                      | gradient cool stop (12% on cover and section) — default variant |
| bg-gradient-warm   | `#FFE9BF`                      | gradient warm stop (100%) — default variant                 |
| bg-gradient-angle  | `330deg`                       | the diagonal — never rotate, never per-variant              |
| paper              | `#FFFFFF`                      | content slide background (surface level 0)                  |
| paper-tint         | `#F4F7FB`                      | cool-tinted card surface (surface level 1)                  |
| paper-tint-2       | `#E9EEF4`                      | deeper cool grey — nested/layered cards, highlighted quadrant (surface level 2). Locked Phase 8 Conflict 5. |
| ink                | `#0A0A0A`                      | body & display text (slightly off-pure black, softer)       |
| ink-soft           | `#3F3F3F`                      | de-emphasised runs, secondary headers                       |
| ink-muted          | `#6B6B6B`                      | folios, captions, eyebrow meta                              |
| ink-faint          | `#AFAFAF`                      | separators, deemphasised labels                             |
| accent             | `#7030A0`                      | purple — load-bearing single accent (eyebrow dot, AccentRule, hot spans inside headlines, SVG strokes) |
| accent-hot         | `#FFE1A4`                      | gold — reserved. One deck-assigned moment, never more (see Gold rule) |
| accent-negative    | `#9B2226`                      | **semantic red** — data-negative ONLY (deltas/series down) **and** blocked workflow step. Never decorative, never prose/headlines. Locked Phase 8: deep brick-crimson, deliberately darker/cooler than `brand-red` so it never reads as the seal on the same slide; legible on paper + dark; distinct from gold. |
| brand-red          | `#C00000` ⚠️ RESERVED/UNUSED   | Was the KanjiSeal seal red. **Seal deferred 2026-05-18** — token reserved (value kept = Brand Style Brief), currently no consumer. Do not use until the seal's replacement is designed. |
| line               | `rgba(0,0,0,0.12)`             | hairline borders                                            |
| rule               | `rgba(0,0,0,0.40)`             | hero horizontal rule under titles                           |

**Three reds, non-overlapping roles** (Session B cross-cutting #3, widened
by Session C C2/Archetype 17): `accent-negative` = data-negative + blocked
process step; `brand-red` = KanjiSeal ornament. They are separate tokens
with disjoint roles — `compose-deck` must never swap one for the other.
Magenta stays deferred (not in v1).

### Gradient variants (industry tints — Session A Topic 5)

Industry differentiation is confined to the **two gradient stops only**.
Paper, ink, accent, and gold never change. Angle stays `330deg`. Per-deck
opt-in; default is the cool→warm pair above.

| Variant       | Cool stop         | Warm stop         | Use                    |
| ------------- | ----------------- | ----------------- | ---------------------- |
| cool-default  | `#A6C9EB`         | `#FFE9BF`         | default — most decks   |
| earth         | `PENDING`         | `PENDING`         | mining / industrials   |
| warm-energy   | `PENDING`         | `PENDING`         | energy / climate       |

(2–3 variants total; `earth`/`warm-energy` stops specified in Phase 8.)

### Dark variant — PRODUCTION (token indirection, 2026-05-19)

A **night** reading (light = daytime sky→sun; dark = deep indigo →
ashen moonlit grey, overall dark, faint-ivory ink; supersedes the Brand
Style Brief's navy→gold inversion; gold unchanged, still carries the
one-moment). It was spiked on `Projects/2026-05-18_taikyoku-dark-spike/`
(Session A Topic 6 — 4 archetypes, light→dark), the palette was
**accepted by the user 2026-05-18**, and the **token-indirection
refactor was completed 2026-05-19**: all 19 library components reference
`var(--tk-*, <light>)`, so a deck flips to dark by setting the `--tk-*`
block once at `:root` (next subsection). **Dark is now
production-available** per deck (mono-mode like language — a deck is
light *or* dark). Spike + go/no-go history:
`themes/taikyoku/REFINEMENT.md` → Phase 9 Increment 3 + dark-mode phase.
Canonical dark reference: `Projects/2026-05-18_taikyoku-dark-spike/`.

### Theming tokens `--tk-*` — light & dark (productionized 2026-05-19)

Dark is now **production-available via CSS-variable token indirection**.
**Convention change (supersedes "redeclare hardcoded hex inline"):**
component token values are `var(--tk-NAME, <light-hex>)` — the light
hex is the **fallback**, so a component still renders correctly
standalone with no variables set (portability preserved), and a deck
flips to dark by setting the `--tk-*` block **once** at `:root`. Fonts
are mode-invariant (not tokenized). The authoritative set:

| `--tk-*` | Light (fallback) | Dark (accepted palette) |
| --- | --- | --- |
| `--tk-grad-cool` | `#A6C9EB` | `#151030` |
| `--tk-grad-warm` | `#FFE9BF` | `#8B8B96` |
| `--tk-grad-cool-pos` | `12%` | `40%` |
| `--tk-paper` | `#FFFFFF` | `#141029` |
| `--tk-paper-tint` | `#F4F7FB` | `#201A3C` |
| `--tk-paper-tint-2` | `#E9EEF4` | `#2A2452` ¹ |
| `--tk-ink` | `#0A0A0A` | `#E6E0CE` |
| `--tk-ink-soft` | `#3F3F3F` | `#ACA6BC` |
| `--tk-ink-muted` | `#6B6B6B` | `#786F92` |
| `--tk-ink-faint` | `#AFAFAF` | `#5A5478` ¹ |
| `--tk-accent` | `#7030A0` | `#B388E0` |
| `--tk-accent-hot` | `#FFE1A4` | `#FFE1A4` (unchanged) |
| `--tk-accent-negative` | `#9B2226` | `#E26D6F` |
| `--tk-line` | `rgba(0,0,0,0.12)` | `rgba(230,224,206,0.14)` |
| `--tk-rule` | `rgba(0,0,0,0.40)` | `rgba(230,224,206,0.34)` ¹ |
| `--tk-logo-filter` | `grayscale(1) brightness(0)` | `grayscale(1) brightness(0) invert(1)` |

¹ Derived from the accepted spike palette (interpolated consistently;
the spike approved canvas/panel/ink/accent/negative/line directly).

**⚠️ Scope the vars to a PER-SLIDE WRAPPER — never `:root`.**
open-slide injects each page's `<style>` into the shared document and
slide DOM coexists; a `:root` declaration is **global and persists**,
so a dark page would bleed into every light page (and across deck
revisits). Confirmed bug 2026-05-19. The vars must live as **inline
custom properties on a full-bleed wrapper element** that each Page's
content sits inside — inline custom properties cascade only to that
element's subtree, so light/dark can never contaminate each other and
there is zero global state.

Pattern (in `index.tsx`): declare two plain objects and wrap every
Page's content in a vars div:

```tsx
const TK_LIGHT: Record<string,string> = {
  '--tk-grad-cool':'#A6C9EB','--tk-grad-warm':'#FFE9BF','--tk-grad-cool-pos':'12%',
  '--tk-paper':'#FFFFFF','--tk-paper-tint':'#F4F7FB','--tk-paper-tint-2':'#E9EEF4',
  '--tk-ink':'#0A0A0A','--tk-ink-soft':'#3F3F3F','--tk-ink-muted':'#6B6B6B','--tk-ink-faint':'#AFAFAF',
  '--tk-accent':'#7030A0','--tk-accent-hot':'#FFE1A4','--tk-accent-negative':'#9B2226',
  '--tk-line':'rgba(0,0,0,0.12)','--tk-rule':'rgba(0,0,0,0.40)',
  '--tk-logo-filter':'grayscale(1) brightness(0)',
};
const TK_DARK: Record<string,string> = {
  '--tk-grad-cool':'#151030','--tk-grad-warm':'#8B8B96','--tk-grad-cool-pos':'40%',
  '--tk-paper':'#141029','--tk-paper-tint':'#201A3C','--tk-paper-tint-2':'#2A2452',
  '--tk-ink':'#E6E0CE','--tk-ink-soft':'#ACA6BC','--tk-ink-muted':'#786F92','--tk-ink-faint':'#5A5478',
  '--tk-accent':'#B388E0','--tk-accent-hot':'#FFE1A4','--tk-accent-negative':'#E26D6F',
  '--tk-line':'rgba(230,224,206,0.14)','--tk-rule':'rgba(230,224,206,0.34)',
  '--tk-logo-filter':'grayscale(1) brightness(0) invert(1)',
};
// every Page: <div style={{ ...(TK_DARK | TK_LIGHT), width:'100%', height:'100%' }}>…</div>
```

- **Light deck:** wrap in `TK_LIGHT` (explicit — robust even if some
  other page set vars). The component `var(…, <light>)` fallbacks make
  this belt-and-suspenders, but always wrap so the deck is
  self-contained.
- **Dark deck:** wrap in `TK_DARK`. Mode is **per-deck, mono-mode**
  (like language) — a deck is light *or* dark; never mix within a deck
  in production (the validation deck mixes only to compare, each page
  in its own scoped wrapper).

Gradient is composed as
`linear-gradient(330deg, var(--tk-grad-cool,#A6C9EB) var(--tk-grad-cool-pos,12%), var(--tk-grad-warm,#FFE9BF) 100%)`.

## Typography

- **Display:** `'Prata', Georgia, 'Times New Roman', serif` — weight 400.
  Editorial seriousness; the only thing that breathes. Also used in
  **non-headline roles**: card titles and 2×2 plotted-item labels at
  smaller sizes (Session B cross-cutting #2).
- **Caps / eyebrow / folio:** `'Helvetica Neue', 'Inter', -apple-system,
  BlinkMacSystemFont, system-ui, sans-serif` — Helvetica Neue handles
  tracked caps cleanly; **Inter is the Google-Fonts fallback** when
  Helvetica Neue isn't installed. Replaces Archivo from the synthesis
  theme (Session A / brief Typography lock).
- **Wordmark:** `'Cinzel', serif` — **only** in the WordmarkLockup
  (TAIKYOKU · 大局). Never for general eyebrows. Cinzel cap-height is
  optically matched to the 大 kanji-square inner height (full ≈44px,
  mini ≈20px, tracking ≈0.18em — Session A Topic 3); size derives from
  the square, not a magic px.
- **Japanese — split roles (refined Phase 8 post-verification,
  2026-05-18):**
  - **Display / headlines / large kanji → HomuraM**, bundled at
    `themes/taikyoku/assets/fonts/` (converted from the licensed brand
    `.otf`): `HomuraM-SemiBold.woff2` (w600) JP headlines/emphasis;
    `HomuraM-Display.woff2` (w700) large section kanji (大局, section
    numbers). `HomuraM-Medium.woff2` (w500) retained but **no longer the
    body face**. HomuraM `@font-face`: `local()` → bundled woff2 →
    **Noto Serif JP** fallback.
  - **Body prose → Noto Sans JP** (Google Fonts, w400/500). Chosen to
    mirror the Latin body (Inter, sans): the theme is serif-display +
    sans-body in both scripts. The brush-serif HomuraM reads heavy at
    body size; Noto Sans JP is cleaner for running Japanese text.
  - **Supersedes** Session A Topic 1 ("HomuraM Medium = JP body") and
    the Topic 2 CJK-body row — those stand as history; this is the
    governing rule.

### Japanese font loading (@font-face — Vite-import form)

⚠️ **A relative `url('…/fonts/*.woff2')` string inside a `<style>`
block does NOT serve under open-slide** (returns the SPA shell —
confirmed Phase 8). The working pattern is to **import the woff2 as
URL assets** (proven 2026-05-18 — the same mechanism the logo uses)
and interpolate the imported URLs into the `@font-face` `src`:

```tsx
import homuraMedium   from '../../themes/taikyoku/assets/fonts/HomuraM-Medium.woff2';
import homuraSemiBold from '../../themes/taikyoku/assets/fonts/HomuraM-SemiBold.woff2';
import homuraDisplay  from '../../themes/taikyoku/assets/fonts/HomuraM-Display.woff2';

const styles = `
@font-face { font-family:'HomuraM'; src:local('HomuraM-Medium'),url(${homuraMedium}) format('woff2'); font-weight:500; font-display:swap; }
@font-face { font-family:'HomuraM'; src:local('HomuraM-SemiBold'),url(${homuraSemiBold}) format('woff2'); font-weight:600; font-display:swap; }
@font-face { font-family:'HomuraM'; src:local('HomuraM-Bold'),url(${homuraDisplay}) format('woff2'); font-weight:700; font-display:swap; }
`;
```

The relative-`import` path is resolved by Vite (cross-dir into the
theme bundle is allowed — no per-deck font duplication). Single-file
HTML portability is sacrificed (user-accepted; brief-deprioritised).

**Two Japanese stacks (Phase 8 split):**

- Display / headline / large kanji: `'HomuraM', 'Noto Serif JP', serif`
  (bundled woff2 above; Noto Serif JP is the real fallback — load
  `Noto+Serif+JP:wght@500;600;700` via Google Fonts).
- **Body prose: `'Noto Sans JP', system-ui, sans-serif`** — load
  `Noto+Sans+JP:wght@400;500` via Google Fonts. Not bundled (Google
  Fonts is fine for the body face); mirrors the Inter sans Latin body.

**Per-deck subsetting (Phase 9 — shipped).** The three full HomuraM
woff2 in `themes/taikyoku/assets/fonts/` (~5MB each, ~14MB total) are
the **source-of-truth, not what a deck ships**. Before finalizing a
deck that uses Japanese, run:

```
./scripts/da2-subset-fonts.sh <slug>
```

It scans the deck's `*.tsx` for the codepoints actually rendered (+ an
ASCII/JP-punctuation/kana safety base), subsets the three fonts into
`Projects/<slug>/assets/fonts/HomuraM-*.woff2`, and the deck imports
**its own subset** (`./assets/fonts/HomuraM-*.woff2`) — typically
**~120KB each, ~97% smaller**. Glyphs not in the deck degrade to Noto
Serif JP (the fallback). Re-run after editing deck text. `da2-finalize`
emits a reminder if a deck still imports the shared theme fonts. The
theme woff2 are never modified.
- **Mono:** `'JetBrains Mono', 'SF Mono', 'Menlo', monospace`. Scope
  (Session A Topic 4): numerics + technical/literal strings — page
  counter, tabular metric figures, dates in meta strips, version tags,
  API names, dimensions, file paths, roadmap quarter labels. **Never**
  prose, labels, or headings.

**Prata-italic convention** (Session B cross-cutting #1 → widened at
Phase 8 Conflict 2): Prata *italic* is for **(a) person / attribution
role labels** (bio role, pullquote attribution role) **and (b) the card
role-word kicker** — a small italic-Prata kicker above a card title
(brand-brief cue). It is **not** for the card *title* (that is Prata
non-italic, Archetype 16) nor for generic systemic labels (eyebrow /
folio / TOC = Helvetica Neue tracked caps). This evolves cross-cutting
#1's "person-only" wording; the original entry stands as history.

Source via Google Fonts (`Prata`, `Cinzel:wght@500;600`,
`Inter:wght@400;500;700`, `JetBrains+Mono:wght@500;700`,
`Noto+Serif+JP:wght@500;600`) — see Example usage. Helvetica Neue is a
system font (not loaded); Inter is its loaded fallback.

### Type scale (1920 × 1080 canvas)

CJK runs render at a **per-role ratio** of the Latin token (Session A
Topic 2), not one global multiplier: display kanji ≈0.92× @ ~1.05 line-
height (set tight); body kanji ≈0.88× @ ~1.75 line-height (set loose).
Ratios are starting points to tune against rendered HomuraM.

| Element              | Size      | Weight  | Line  | Tracking      | Notes                          |
| -------------------- | --------- | ------- | ----- | ------------- | ------------------------------ |
| Hero title           | 168 px    | 400 Prata | 0.96 | -0.03em       | cover only; Title Case         |
| Page heading (h2)    | 88–104 px | 400 Prata | 1.02 | -0.02em       | content pages; Title Case      |
| Section number       | 144 px    | 400 Prata | 1.0  | -0.02em       | section divider only           |
| Card title           | 60 px     | 400 Prata | 1.05 | -0.01em       | **now Prata** (was 900 Archivo) — Session B Archetype 16 |
| Plotted-item label   | 30–34 px  | 400 Prata | 1.1  | normal        | 2×2 quadrant points — Session B Archetype 18 |
| Eyebrow              | 22 px     | 700 Helv. Neue | 1.0 | 0.22em   | tracked caps, uppercase        |
| Eyebrow meta         | 20 px     | 500 Helv. Neue | 1.0 | 0.16em   | the right-side run             |
| Role label (person)  | 26–28 px  | 400 Prata *italic* | 1.3 | normal | bio / pullquote attribution      |
| Card role kicker     | 24–26 px  | 400 Prata *italic* | 1.2 | normal | small kicker above a card title (Conflict 2) |
| Body lead            | 32–36 px  | 500 Inter | 1.4–1.5 | normal      | the paragraph under a heading  |
| Body                 | 26–28 px  | 500 Inter | 1.55 | normal        | card body, content prose       |
| Folio                | 20 px     | 700 Helv. Neue | 1.0 | 0.16em   | bottom strip, section name     |
| Counter (mono)       | 20 px     | 700 JetBrains Mono | 1.0 | 0.02em | page X / Y, tabular-nums       |
| CJK body             | ≈0.88× Latin | 400 Noto Sans JP | 1.75 | normal | Japanese prose (Phase 8: was HomuraM Med) |
| CJK display          | ≈0.92× Latin | HomuraM Disp/SemiBold | 1.05 | -0.01em | section kanji, JP headlines    |

## Layout

- Content padding: **100 px** all sides. Never break this without a reason.
- Cover / section divider: gradient background, no top eyebrow strip, no
  bottom folio. The page is the moment.
- Content pages: paper-white background, top eyebrow strip with
  `border-bottom: 1px solid ink` and `padding-bottom: 18px`, bottom folio
  strip with `border-top: 1px solid ink` and `padding-top: 18px`, both
  running edge-to-edge of the 100px content area.
- One **AccentRule** per page maximum — the scaling-in horizontal
  underline beneath the hero or eyebrow. One reads as composition.
- Hairline borders (`line` token) for cards' top edges; never drop
  shadows. **Surface ramp** (Session A Topic 8): paper → paper-tint →
  paper-tint-2, three levels max, hairlines still do separation, no
  shadows, no gradient card fills. Used actively for card panels and
  the highlighted 2×2 quadrant.
- Cover may carry **one** subtle **static** radial glow in `accent` at
  low opacity, blurred ~80px, off-centre. No animation — the cover does
  not breathe (breath removed entirely, Phase 8 2026-05-18).
- Gold (`accent-hot`) is assigned to **one deliberately-chosen moment
  per deck** — see Gold rule.

**Component pattern (Session B cross-cutting #7):** most library
components are **one component with a `variant` prop + a `density` prop**
(lean / standard / rich). Variant and density are **storyboard-driven** —
`compose-deck` and the slide-authoring composition spec select them; they
are not separate component forks. See Component library.

## Fixed components

These five are the load-bearing primitives. Every page is built from
them. Two more (`WordmarkLockup`, `KanjiSeal`) are **added in Phase 8**
— see Component library.

### GradientCanvas

```tsx
const GradientCanvas = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(330deg, #A6C9EB 12%, #FFE9BF 100%)',
      color: '#0A0A0A',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: 100,
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);
```

(Gradient stops swap per the chosen industry variant; angle stays 330deg.)

### PaperCanvas

```tsx
const PaperCanvas = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#FFFFFF',
      color: '#0A0A0A',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: 100,
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);
```

### Eyebrow (top content-page strip)

```tsx
const Eyebrow = ({ label, meta }: { label: string; meta?: string[] }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: '1px solid #0A0A0A',
      paddingBottom: 18,
      fontFamily: "'Helvetica Neue', 'Inter', system-ui, sans-serif",
      fontSize: 22,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      animation: '600ms ease-out both tk-fadeUp',
    }}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: '#0A0A0A' }}>
      <span aria-hidden style={{ width: 12, height: 12, background: '#7030A0', display: 'inline-block' }} />
      <span style={{ fontWeight: 700 }}>{label}</span>
    </span>
    {meta && (
      <span style={{ display: 'inline-flex', gap: 32, color: '#6B6B6B', fontWeight: 500, fontSize: 20, letterSpacing: '0.16em' }}>
        {meta.map((m, i) => <span key={i}>{m}</span>)}
      </span>
    )}
  </div>
);
```

### AccentRule (scaling underline)

```tsx
const AccentRule = ({ width = 320, delay = 0 }: { width?: number; delay?: number }) => (
  <div
    aria-hidden
    style={{
      width,
      height: 6,
      background: '#7030A0',
      transformOrigin: 'left center',
      animation: `700ms cubic-bezier(0.7, 0, 0.2, 1) ${delay}ms both tk-grow`,
    }}
  />
);
```

(AccentRule uses `tk-grow` — **never** `tk-draw`. See Motion.)

### Folio (bottom content-page strip)

```tsx
const Folio = ({ section, page, total }: { section: string; page: number; total: number }) => (
  <div
    style={{
      position: 'absolute',
      left: 100,
      right: 100,
      bottom: 56,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontFamily: "'Helvetica Neue', 'Inter', system-ui, sans-serif",
      fontSize: 20,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      borderTop: '1px solid #0A0A0A',
      paddingTop: 18,
    }}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: '#0A0A0A' }}>
      <span aria-hidden style={{ width: 8, height: 8, background: '#7030A0', display: 'inline-block' }} />
      <span style={{ fontWeight: 700 }}>{section}</span>
      <span style={{ color: '#6B6B6B', margin: '0 4px' }}>/</span>
      <span style={{ color: '#6B6B6B', fontWeight: 500 }}>taikyoku</span>
    </span>
    <span
      style={{
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 700,
        color: '#0A0A0A',
      }}
    >
      {String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  </div>
);
```

(Folio date format is language-adaptive: Latin `2026 · 05 · 18`,
Japanese `2026年5月18日`; counter stays tabular-num mono either way —
Session A Language lock.)

### KanjiSeal (Phase 8 — ⚠️ DEFERRED 2026-05-18)

> **DEFERRED / DO NOT SHIP.** Post-verification the user dropped the red
> 大 seal — an alternate implementation will be explored later. The
> typographic-glyph-in-a-border approach below is parked, not deleted
> (kept for design history). `brand-red #C00000` stays a reserved token
> but is currently **unused** (the seal was its only consumer). The
> Section-divider's reserved seal slot (Session B Archetype 15) stays
> reserved but renders nothing for now. Do not reintroduce KanjiSeal or
> brand-red into decks until a new approach is decided.

The (parked) spec: red 大 seal ornament, **`brand-red #C00000` only**,
section-divider ornament — never a primary logo. Sizes 56/32. 大 in
HomuraM Display. Decorative → `aria-hidden`.

```tsx
const KanjiSeal = ({ size = 56 }: { size?: number }) => (
  <span
    aria-hidden
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      border: `${Math.max(2, Math.round(size * 0.045))}px solid #C00000`,
      color: '#C00000',
      fontFamily: "'HomuraM', 'Noto Serif JP', 'Prata', serif",
      fontWeight: 700,
      fontSize: Math.round(size * 0.62),
      lineHeight: 1,
      boxSizing: 'border-box',
    }}
  >
    大
  </span>
);
```

### WordmarkLockup (Phase 8 — ⚠️ PARKED 2026-05-18)

> **PARKED / NOT THE SHIPPING LOGO.** Post-verification the user judged
> the typographic lockup "not looking good." The **shipping brand mark
> is an image asset** (see "Image & media assets" below), not this
> typographic reconstruction. The spec below is retained as a possible
> future construction but is not used by decks now. Future brand
> expression goes through image assets (the logo being the first), not a
> CSS/typographic rebuild.

The (parked) spec: 大 ink-square + Cinzel "TAIKYOKU" + Prata 大局 (大局
below TAIKYOKU, brand brief). **Two variants:** `full` (cover) and `mini`
(footer / closing sign-off). Cinzel cap-height is **derived from the
square's inner height** (Session A Topic 3) — never a magic px — so the
lockup stays locked in proportion at any size (full Cinzel ≈42–44px,
mini ≈18–20px, tracking 0.18em). The square border + 大 are `ink`
(`#0A0A0A`) — this is the wordmark's ink square, distinct from the red
`KanjiSeal`. On the cover it enters via `tk-fadeUp`; mini enters via
`tk-fadeIn`.

```tsx
const WordmarkLockup = ({ variant = 'full' }: { variant?: 'full' | 'mini' }) => {
  const square = variant === 'full' ? 88 : 40;     // outer square
  const border = 2;
  const inner  = square - border * 2;              // inner height drives Cinzel
  const cinzel = Math.round(inner * 0.5);          // ≈42 full / ≈18 mini
  const dai    = Math.round(inner * 0.62);         // Prata 大 inside the square
  const sub    = Math.round(cinzel * 0.62);        // Prata 大局
  const gap    = variant === 'full' ? 24 : 14;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap, color: '#0A0A0A' }}>
      <span
        aria-hidden
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: square, height: square, border: `${border}px solid #0A0A0A`,
          fontFamily: "'Prata', Georgia, serif", fontSize: dai, lineHeight: 1,
          boxSizing: 'border-box',
        }}
      >
        大
      </span>
      <span style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            fontFamily: "'Cinzel', serif", fontSize: cinzel, fontWeight: 600,
            letterSpacing: '0.18em', lineHeight: 1, textTransform: 'uppercase',
          }}
        >
          TAIKYOKU
        </span>
        <span
          style={{
            fontFamily: "'Prata', Georgia, serif", fontSize: sub, lineHeight: 1.1,
            marginTop: Math.round(cinzel * 0.22), color: '#3F3F3F',
          }}
        >
          大局
        </span>
      </span>
    </span>
  );
};
```

### BilingualHeadline (Phase 8 — mixed modes ⚠️ SUPERSEDED 2026-05-18)

> The same-slide mixed modes (`latin-jp`, `jp-latin` — a headline + a
> mirrored sub-line in the other language) are **superseded** by the
> mono-language model above. **Use `single-latin` / `single-jp` only.**
> The component is retained (mixed modes parked as history); a
> single-language headline = Prata (Latin) or HomuraM SemiBold @ ≈0.92×
> Latin, line-height 1.05 (JP, Session A Topic 2). References render the
> two languages on **separate** slides via the single-* modes, not the
> mixed ones.

The (now-scoped) component: `mode` = `single-latin` | `single-jp`
(production + references) | ~~`latin-jp`~~ | ~~`jp-latin`~~ (parked).
JP **body prose** is a separate concern and uses **Noto Sans JP**
(Phase 8 split — not this component).

```tsx
const BilingualHeadline = ({
  mode = 'latin-jp',
  primary,
  secondary,
  size = 96,
}: {
  mode?: 'latin-jp' | 'jp-latin' | 'single-latin' | 'single-jp';
  primary: string;
  secondary?: string;
  size?: number;
}) => {
  const cjk = (px: number) => Math.round(px * 0.92);   // Session A Topic 2 display ratio
  const prata = (px: number, color = '#0A0A0A') =>
    ({ fontFamily: "'Prata', Georgia, serif", fontWeight: 400, fontSize: px,
       lineHeight: 1.02, letterSpacing: '-0.02em', color, margin: 0 } as const);
  const homura = (px: number, color = '#0A0A0A') =>
    ({ fontFamily: "'HomuraM', 'Noto Serif JP', serif", fontWeight: 600,
       fontSize: cjk(px), lineHeight: 1.05, color, margin: 0 } as const);
  const subSize = Math.round(size * 0.42);

  if (mode === 'single-latin') return <h2 style={prata(size)}>{primary}</h2>;
  if (mode === 'single-jp')    return <h2 style={homura(size)}>{primary}</h2>;

  const Primary = mode === 'latin-jp'
    ? <h2 style={prata(size)}>{primary}</h2>
    : <h2 style={homura(size)}>{primary}</h2>;
  const Secondary = secondary ? (mode === 'latin-jp'
    ? <p style={homura(subSize, '#3F3F3F')}>{secondary}</p>
    : <p style={prata(subSize, '#3F3F3F')}>{secondary}</p>) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: Math.round(size * 0.14) }}>
      {Primary}
      {Secondary}
    </div>
  );
};
```

Default language stance stays **Latin-only**; bilingual is per-deck
opt-in (Session A Language lock). Use `single-latin` unless a deck
explicitly engages Japanese.

## Motion

Philosophy: **considered, not austere**. Every motion choice should pass
the filter "would this read well on a Stripe launch page rendered in
serif?"

### Keyframes

```css
@keyframes tk-fadeUp {
  0%   { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes tk-fadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes tk-grow {
  0%   { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
@keyframes tk-rise {
  0%   { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes tk-draw {
  100% { stroke-dashoffset: 0; }
}
@keyframes tk-growY {
  0%   { transform: scaleY(0); }
  100% { transform: scaleY(1); }
}
```

- **`tk-growY`** (added Phase 9) — vertical sibling of `tk-grow`
  (`scaleY` 0→1, `transformOrigin` top), same easing/duration band.
  ONLY for genuine vertical structural lines (a column divider, a TOC
  progress thread). Not decorative. Honors the same one-long-motion and
  ≤1.6s caps as `tk-grow`.

(`tk-breath` was removed entirely 2026-05-18 — see Rules. The theme has
**no ambient/looping motion**.)

### Motion budget — density-derived (Session C C1)

Budget tier follows the storyboard's **density tag**, not slide purpose:
low → fades only; medium → moderate stagger; high → one long motion +
full stagger. Resolution is a **three-layer order**:

1. **Density-derived tier** = the default budget.
2. **Archetype-specific motion** (per REFINEMENT.md Session B) overrides
   the default where a component specifies its own motion.

There is **no ambient/canvas-level motion exception** — `tk-breath` was
removed entirely (Phase 8, 2026-05-18). All motion is entrance motion
within the budget; nothing loops or breathes.

### Rules

- **`tk-fadeUp`** — universal entrance. 600ms ease-out. Stagger siblings
  by 200ms; card grids by 150ms.
- **`tk-fadeIn`** — opacity-only reveals. 400–600ms.
- **`tk-grow`** — AccentRules and intentional horizontal strokes.
  `cubic-bezier(0.7, 0, 0.2, 1)`. 600–800ms.
- **`tk-rise`** — cards entering. `cubic-bezier(0.2, 0.7, 0.3, 1)`.
  600ms. Stagger 150ms.
- **`tk-draw`** — **structural/data SVG strokes ONLY** (Session C C2).
  800ms ease-out.
  - ALLOW: chart paths, timeline axis, process/workflow connectors,
    framework/methodology connectors.
  - FORBID: AccentRule (use `tk-grow`), underlines, borders, dividers,
    decorative flourishes, text strokes. No ornamental exception.
- **`tk-breath`** — ❌ **REMOVED ENTIRELY (Phase 8, 2026-05-18).** No
  cover breath, no closing breath, no bookend. This **overturns** the
  previously doubly-locked Session B Archetype 19 + Session C C4
  (breath = cover + gradient closing, always-on). Deliberate user
  reversal — logged in REFINEMENT.md. The theme has no infinite/ambient
  motion of any kind.

### Stagger budget

- No reveal lasts longer than **800ms**.
- At most **one** long motion (`tk-draw`) per page; the rest are
  600ms-or-less fades. (Structural ≠ unlimited — the one-per-page cap
  still applies on top of the tk-draw allow-list.)
- Total motion on any page settles within **1.6s** from first paint.

### Page transitions (Session C C3)

Single global **cross-fade**, ~300–400ms (lock one value in Phase 9),
between every slide regardless of canvas change. No canvas-aware
variation, no hard cut. Pre-paint the incoming canvas under the fade so
gradient→paper doesn't flash.

### Language-invariant (Session C C5)

Motion is **the same in every language**. Japanese/bilingual decks
animate identically to Latin. Language adaptation lives in
typography/layout (CJK scale, bilingual primitives), **not** motion.
This is a considered decision, not an omission.

### Explicitly forbidden

Typewriter clip-path reveals; blinking carets; looping traveling-dot
indicators; progress-bar fills; bounce / spring easings; 3D transforms,
slide-in-from-edge, zoom-on-enter / Ken Burns.

### Count-up — SANCTIONED for large metric figures (2026-05-19)

⚠️ **Supersedes** the earlier ban (Session B Archetype 3 + this
forbidden list) — user-directed ("update brief"). A **one-time
count-up is allowed, and only on large metric figures**: the
`headline-metric` value and the `quarterly-metrics` **hero-supporting
lead** figure. **Never** on small/delta cells, body, or labels (reads
busy — that was the original objection, still holds there). Constraints
(keep it restrained): once, on enter, ≈700ms, ease-out cubic, **no
overshoot/bounce**, `tabular-nums` so there is **no layout shift**,
honours `prefers-reduced-motion` (skips to the final value), parses
prefix/number/suffix so `$6.2B` / `14 mo` / `73%` animate the number
only. Implemented in those two components; other components unchanged.

🛑 **HOOK-FREE — mandatory.** The first count-up build used React
`useState`/`useEffect`; that **blanked the whole deck** (the component
library + open-slide render path are hook-free; introducing hooks threw
at render). Count-up MUST be implemented with a **ref-callback +
`requestAnimationFrame`** mutating `textContent`, children defaulting to
the final value (graceful with no JS / reduced-motion). **No React
hooks, no `react` import, anywhere in the component library** — this is
a hard constraint, not a preference.

## Gold rule (changed — Session B cross-cutting #5)

Gold (`accent-hot`) is used **once per deck**, and is now an **explicit
deck-level assignment**: no component auto-claims it (the closing no
longer defaults to gold). `compose-deck` must actively choose the one
slide where the eye most needs to land and assign gold there — or the
deck ships with no gold. Two gold moments is a defect.

## Aesthetic

Two canvases, one accent, restrained motion. The cover commits to the
Taikyoku gradient as the brand handshake; the closing returns to the
same gradient as a quiet bookend (static — no breath; the theme has no
ambient motion). Content slides drop to white and let structure
(eyebrow strip, hero rule, folio, the three-level surface ramp) do the
holding. Prata gives headlines an editorial register and also carries
card titles and plotted-item labels; Helvetica Neue handles all caps
work; Inter handles prose; Cinzel is reserved for the (parked) wordmark;
HomuraM carries Japanese **display**, Noto Sans JP the Japanese **body**.
Purple is the only decorative accent; the one functional red is
data-negative (`accent-negative`; the brand-seal red is parked); gold is
one assigned moment. If a page could be a frame from a print magazine where the
typography does most of the work, it is on theme.

## Voice & language

### English (Session C C6–C9)

- **Register:** institutional-leaning hybrid, **60/40 toward
  McKinsey/institutional** over founder-direct. Measured, evidence-led,
  credible by default; plain confident declarative reserved (~40%) for
  claim/headline lines, not body.
- **Sentence length:** body ≈15–25 words, one idea per sentence. Short
  fragments / one-liners only in headlines, eyebrows, and **one accent
  line per slide**. Staccato fragments in body = off-register.
- **Forbidden words:** two deny-lists.
  - *Hype:* imagine, revolutionary, unlock, game-changer, disrupt,
    seamless, leverage (as verb), synergy, world-class, cutting-edge,
    best-in-class, 10x, supercharge, delight, magic.
  - *AI-tells:* delve, tapestry, moreover, furthermore, "in today's
    fast-paced world", "it's worth noting".
  - **Em-dash carve-out:** em-dashes are **permitted** — deliberate
    house style. Never flag as an AI tell, never auto-rewrite, always
    whitelist in any copy-linting. *(Also recorded in long-term
    memory as a cross-project user preference.)*
- **Casing:** headlines & page headings = **Title Case**; eyebrow /
  folio = tracked CAPS; body = sentence case. *(Diverges from the
  shipped demo's sentence-case headlines — a deliberate convention
  change, not a regression; the demo stays frozen.)*

### Japanese (Session C C10–C13)

- **Formality — role-mapped, three tiers:**
  - 常体 / である調 (+ 体言止め noun-stop) → titles, headlines, punchy
    accent lines.
  - 丁寧語 / です・ます → body copy and most cases (the default).
  - 敬語 (尊敬語/謙譲語) → external client- or executive-facing decks
    only; per-deck override, not default.
- **Particles:** per-role strict — body です/ます consistent with no
  intra-block drift; headlines 常体/体言止め; list items, labels,
  captions 体言止め. Register changes only at role boundaries, never
  within a text block. Flag intra-block drift.
- **Typesetting:** strict — 禁則処理 (no 。、 or closing brackets
  orphaned at line start/end), full-width 。、, half-width Latin/digits
  with correct spacing, wordmark middle dot = 中黒 U+30FB. **Katakana-
  tolerant:** established loanwords (プロダクト, スケール, ロードマップ)
  are fine — no forced 漢語 substitution.
- **Default stance:** Latin-only by default; Japanese/bilingual is
  per-deck opt-in (Session A Language lock).

### Bilingual / language model (Session C C13 — ⚠️ SUPERSEDED 2026-05-18)

> **SUPERSEDED.** C13's same-slide "anchored-headline mirror" (both
> languages on one slide) is **no longer the model**. The governing
> rule:
>
> - **Production decks are MONO-LANGUAGE.** A deck is **all-English**
>   (with allowance for *limited, relevant* Japanese — a term, a quote,
>   a proper noun) **or all-Japanese** (with allowance for *limited,
>   relevant* English). No deck mirrors both languages slide-by-slide;
>   there is no "bilingual deck" layout in production.
> - **References / examples / component libraries / galleries**
>   demonstrate the theme in each language as **separate consecutive
>   slides — English first, then its Japanese counterpart** — one
>   language per slide, never mixed on a slide.
>
> `compose-deck`: pick one language per deck; cross-language is an
> occasional inline exception, not a structural mirror. The Session C
> C13 entry stands as history; this supersedes it. Session A's
> "Latin-only default, JP per-deck opt-in" still holds — "opt-in JP"
> now means an all-Japanese deck, not a mirrored one.

## Component library

The five fixed components above scale to a **Tier 1 library** built in
Phase 9. Per-archetype design intent, density, motion budget, and
content slots are specified in **`themes/taikyoku/REFINEMENT.md`
(Session B, Archetypes 1–19)** — that is the build spec; this section
is the index.

- **Pattern:** one component per archetype, with `variant` + `density`
  props, storyboard-driven (cross-cutting #7).
- **Tier 1 new (Phase 9 build queue):** hero+secondary-visual,
  two-column comparison, stat grid, big-metric callout, pullquote/
  customer-voice, section TOC, chart hero, timeline, roadmap,
  methodology diagram, before/after, bio/team card, image-led, logo
  cluster. Reserved slot #15 stays open.
- **Tier 1 shipped — refine under new type:** section divider,
  three-card value grid, process/workflow diagram, 2×2 quadrant,
  closing (each has a Session B refinement decision).
- **Phase 8 additions to "Fixed components":**
  - ~~`WordmarkLockup`~~ — **PARKED** (typographic lockup not shipping;
    brand mark is an image asset — see Image & media assets).
  - ~~`KanjiSeal`~~ — **DEFERRED** (red seal dropped 2026-05-18;
    alternate approach TBD; divider slot stays reserved, renders
    nothing).
- Library files land at `themes/taikyoku/components/<kebab-name>.tsx`
  with a gallery at `themes/taikyoku.gallery.tsx` (Work Stream 2).
  **Naming is by intended use, not abstract layout** (Phase 7 locked).

### Phase 9 — increment 1 (shipped 2026-05-18): Group 1A

Spec-built from REFINEMENT Session B (screenshot skill deferred — the
19 archetypes are already fully specified there). Each file is
self-contained (redeclares `c`/`f`, no cross-file token imports),
header-commented (use / slots / density / motion), props with defaults.

| File (`themes/taikyoku/components/`) | Archetype | Variants · density |
| --- | --- | --- |
| `opening-hero.tsx` | 1 Hero | text + graphics only (visual slot dropped 2026-05-18); standard fixed; full gradient canvas |
| `quarterly-metrics.tsx` | 3 Stat grid | hero-supporting / metric-delta · lean/standard/rich |
| `product-comparison.tsx` | 2 Two-column | axis+advocacy (rowLabels + accentColumn) · lean/standard/rich |
| `headline-metric.tsx` | 4 Big metric | standard FIXED (no density prop) |
| `customer-voice.tsx` | 5 Pullquote | lean/standard/rich; polymorphic logo slot |
| `deck-contents.tsx` | 6 Section TOC | agenda-grid / progress-map · fixed |

- Full-slide archetype (`opening-hero`) renders its own canvas;
  the other five are **canvas-agnostic content blocks** the composing
  Page wraps in a PaperCanvas (atomic, compose-into-Pages — Phase 7).
- Gallery: `themes/taikyoku.gallery.tsx` (English-only per the Phase 8
  references convention), viewable via
  `Projects/2026-05-18_taikyoku-gallery/` at
  `/s/2026-05-18_taikyoku-gallery`. All six + the gallery compile clean.
### Phase 9 — increment 2 (shipped 2026-05-18): Groups 1B + 1C

All 19 Tier 1 components now exist (named by use). Group 1C absorbed the
Phase 8 reversals (not just raw Session B text).

| File | Archetype | Variants |
| --- | --- | --- |
| `chart-hero.tsx` | 7 | narrativePosition side/below + annotations |
| `timeline.tsx` | 8 | milestones / phased |
| `roadmap.tsx` | 9 | quarter-columns / swimlanes / now-next-later |
| `methodology.tsx` | 10 | stack / loop / pillars |
| `before-after.tsx` | 11 | stacked-overlay / diff-list |
| `bio-card.tsx` | 12 | spotlight / grid / lead-supporting (fixed density) |
| `image-led.tsx` | 13 | full-bleed / framed (own canvas; no zoom) |
| `logo-cluster.tsx` | 14 | monochrome default + toggle |
| `section-divider.tsx` | 15 | gradient-variant prop; **KanjiSeal slot empty (deferred)**; no breath |
| `value-grid.tsx` | 16 | density + surface bare/tint/tint2; card title Prata, roleKicker Prata-italic |
| `process-flow.tsx` | 17 | step numbers mono; status blocked→accent-negative |
| `quadrant.tsx` | 18 | plotted labels Prata; highlightQuadrant→paper-tint-2 |
| `closing.tsx` | 19 | **gold OFF by default (deck-assigned); NO breath; `mark` = brand image asset (WordmarkLockup parked)** |

- Full-slide archetypes (`opening-hero`, `image-led`,
  `section-divider`, `closing`) render their own canvas; the other 15
  are canvas-agnostic blocks a Page wraps.
- Gallery now **~38 pages**: a cover + **five `section-divider`
  organiser slides grouped by component TYPE** (01 Covers & Dividers ·
  02 Metrics & Data · 03 Compare & Transform · 04 Time & Flow · 05
  People & Proof — simple titles, exposition in the kicker; the
  section-divider component dogfooded as the structure) + one page per
  component per variant (hydrated, English-only). All 19 + gallery +
  viewer compile clean.
- **Still deferred (open Phase 9 items):** the
  `component-from-screenshot` skill, the dark-variant gallery spike
  (Session A Topic 6), HomuraM woff2 subsetting, reserved slot #15.

## Image & media assets (convention — Phase 8, 2026-05-18)

Brand expression (logo, future imagery) ships as **image assets**, not
typographic reconstructions. Decks reference them via **Vite import**,
not relative `url()` strings:

```tsx
import tkykMark from './assets/tkyk-mark.svg';
// …
<img src={tkykMark} alt="TKYK" style={{ height: 84 }} />
```

- Assets live in **`Projects/<slug>/assets/`** (per-deck) — Vite
  resolves the import to a served URL. This is the supported path; a
  relative `url('../../themes/...')` in a `<style>` string is **not**
  served by open-slide's dev server (confirmed Phase 8 — it returns the
  SPA shell). Theme-level shared assets that must be importable should
  be co-located or imported through the same Vite mechanism.
- **Single-file HTML portability is sacrificed** for this — explicitly
  accepted by the user (and already deprioritised by the brief). PDF
  export still works; a website-hosting layer is a future phase.
- The current logo render is a **placeholder** using the real brand
  SVG; a better brand mark may replace the asset later without code
  changes (same import, new file).
- ✅ **CONFIRMED in-browser (user, 2026-05-18):** open-slide serves
  `Projects/<slug>/assets/*` Vite imports to the rendered slide — the
  logo image renders. The image-asset convention is **proven**, not
  provisional. (Headless curl could not see it due to open-slide's SPA
  fallback; the browser confirmed it.)
- **Knock-on:** this same Vite-import mechanism is the now-**proven**
  fix path for the bundled-HomuraM-woff2 serving caveat (import the
  woff2 as a URL asset rather than a relative `url()` string).

## Asset attribution

- Latin/Cinzel/JP-fallback fonts via Google Fonts at runtime.
- **HomuraM** (Medium/SemiBold/Display) **bundled** at
  `themes/taikyoku/assets/fonts/HomuraM-{Medium,SemiBold,Display}.woff2`
  — converted Phase 8 from the licensed brand `.otf`
  (`Assets/Branding/Fonts/GMingChao-*`). Noto Serif JP is the runtime
  fallback. Licensed brand asset — do not redistribute outside DA2.
- **Logos** copied Phase 8 into `themes/taikyoku/assets/logos/`:
  `TKYK-mark-dark.svg` (dark mark, light/gradient bg),
  `TKYK-mark-white.svg` (white mark, dark/video bg). Source:
  `Branding/TKYK Logos/`. Note: the brand logo is a brushstroke mark in
  a rounded frame — the `WordmarkLockup`/`KanjiSeal` are *typographic
  constructions* per the brand brief, not traces of these SVGs.
- Single-file HTML portability is **deprioritised** (brief): linked
  SVG/fonts/images are fine; a website-hosting layer is a future phase.
  PDF export still works regardless.

## Example usage

```tsx
import type { Page, SlideMeta } from '@open-slide/core';

// Drop this <style> block at the top of the slide file (after imports).
const styles = `
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Noto+Serif+JP:wght@500;600&family=Prata&display=swap");
@keyframes tk-fadeUp { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes tk-grow { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
`;
// Helvetica Neue is a system font (not loaded); Inter is its fallback.

const Cover: Page = () => (
  <>
    <style>{styles}</style>
    <div
      style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(330deg, #A6C9EB 12%, #FFE9BF 100%)',
        color: '#0A0A0A',
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: 100,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: "'Helvetica Neue', 'Inter', system-ui, sans-serif", fontSize: 22,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        animation: '600ms ease-out both tk-fadeUp',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <span aria-hidden style={{ width: 12, height: 12, background: '#7030A0', display: 'inline-block' }} />
          <span style={{ fontWeight: 700 }}>Taikyoku</span>
        </span>
        <span style={{ color: '#6B6B6B', fontWeight: 500, fontSize: 20, letterSpacing: '0.16em' }}>
          internal · 2026 · 05
        </span>
      </div>

      <div style={{ marginTop: 96 }}>
        <h1 style={{
          fontFamily: "'Prata', Georgia, serif",
          fontSize: 168, fontWeight: 400, lineHeight: 0.96, letterSpacing: '-0.03em',
          margin: 0, color: '#0A0A0A',
          animation: '700ms ease-out 200ms both tk-fadeUp',
        }}>
          Editorial Composition
        </h1>
      </div>

      <div aria-hidden style={{
        width: 320, height: 6, background: '#7030A0',
        marginTop: 48,
        transformOrigin: 'left center',
        animation: '700ms cubic-bezier(0.7, 0, 0.2, 1) 700ms both tk-grow',
      }} />

      <p style={{
        marginTop: 32, fontSize: 36, lineHeight: 1.4, color: '#0A0A0A',
        fontWeight: 500, maxWidth: 1200,
        animation: '600ms ease-out 1000ms both tk-fadeUp',
      }}>
        Cool→warm gradient on cover, paper-white content, one purple accent,
        one assigned moment of gold per deck.
      </p>
    </div>
  </>
);

export const meta: SlideMeta = { title: 'Taikyoku — example', theme: 'taikyoku' };
export default [Cover];
```

(Example headline shown in Title Case per Session C C9.)

## Changelog

- **Phase 9 — COMPLETE (2026-05-19):** Tier 1 library (19 components),
  per-deck subsetting, accepted dark-reference palette. Slot #15 left
  formally reserved (new archetypes → future session). Deferred to own
  future phases: screenshot skill, dark-mode token refactor.
- **Phase 9 — increment 4 (2026-05-18):** `component-from-screenshot`
  **deferred** out of Phase 9 (future phase). HomuraM **per-deck
  subsetting shipped** — `scripts/da2-subset-fonts.sh` (per-deck at
  finalize); verified 13.9M→367K (−97.4%) on the bilingual-ref deck;
  finalize advisory added. Only Phase 9 item left: reserved slot #15.
- **Phase 9 — increment 3 (2026-05-18):** dark-variant spike (Session
  A Topic 6). Separate spike deck (4 archetypes ×light/dark). Iterated
  to a **day/night** reading (deep indigo `#151030 40%→#8B8B96` ashen
  moon-glow, faint-ivory ink). Conditional GO; **spike palette ACCEPTED
  by the user** as the locked dark-reference, but production dark stays
  its own future token-refactor phase (not production yet). Tokens +
  go/no-go in REFINEMENT.
- **Phase 9 — increment 2 (2026-05-18):** Groups 1B (8) + 1C (5) built
  from Session B specs; 1C Phase-8-reconciled (divider seal-slot empty,
  closing gold-off/no-breath/image-mark). All 19 Tier 1 components exist
  (by-use names). Gallery → 33 pages, every variant, hydrated content.
  All compile clean. Open: screenshot skill, dark spike, subsetting,
  slot #15.
- **Phase 9 — increment 1 (2026-05-18):** component library begins.
  Scaffolded `themes/taikyoku/components/`; spec-built **Group 1A**
  (opening-hero, quarterly-metrics, product-comparison, headline-metric,
  customer-voice, deck-contents) from REFINEMENT Session B; English-only
  gallery `themes/taikyoku.gallery.tsx` + Projects viewer. Added
  `tk-growY` to the motion vocab (vertical structural lines). Screenshot
  skill, Groups 1B/1C, dark spike, subsetting deferred to later
  increments. Naming by intended use.
- **Phase 8 (2026-05-18):** Japanese rendering. HomuraM ×3 converted
  `.otf→.woff2` and bundled + `@font-face`; logos copied in;
  brand-brief reconciliation (6 conflicts — Phase 7 upheld on card
  surface/eyebrow/Montserrat/surface-tints, hybrid card role-kicker,
  red split). Locked: `brand-red #C00000`, `accent-negative #9B2226`,
  `paper-tint-2 #E9EEF4`. Prata-italic widened to card role-kicker.
  `WordmarkLockup` + `KanjiSeal` + 3 bilingual primitives added (below).
  Full provenance: `themes/taikyoku/REFINEMENT.md` → Phase 8.
- **Phase 8 post-verification (2026-05-18):** after user review —
  **`tk-breath` removed entirely** (overturns the doubly-locked Session
  B Archetype 19 + Session C C4 bookend; theme now has no ambient
  motion); **`KanjiSeal` deferred** + `brand-red` reserved/unused;
  **`WordmarkLockup` parked** — brand mark ships as an **image asset**
  via Vite import from `Projects/<slug>/assets/` (new "Image & media
  assets" convention; single-file HTML sacrificed, user-accepted).
  Bundled HomuraM wired via the proven Vite-import `@font-face` form
  (confirmed rendering). **JP font roles split:** HomuraM = display /
  headline / large kanji only; **JP body prose → Noto Sans JP** (Google
  Fonts, mirrors the Inter sans Latin body). Supersedes Session A
  Topic 1 body-role + Topic 2 CJK-body row. **Language model
  redefined:** production decks are **mono-language** (all-EN or all-JP,
  limited relevant cross-language allowed); references/examples/
  galleries show EN then JP as **separate** slides — never both on one
  slide. **Supersedes Session C C13** (same-slide anchored mirror);
  `BilingualHeadline` mixed modes parked, `single-*` only.
- **Phase 7-reconciled (2026-05-18):** rebuilt from approved Sessions
  A+B+C of `themes/taikyoku/REFINEMENT.md`. Archivo→Helvetica Neue;
  added Cinzel (wordmark), HomuraM (JP, 3 weights, Phase 8 pending),
  per-role CJK scale; added `paper-tint-2`, `accent-negative`,
  `brand-red`, gradient variants, dark-spike note; gold doctrine →
  deck-level assignment; breath → cover + gradient-closing bookend;
  motion budget density-derived; tk-draw boundary; uniform cross-fade;
  Prata into card titles / plotted labels; Prata-italic scoped to
  person roles; new Voice & language and Component library sections.
- **Phase 6.1 (synthesis baseline):** original theme — Prata/Archivo,
  cover-only breath, gold usually on closer. Preserved in
  `taikyoku.demo.tsx` + `da2-retrospective` (frozen reference).
