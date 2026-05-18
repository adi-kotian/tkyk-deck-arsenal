---
brief: taikyoku-extensions
status: ready-for-plan
target_phases: 7, 8, 9
authored: 2026-05-15
revised: 2026-05-15
audience: future Claude Code or Cowork session that plans these out
---

# Brief — Taikyoku theme: extensions, library, refinement

DA2 ships with a synthesis Taikyoku theme: paper canvas content,
gradient cover and section dividers, single purple accent, one gold
moment per deck, restrained motion. The synthesis was a stepping
stone. This brief covers the move toward fuller brand expression and a
component library that scales beyond the current five fixed
components.

Three work streams, separable but related. Each can ship in stages.

---

## Locked decisions

All eleven open questions answered + layout triage complete. This section
is the source of truth for the next session — older "open questions"
sub-sections inside each work stream are now annotated `resolved`.

### Typography
- **Display face:** Prata (unchanged).
- **Wordmark face:** Cinzel — used **only** in the wordmark lockup
  (TAIKYOKU · 大局 logo). Not for general eyebrows.
- **Caps / eyebrow / folio face:** Helvetica Neue with Inter fallback.
  Replaces Archivo from the synthesis theme. Helvetica Neue handles
  tracked caps cleanly; Inter is the Google-Fonts fallback when
  Helvetica Neue isn't installed.
- **Japanese face:** HomuraM (Medium and SemiBold weights), bundled
  into `themes/taikyoku/assets/fonts/`. **Prerequisite for Phase 8:**
  the user must provide the licensed `HomuraM-Medium.woff2` and
  `HomuraM-SemiBold.woff2` files before the phase ships. Noto Serif
  JP from Google Fonts is the fallback when HomuraM isn't installed.
- **Mono face:** JetBrains Mono (unchanged).

*Rationale:* aligns the theme with the brand brief's font role split.
The current synthesis Taikyoku theme's use of Archivo was a stepping
stone — Helvetica Neue is the brand's intended sans, and Cinzel is
scoped tightly to the wordmark logo where its classical Roman feel
belongs.

### Language
- **Default stance:** Latin-only on most decks, with per-deck override
  to engage Japanese or bilingual rendering.
- **Folio and meta strip format:** adapts to the deck's language.
  Japanese decks render dates as 2026年5月15日; Latin decks keep
  2026 · 05 · 15. Page counters stay tabular-num mono either way.
- *Rationale:* most Taikyoku decks address mixed audiences where Latin
  is the safer baseline; bilingual is opt-in per deck.

### Component library (Phase 9)
- **Granularity:** atomic, Storybook-style. Components compose into
  Pages — `<Hero />`, `<StatGrid />`, `<Footer />` combine to make one
  slide. `compose-deck` learns to assemble; the slide-authoring spec
  expands to cover composition rules.
- **Naming:** by intended use (`product-comparison`,
  `quarterly-metric`, `customer-voice`), not by abstract layout
  (`two-column-compare`, `metric-callout`). Names tell the
  storyboard subagent what a component *does*, not what it *looks
  like*.
- **Size target:** open-ended. The Tier 1 list (below) is the v1
  build queue; the library grows as the screenshot pipeline runs.
- **Theme-faithful gate:** restrain-and-flag. When a screenshot
  contradicts the theme, generate the restrained Taikyoku-flavored
  version and flag the substitution in the return summary. Don't
  refuse outright (creative input is precious); don't silently
  comply (loses the user's intent).

### Phase 7 refinement interview
- **Session shape:** several focused interviews, foundational to
  higher-level. Recommended split:
  - Session A — fonts (concrete: which weights of HomuraM, type scale
    adjustments for CJK, Cinzel sizing in the wordmark, mono usage),
    palette extensions (industry tints, dark variant timing).
  - Session B — slide layouts (deep dive on each Tier 1 archetype to
    extract design intent, density, motion budget, content slots).
  - Session C — animations + language tone (motion vocabulary
    refinement, English voice register, Japanese formality and
    bilingual mirroring rules).
- **Recording format:** decision + one-line rationale per item, in
  `themes/taikyoku/REFINEMENT.md`. Future-me readability matters
  more than concision.
- **Interview mode:** agent-interviews-user via `AskUserQuestion`.
  Agent drives, user answers, agent transcribes decisions back into
  `REFINEMENT.md` between sessions.

### Tier 1 components to build (Phase 9 build queue)

15 new components plus 4 already-shipped layouts to be
reconsidered/refined under the new typography:

**New (15):**
1. Hero / cover with secondary visual (chart, logo cluster, image)
2. Two-column comparison
3. Stat grid (3–4 metrics in a row)
4. Single big metric callout
5. Pullquote / customer voice
6. Timeline (horizontal)
7. Roadmap (quarter map)
8. Image-led slide (full-bleed or two-thirds + caption)
9. Chart hero (bar, line, area)
10. Logo cluster (customer / partner)
11. Bio / team card
12. Section TOC ("what's in this deck")
13. Methodology / framework diagram
14. Before / after
15. *(reserved — uncovered during Phase 7 interview)*

**Already shipped, may need refinement under new typography:**
- Section divider
- Three-card claim / value grid
- Process / workflow diagram (line-draw)
- 2×2 quadrant
- Closing (centered + gold rule)

**Deferred to Tier 2:**
- Code block / terminal aesthetic
- Table (data grid)
- FAQ / Q&A
- Calendar / agenda
- Pricing / tier comparison
- Glossary / definition

Phase 7 will likely surface additional archetypes — leave room.

---

## Work stream 1 — Japanese language + kanji rendering

### Goal

Decks can be authored entirely in Japanese, entirely in English, or
bilingually in any per-slide combination, with the Taikyoku name
lockup (Taikyoku · 大局) and brand kanji elements (red 大 seal, kanji
square mark) rendered as first-class components.

### Specific deliverables

**Typography for CJK.** Add a Japanese font role to `taikyoku.md`'s
type scale. Two candidate faces:

- **Noto Serif JP** (Google Fonts, free, professional serif) — matches
  Prata's editorial register, ships with no licensing concerns.
- **HomuraM / GMingChao** (licensed; brand brief notes weights
  Medium and SemiBold) — closer to the brand's intended voice, but
  requires bundling woff2 files into `themes/taikyoku/assets/fonts/`.

Recommendation: ship **Noto Serif JP as default**, with `local()` lookup
for HomuraM falling through to Noto when not installed. Same pattern
the brand brief's CSS uses.

Type scale considerations:

- CJK characters appear visually larger at the same px size as Latin.
  Convention: CJK runs at ~88-92% of the Latin equivalent.
- Line height for Japanese is looser: 1.6-1.8 vs 1.4-1.5 for Latin.
- Mixed CJK/Latin lockups (Taikyoku · 大局) need the CJK middle dot
  `·` (U+30FB), not the Latin one. The space rhythm differs too.
- Bullets are uncommon in Japanese business decks - prose with
  paragraph breaks is the convention. Layout primitives should
  support both density modes per language.

**Bilingual layouts.** Three primitive shapes a component should
support:

- *Latin headline, Japanese sub-line* — the cover convention when a
  Japanese audience reads an English-titled deck
- *Japanese headline, Latin sub-line* — the inverse, for international
  contexts where the Japanese voice carries
- *Single-language* — pure Japanese or pure English; no second line

**Logo files.** Copy from `Assets/Branding/TKYK Logos/` into
`themes/taikyoku/assets/logos/`:

- `TKYK_logo-web-hq.svg` — dark mark for light/gradient backgrounds
- `TKYK_logo-white.svg` — white mark for dark/video backgrounds
- (optionally) a kanji-square SVG isolated from the wordmark lockup

Two new fixed components in `taikyoku.md`:

- **`WordmarkLockup`** — kanji 大 square (2px ink border, Prata 大
  inside) + Cinzel "TAIKYOKU" + Prata 大局 stacked or inline. Two
  variants: full (cover) and mini (footer).
- **`KanjiSeal`** — the red-bordered 大 stamp for section dividers
  and as ornament. 56px standard, 32px small.

(Cinzel is a Google Font; commit to it now if we adopt the wordmark
lockup. Replaces or supplements Archivo as the brand caps face.)

**Portability stance.** The user has **deprioritized** single-file
HTML portability for this phase — the plan is to build a small
website-hosting layer later that embeds media. So:

- Use linked SVG files freely in `themes/taikyoku/assets/`
- Use Google Fonts via CDN (already the pattern)
- Use linked images / videos when they help
- Don't compromise visual quality to keep exports single-file

open-slide's HTML export already produces a zip when there are assets;
that's acceptable. The PDF export still works regardless. When the
website-hosting layer ships, the input will be the zip or the source —
either way, this is a future-phase concern.

### Resolved decisions

1. **Font commitment:** *resolved* — HomuraM now, bundled to
   `themes/taikyoku/assets/fonts/`, with Noto Serif JP fallback.
   Phase 8 prerequisite: user supplies the licensed woff2 files.
2. **Cinzel adoption:** *resolved* — Cinzel is the wordmark face
   only. Helvetica Neue (Inter fallback) replaces Archivo for
   eyebrows, folio, and tracked caps work.
3. **Default language stance:** *resolved* — Latin-only by default
   with per-deck override.
4. **Date and number formats:** *resolved* — `Folio` and meta strips
   adapt to the deck's language. Japanese decks use 2026年5月15日;
   Latin decks use 2026 · 05 · 15.

---

## Work stream 2 — Component library + screenshot pipeline

### Goal

A library of reusable Taikyoku-themed layout components that scales
beyond the five fixed components in the current theme. New components
land via a screenshot-driven workflow: the user attaches an inspiring
screenshot, an agent generates a matching React component following
Taikyoku conventions, the component lands in the library, and a
gallery deck auto-includes it for visual feedback.

### Specific deliverables

**Component library layout.** A new directory at
`themes/taikyoku/components/<kebab-name>.tsx`. Each file exports one
primary component (Page or sub-component). The library file structure:

```
themes/taikyoku/
  assets/
    logos/
    fonts/        (if HomuraM bundled)
  components/
    metric-callout.tsx
    pullquote.tsx
    two-column-compare.tsx
    timeline.tsx
    image-led.tsx
    table.tsx
    code-block.tsx
    stat-grid.tsx
    bio-card.tsx
    logo-cluster.tsx
    roadmap.tsx
    faq.tsx
    agenda.tsx
    glossary.tsx
    section-toc.tsx
    ... etc
```

Component file convention (mirrors what's documented in `taikyoku.md`):

- Pure-React, no external deps
- Uses the theme's `c` tokens and `f` font roles, redeclared at the
  top of the file (avoid cross-file imports for portability)
- Documents its purpose, expected slots, and motion in a header
  comment
- Accepts the slots it needs as props with sensible defaults

**Gallery deck.** A new slide module at
`themes/taikyoku.gallery.tsx` (alongside `taikyoku.demo.tsx`). One
page per component, with:

- Component label (eyebrow caps)
- Component rendered at canonical size
- A small caption noting when to use it

Updated by the screenshot-to-component workflow: when a new component
lands, the gallery gets a new Page automatically.

**Screenshot-to-component workflow.** A new DA2 skill at
`.claude/skills/component-from-screenshot/SKILL.md`. Reads:

- A screenshot path (from `uploads/`, `Projects/<slug>/sources/`, or
  any image path)
- `themes/taikyoku.md` for conventions, palette, type scale, motion
- The existing `themes/taikyoku/components/` to avoid duplicates

Writes:

- One new component file at `themes/taikyoku/components/<name>.tsx`
- A new entry in `themes/taikyoku.gallery.tsx` (or a new Page added)
- Optionally — a one-line addition to `themes/taikyoku.md`'s "Fixed
  components" list if the component is core enough to document

The skill follows a three-step loop:

1. **Inspect.** Read the screenshot. Describe the layout in 3-5
   bullets — column count, type hierarchy, accent color, motion if
   discernible.
2. **Translate.** Produce a Taikyoku-flavored component matching the
   layout. Use the theme's palette, type scale, motion vocabulary
   (`tk-fadeUp`, `tk-grow`, etc.). Reject any visual cue that violates
   the theme's forbidden list.
3. **Demo.** Add it to the gallery. Suggest the user open
   `http://localhost:5173/s/<gallery-slug>` to review.

User iterates by adding more screenshots or by saying "make the
headline tighter" / "drop the gold accent" etc. — the skill writes
revisions to the same component file.

### Resolved decisions

1. **Library size target:** *resolved* — open-ended. Tier 1 build
   queue (in Locked decisions above) is the v1 commitment; library
   grows via the screenshot pipeline.
2. **Component vs Page granularity:** *resolved* — atomic
   Storybook-style. Components compose into Pages. `compose-deck`
   gains assembly logic; `slide-authoring` spec expands to cover
   composition.
3. **Naming convention:** *resolved* — by intended use, not by
   abstract layout shape.
4. **Theme-faithful gate:** *resolved* — restrain-and-flag. Generate
   the restrained Taikyoku version of an off-theme screenshot and
   flag the substitution in the return summary.

---

## Work stream 3 — Multi-step refinement interview

### Goal

A structured discovery exercise — interview-style — that takes the
current Taikyoku theme and brand brief from "synthesis baseline" to
"production-grade brand system." Outputs feed into work streams 1 and
2; this happens **first** because it informs everything else.

### Topics to cover

Each is one or more sessions. Output is an updated section of
`taikyoku.md` (or a new sibling document) plus directional notes for
the component library.

1. **Color extensions.** Beyond the brand brief's palette:
   - Are industry-specific tints needed (energy → warm, mining → earth)?
   - Dark theme variant — when?
   - Secondary accents beyond purple + gold (the brand brief mentions
     red and magenta as deferred)?
   - Surface variations (paper-tint, card greys with gradient stops)?

2. **Typography commitments.**
   - Japanese face — Noto Serif JP only, or HomuraM bundling?
   - Caps face — Archivo, Cinzel, or both with explicit roles?
   - Mono — JetBrains Mono confirmed?
   - Type scale at small sizes (eyebrow 22 vs 18 — when do we drop?)
   - Italic/oblique usage — Prata italic for card "role" labels, anywhere else?

3. **Slide layouts.** Interview-style: walk through ~25 layout
   archetypes and triage each as Tier 1 (ship in v1), Tier 2 (later),
   or Skip. Archetypes to cover at minimum:
   - Hero / cover with secondary visual (chart, logo cluster, image)
   - Section divider (already shipped)
   - Three-card claim / value grid (already shipped)
   - Two-column comparison
   - Stat grid (3-4 metrics in a row)
   - Single big metric callout
   - Pullquote / customer voice
   - Timeline (horizontal)
   - Roadmap (quarter map)
   - Process / workflow diagram (already shipped, line-draw style)
   - 2×2 quadrant (already shipped)
   - Image-led slide (full-bleed or two-thirds image + caption)
   - Code block / terminal aesthetic
   - Table (data grid)
   - Chart hero (bar, line, area)
   - Logo cluster (customer / partner logos)
   - Bio / team card
   - FAQ / Q&A
   - Calendar / agenda
   - Pricing / tier comparison
   - Glossary / definition
   - Section TOC (the "what's in this deck" slide)
   - Methodology / framework diagram
   - Before/after
   - Closing (already shipped)

4. **Animation commitments.**
   - Motion budget per slide purpose (low / medium / high)
   - When is `tk-draw` allowed vs forbidden?
   - Page transitions — cross-fade default, anything else?
   - Cover breath — keep, or kill?
   - Per-language motion (does the breath feel right for Japanese
     audiences, or different motion register for CJK decks?)

5. **Language tone — English.**
   - Voice register: McKinsey/JP-Morgan vs founder-direct vs
     editorial-magazine?
   - Sentence length: how punchy is too punchy for this audience?
   - Forbidden words / phrases ("imagine", "revolutionary", "unlock")
   - Sentence case vs Title Case for headlines

6. **Language tone — Japanese.**
   - Formality register: 敬語 (humble/respectful), 丁寧語 (polite), or
     常体 (plain) for body? Recommend 丁寧語 for business decks.
   - Sentence-final particles: です/ます consistent, or mixed?
   - Japanese-typographic conventions (line break rules,
     handling of katakana loan words vs kanji compounds)
   - Bilingual decks: do the two languages mirror each other
     sentence-by-sentence, or does each language stand on its own?

### Output

A new document at `themes/taikyoku/REFINEMENT.md` capturing all
decisions in one place, with cross-references to:

- Updated `themes/taikyoku.md` (theme contract)
- Tier 1 component list to build via Work Stream 2
- Open commitments still pending

### Resolved decisions

1. **Session shape:** *resolved* — several focused interviews,
   foundational first (fonts, palette), then higher-level (layouts,
   animations, tone). Three sessions recommended (see Locked
   decisions section for the A/B/C split).
2. **Decision recording:** *resolved* — decision + one-line rationale
   in `themes/taikyoku/REFINEMENT.md`.
3. **Interview mode:** *resolved* — agent-interviews-user via
   `AskUserQuestion`. Agent drives, user answers, agent transcribes
   between sessions.

---

## Constraints across all work streams

- DA1 stays untouched.
- The current `taikyoku` theme should remain functional throughout —
  no breaking change to the existing 6-page demo or the
  `da2-retrospective` reference deck.
- The vendored `engine/` stays at `@open-slide/core@1.3.0` unless a
  feature we need requires upgrading. Sync via `scripts/sync-engine.sh`
  with a deliberate decision, not opportunistically.
- Approval gates carry over: when a session produces a meaningful
  change (new component, refinement decision, language commitment), the
  user approves before moving on.
- All new components ship with their motion vocabulary explicit and
  forbidden idioms enforced. The theme's "would McKinsey-meets-startup
  ship this?" filter applies.

---

## Suggested phasing

Three phases, mapped to work streams plus an integration phase.

**Phase 7 — Refinement interview.** Run Work Stream 3 first; it
informs everything else. Maybe 2-3 focused sessions over a week.
Output: `themes/taikyoku/REFINEMENT.md` and updated
`themes/taikyoku.md`. *Approximate scope:* 1-2 days of focused sessions.

**Phase 8 — Japanese rendering.** Land Work Stream 1's deliverables:
new fonts in the theme, CJK type scale, bilingual primitive
components, logo files copied in, `WordmarkLockup` and `KanjiSeal`
components added to the theme contract. *Approximate scope:* 1 day of
build + verification on a bilingual reference deck.

**Phase 9 — Component library + screenshot pipeline.** Work Stream 2:
ship the `component-from-screenshot` skill, scaffold
`themes/taikyoku/components/` and the gallery deck, run the pipeline
on the Tier 1 layouts from Phase 7's refinement. *Approximate scope:*
1 day for the skill + scaffolding; component generation is open-ended
and iterative.

**Phase 10 (integration) — A real bilingual production deck.** Pick a
real Taikyoku deck (Seed Information Pack? Roadmap pitch?) and run
the full pipeline on it with the expanded theme + library + Japanese
support. The validation that everything works together. *Approximate
scope:* 1 day of authoring.

Phases 8 and 9 can run in parallel after Phase 7 finishes.

---

## What to give the next session

When this brief gets fed back, the next session should:

1. Read this entire brief.
2. Ask which phase to start with (Phase 7 unless overridden).
3. For Phase 7 specifically: propose a session structure — how to
   split the refinement into ~3 focused interviews, which Tier 1
   layouts to prioritize, how to format `REFINEMENT.md`.
4. For Phase 8 or 9 if starting later: surface what's missing from
   Phase 7's outputs and ask before assuming.

End of brief.
