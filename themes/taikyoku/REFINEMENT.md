---
doc: taikyoku-refinement
status: current — Phase 11 + dark mode complete
restructured: 2026-05-19 (compressed from 1953-line chronological log)
authoritative-for: locked rules + reversal history
theme-contract: ../taikyoku.md (implementable contract)
composition-spec: ./COMPOSITION.md (how compose-deck assembles)
audience: future Claude or operator picking up DA2
---

# Taikyoku — Refinement decisions

The decision log for the Taikyoku theme. Phase 7 was a three-session
refinement interview (Sessions A · B · C — all approved 2026-05-18).
Phases 8–11 + dark mode iterated on the result.

This document was restructured in 2026-05-19. The original 1.9k-line
chronological narrative is preserved in the **appendix** at the bottom
— every reversal is still load-bearing for "don't re-litigate locked
calls". The top is what holds NOW.

---

## 1. Locked constraints — quick index

Every rule below has a `[§N]` link to the section that explains it and
an `[App: …]` link to the original decision in the appendix if it has
a supersession history.

### Palette
- Single purple accent `#7030A0`. Decorative red is **never** used. [§2.1]
- Three reds with disjoint roles. Never substitute one for another. [§2.1]
- **Gold `#FFE1A4` is rationed to one moment per deck** (deck-level
  assignment; never auto-claimed). May ship with none; never two. [§2.1 · App: B-Arch-19 · 2026-05-18 reversal]
- Three-step surface ramp: `paper` / `paper-tint` / `paper-tint-2`. No
  shadows. No gradient card fills. [§2.1]
- 2–3 industry gradient-stop variants (cool→default, earth, warm-
  energy); paper/ink/accent/gold never vary. [§2.1]

### Type
- Display = **Prata**. Carries headlines, card titles (Phase 8 widening), plotted-item labels. [§2.2 · App: B-Arch-16]
- Caps/eyebrow/folio = **Helvetica Neue** (Inter fallback) — **not
  Archivo** [App: synthesis→Phase-7 reversal]. Inter = body.
  JetBrains Mono = numerics + literal strings. Cinzel = the (parked)
  WordmarkLockup only. [§2.2]
- Prata-italic = person/attribution roles + card role-word kicker only.
  Never generic caps labels. [§2.2 · App: B-cross-1 → Phase-8 widening]
- Japanese: **HomuraM** display, **Noto Sans JP** body. [§2.2 · App: A-Topic-1 + A-Topic-2 → 2026-05-18 split]

### Motion
- Vocabulary is exactly `tk-fadeUp · tk-fadeIn · tk-grow · tk-growY ·
  tk-rise · tk-draw`. [§2.3]
- **No `tk-breath`. No ambient/looping motion.** Cover does not
  breathe; closing has no bookend. [§2.3 · App: B-Arch-19 + C-Topic-4 → 2026-05-18 reversal]
- `tk-draw` allowed on structural/data SVG only (chart paths, timeline
  axis, process connectors). Forbidden on AccentRule (use `tk-grow`),
  underlines, borders, dividers, text. [§2.3]
- Page transition = uniform ~300–400 ms cross-fade. Same vocabulary in
  every language (motion is language-invariant). [§2.3]
- Total per-page settle ≤1.6 s. One long motion (`tk-draw`) per page max. [§2.3]
- **Count-up sanctioned, large metric figures only**: `headline-metric`
  value + `quarterly-metrics` hero-lead. ≈700 ms ease-out cubic, no
  overshoot, `tabular-nums`, honours `prefers-reduced-motion`. **HOOK-
  FREE — mandatory** (ref-callback + rAF; no React hooks anywhere in
  the library). [§2.3 · App: B-Arch-3 → 2026-05-19 reversal · App: count-up hook regression]
- Forbidden idioms (refuse cleanly): typewriter clip-path, blinking
  carets, marching-dot indicators, progress-bar fills, bounce/spring,
  3D transforms, slide-in-from-edge, zoom-on-enter, Ken Burns. [§2.3]

### Components & composition
- Tier-1 library = **19 components**, named by intended use (not
  abstract layout). [§2.4]
- One component per archetype with `variant` + `density` props
  (storyboard-driven, not separate forks). [§2.4]
- **Hook-free — mandatory.** No `react` import, no `useState` /
  `useEffect` / etc. inside the component library. [§2.4 · App: count-up hook regression]
- Each component is **self-contained** (redeclares its `c` tokens + `f`
  fonts inline) for portability. Tokens reference `var(--tk-NAME,
  <light-hex>)` so dark deck wrappers flip values without per-component
  work. [§2.4]
- **compose-deck transcribes; does not import.** A composed deck's
  `index.tsx` is one file, specialised to the variant/density used.
  Library bug-fixes do NOT auto-propagate to already-composed decks.
  [§2.4 · App: Phase-10 finding]
- **Slide anatomy (every content slide):** eyebrow + action title (+
  optional subhead) + body (primary + ≥2 supporting) + source/method +
  folio. Fills ≈85–90% of canvas. A lone centred component is the
  empty-slide bug — **forbidden**. [§2.5 · App: Phase-11]
- Named layouts: `primary-rail` (62/38) · `primary-band` (top 64 /
  bottom 30) · `two-up` · `anchored-rail` · `dense-grid`. Storyboard
  picks one per content beat. [§2.5]
- Support kit (slide furniture, composed inline, NOT new components):
  stat-callout · insight · labelled-list · annotation · mini-source.
  [§2.5]
- **Layouts are IMPORTED, not transcribed (Phase 12, 2026-05-22).**
  The 11 layout primitives live at `themes/taikyoku/layouts/`
  (`Frame` · `Structural` · `Rail` · `Band` · `TwoUp` · `AnchoredRail`
  · `DenseGrid` · `Cards` · `Stat` · `Insight` · `LList` · `Annote`).
  Deliberate asymmetry to the component library: layouts are stable
  theme infrastructure (consistent across decks; a layout bug-fix DOES
  propagate); components stay transcribed (frozen-with-deck).
  [§2.4 · App: Phase-12 layout promotion]

### Dark mode (productionised 2026-05-19)
- Per-deck, mono-mode (like language). A deck is light OR dark.
  Production model: light = daytime sky→sun (unchanged), dark =
  night-sky indigo → ashen moonlit grey. [§2.6 · App: Increment-3 spike + token-indirection phase]
- Tokens via `var(--tk-NAME, <light-hex>)` indirection. Components
  keep light hex as the **fallback** (portability + standalone
  rendering preserved). [§2.6 · App: token-indirection convention change]
- **Scope mode vars to a per-slide wrapper, NEVER `:root`.** A `:root`
  declaration is global and bleeds across pages. Declare `TK_LIGHT` /
  `TK_DARK` objects, spread onto a full-bleed div wrapping every
  Page's content. [§2.6 · App: 2026-05-19 scoping bug + fix]
- `brand-red` deliberately not tokenized (no consumer; KanjiSeal
  deferred). [§2.6]

### Voice & language
- English: institutional-leaning hybrid, **60/40 toward
  McKinsey/institutional**. Body ≈15–25 words / sentence, one idea per
  sentence. Punch (fragments / one-liners) reserved for headlines + one
  accent line per slide. [§2.7]
- Forbidden words in two groups: hype-list and AI-tells. **Em-dashes
  permitted** — deliberate house style; never flag or auto-rewrite.
  [§2.7]
- Casing: headlines & page headings = **Title Case**; eyebrow/folio =
  tracked CAPS; body = sentence case. [§2.7 · App: demo divergence noted, not fixed]
- Japanese: three-tier role-mapped register — 常体/体言止め (headlines),
  丁寧語 (body, default), 敬語 (external-only, per-deck override).
  Per-role particle consistency strict. Strict typeset
  (禁則処理 / 中黒 U+30FB), katakana-tolerant (no forced 漢語). [§2.7]
- **Production decks are mono-language** (all-EN with limited
  relevant JP, or all-JP with limited relevant EN). No same-slide
  bilingual mirror. References/galleries: EN then JP on **separate**
  consecutive slides. [§2.7 · App: C-Topic-13 → 2026-05-18 reversal]

### Assets & finalize
- Images/logos ship as **per-deck image assets**, Vite-imported from
  `Projects/<slug>/assets/`. Relative `url()` in a `<style>` string is
  NOT served by open-slide's dev server. [§2.8 · App: Phase-8 finding]
- JP decks: subset HomuraM per-deck before finalize via
  `scripts/da2-subset-fonts.sh <slug>` (~97% reduction). Theme fonts
  in `themes/taikyoku/assets/fonts/` are read-only source-of-truth.
  [§2.8 · App: Phase-9 Increment-4]
- Single-file HTML portability sacrificed for Vite imports. User-
  accepted; brief-deprioritised. [§2.8]

### Parked / deferred (don't ship)
- **`WordmarkLockup`** — typographic lockup parked 2026-05-18; brand
  mark ships as image asset. [§2.9 · App: Phase-8 post-verification]
- **`KanjiSeal`** — red 大 seal deferred 2026-05-18; alternate
  approach TBD. `brand-red #C00000` reserved but unused. Section-
  divider slot stays reserved but renders nothing. [§2.9]
- **`BilingualHeadline` mixed modes** (`latin-jp` / `jp-latin`) —
  parked when language model became mono-language. Use
  `single-latin` / `single-jp` only. [§2.9]
- **`component-from-screenshot` skill** — deferred to a future phase;
  all 19 Tier-1 components were spec-built from Session B and the
  screenshot tool was always for growth beyond Tier-1. [§2.9]
- **Reserved component slot #15** — no archetype gap emerged during
  Phase 9; slot stays open. [§2.9]

---

## 2. Current state by topic

### 2.1 Palette

| Token | Light | Dark (accepted) | Role |
| --- | --- | --- | --- |
| `--tk-grad-cool` | `#A6C9EB` @ 12% | `#151030` @ 40% | gradient cool stop |
| `--tk-grad-warm` | `#FFE9BF` @ 100% | `#8B8B96` @ 100% | gradient warm stop |
| `--tk-paper` | `#FFFFFF` | `#141029` | canvas |
| `--tk-paper-tint` | `#F4F7FB` | `#201A3C` | card surface (level 1) |
| `--tk-paper-tint-2` | `#E9EEF4` | `#2A2452` | nested/layered cards (level 2) |
| `--tk-ink` | `#0A0A0A` | `#E6E0CE` | body & display text |
| `--tk-ink-soft` | `#3F3F3F` | `#ACA6BC` | secondary headers |
| `--tk-ink-muted` | `#6B6B6B` | `#786F92` | folios, captions, meta |
| `--tk-ink-faint` | `#AFAFAF` | `#5A5478` | separators, deemphasised |
| `--tk-accent` | `#7030A0` | `#B388E0` | purple — load-bearing single accent |
| `--tk-accent-hot` | `#FFE1A4` | `#FFE1A4` | gold — one rationed moment per deck |
| `--tk-accent-negative` | `#9B2226` | `#E26D6F` | data-negative + blocked workflow step only |
| `--tk-line` | `rgba(0,0,0,0.12)` | `rgba(230,224,206,0.14)` | hairline borders |
| `--tk-rule` | `rgba(0,0,0,0.40)` | `rgba(230,224,206,0.34)` | hero horizontal rule |
| `--tk-logo-filter` | `grayscale(1) brightness(0)` | `+ invert(1)` | monochrome logo (mode-aware) |
| `brand-red` | `#C00000` (reserved, unused) | — | was KanjiSeal seal; **deferred 2026-05-18** |

**Three reds, disjoint roles:** `accent-negative` (data deltas + blocked
process steps), `brand-red` (parked KanjiSeal ornament), decorative
stays purple. compose-deck never substitutes.

**Gradient variants** (per-deck opt-in; default = cool):
- `cool-default` — `#A6C9EB → #FFE9BF`, 330deg, the default.
- `earth` — TBD stops, mining / industrials.
- `warm-energy` — TBD stops, energy / climate.

**Gold rule:** deck-level assignment, once per deck. `closing`'s
`goldMoment` prop defaults `false`. May ship with no gold; **never
two**.

### 2.2 Typography

| Element | Latin | JP (rendered ≈ Latin × ratio) |
| --- | --- | --- |
| Hero title (cover, 168 px) | Prata 400 | HomuraM SemiBold/Display @ 0.92×, line-height 1.05 |
| Page heading (88–104 px) | Prata 400 | HomuraM SemiBold @ 0.92×, line-height 1.05 |
| Section number (144 px) | Prata 400 | HomuraM Display 700 |
| Card title (60 px) | Prata 400 | HomuraM SemiBold |
| Plotted-item label (30–34 px) | Prata 400 | (Latin only — JP decks use HomuraM where present) |
| Role label / person (26–28 px) | Prata *italic* | n/a |
| Card role-kicker (24–26 px) | Prata *italic* | n/a |
| Eyebrow (22 px caps) | Helvetica Neue 700, tracking 0.22em | (caps system, Latin) |
| Eyebrow meta (20 px caps) | Helvetica Neue 500, tracking 0.16em | — |
| Folio (20 px caps) | Helvetica Neue 700, tracking 0.16em | — |
| Counter (mono, 20 px) | JetBrains Mono 700, tabular-nums | — |
| Body lead (32–36 px) | Inter 500, line-height 1.4–1.5 | Noto Sans JP 400, line-height 1.75, ≈0.88× Latin |
| Body (26–28 px) | Inter 500, line-height 1.55 | Noto Sans JP 400 |

**Prata-italic scope** (corrected from Session B cross-cutting #1 →
Phase-8 widening): person/attribution roles + **card role-word kicker**
only. Never the card *title* (Prata non-italic) or generic caps labels.

**Mono scope:** numerics + technical/literal strings — page counter,
tabular metric figures, dates in meta strips, version tags, API names,
dimensions, file paths, roadmap quarter labels. Never prose, labels,
or headings.

**Font loading** — Latin via Google Fonts. **HomuraM bundled** at
`themes/taikyoku/assets/fonts/` (~14 MB source-of-truth; decks ship
per-deck subsets via `scripts/da2-subset-fonts.sh`). Use **Vite
imports** for the woff2 (`import homM from
'../../themes/taikyoku/assets/fonts/HomuraM-Medium.woff2'`) — relative
`url()` in `<style>` strings is NOT served by open-slide.

### 2.3 Motion

**Keyframes (exhaustive):**
- `tk-fadeUp` — universal entrance. 600 ms ease-out. Sibling stagger
  200 ms; card grids 150 ms.
- `tk-fadeIn` — opacity-only reveal. 400–600 ms.
- `tk-grow` — AccentRules and intentional horizontal strokes.
  `cubic-bezier(0.7, 0, 0.2, 1)`. 600–800 ms.
- `tk-growY` — vertical structural lines (column divider, progress
  thread). Same easing/budget. Structural only.
- `tk-rise` — cards entering. `cubic-bezier(0.2, 0.7, 0.3, 1)`. 600 ms,
  stagger 150 ms.
- `tk-draw` — structural/data SVG strokes only. 800 ms ease-out.
  Allowed: chart paths, timeline axis, process/workflow connectors,
  framework/methodology connectors. Forbidden everywhere else.

**Budget tier follows density** (low → fades only; medium → moderate
stagger; high → one long motion + full stagger). Per-component motion
choices (chart-hero draw-then-annotate, image-led `tk-fadeIn`,
process-flow synced draw) override the density default where they're
explicit.

**Page transitions:** uniform global cross-fade ~300–400 ms (lock one
value in production). Pre-paint the incoming canvas under the fade so
gradient↔paper doesn't flash.

**Count-up** (sanctioned 2026-05-19): one-time, on-enter, ≈700 ms ease-
out, no overshoot, parses prefix/number/suffix so `$6.2B` / `14 mo` /
`73%` animate the number only. **HOOK-FREE — mandatory**; ref-callback
+ rAF only; children default to final value (graceful with reduced-
motion). Built into `headline-metric` + `quarterly-metrics` hero-lead.
Never on small/delta cells, body, or labels.

**Language-invariant.** JP/bilingual decks animate identically to Latin.
Adaptation lives in typography/layout, not motion.

### 2.4 Component library (Tier 1 — 19 components)

Naming is **by intended use**, not abstract layout. The catalog also
appears in `COMPOSITION.md` §1; this is the source-of-truth for variant
+ density + canvas-type.

| File (`themes/taikyoku/components/`) | Use | Variants | Density | Canvas |
| --- | --- | --- | --- | --- |
| `opening-hero.tsx` | deck cover | — (text + structural graphics only; visual slot dropped 2026-05-18) | standard fixed | full (gradient) |
| `section-divider.tsx` | chapter divider | gradient-variant prop; KanjiSeal slot reserved/empty | fixed | full (gradient) |
| `closing.tsx` | sign-off | — | fixed (gold OFF by default; mark = brand image asset) | full (paper) |
| `image-led.tsx` | image carries it | full-bleed / framed | fixed | full (own) |
| `deck-contents.tsx` | "what's in this deck" | agenda-grid / progress-map | fixed | block |
| `quarterly-metrics.tsx` | metrics row | hero-supporting / metric-delta | lean/standard/rich | block |
| `headline-metric.tsx` | the one number | — | standard fixed | block |
| `chart-hero.tsx` | chart + interpretation | narrativePosition side / below | lean/standard/rich | block |
| `quadrant.tsx` | 2×2 positioning | — (highlightQuadrant) | lean/standard/rich | block |
| `product-comparison.tsx` | A-vs-B w/ a pick | accentColumn + rowLabels | lean/standard/rich | block |
| `before-after.tsx` | transformation | stacked-overlay / diff-list | lean/standard/rich | block |
| `value-grid.tsx` | 3 value cards | surface bare / tint / tint2 | lean/standard/rich | block |
| `timeline.tsx` | past sequence | milestones / phased | lean/standard/rich | block |
| `roadmap.tsx` | forward plan | quarter-columns / swimlanes / now-next-later | lean/standard/rich | block |
| `process-flow.tsx` | linear workflow | — (per-step status) | lean/standard/rich | block |
| `methodology.tsx` | conceptual framework | stack / loop / pillars | lean/standard/rich | block |
| `customer-voice.tsx` | testimonial | — | lean/standard/rich | block |
| `bio-card.tsx` | people | spotlight / grid / lead-supporting | fixed | block |
| `logo-cluster.tsx` | social proof | — (monochrome toggle) | lean/standard/rich | block |

**Two kinds of component:** **full-slide archetypes** (`opening-hero`,
`section-divider`, `closing`, `image-led`) render their whole slide
(gradient/paper, padding, etc.) and ARE a Page when used.
**Canvas-agnostic blocks** (the other 15) render only their content
and assume a parent supplies the paper canvas + 100 px padding — a
composing Page wraps them in `PaperCanvas`.

**Hook-free invariant.** No React hooks anywhere in the library. The
count-up regression (2026-05-19) blanked the deck; the fix is
ref-callback + `requestAnimationFrame`. Codified as a hard constraint.

**Self-containment.** Each component redeclares its own `c` (token
constants) and `f` (font-family strings) inline — never imports shared
tokens, never imports from `react`. Portability preserved (a component
copy-pasted into any deck renders).

**Token indirection (dark mode).** Component token values are
`var(--tk-NAME, <light-hex>)` — light hex is the fallback so standalone
rendering and portability are preserved. Decks set the dark block via
a **per-slide wrapper**, not `:root`.

**Transcribe-not-import.** A composed `Projects/<slug>/index.tsx` is
**one file** (compose-deck hard-rule 1). It does NOT import from
`themes/taikyoku/components/`. The composer transcribes the components
into the deck, specialised to the chosen variant/density. The library
is the spec/source-of-truth, not a runtime dependency. Consequence to
accept: library bug-fixes do **not** propagate to already-composed
decks (decks are git-versioned artifacts; recompose if a deck must
pick up a library change). Master-reference is the documented
exception — it `import`s the library to auto-reflect changes.

### 2.5 Composition (Phase 11 — anatomy + grammar)

The full spec lives at `COMPOSITION.md` §1.5. Summary:

**Production-slide anatomy** (every content slide has all five):
1. Eyebrow strip — section/eyebrow label + right-side meta.
2. Action title — the "so-what" Prata headline (a *conclusion*, not a
   topic label). Optional subhead.
3. Body region — a primary element + a supporting cluster of **≥2**
   secondary elements (secondary component, stat callout, annotation,
   labelled list, mini-comparison).
4. Source / method line — citation/methodology above the folio
   ("Source: …", "n = …", "FY25→26").
5. Folio — section name + page X / Y.

Full-slide archetypes (`opening-hero`, `section-divider`, `closing`,
`image-led`) are exempt from the body rule — they ARE the slide.

**Density floor (hard rule).** Content slide carries chrome + action
title + ≥3 distinct content elements + a source line, fills ≈85–90 %
of canvas, ≤ ~120 px true dead margin. If a beat only yields one
element, the **storyboard is under-planned** — surface it, do not
ship the sparse slide.

**Named layouts (pick one per beat):**
- `primary-rail` (62/38) — primary left, supports right.
- `primary-band` (top 64 / bottom 30) — primary across top, support
  cells below.
- `two-up` — two co-equal components side by side under one action
  title.
- `anchored-rail` — full-width primary + thin annotation rail right.
- `dense-grid` — action title + 2×2 / 2×3 grid of small cells.

**Support kit** (slide furniture, NOT new components — compose inline
with theme tokens): stat-callout, insight, labelled-list, annotation,
mini-source.

### 2.6 Dark mode

Light = daytime sky→sun (unchanged); dark = night-sky indigo → ashen
moonlit grey, faint-ivory ink. Mode is **per-deck, mono-mode** (like
language). A deck is light **or** dark.

**Wrapper pattern** (see taikyoku.md → "Theming tokens"):

```tsx
const TK_LIGHT: Record<string,string> = { '--tk-paper':'#FFFFFF', /* ... */ };
const TK_DARK:  Record<string,string> = { '--tk-paper':'#141029', /* ... */ };
// every Page:
<div style={{ ...(TK_DARK | TK_LIGHT), width:'100%', height:'100%' }}>…</div>
```

**Why a wrapper, not `:root`.** open-slide injects each page's
`<style>` into the shared document; a `:root` declaration is global
and persists, so a dark page bleeds into every light page. Confirmed
bug 2026-05-19. Inline custom properties on the wrapper cascade only
to that subtree — zero global state.

**Standalone rendering preserved** because component values are
`var(--tk-NAME, <light-hex>)`. A copy-pasted component without any
wrapper still renders correctly (the fallback applies).

**Tokens not in scope:** `brand-red` is reserved/unused (KanjiSeal
deferred) — no `--tk-brand-red`. Fonts are mode-invariant (not
tokenized).

### 2.7 Voice & language

**English (Session C C6–C9 — all stand):**

- Register: **60/40 institutional / founder-direct**. Institutional
  default; punch reserved for headlines + one accent line.
- Sentence length: body ≈15–25 words, one idea per sentence.
  Fragments only in headline/eyebrow/one accent line.
- Forbidden — two groups:
  - **Hype:** imagine, revolutionary, unlock, game-changer, disrupt,
    seamless, leverage (as verb), synergy, world-class, cutting-edge,
    best-in-class, 10x, supercharge, delight, magic.
  - **AI-tells:** delve, tapestry, moreover, furthermore, "in today's
    fast-paced world", "it's worth noting".
- **Em-dashes permitted** — deliberate house style; never flag or
  auto-rewrite. (Also recorded in long-term memory as a cross-project
  user preference.)
- Casing: headlines & page headings = **Title Case**; eyebrow/folio =
  tracked CAPS; body = sentence case. The Phase-6.1 demo +
  `da2-retrospective` (now archived) use sentence-case headlines and
  are not re-cased — frozen historical, not regression.

**Japanese (Session C C10–C12 — all stand; C13 superseded):**

- Three-tier formality, role-mapped:
  - 常体 / である調 + 体言止め → titles, headlines, accent lines.
  - 丁寧語 / です・ます → body and most cases (default).
  - 敬語 → external client-/exec-facing decks only (per-deck override).
- Per-role particle consistency strict; no intra-block drift. Body
  です/ます consistent; headlines 常体/体言止め; list items + labels +
  captions 体言止め.
- Typeset: 禁則処理 (no 。、 or closing brackets orphaned), full-width
  。、, half-width Latin/digits with correct spacing, wordmark 中黒
  U+30FB. **Katakana-tolerant** — established loanwords (プロダクト,
  スケール, ロードマップ) permitted; no forced 漢語 substitution.

**Language model — mono-language production** (supersedes Session C
C13 same-slide mirror):
- Production deck = all-English (with limited relevant Japanese) **OR**
  all-Japanese (with limited relevant English). **No same-slide
  bilingual mirror.**
- References / galleries / component libraries: demonstrate the theme
  on **separate consecutive slides** — English first, then its Japanese
  counterpart. Never both on one slide.

### 2.8 Assets & finalize

**Images / logos.** Ship as **per-deck image assets** at
`Projects/<slug>/assets/`, imported via Vite (`import logo from
'./assets/tkyk-mark.svg'`). A relative `url('../...')` in a `<style>`
block is NOT served by open-slide's dev server (returns SPA shell —
confirmed Phase 8). Theme-level shared assets work via the same Vite-
import mechanism (cross-dir is allowed; no per-deck duplication
needed).

**Single-file HTML portability is sacrificed** for this convention —
explicitly accepted (and brief-deprioritised). PDF export still works
either way.

**Japanese decks — font subsetting at finalize.** `scripts/da2-subset-
fonts.sh <slug>` scans the deck for used codepoints + an ASCII/JP-
punct/kana safety base, runs `fontTools.subset` on the source woff2 →
`Projects/<slug>/assets/fonts/HomuraM-*.woff2`. The deck imports its
own subset (~123 KB / weight, ~97 % smaller). Verified on the
bilingual reference deck: **13.9 M → 367 K (−97.4 %)**. The theme
fonts in `themes/taikyoku/assets/fonts/` are **never modified**. Rare
glyphs degrade to Noto Serif JP (the documented fallback).
`da2-finalize.sh` warns if a deck still imports the shared theme
fonts.

### 2.9 Parked / deferred (don't ship)

- **`WordmarkLockup`** — typographic lockup parked 2026-05-18 ("not
  looking good"). Brand mark ships as image asset. Spec retained in
  taikyoku.md as design history; not used by decks.
- **`KanjiSeal`** — red 大 seal deferred 2026-05-18; alternate
  approach TBD. `brand-red #C00000` reserved but unused.
  Section-divider slot stays reserved, renders nothing. Do not
  reintroduce until a new approach is decided.
- **`BilingualHeadline` mixed modes** (`latin-jp`, `jp-latin`) —
  parked when production became mono-language. `single-latin` /
  `single-jp` only.
- **`component-from-screenshot` skill** — deferred to a future phase;
  Tier-1 was spec-built, so the screenshot pipeline is for growth
  beyond Tier-1.
- **Reserved component slot #15** — open. No archetype gap emerged
  during Phase 9; new slide types will be added in a future session,
  named-by-use, built into the slot then.

---

## 3. Appendix — superseded history

Each subsection records a reversal: the **original** decision, the
**replacement**, and the **reason**. Preserved verbatim from the
original chronological log so a future operator can see why the rule
flipped and not re-litigate it. Entries are grouped by topic.

### App: B-Arch-19 (Session B Archetype 19, Closing) — closing gold default → deck-assigned

- **Original (Session B, 2026-05-18):** "Closing reserves the gold
  moment by default. Gold gets to the closer in most decks." Also:
  "Allow closing-breath bookend — `tk-breath` on cover AND gradient
  closing." Doubly-locked by Session C C4.
- **Replacement (Phase 8 post-verification, 2026-05-18):** Gold is a
  **deck-level assignment** — `closing.goldMoment` defaults `false`.
  compose-deck consciously chooses the one slide. May ship with none;
  never two.
- **Reason:** the user judged that auto-claiming gold for the closing
  was too predictable; making it a conscious editorial choice forces
  the composer to think where the eye most needs to land.

### App: B-Arch-19 + C-Topic-4 → 2026-05-18 — breath removed entirely

- **Original (Session B Arch 19 + Session C C4):** `tk-breath` allowed
  on cover AND gradient closing as a bookend. Doubly-locked.
- **Replacement (2026-05-18):** `tk-breath` removed entirely. No cover
  breath, no closing breath, no bookend, **no ambient/looping motion
  of any kind** in the theme. Cover may carry one static (un-animated)
  radial glow at low opacity.
- **Reason:** user direction ("kill breath entirely") after viewing
  the bilingual reference deck. The breathing gradient read as
  decoration where Taikyoku's discipline is "structure, not
  decoration." Logged here so a future session doesn't reintroduce it.

### App: B-Arch-3 (Session B Archetype 3, Stat grid) — no count-up → count-up sanctioned (large metric only)

- **Original (Session B, 2026-05-18):** "Standard, no count-up.
  Figures appear final (animated counting rejected as off-register)."
  Reinforced in C2/forbidden idioms.
- **Replacement (2026-05-19):** **One-time count-up sanctioned** on
  large metric figures only — `headline-metric` value and
  `quarterly-metrics` hero-lead. Small/delta cells deliberately
  excluded (original "reads busy" objection still holds there).
  Constraints: once, on enter, ≈700 ms ease-out, no overshoot,
  `tabular-nums` (no layout shift), honours `prefers-reduced-motion`,
  parses prefix/number/suffix.
- **Reason:** user direction during Phase 11 feedback round 1 —
  "update brief, I want count-up for large metrics." The original
  objection was specifically about busy-ness, which doesn't apply
  when the figure is the slide's whole point.

### App: count-up hook regression (2026-05-19) — count-up must be HOOK-FREE

- **Original (first count-up build, 2026-05-19):** Used React
  `useState` / `useEffect` — the first hooks ever in the component
  library. **Blanked the whole deck** at render time. Transform was
  clean (a client runtime crash, masked by benign HMR notices).
- **Replacement:** Re-implemented with **ref-callback +
  `requestAnimationFrame`**; children default to the final value
  (graceful with no JS / reduced-motion). Zero hooks, no `react`
  import.
- **Codified hard constraint:** the component library + open-slide
  render path are hook-free. **No React hooks, no `react` import,
  anywhere in the library** — this is a hard constraint, not a
  preference.

### App: synthesis-baseline → Phase-7 reversal — Archivo → Helvetica Neue

- **Original (Phase 6.1 synthesis):** Caps face = Archivo 700/900.
- **Replacement (Phase 7, Session A Topic 3 + brief lock):** Caps face
  = **Helvetica Neue** (Inter fallback). Archivo fully removed.
  `taikyoku.demo.tsx` + the `da2-retrospective` archive deck remain
  frozen on Archivo as historical reference, not regression.
- **Reason:** the synthesis Archivo read too "startup grotesque"
  against Prata; Helvetica Neue tracks cleaner at small caps and is
  consistent with the institutional 60/40 register.

### App: B-cross-1 (card role label) → Phase-8 widening — Prata-italic scope corrected

- **Original (Session B cross-cutting #1):** Prata-italic = person /
  attribution role labels only. Card role labels = Helvetica Neue
  tracked caps (Archetype 16 reversal of the brief's float).
- **Replacement (Phase 8 Conflict 2):** Prata-italic widened to
  person/attribution AND **card role-word kicker** (a small italic-
  Prata kicker above the card title — brand-brief cue). Card *title*
  remains Prata non-italic. Generic systemic labels (eyebrow / folio /
  TOC) stay Helvetica Neue tracked caps.
- **Reason:** the italic-Prata role-word is a deliberate brand
  signature; scoping it as a **kicker** (not the title) preserves both
  the Archetype-16 decision and the brand-brief cue.

### App: A-Topic-1 + A-Topic-2 (CJK body) → Phase-8 split — HomuraM body → Noto Sans JP body

- **Original (Session A Topic 1):** HomuraM Medium = Japanese body
  type. Topic 2's CJK type-scale body row used HomuraM at ≈0.88×.
- **Replacement (Phase 8 post-verification, 2026-05-18, ✅ user-
  confirmed in-browser):** Japanese body prose → **Noto Sans JP**
  (Google Fonts, w400/500). HomuraM stays for JP **display /
  headline / large kanji** only. Theme is serif-display + sans-body
  in both scripts. CJK body ratio ≈0.88× Latin, line-height 1.75.
- **Reason:** brush-serif HomuraM read heavy at body size when
  actually rendered; Noto Sans JP mirrors the Inter sans Latin body.

### App: Phase-8 finding — relative `url()` doesn't serve

- **Discovery:** open-slide's dev server returns the SPA shell for
  relative `url('../../themes/taikyoku/assets/fonts/HomuraM-*.woff2')`
  inside a `<style>` block (Vite catch-all). Confirmed in browser.
- **Fix:** use **Vite imports** for woff2 (and any cross-dir asset),
  interpolate the imported URLs into `@font-face src`. The same
  mechanism proves out for the logo image asset (✅ user-confirmed
  rendering 2026-05-18). The relative-`url()` example was removed from
  taikyoku.md so future decks copy the working pattern.

### App: Phase-8 — KanjiSeal deferred, WordmarkLockup parked, image-asset convention

- **Original (Phase 8 build):** Both `WordmarkLockup` (typographic
  lockup) and `KanjiSeal` (red 大 stamp ornament) added to fixed
  components.
- **Replacement (Phase 8 post-verification, user review 2026-05-18):**
  - **KanjiSeal deferred** — user dropped the red seal; alternate
    implementation TBD. `brand-red #C00000` reserved but unused (seal
    was the only consumer). Section-divider slot stays reserved,
    renders nothing.
  - **WordmarkLockup parked** — typographic lockup "not looking good."
    Brand mark ships as **image asset** (per-deck import from
    `Projects/<slug>/assets/`).
- **Reason:** user judgment after seeing both in-browser. The image-
  asset convention proved cleaner and is the same mechanism that
  resolves the bundled-font-loading caveat.

### App: C-Topic-13 (bilingual mirror) → 2026-05-18 reversal — mono-language production

- **Original (Session C C13):** Anchored-headline mirror — headlines /
  key claims mirror 1:1 across EN/JP on the same slide; bilingual is a
  same-slide composition with mirrored Prata + HomuraM.
- **Replacement (2026-05-18):** **Production decks are mono-language.**
  No same-slide bilingual mirror. References / examples / galleries
  show EN then JP as **separate consecutive slides** — one language
  per slide.
- **Reason:** user direction after viewing the bilingual reference
  deck — same-slide mirror "isn't how I'd send a deck out." The
  Session A Latin-only-default → JP-opt-in stance still holds; "opt-
  in JP" now means an all-JP deck, not a mirrored one.

### App: Increment-3 spike + token-indirection phase (2026-05-19) — dark productionised

- **Original (Session A Topic 6):** Dark = a Phase 9 gallery-only
  feasibility spike. No production decks in dark until validated.
- **Replacement (2026-05-18 spike → 2026-05-19 productionisation):**
  - 2026-05-18 spike (4 archetypes light/dark on a separate
    `taikyoku-dark-spike` deck — now archived) iterated to a day/night
    metaphor: deep indigo `#151030` 40% → ashen moonlit grey
    `#8B8B96` 100%, faint-ivory ink. **Spike palette accepted by user**
    as the locked dark-reference. Conditional GO: production-dark gated
    on a token-indirection refactor (the 19 components hard-redeclared
    light hex inline).
  - 2026-05-19 token-indirection phase built: all 19 components
    refactored to `var(--tk-NAME, <light-hex>)` (light hex is the
    fallback so portability + standalone rendering preserved). One
    `:root` block per deck flipped everything.
- **Reason:** the spike validated the aesthetic and priced the cost;
  the CSS-variable approach delivered dark production-readiness
  without forking the components.

### App: token-indirection convention change — fallback over hard-redeclare

- **Original (Phase 7/9):** Component portability rule —
  "redeclare hardcoded hex inline." Each component's `c` token block
  was self-contained with literal `#7030A0`, `#FFFFFF`, etc.
- **Replacement (2026-05-19):** Components use
  `var(--tk-NAME, <light-hex>)` — the light hex is the **fallback**.
  Standalone rendering and portability are preserved (a component
  copy-pasted without any wrapper still renders light correctly), and
  a deck flips to dark by setting the `--tk-*` block once on a
  wrapper.
- **Reason:** dark mode required token indirection; the fallback form
  satisfies that without sacrificing the portability the original rule
  was protecting.

### App: 2026-05-19 scoping bug + fix — wrapper, not `:root`

- **Original (first dark productionisation cut):** Set the dark vars
  via a `:root {}` block in the deck `<style>`.
- **Bug:** open-slide injects page styles into the shared document;
  slide DOM coexists in one tree, so `:root` is **global and
  persistent**. A dark page contaminated every other page (user:
  "light mode renders as dark as well").
- **Fix:** mode vars are inline custom properties on a **per-slide
  wrapper element** — declare `TK_LIGHT` / `TK_DARK` plain JS objects
  and spread onto a full-bleed `<div style={{ …vars,
  width:'100%', height:'100%' }}>` that wraps every Page's content.
  Inline custom properties cascade only to that subtree → zero global
  state.
- **User-confirmed 2026-05-19** ("light and dark render as expected").

### App: Phase-10 finding — transcribe-not-import

- **Discovery (Phase 10 capstone, 2026-05-19):** compose-deck's
  hard-rule #1 (one file, no sibling/imported component files) means
  a composed deck **reproduces** each component's code inline,
  specialised to the variant/density it uses. This works (and is
  acceptable — decks are git-versioned artifacts) but has a
  consequence: library bug-fixes do **not** propagate to already-
  composed decks.
- **Documented:** `COMPOSITION.md` §1 now states the
  transcribe-not-import model outright so a future composer doesn't
  expect an import and knows decks don't auto-inherit library changes.

### App: Phase-11 — composition-density (anatomy + grammar)

- **Discovery (Phase 11, 2026-05-19):** v1 master-reference and earlier
  decks failed in production density — "one beat → one austere
  component → empty slide." Components are deliberately austere; the
  empty slide is a composition failure, not a component failure.
- **Fix:** **composition-only** — components unchanged. Added
  COMPOSITION.md §1.5 — the slide anatomy + density floor + named
  layouts + support kit (see §2.5 above). Agents (storyboard,
  compose-deck) upgraded to plan/assemble to the anatomy. Lone centred
  components forbidden. Master-reference rebuilt as v2 — fewer pages,
  each far fuller.
- **Reason:** Phase 7's restraint discipline is per-component; the
  slide must be dense by construction.

### App: Phase-12 (2026-05-22) — layout promotion (deck-local → theme-imported)

- **Original (Phase 11, 2026-05-19):** the COMPOSITION.md §1.5 anatomy
  + grammar (`Frame` / `Structural` / `Rail` / `Band` / `TwoUp` +
  support kit) was a *spec* — its reference implementation lived
  deck-local inside
  `Projects/2026-05-19_taikyoku-master-reference/index.tsx`. The next
  deck would either copy master-reference's scaffolding or re-derive
  it. Either way fragile.
- **Replacement (Phase 12, 2026-05-22):** the 10 deck-local layout
  primitives promoted into `themes/taikyoku/layouts/` (PascalCase
  files, named-only export, per-file `var(--tk-*, light)` token
  redeclaration). Two more added — `AnchoredRail` (`anchored-rail`)
  and `DenseGrid` (`dense-grid`) — so all five COMPOSITION.md §1.5
  named layouts have files. Total **11 primitives + a barrel
  `index.ts`**. Master-reference migrated to `import { … } from
  '../../themes/taikyoku/layouts'`; ~100 lines dropped (429 → 331).
- **Asymmetry codified:** layouts are **imported** (theme
  infrastructure); components remain **transcribed** (deck content,
  per-variant specialisation, frozen-with-deck). A layout bug-fix DOES
  propagate to existing decks — treat layouts as a versioned API. Doc
  trail: `themes/taikyoku/layouts/README.md`, taikyoku.md "Layouts
  (Phase 12)", COMPOSITION.md §1 (layouts-vs-components paragraph) +
  §1.5 (name-to-file cross-links), compose-deck "Phase 12 — Theme
  layouts" subsection.
- **Load-bearing preserved (D4):** zone slots stay `display:'block'`
  so a block child fills the zone; `Structural` still drops Frame's
  eyebrow to avoid double chrome; `Frame jp` still flips action title
  to HomuraM + sub to Noto Sans JP. Verified by render-parity on
  master-reference.
- **Reason:** the spec stopped being deck-local scaffolding and became
  first-class theme infrastructure. Next decks (and Stream 2-derived
  composition subagents) build on a real layout surface instead of
  re-deriving anatomy chrome.

### App: Phase-9 Increment-4 — font subsetting at finalize

- **Original (Session A Topic 1 PENDING):** Per-deck font subsetting
  is a Phase 9 optimization.
- **Delivered (2026-05-18):** `scripts/da2-subset-fonts.sh` — scans
  `Projects/<slug>/*.tsx` for used codepoints + ASCII/JP-punct/kana
  safety base, subsets the three source woff2 → deck-local
  `assets/fonts/`. Verified 13.9 M → 367 K (−97.4 %) on the bilingual
  reference deck. `da2-finalize.sh` warns if a deck still imports the
  shared theme fonts. Source fonts never modified.

### App: Phase-8 Conflicts 1–5 — Phase-7 upheld over brand brief

- **Background:** Phase 8 surfaced 6 conflicts between Phase-7 contract
  and the older Brand Style Brief. User decided case-by-case.
- **Conflict 1 (card surface):** Phase 7 flat surface ramp **upheld**.
  Brand-brief grey-gradient + 12 px radius + drop-shadow superseded.
  "Structure carries depth, not fill."
- **Conflict 2 (card role label):** **Hybrid** — italic-Prata role
  kicker restored from brand brief; card *title* stays Prata non-
  italic (Archetype 16). Prata-italic scope widened (see App: B-cross-1).
- **Conflict 3 (eyebrow font):** Phase 7 Helvetica Neue **upheld**.
  Cinzel stays wordmark-only.
- **Conflict 4 (Montserrat):** **Excluded.** No Montserrat anywhere.
  Helvetica Neue covers all caps including bold uppercase block
  labels.
- **Conflict 5 (surface greys):** Phase 7 **cool ramp upheld**.
  `paper-tint` `#F4F7FB`, **`paper-tint-2` `#E9EEF4` (locked)**.
  Brand-brief warm `#F2F1F0`/`#AFAFAF` superseded.
- **Conflict 6 (red):** **Split with values** — `brand-red #C00000`
  (KanjiSeal, deferred), `accent-negative #9B2226` (data-negative +
  blocked workflow step). Two distinct tokens, non-overlapping roles.
- **Net:** Phase 7 upheld on 4, hybrid on 1, split on 1. The approved
  Phase 7 system stands; the brand brief contributed concrete values
  only.

---

## 4. Decision provenance

For chronological provenance (which Session, which date, which
specific question), the original 1953-line log is preserved in the
project's git history. Use:

```bash
git log -p -- themes/taikyoku/REFINEMENT.md
```

…or check the pre-flatten commit `67a2b80` ("Phases 7–11: Taikyoku
refinement → production system").

This restructure (2026-05-19) is **lossless** for locked rules and
their supersession trails. What was dropped: chronological narrative
that wasn't load-bearing for any current rule (interim drafts,
session-state preambles, "next: …" handoff lines now superseded by
HANDOFF.md).
