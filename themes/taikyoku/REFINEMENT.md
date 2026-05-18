---
doc: taikyoku-refinement
status: phase-7-interview-complete (Sessions A+B+C all approved)
brief: ../../briefs/taikyoku-extensions.md
theme-contract: ../taikyoku.md
started: 2026-05-18
audience: future Claude Code or Cowork session implementing Phases 8–10
---

# Taikyoku — Refinement decisions

Decisions captured during the Phase 7 refinement interview (Work Stream 3
of `briefs/taikyoku-extensions.md`). One decision + one-line rationale per
item. Future-me readability beats concision. Each session is approved
before the next is queued.

Cross-references:

- Theme contract to update once approved: `themes/taikyoku.md`
- Tier 1 component build queue: brief → "Tier 1 components to build"
- Open commitments still pending: tracked inline as `PENDING` notes

---

## Session A — fonts + palette extensions

Scope: HomuraM weights, CJK type scale, Cinzel sizing in the wordmark,
mono usage, industry tints, dark-variant timing, secondary accents,
surface variations. 8 topics. Conducted 2026-05-18.

### Topic 1 — HomuraM weights

- **decision:** Bundle three HomuraM weights — Medium + SemiBold + a
  heavier display weight. Medium = Japanese body/prose; SemiBold =
  Japanese headlines + emphasis; display weight = large section kanji
  (大局, section numbers, kanji-seal-scale glyphs).
- **rationale:** A third weight buys real hierarchy at section-kanji
  scale where SemiBold reads thin next to Prata's Latin display register;
  the larger bundle + 3-file licensing is an accepted cost.
- **PENDING (Phase 8 prerequisite):** user supplies licensed
  `HomuraM-Medium.woff2`, `HomuraM-SemiBold.woff2`, and the display-weight
  woff2 into `themes/taikyoku/assets/fonts/`. Confirm exact display weight
  name/value when files arrive. Noto Serif JP remains the `local()`
  fallback.

### Topic 2 — CJK type scale adjustments

- **decision:** Per-role scaling table, not one global ratio. Display
  kanji ~0.92× the Latin token size at ~1.05 line-height (titles, section
  numbers, 大局 — set tight); body kanji ~0.88× at ~1.75 line-height
  (prose — set loose). The Phase 8 type-scale section of `taikyoku.md`
  gets a paired CJK column per row rather than a single multiplier note.
- **rationale:** Display and body have opposite needs — headline kanji
  must hold the line tightly beside Prata while prose kanji needs air;
  one global ratio compromises both, the per-role table costs more
  documentation but renders correctly.
- **PENDING (Phase 8):** add a CJK size/line-height column to the
  `taikyoku.md` type-scale table for each affected row; confirm exact
  per-row ratios against rendered HomuraM (the 0.88/0.92 are starting
  points to tune on the bilingual reference deck).

### Topic 3 — Cinzel sizing in the wordmark lockup

- **decision:** Cinzel "TAIKYOKU" is optically matched to the 大 kanji
  square — its cap-height aligns to the square's inner height rather than
  carrying a fixed px size. Starting values: full (cover) ~44px, mini
  (footer) ~20px, tracking ~0.18em. The square is the dimensional anchor;
  Cinzel and Prata 大局 derive from it so the lockup reads as one unit.
- **rationale:** A logo lockup must read as a single mark at any scale;
  anchoring Cinzel to the kanji square's geometry keeps the three
  elements locked in proportion across the full/mini variants instead of
  drifting when sizes change.
- **PENDING (Phase 8):** when `WordmarkLockup` is built, derive Cinzel
  size from the square's inner height in code (not a magic px); tune the
  ~44/~20px + 0.18em starting points against rendered Cinzel + HomuraM.

### Topic 4 — Mono usage scope

- **decision:** JetBrains Mono allowed for numerics + technical/literal
  strings: page counter, tabular metric figures (stat-grid numbers,
  big-metric callout), dates in meta strips, plus version tags, API
  names, dimensions, file paths, and roadmap quarter labels. Mono signals
  "machine / literal." Never for prose, labels, or headings.
- **rationale:** A growing library will surface many literal-string
  contexts (roadmaps, technical decks); letting mono carry "machine/
  literal" consistently keeps the signal legible without leaking mono
  into editorial voice, which stays Prata/Inter/Helvetica.
- **PENDING (Phase 9):** components that render figures/technical strings
  (stat-grid, metric-callout, roadmap, timeline) must apply mono +
  `tabular-nums` per this rule; document the "never prose/headings"
  boundary in the slide-authoring composition spec.

### Topic 5 — Industry-specific tints

- **decision:** Gradient-stop variants only. Ship 2–3 named gradient
  pairs (cool default + e.g. earth, warm-energy) that swap **only** the
  cover/section gradient cool/warm stops. Paper, ink, accent (purple),
  and gold stay constant. Per-deck opt-in token; not the default.
- **rationale:** Sector differentiation is real but the brand must stay
  recognizably Taikyoku — confining variation to the two gradient stops
  gives a sector signal at the cover handshake while the load-bearing
  identity (paper, ink, single purple, rationed gold) never moves.
- **PENDING (Phase 7 follow-up / Phase 8):** name and specify the 2–3
  gradient pairs (hex stops + angle stays 330°); add to `taikyoku.md`
  palette as opt-in variants with a per-deck selection mechanism.

### Topic 6 — Dark theme variant timing

- **decision:** Phase 9, gallery-only feasibility spike. Build a dark
  canvas token set during the component-library phase and render the
  gallery deck in both light and dark to prove it out. No production
  decks in dark until the spike validates it.
- **rationale:** Dark is wanted but unproven against the full component
  set; spiking it on the gallery during Phase 9 surfaces inversion/glow
  problems early at modest cost, without committing every component to
  dual-mode QA before the light system is even validated.
- **PENDING (Phase 9):** define dark token set (canvas, inverted ink
  ramp, accent/gold behavior on dark, glow treatment); add a dual-mode
  render to `themes/taikyoku.gallery.tsx`; capture spike findings as a
  go/no-go note for production dark.

### Topic 7 — Secondary accents beyond purple + gold

- **decision:** Admit one semantic-only red. Used strictly for negative/
  risk/decline states in data components (deltas, chart series flagged
  negative). Never decorative, never in prose or headlines. Purple
  remains the sole brand accent; gold remains the once-per-deck hot;
  magenta stays deferred.
- **rationale:** Data slides genuinely need a negative signal that purple
  can't carry without ambiguity; fencing red to semantic data states
  gives that utility while preserving the discipline that defines the
  brand register.
- **PENDING (Phase 8 + Phase 9):** pick the exact red hex (must sit on
  paper and dark canvas, distinct from gold); add to `taikyoku.md`
  palette tagged "semantic only — negative/risk, data components, never
  decorative"; enforce the boundary in the slide-authoring spec and any
  stat/chart components.

### Topic 8 — Surface variations

- **decision:** Three-step neutral ramp: `paper` (#FFFFFF) /
  `paper-tint` (#F4F7FB) / a new `paper-tint-2` (a slightly deeper cool
  grey) for nested or layered cards. No shadows; hairline borders persist
  as the primary separator. No gradient card fills.
- **rationale:** Layered layouts (nested cards, stat grids on tinted
  panels) need one more depth step than the current two surfaces give,
  but a bounded three-level ramp keeps "structure carries depth, not
  fill" intact while ruling out shadow/gradient decoration creep.
- **PENDING (Phase 8):** pick the exact `paper-tint-2` hex (cool family,
  one step deeper than #F4F7FB, must keep ink contrast); add to
  `taikyoku.md` palette with usage note "nested/layered cards only;
  hairlines still separate; never shadows."

---

## Session A — status

**8 of 8 topics complete. APPROVED by user 2026-05-18.**

These eight decisions are locked. Phase 8/9 implements against the
`PENDING` notes attached to each topic above. No further revision unless
the user reopens a specific topic.

---

## Session B — queued

Scope (per brief): slide-layout deep dive — walk the Tier 1 archetypes
and, for each, extract **design intent**, **density**, **motion budget**,
and **content slots**. Tier 1 set = 15 new components + 4 already-shipped
layouts to reconsider under the new typography (see brief → "Tier 1
components to build").

**Cadence (user-chosen 2026-05-18):** triage first, then deep-dive.
Round 1 confirms/cuts/ranks the Tier 1 list; subsequent rounds deep-dive
only the survivors, one archetype per question, capturing design intent /
density / motion budget / content slots per answer.

Status: in progress — triage round opened.

### Session B — Topic 0 (triage)

- **decision:** Accept the full Tier 1 set with no cuts; deep-dive in
  priority order (highest-leverage / most-used archetypes first), one
  archetype per round, capturing design intent / density / motion budget
  / content slots each. Reserved slot #15 surfaces opportunistically
  during the walk. The brief's "4 vs 5 shipped" header discrepancy is
  resolved as **5** shipped layouts to reconsider (Section divider,
  Three-card value grid, Process/workflow diagram, 2×2 quadrant,
  Closing) — the prose list is authoritative over the header count.
- **rationale:** The Tier 1 list is already brief-locked and every item
  earns its place; ordering by leverage means the archetypes that appear
  in nearly every Taikyoku deck get designed first and can inform the
  niche ones.

**Proposed deep-dive order (priority groups):**

_Group 1A — foundational, almost every deck:_
1. Hero / cover with secondary visual
2. Stat grid (3–4 metrics)
3. Two-column comparison
4. Single big-metric callout
5. Pullquote / customer voice
6. Section TOC

_Group 1B — common, sector-dependent:_
7. Chart hero (bar / line / area)
8. Timeline (horizontal)
9. Roadmap (quarter map)
10. Methodology / framework diagram
11. Before / after
12. Bio / team card
13. Image-led slide
14. Logo cluster

_Group 1C — shipped, refinement-only pass under new typography:_
15. Section divider
16. Three-card value grid
17. Process / workflow diagram (line-draw)
18. 2×2 quadrant
19. Closing

_Reserved #15 (new-component slot): surfaced opportunistically during
the walk above; recorded if/when it emerges._

---

### Session B — Archetype 1 of 19: Hero / cover with secondary visual

> ⚠️ **SUPERSEDED 2026-05-18 (Phase 9):** the secondary visual is
> **dropped**. `opening-hero` is now **text + structural graphics only**
> (Prata title + AccentRule + eyebrow), no chart/logo/image slot, no
> visual caption; density standard fixed. The ~60/40 split and "rich"
> visual+caption rationale below are history. User direction; component
> + gallery updated.

- **design intent:** Text-dominant, visual as quiet support (~60/40).
  Prata hero title carries the slide; the secondary visual (chart / logo
  cluster / image) sits at modest scale lower-right or right and must
  never compete with the headline.
- **density:** Rich. Eyebrow + Prata title + AccentRule + one sub-line +
  the secondary visual **plus** a supporting caption/metric anchored to
  the visual (source line or one stat). A proof-carrying cover.
- **motion budget:** Cover-tier (full). Gradient `tk-breath` + staggered
  `tk-fadeUp` (eyebrow → title → rule → sub), visual enters last via
  `tk-fadeIn`/`tk-grow`. Must still settle within the 1.6s budget.
- **content slots:** `eyebrow`, `title`, `sub`, `visual` (ReactNode),
  `meta` (right-side run). Visual caption optional.
- **rationale:** Keeps the existing Cover's typographic discipline (the
  brand handshake stays the gradient + Prata) while admitting a proof
  element; rich density is justified only because the visual carries
  evidence, and cover-tier motion is allowed since this is still a cover.
- **PENDING (Phase 9):** build as a variant/extension of the existing
  Cover, not a fork; the caption/metric must obey the Topic 4 mono rule
  (figures in JetBrains Mono + tabular-nums) and must not trip the
  one-gold-moment rule unless explicitly flagged.

---

### Session B — Archetype 2 of 19: Two-column comparison

- **design intent:** Axis comparison **with** advocacy styling — a
  hybrid. Shared left-gutter row labels align the two columns row-by-row
  (matrix structure), AND one column is elevated via the purple accent
  (eyebrow dot / title tint / paper-tint panel) while the other stays
  muted ink. Not two separate components — one component that does both.
- **density:** Build **all three** density modes (lean / standard /
  rich) as a `density` prop on the same component, all else held equal.
  lean = title + 3–5 points; standard = + one-line thesis; rich = +
  per-column metric (mono, tabular). The component flexes; the storyboard
  picks the mode.
- **motion budget:** Sequenced. Heading `tk-fadeUp`; the vertical
  divider `tk-grow` (scaleY); columns `tk-rise` after. Within the 1.6s
  settle budget; no breath (content page).
- **content slots:** Symmetric columns each take `{title, thesis?,
  points[], metric?}`; page `eyebrow` + `heading`; `accentColumn` flag
  (`left|right|none`) drives the advocacy treatment; **plus** `rowLabels[]`
  for the shared left gutter (required by the axis-comparison intent —
  reconciled from the two answers, since axis mode needs row labels and
  advocacy needs the accent flag; both are in scope).
- **rationale:** The user explicitly wants the structured rigor of a
  feature matrix and the persuasive lean of an advocacy slide in one
  primitive, and wants density to be a runtime choice so the storyboard —
  not a component fork — controls information load.
- **PENDING (Phase 9):** single component, `density` + `accentColumn` +
  `rowLabels` props; gallery must show all three density modes; advocacy
  accent must stay within the single-purple rule (no new color); metrics
  obey the Topic 4 mono rule. Confirm the row-label gutter does not
  collide with the 100px content padding at `rich` density.

---

### Session B — Archetype 3 of 19: Stat grid (3–4 metrics in a row)

- **design intent:** Two variants on one component — `hero+supporting`
  (one dominant metric larger, 2–3 smaller alongside) and `metric+delta`
  (each metric carries a ▲/▼ change indicator; negative deltas use the
  Session A semantic red, positive stay ink/purple). Equal-peer framing
  was **not** chosen — every stat grid has either a lead number or a
  trend story. Variant is a prop.
- **density:** Build all three (density prop): lean (figure+label) /
  standard (+ one-line context) / rich (+ delta + context). Storyboard
  picks. Same flex pattern as Archetype 2.
- **motion budget:** Standard, no count-up. Eyebrow/heading `tk-fadeUp`;
  metric cells `tk-rise` staggered 150ms left→right; figures appear
  final (no animated counting — count-up rejected as off-register).
- **content slots:** `eyebrow`, `heading`, `metrics[]` where each metric
  = `{value, label, context, delta, deltaDir}`. `variant`
  (`hero+supporting | metric+delta`) and `density` props.
- **rationale:** The user reads "stat grid" as always having a point of
  view (a lead or a trend), so equal-peer was dropped; the two retained
  variants cover dashboard-with-a-lead and data-review-with-deltas, and
  count-up stays banned to protect the editorial register.
- **PENDING (Phase 9):** one component, `variant` + `density` props;
  gallery shows both variants × the three densities; `deltaDir` negative
  → semantic red (exact hex from Session A Topic 7 PENDING); all figures
  mono + tabular-nums; paper-tint-2 panel treatment deferred (not chosen
  here — bare hairline-separated cells are the default surface).

---

### Session B — Archetype 4 of 19: Single big-metric callout

- **design intent:** Figure + proof. The big mono number carries a small
  source/proof line (and optionally a tiny sparkline) — analytical
  register, the claim shows its evidence. Not the bare centered monument;
  the number is asserted *and* substantiated.
- **density:** Standard fixed (no density prop). Figure + caps label +
  one context sentence. The slide's whole job is one number; flexing it
  dilutes the point — deliberately the exception to the Archetype 2–3
  "build all densities" pattern.
- **motion budget:** Standard `tk-fadeUp`, staggered eyebrow → figure →
  context. No scale-in emphasis, no gold tier — size alone carries it.
  Content page, no breath, ≤1.6s.
- **content slots:** Core only — `eyebrow`, `value`, `label`, `context`.
  No `goldMoment` flag, no separate `source`/`sparkline` props: the
  "proof" of the figure+proof intent is carried by the `context` slot
  used as a source/proof line (reconciled — intent wants proof, slots
  stayed minimal, so context does double duty).
- **rationale:** The user took the most restrained option on every axis
  here — this archetype's power is austerity, so it stays a fixed,
  prop-light, plainly-animated slide; gold is decided at deck level, not
  baked into this component.
- **PENDING (Phase 9):** single fixed component; `context` documented as
  "doubles as source/proof line"; figure mono + tabular-nums; gold is
  applied (if at all) by deck-level composition, not a component prop —
  flag this divergence from Archetype 4's gold-candidate framing to
  `compose-deck` so it knows the gold decision lives upstream.

---

### Session B — Archetype 5 of 19: Pullquote / customer voice

- **design intent:** Quote + portrait/logo. The Prata quote sits beside
  a portrait photo or company logo — a human/brand face on the voice.
  Not the bare editorial pull; the attribution gets a visual anchor.
- **density:** Build all three (density prop): minimal (quote + name) /
  standard (+ role + company) / rich (+ logo/portrait + context tag).
  Storyboard picks. Same flex pattern as Archetypes 2–3.
- **motion budget:** Standard. Quote `tk-fadeUp`; attribution
  `tk-fadeIn` after (200ms stagger). Content page, no breath, ≤1.6s.
- **content slots:** `quote`, `name`, `role` (role set in **Prata
  italic** per the brief's floated convention), `company`, and a `logo`
  slot. The `logo` slot is a generic visual ReactNode — it holds a
  company logo *or* a portrait image (reconciled: intent wants
  portrait/logo, slots stopped at "logo", so the one slot serves both
  rather than adding a separate `portrait` prop).
- **rationale:** The user wants the voice anchored to a face/brand but
  kept the prop surface lean; making `logo` a polymorphic visual slot
  delivers the portrait-or-logo intent without a second image prop, and
  density flex covers minimal-through-rich attribution.
- **PENDING (Phase 9):** one component, `density` prop, polymorphic
  `logo` ReactNode slot documented as "logo or portrait"; `role` renders
  Prata italic (first concrete use of the brief's Prata-italic
  convention — note this sets precedent for other "role"-type labels);
  context tag only at rich density.

---

### Session B — Archetype 6 of 19: Section TOC ("what's in this deck")

- **design intent:** Build **both** variants on one component — `agenda
  grid` (2–3 column hairline cards: number + title + descriptor) and
  `progress map` (vertical list with the current section accented in
  purple, re-showable as a recurring divider). Numbered editorial index
  was **not** chosen. `variant` is a prop.
- **density:** Standard fixed. Number + title + one-line descriptor. No
  density prop — a TOC doesn't need to flex (same exception logic as
  Archetype 4).
- **motion budget:** Sequenced. Numbers `tk-fadeUp`, then a connecting
  hairline `tk-grow` threading the entries, entries fade in along it —
  the "index being drawn" feel. Content page, no breath, ≤1.6s.
- **content slots:** `eyebrow`, `heading`, `sections[]{number, title,
  descriptor}`, plus `activeIndex` so the same component re-renders as a
  "you are here" progress divider between sections.
- **rationale:** The user wants a structural primitive that works both
  as an up-front agenda and as a repeatable mid-deck "you are here"
  marker; one component with a `variant` + `activeIndex` avoids a
  separate progress-divider component and keeps section labels
  consistent across both uses.
- **PENDING (Phase 9):** one component, `variant` (agenda|progress) +
  `activeIndex` props, fixed standard density; the progress variant's
  accent must stay single-purple (no new color); confirm the connecting
  hairline `tk-grow` reads in the grid variant too (or restrict the
  threaded-hairline motion to the progress variant and use plain
  staggered rise for the grid).

---

### Session B — Archetype 7 of 19: Chart hero (bar / line / area)

- **design intent:** Combine intents 2 + 3 — chart with purple
  annotation callouts **and** an interpretive narrative slot, exposed as
  two layout variants on one component: `narrativePosition = side`
  (≈two-thirds chart + one-third narrative column) or `below`
  (full-width chart, narrative beneath). Chart-only-with-takeaway was not
  the chosen frame; the narrative is always present.
- **density:** Build all three (density prop): lean (chart + title) /
  standard (+ takeaway + axis labels) / rich (+ annotations + source).
  Storyboard picks.
- **motion budget:** Draw + annotation after. Line/area → `tk-draw`
  stroke reveal (800ms); bars → `tk-grow` scaleY staggered; then a
  single purple annotation `tk-fadeUp` once the chart settles —
  sequences data → argument. Must fit the 1.6s budget (the draw is the
  one long motion; keep annotation short).
- **content slots:** `eyebrow`, `heading`, `chart` (author SVG/ReactNode
  — component supplies frame + motion wrapper), `takeaway`,
  `annotations[]` (positioned purple callouts), `axisLabels` (mono +
  tabular per Topic 4), `source` (mono methodology line),
  `narrativePosition` (side|below), narrative body slot.
- **rationale:** The user wants the chart to always carry interpretation
  (annotations + narrative) rather than stand bare, and wants layout
  freedom between a side column and a stacked narrative — one component
  with a position prop covers both without forking; draw-then-annotate
  enforces the read order data-first, conclusion-second.
- **PENDING (Phase 9):** one component, `narrativePosition` + `density`
  props; verify `tk-draw` (≈800ms) + annotation `tk-fadeUp` together
  stay ≤1.6s — if not, shorten the draw or drop the annotation to
  fadeIn; annotations/axis/source obey single-purple + Topic 4 mono +
  Topic 7 semantic-red (negative series) rules; document that the author
  supplies a theme-conformant SVG (stroke widths, no off-palette fills).

---

### Session B — Archetype 8 of 19: Timeline (horizontal)

- **design intent:** Build **both** intent 1 (even-spaced milestones —
  hairline axis, evenly-spaced nodes, alternating labels) and intent 3
  (phased bands — axis divided into labeled phases/eras with events
  inside) as variants on one component. Proportional dated axis was
  **not** chosen. `variant` is a prop.
- **density:** Build all three (density prop): lean (date + label) /
  standard (+ descriptor) / rich (+ outcome/metric tag). Storyboard
  picks.
- **motion budget:** Draw axis, then populate. Horizontal axis `tk-draw`
  left→right, then nodes `tk-fadeUp` staggered along it as the draw
  passes — one long motion + short fades, ≤1.6s, content page no breath.
- **content slots:** `eyebrow`, `heading`, `events[]{date, label,
  descriptor}`, `phases[]` (band definitions for the phased variant),
  `activeIndex` (marks "now" on the axis). Dates render mono + tabular
  per Topic 4.
- **rationale:** The user wants both a clean evenly-spaced chronology
  and a narrative phased-arc version from the same primitive; phases[] +
  variant prop deliver both, activeIndex lets a timeline double as a
  "where we are" marker without a second component.
- **PENDING (Phase 9):** one component, `variant` (milestones|phased) +
  `density` + `activeIndex`; the alternating above/below label layout
  must not collide at rich density within 100px padding; axis `tk-draw`
  is the page's one long motion (no other tk-draw on the slide); dates
  mono per Topic 4.

---

### Session B — Archetype 9 of 19: Roadmap (quarter map)

- **design intent:** Do **all three** as variants on one component:
  `quarter-columns` (calendar columns of stacked initiative cards),
  `swimlanes` (workstream rows × quarter columns, Gantt-lite spanning
  bars), and `now-next-later` (three horizon buckets, date-noncommittal).
  `variant` is a prop.
- **density:** Build all three (density prop): lean (titles) / standard
  (+ one line each) / rich (+ owner/status tag). Storyboard picks.
- **motion budget:** Sequenced. Quarter/lane dividers `tk-grow` (scaleY)
  first, then initiative cards `tk-rise` within each — "grid then
  content." Content page, no breath, ≤1.6s.
- **content slots:** `eyebrow`, `heading`, `columns[]{label, items[]}`,
  `lanes[]` (swimlane variant), `activeColumn` (current-quarter marker),
  per-item `{owner, status}`. Quarter labels render mono + tabular per
  Topic 4; `status` at-risk may use the Topic 7 semantic red.
- **rationale:** Roadmaps appear in nearly every forward-looking deck in
  three genuinely different shapes (calendar, parallelism, horizons); one
  component with a `variant` prop covers all without three forks and
  keeps motion/labels consistent across them.
- **PENDING (Phase 9):** one component, `variant`
  (quarter-columns|swimlanes|now-next-later) + `density` + `activeColumn`
  + `lanes[]`; this is the most multi-variant component so far —
  flag to `compose-deck` that variant choice is storyboard-driven;
  swimlane spanning bars must use hairline/structure not fill; quarter
  labels mono (Topic 4), at-risk status semantic-red (Topic 7).

---

### Session B — Archetype 10 of 19: Methodology / framework diagram

- **design intent:** Do **all three** as variants on one component:
  `stack` (layered foundation→apex), `loop` (cyclical ring with arrows),
  `pillars` (N pillars under a capstone header). `variant` is a prop.
- **density:** Build all three (density prop): lean (labels) / standard
  (+ one-line each) / rich (+ supporting detail). Storyboard picks.
- **motion budget:** Draw structure, then label. Connecting structure
  (loop arrows / stack edges / pillar lines) `tk-draw`, then labels
  `tk-fadeUp` in build order — one long motion + short fades. Content
  page, no breath, ≤1.6s.
- **content slots:** `eyebrow`, `heading`, `elements[]{label,
  descriptor}`, `centerLabel` (loop hub / pillar capstone), `variant`
  (stack|loop|pillars).
- **rationale:** Frameworks recur in strategy decks in three canonical
  shapes; one component with a `variant` prop keeps the Taikyoku
  structural-not-decorative treatment consistent across all three and
  reuses the draw-then-label motion grammar from the chart/timeline
  family.
- **PENDING (Phase 9):** one component, `variant` + `density`; the
  `tk-draw` structure is the page's one long motion; loop arrowheads /
  pillar lines must be hairline-weight single-purple (no fill, no
  shadow); confirm three-variant layout all fits 100px padding at rich
  density.

---

### Session B — Archetype 11 of 19: Before / after

- **design intent:** Build **both** `stacked-overlay` (before above,
  muted ink; after below, full ink + accent — reads "we improved this")
  and `diff-list` (paired old → new rows, granular change log) as
  variants on one component. Split+arrow was **not** chosen. `variant`
  is a prop.
- **density:** Build all three (density prop): lean (labels) / standard
  (+ points each) / rich (+ delta metric). Storyboard picks.
- **motion budget:** Sequenced transformation, adapted to the chosen
  variants (no literal arrow since split+arrow wasn't picked): stacked →
  before `tk-fadeUp`, a connecting accent/delta `tk-grow` between the
  panels, after `tk-rise`; diff-list → each row's old `tk-fadeUp` then
  new `tk-rise` in sequence. One sequenced motion, ≤1.6s, no breath.
- **content slots:** `eyebrow`, `heading`, `before{label, points}`,
  `after{label, points}`, `transitionLabel` (e.g. "post-migration"),
  `deltaMetric` (mono per Topic 4), `diffPairs[]` (old→new rows for the
  diff variant).
- **rationale:** The user wants the improvement framed as a vertical
  narrative (stacked) and as an auditable line-by-line change (diff),
  not as a symmetric arrow split; reconciled motion keeps the "slide
  enacts the change" intent while honoring the variants actually chosen.
- **PENDING (Phase 9):** one component, `variant`
  (stacked-overlay|diff-list) + `density`; **enforce** "before = muted
  ink, NOT semantic red" — red is data-negative only (Topic 7), a
  before-state is not a data-negative; document this explicitly so
  `compose-deck` doesn't misapply red here; delta mono (Topic 4).

---

### Session B — Archetype 12 of 19: Bio / team card

- **design intent:** Build **all three** as variants: `spotlight` (one
  person large + Prata bio), `grid` (3–6 member cards), `lead+supporting`
  (one prominent + 2–3 smaller). `variant` is a prop.
- **density:** Standard fixed. Portrait + name + role + one-line
  credential. No density prop — keeps the team slide consistent
  (exception to the build-all-densities pattern, like Archetypes 4/6).
- **motion budget:** Standard. Heading `tk-fadeUp`; person cards
  `tk-rise` staggered 150ms — the team assembles. No tk-draw (no
  structural strokes). Content page, no breath, ≤1.6s.
- **content slots:** `eyebrow`, `heading`, `members[]{portrait, name,
  role, credential, bio}` where `role` renders **Prata italic** (per the
  Archetype 5 precedent). A `variant` prop (spotlight|grid|
  lead+supporting) is required by the all-three intent even though the
  chosen slots answer stopped at credential+bio (reconciled).
- **rationale:** Team slides recur in three shapes; fixed standard
  density keeps them visually consistent across a deck while the variant
  prop handles the structural difference, and the Prata-italic role
  carries the editorial register established at Archetype 5.
- **PENDING (Phase 9):** one component, `variant` + fixed standard
  density; `role` Prata italic (now the second use — codify
  Prata-italic-for-role as a theme convention in taikyoku.md);
  portraits are author-supplied images (per brief's linked-asset
  stance), graceful when absent (initials/monogram fallback).

---

### Session B — Archetype 13 of 19: Image-led slide

- **design intent:** Build **both** `full-bleed` (image fills slide,
  Prata title/caption over a subtle ink scrim) and `framed` (image inset
  in paper with generous margin, caption + source below). Two-thirds
  split was **not** chosen. `variant` is a prop.
- **density:** Standard fixed. Image + heading + caption. No density
  prop.
- **motion budget:** Minimal — single `tk-fadeIn` on the whole
  composition (opacity only; **zoom-on-enter forbidden** — no scale, no
  Ken Burns). Lets the image land without choreography. Content page, no
  breath, ≤1.6s.
- **content slots:** `image` (author src/ReactNode), `eyebrow`,
  `heading`, `caption`. A `variant` prop (bleed|framed) is required by
  the both-variants intent (reconciled — slots answer stopped before
  variant). The full-bleed scrim is an internal default of the bleed
  variant, **not** an exposed prop (sensible default over author knob).
- **rationale:** The user wants both a high-impact bleed and a restrained
  editorial plate but kept the prop surface lean and motion quiet; an
  image-led slide shouldn't be choreographed, so minimal fade honors the
  forbidden-zoom rule and the image's primacy.
- **PENDING (Phase 9):** one component, `variant` (bleed|framed) + fixed
  standard density; scrim auto-applied only in bleed for text legibility
  (tune opacity so ink text passes contrast without muddying the image);
  caption/source caps or mono per Topic 4; author supplies a
  theme-appropriate image (no off-brand color clashes — restrain-and-flag
  if it fights the palette).

---

### Session B — Archetype 14 of 19: Logo cluster (customer / partner)

- **design intent:** Logos + headline stat — a Prata/mono headline
  number ("Trusted by 40+ teams") above a monochrome-ink logo row. Proof
  carried by the figure and the marks together. Not bare grid; the stat
  frames the wall.
- **density:** Build all three (density prop): lean (logos) / standard
  (+ eyebrow/heading) / rich (+ headline stat + context line). Storyboard
  picks.
- **motion budget:** Standard. Heading `tk-fadeUp`; logos `tk-fadeIn`
  (opacity only — no rise, no scale) staggered gently. Dignified
  appearance. Content page, no breath, ≤1.6s.
- **content slots:** `eyebrow`, `heading`, `logos[]` (author
  img/ReactNode, rendered monochrome ink by the component), `headlineStat`
  (mono + tabular per Topic 4), plus a per-instance `monochrome` toggle
  as an escape hatch (default = monochrome on; off allows original color).
- **rationale:** Social proof in this register should read as a calm
  field with one number doing the persuading, not a color carnival; the
  monochrome default protects the single-purple palette while the toggle
  preserves creative latitude (restrain-by-default, allow-on-purpose).
- **PENDING (Phase 9):** one component, `density` + `monochrome` props;
  monochrome = CSS grayscale+opacity or ink mask; document the toggle as
  "use sparingly, flag in compose"; headlineStat mono (Topic 4); ensure
  logo aspect-ratio normalization so the grid stays even.

---

## Session B — Group 1C (shipped layouts: refinement-only pass)

The next five are **already shipped** in `taikyoku.demo.tsx` /
`taikyoku.md`. They are not rebuilt — the interview asks only what
changes under the Session A typography shift (Helvetica Neue replacing
Archivo for caps/eyebrow/folio; Prata-italic-for-role precedent; mono
scope; CJK readiness; semantic red; surface ramp). Decision per item =
what to refine, not what to design.

### Session B — Archetype 15 of 19: Section divider (shipped)

- **typography refresh:** Swap + retune + reserve KanjiSeal slot.
  Archivo→Helvetica Neue on eyebrow/label, retune letter-spacing/size
  (HN tracks tighter than Archivo), AND reserve a position for the
  Phase-8 `KanjiSeal` ornament (red 大 stamp) — the brief names the
  divider as its home.
- **CJK / bilingual:** Defer entirely. No bilingual text-rendering work
  now (Latin-only per Session A). NB reconciliation: reserving the
  KanjiSeal *ornament slot* is structural/brand, not bilingual text —
  the two are not in conflict (ornament position now, JP text rendering
  deferred to Phase 8).
- **motion:** Add one purple `AccentRule` `tk-grow` between number and
  title for a stronger divider beat (currently just number→title
  fadeUp). Still within budget; gradient canvas, no breath (cover-only).
- **new tokens:** Inherit the deck's Session A gradient-stop variant
  (default/earth/warm-energy) instead of hardcoding the default pair,
  AND allow the Phase-8 KanjiSeal's brand-red as the one sanctioned
  non-palette color on the divider.
- **rationale:** The divider is the brand's strongest non-cover moment,
  so it earns the KanjiSeal readiness, a slightly stronger motion beat,
  and industry-tint awareness; Latin-only output keeps it shippable
  before HomuraM lands.
- **PENDING (Phase 8/9):** **two distinct reds now exist** — Topic 7
  *semantic-negative red* (data only) and the *KanjiSeal brand-red*
  (ornament only). Document them as separate tokens with non-overlapping
  roles so `compose-deck` never swaps one for the other. Reserve the
  KanjiSeal slot in markup now; render the seal in Phase 8. Wire the
  gradient-variant inheritance when Session A Topic 5's variants are
  specified.

---

### Session B — Archetype 16 of 19: Three-card value grid (shipped)

- **card-title treatment:** Promote card titles to **Prata** (the
  display face) at a smaller size — editorial, distinct from eyebrow
  caps. A deliberate visual shift (more magazine-like) rather than
  forcing a Helvetica-Neue-900 substitute.
- **role label:** **Caps eyebrow, NOT Prata italic.** Per-card label
  uses the Helvetica Neue tracked-caps eyebrow style. This **overrides
  the brief's floated "Prata-italic for card role labels"** convention.
- **density + motion:** Add `density` prop (lean/standard/rich, align
  with the new library convention); keep the working `tk-rise` 150ms
  stagger untouched.
- **new tokens:** Optional `paper-tint`/`paper-tint-2` panel surface via
  a prop (Session A 3-step ramp); default stays bare hairline-top
  (Aurora structure-only discipline).
- **rationale:** The user wants the card *title* to gain editorial
  weight (Prata) but the card *label* to stay in the systemic caps
  family — so the Prata-italic convention is now scoped to **person/
  attribution roles only** (Archetypes 5, 12), never card labels.
- **PENDING (Phase 9) — CONVENTION CORRECTION:** update the
  Prata-italic note from "card role labels" to **"person/attribution
  role labels only (bio, pullquote); card labels use Helvetica Neue
  tracked caps."** This supersedes the brief's Typography float and the
  Archetype 5/12 notes' wording — propagate to `taikyoku.md` and the
  earlier REFINEMENT entries' intent (the rule, not the entries, is
  what changed). Card title now Prata (add to type scale); density prop;
  optional surface-ramp panel.

---

### Session B — Archetype 17 of 19: Process / workflow diagram (shipped, line-draw)

- **typography refresh:** Swap + step numbers → mono. Step labels
  Archivo→Helvetica Neue with retuned tracking; step ordinals
  (01→02→…) render JetBrains Mono per Topic 4's numerics rule —
  treats sequence numbers as figures. (NB: differs from the section
  divider, where the big number stays Prata — divider number is a
  display moment, process ordinals are sequence markers.)
- **motion:** Refine — stroke `tk-draw` left→right with each step node
  `tk-fadeUp` synced as the draw reaches it. Tightens the "process being
  traced" read; stays the page's one long motion. Content page, no
  breath.
- **density + status:** Add `density` (lean/standard/rich) **and** an
  optional per-step `status`; a `blocked` step uses the Session A
  semantic red (a blocked step is a genuine negative state — a sanctioned
  use of Topic 7 red outside pure data). Doubles as a live-status
  workflow.
- **CJK:** Defer entirely (Latin-only; Phase 8 revisits if needed).
- **rationale:** The user wants the diagram to systematize its numbers
  (mono), sharpen its signature motion, and optionally carry execution
  health — extending the semantic-red role from "data only" to "data +
  blocked-process-step," which is a deliberate scope widening worth
  flagging.
- **PENDING (Phase 9) — RED SCOPE NOTE:** Topic 7 semantic red now has
  **two sanctioned uses**: (a) data-negative (deltas/series), (b)
  blocked workflow step. Still distinct from the KanjiSeal brand-red
  (Archetype 15). Document all three red roles in `taikyoku.md` so they
  never collide. Add density + status props; sync node motion to draw.

---

### Session B — Archetype 18 of 19: 2×2 quadrant (shipped)

- **typography refresh:** Swap + plotted-point labels → Prata. Axis &
  quadrant scaffolding labels Archivo→Helvetica Neue (retuned, stay
  caps — conceptual not figures); the labels of *plotted items* become
  small Prata for an editorial hierarchy distinct from the caps
  scaffolding.
- **motion:** Refine — the two axis lines `tk-draw` (cross forming),
  then plotted items `tk-fadeUp` staggered into position ("map drawn,
  then populated"). One long motion, ≤1.6s, no breath.
- **emphasis + density:** Add `density` (lean/standard/rich item info)
  AND an optional `highlightQuadrant` accented in purple with a
  **paper-tint-2 fill** (Session A surface ramp — on-palette, not a new
  color). Makes the strategic argument, not just a neutral map.
- **CJK:** Defer entirely. (NB: the paper-tint-2 highlight comes from the
  emphasis answer and stands; "defer" applies only to CJK, no conflict.)
- **rationale:** The user wants the quadrant to argue a position (purple
  + tint highlight) and to separate plotted content (Prata) from the
  analytical frame (caps) — pushing the editorial/structure split deeper
  into a data component.
- **PENDING (Phase 9):** add `density` + `highlightQuadrant` props;
  highlight = purple accent label + paper-tint-2 fill (Topic 8 ramp, no
  new fill color); plotted-item labels Prata (add to type-scale notes
  alongside the Archetype 16 card-title-Prata change — two components
  now put Prata into non-headline roles, codify in taikyoku.md).

---

### Session B — Archetype 19 of 19: Closing (shipped, centered + gold rule)

- **typography + sign-off:** Swap + WordmarkLockup slot.
  Archivo→Helvetica Neue retuned, AND reserve a slot for the Phase-8
  `WordmarkLockup` (TAIKYOKU · 大局, **mini** variant) as the sign-off
  mark. The closing becomes the brand bookend.
- **gold moment:** **Gold OFF by default.** The closing no longer
  auto-claims the deck's gold moment; the deck explicitly assigns the
  one gold moment wherever it wants. ⚠️ This **changes the theme's gold
  doctrine** (taikyoku.md currently says the closer is gold's usual
  home) and introduces the risk of decks shipping with no gold —
  `compose-deck` must actively pick a gold target rather than relying on
  the closing default.
- **motion:** **Allow closing-breath bookend — THEME CHANGE.** Permit
  the cover's `tk-breath` on a *gradient* closing so a deck opens and
  closes breathing. This **widens taikyoku.md's "tk-breath … Nowhere
  else" rule** (currently cover-only) to cover **+ gradient closing**.
- **CJK:** Defer entirely.
- **rationale:** The user wants the close to be a deliberate brand
  bookend (wordmark + breath symmetry with the cover) and to make gold a
  conscious editorial choice rather than a default — both raise the
  ceremony of the closing while forcing intentionality about the one
  gold moment.
- **PENDING (Phase 8/9) — TWO THEME-CONTRACT CHANGES:** (1) motion rule:
  `tk-breath` allowed on cover **and gradient closing** (bookend) — edit
  taikyoku.md line ~247. (2) gold rule: remove "closer is the usual
  home"; gold is an explicit deck-level assignment, `compose-deck` must
  choose it. Reserve the mini-WordmarkLockup slot in markup now; render
  Phase 8.

---

## Session B — status

**Triage + all 19 archetypes complete (2026-05-18). APPROVED by user
2026-05-18.**

All 19 archetype dispositions and the 7 cross-cutting theme-contract
amendments below are locked. Phase 9 builds against them; the two
doctrine changes (gold assignment, breath bookend) and the
multi-variant/density component pattern are confirmed, not provisional.

**Reserved component slot (#15 in the brief's "new" list):** no brand-new
archetype emerged during the walk. The interview instead expanded *within*
existing archetypes (multi-variant components) and surfaced cross-cutting
system changes (below). The reserved slot stays **open** — recommend it be
filled during Phase 9 build if a gap appears, not forced now.

### Cross-cutting outcomes that amend the theme contract (`taikyoku.md`)

These emerged from Session B and must be reconciled into `taikyoku.md`
when Session A+B are implemented:

1. **Prata-italic convention corrected** (Archetype 16): Prata italic is
   for **person/attribution role labels only** (bio, pullquote) — **not**
   card labels. Card labels use Helvetica Neue tracked caps. Supersedes
   the brief's float.
2. **Prata in non-headline roles** (Archetypes 16, 18): card titles and
   2×2 plotted-item labels now use Prata at smaller sizes. Add these
   rows to the type scale.
3. **Three distinct reds** now in the system, non-overlapping roles:
   (a) Topic 7 semantic-negative red — data deltas/series **and** blocked
   workflow steps (Archetype 17); (b) KanjiSeal brand-red — ornament
   only (Archetype 15). Must be separate tokens; `compose-deck` never
   substitutes one for another.
4. **Motion rule widened** (Archetype 19): `tk-breath` allowed on cover
   **and gradient closing** (bookend), not cover-only.
5. **Gold doctrine changed** (Archetype 19): gold is an explicit
   deck-level assignment; no component auto-claims it; `compose-deck`
   must choose the one gold target.
6. **Surface ramp in use** (Archetypes 16, 18): paper-tint-2 is now
   actively used (card panels, highlighted quadrant) — confirm the exact
   hex (Session A Topic 8 PENDING) before these ship.
7. **Multi-variant component pattern**: most new archetypes resolved to
   one component with a `variant` prop + a `density` prop. `compose-deck`
   and the slide-authoring composition spec must learn variant/density
   selection is storyboard-driven.

Session C (animations + language tone) was gated on `approve session B`.

---

## Session C — in progress

Scope (per brief, Work Stream 3 topics 4–6):

- **Animation commitments:** motion budget per slide purpose
  (low/med/high), `tk-draw` allowed-vs-forbidden boundary, page
  transitions, cover-breath keep/kill (now intersects the Session B
  Archetype 19 closing-breath bookend), per-language motion register.
- **Language tone — English:** voice register, sentence
  length/punchiness, forbidden words/phrases, sentence case vs Title
  Case for headlines.
- **Language tone — Japanese:** formality register (敬語/丁寧語/常体),
  sentence-final particle consistency, JP typographic conventions,
  bilingual sentence-mirroring rules.

≈13 decision topics across 3 areas.

**Cadence (user-chosen 2026-05-18):** one topic per round (Session A
style) — each topic its own question, transcribed individually, most
granular rationale per decision.

Status: opened, cadence set — **no Session C topic answered yet.** Topic
C1 is the next action (the C1 question was interrupted before any
answer; resuming from C1).

> Handoff note: Session B was approved and locked. A repeated "approve
> session B" arrived during the B→C seam (right after the Session C
> cadence answer) and was treated as a duplicate — no re-processing, B
> stays frozen. Handoff audited 2026-05-18: clean, no decisions lost;
> only state-marker tidy-ups applied.

### Session C — Topic C1: Motion budget per slide purpose

- **decision:** Density-derived. The motion budget tier follows the
  storyboard's **density tag**, not the recipe purpose: low-density
  slide → low motion (fades only), medium → moderate stagger, high →
  richer reveal (one long motion + full stagger). Motion is coupled to
  content load, not slide role.
- **rationale:** A slide's reveal richness should track how much there
  is to reveal — a sparse slide animating heavily reads as overproduced;
  density already encodes "how much," so it's the honest input for "how
  much motion."
- **reconciliation (important):** This is a *default* layer. It does
  **not** override the Session B per-archetype motion decisions (e.g.
  chart-hero draw-then-annotate, image-led minimal, process-diagram
  synced draw) — those are explicit per-component choices that sit above
  the density default. And `tk-breath` (cover + gradient-closing bookend,
  per Session B Archetype 19 + cross-cutting #4) is a **canvas-level
  exception outside the density budget** — it is ambient, not a content
  reveal, so a low-density cover still breathes.
- **PENDING (Phase 9):** `compose-deck` motion resolution order =
  (1) density-derived budget tier as the default, (2) Session B
  archetype-specific motion as an override where specified, (3) cover/
  closing breath as a canvas exception independent of (1)/(2). Document
  this three-layer order in the slide-authoring composition spec; map
  density tags → concrete keyframe/stagger budgets in `taikyoku.md`'s
  Motion section.

### Session C — Topic C2: tk-draw allowed-vs-forbidden boundary

- **decision:** Structural/data strokes **only**. `tk-draw` is allowed
  exclusively on genuine structural or data SVG — chart paths, timeline
  and process axes, framework/methodology connectors. **Forbidden** on
  decorative lines, the `AccentRule` (stays `tk-grow`), text, borders,
  and dividers. No ornamental escape hatch (the "earned exception" was
  rejected).
- **rationale:** The line-draw gesture must always *mean* something
  (data being plotted, a process being traced) — letting it decorate
  would cheapen it into motion-for-its-own-sake, the exact thing the
  theme's restraint exists to prevent.
- **PENDING (Phase 9):** add an explicit allow/forbid list to
  `taikyoku.md`'s Motion section: ALLOW = chart paths, timeline axis,
  process/workflow connectors, framework/methodology connectors; FORBID
  = AccentRule (tk-grow only), underlines, borders, dividers, decorative
  flourishes, text strokes. The one-long-motion-per-page cap still
  applies on top (structural ≠ unlimited). `compose-deck` rejects
  tk-draw on any non-structural element.

### Session C — Topic C3: Page transitions

- **decision:** Uniform cross-fade. A single global cross-fade
  (~300–400ms) between every slide regardless of canvas change. No
  canvas-aware variation, no hard cut. Transitions stay invisible;
  motion lives in the on-slide reveals.
- **rationale:** A consistent quiet cross-fade keeps attention on
  content and never competes with the on-slide choreography; varying the
  transition by canvas would draw attention to the plumbing rather than
  the deck.
- **PENDING (Phase 9):** specify the cross-fade duration (lock a single
  value in the 300–400ms band) in `taikyoku.md`'s Motion section; verify
  open-slide's transition mechanism honors a uniform fade and that the
  gradient→paper canvas swap doesn't flash (pre-paint the incoming
  canvas under the fade).

### Session C — Topic C4: Cover-breath keep/kill + closing-breath bookend

- **decision:** Keep both, always-on. `tk-breath` on the gradient cover
  **and** the gradient closing, 8s infinite ease-in-out, always on for
  those canvases. No per-deck disable. This **ratifies** the Session B
  Archetype 19 lock + cross-cutting #4 (no reopening, no reversal).
- **rationale:** The breathing gradient is the brand handshake; making
  it a fixed always-on behavior on the two gradient bookend slides keeps
  the open/close symmetry reliable and removes a per-deck decision that
  would only invite inconsistency.
- **PENDING (Phase 8/9):** `taikyoku.md` Motion section — change the
  current "tk-breath … Nowhere else" (cover-only) wording to "cover and
  gradient closing only; always on for those canvases; 8s infinite
  ease-in-out; never on content/paper slides." Confirms cross-cutting #4
  is now doubly-locked (Session B + Session C).

### Session C — Topic C5: Per-language motion register

- **decision:** Same register, all languages. One motion vocabulary
  regardless of deck language — Japanese and bilingual decks animate
  identically to Latin decks. No auto CJK shift, no formal-motion preset.
- **rationale:** The Taikyoku base register is already restraint-first
  (≤1.6s settle, one long motion, fades-led); it is quiet enough to suit
  a Japanese business audience without a separate tier, and a single
  register removes a whole class of per-language edge cases.
- **PENDING (Phase 9):** no per-language motion code path; document in
  `taikyoku.md` that motion is language-invariant (explicitly note this
  was a considered decision, not an omission, so a future session
  doesn't "fix" it). Language adaptation lives in *typography/layout*
  (Session A CJK scale, bilingual primitives), **not** motion.

> **Animation block (C1–C5) complete.** Next: Language tone — English
> (C6–C9), then Japanese (C10–C13).

### Session C — Topic C6: English voice register

- **decision:** Institutional-leaning hybrid, weighted **60/40 toward
  McKinsey/institutional** over founder-direct. Predominantly measured,
  evidence-led, credible; a minority register of plain confident
  declarative (Stripe/Linear) for the claim lines. Not a 50/50 blend —
  the institutional side is the default voice, founder-direct is the
  accent.
- **rationale:** The theme's identity is "Stripe/Linear in McKinsey
  ink"; the user pulls the dial toward the ink — the audience rewards
  credibility first, with punch used sparingly to land key claims rather
  than as the baseline tone.
- **PENDING (Phase 9):** encode in `taikyoku.md` (or a voice section) as
  "default = institutional/measured/evidence-first; ~40% founder-direct
  reserved for claim/headline lines, not body." `compose-deck` and any
  copy guidance should treat punch as the exception, rigor as the rule.

### Session C — Topic C7: Sentence length / punchiness threshold

- **decision:** Measured body, punch as accent. Body sentences are full
  and well-built (~15–25 words, one main idea each). Short fragments and
  one-liners are **reserved** for headlines and at most **one key line
  per slide**. "Too punchy" = staccato fragments in body copy.
- **rationale:** Directly downstream of C6's 60/40 institutional lean —
  measured prose carries credibility, and rationing punch to one moment
  per slide makes it actually land instead of becoming the wallpaper.
- **PENDING (Phase 9):** copy guidance in `taikyoku.md`: body ≈15–25
  words/sentence, one idea per sentence; fragments only in
  headline/eyebrow/one accent line; flag slides whose body reads as
  consecutive sub-12-word fragments as off-register.

### Session C — Topic C8: Forbidden words / phrases

- **decision:** Hype-ban + AI-tell ban — **with an explicit em-dash
  carve-out.** FORBID startup hype (imagine, revolutionary, unlock,
  game-changer, disrupt, seamless, leverage-as-verb, synergy,
  world-class, cutting-edge, best-in-class, 10x, supercharge, delight,
  magic) AND LLM tells (delve, tapestry, moreover, furthermore, "in
  today's fast-paced world", "it's worth noting"). **Em-dashes are NOT
  banned** — the user uses em-dashes deliberately regardless of AI; they
  are explicitly allowed and must not be flagged as an AI-tell.
- **rationale:** Institutional register + Claude-drafted decks need both
  hype and generated-smell policed, but the em-dash is the user's own
  deliberate punctuation voice — banning it as an "AI tell" would
  misfire against their actual style.
- **PENDING (Phase 9):** put the deny-list in `taikyoku.md` (or a voice
  doc) as two groups (hype / AI-tell); add a **bold exception line**:
  "em-dashes permitted — deliberate house style, never treat as an AI
  tell or auto-rewrite." Any future copy-linting must whitelist em-dash.

### Session C — Topic C9: Sentence case vs Title Case for headlines

- **decision:** **Title Case** for headlines and page headings ("Why
  This Matters"). Eyebrows/folios remain tracked CAPS (unchanged). This
  is a **change from the shipped demo**, which uses sentence case
  ("Editorial composition.").
- **rationale:** Aligns headline treatment with the C6 60/40
  institutional lean — Title Case reads more formal/credible than the
  editorial sentence case, trading some magazine softness for register
  consistency.
- **CONFLICT FLAG (no break):** `taikyoku.demo.tsx` and the
  `da2-retrospective` reference deck use sentence-case headlines. They
  are **not broken** (casing is copy, not structure — they still render)
  but they are now **off the new convention**. Per the brief's
  no-breaking-change constraint they stay frozen as historical reference;
  re-casing their copy is optional, not required. New decks use Title
  Case.
- **PENDING (Phase 9):** state the rule in `taikyoku.md`: "Headlines &
  page headings = Title Case; eyebrow/folio = tracked CAPS; body =
  sentence case." Note the demo/retrospective divergence so a future
  session doesn't treat it as a regression. Decide separately (not here)
  whether to re-case the demo when it next gets touched.

> **English-tone block (C6–C9) complete.** Next: Language tone —
> Japanese (C10–C13).

### Session C — Topic C10: Japanese formality register

- **decision:** All three, **role-mapped** (parallels the English
  measured-body/punch-accent split):
  - **常体 / である調** (+ 体言止め noun-stop) → titles, headlines,
    punchy accent lines. Assertive, declarative.
  - **丁寧語 / です・ます** → body copy and most cases. The default
    register (the brief's recommendation, used as the baseline).
  - **敬語 (尊敬語/謙譲語)** → special cases only: external client- or
    executive-facing decks. Per-deck override, not default.
- **rationale:** Mirrors the English-side structure — a confident
  assertive register for the moments that must land (headlines), a
  courteous default for the bulk (body), and a deferential mode reserved
  for high-stakes external audiences; one register can't serve all three
  jobs.
- **PENDING (Phase 9):** document the three-tier JP register map in
  `taikyoku.md` keyed to text role (headline = 常体/体言止め, body =
  丁寧語, override = 敬語). Bilingual decks: this interacts with C13
  (mirroring) — the JP register tier should track the English
  measured/punch role of the same slot. `compose-deck`/copy guidance
  picks register by slot role, not globally.

### Session C — Topic C11: Sentence-final particle consistency

- **decision:** Per-role strict + 体言止め lists. Body: です/ます
  strictly consistent, no drift to plain mid-block. Headlines:
  常体/体言止め. List items, labels, captions: 体言止め (noun-stop) —
  the idiomatic JP-deck form. Register mixing happens **only at role
  boundaries**, never within a single text block.
- **rationale:** Within-block consistency is the mark of professional
  Japanese; 体言止め for list/label items keeps the deck concise and
  native-feeling (matches the brief's note that bullets are uncommon and
  noun-stop is the convention), without the verbosity of forcing です/ます
  onto every label.
- **PENDING (Phase 9):** codify in `taikyoku.md`: body = です/ます
  consistent; headline = 常体/体言止め; list/label/caption = 体言止め;
  no register switch inside a block. Copy-linting for JP should flag
  intra-block です/ます↔だ/である drift. Reinforces C10's role map.

### Session C — Topic C12: Japanese typographic conventions

- **decision:** Strict typeset, katakana-tolerant. Apply 禁則処理
  (no 。、 or closing brackets orphaned at line start/end); full-width
  。、 punctuation; half-width Latin/digits with correct surrounding
  spacing; 中黒 U+30FB in the wordmark (per Session A Topic 3). **Allow
  established katakana loanwords freely** (プロダクト, スケール,
  ロードマップ) — no forced 漢語 substitution.
- **rationale:** The typesetting rigor protects the editorial gravity
  the brand needs, but modern Japanese business language genuinely lives
  in katakana loanwords; forcing 漢語 would read as stilted/archaic
  rather than authoritative.
- **PENDING (Phase 8/9):** specify in `taikyoku.md`: enable CSS
  `line-break: strict` / `word-break: normal` + any needed 禁則 handling
  for JP text blocks; full-width punctuation, half-width Latin/digits
  with spacing; wordmark 中黒 = U+30FB. Lexical guidance: "katakana
  loanwords permitted — do not force kanji compounds." Verify HomuraM /
  Noto Serif JP render 禁則 correctly on the bilingual reference deck.

### Session C — Topic C13: Bilingual sentence-mirroring rules

- **decision:** Anchored-headline mirror (hybrid). Headlines and key
  claims mirror **1:1** across EN/JP so the bilingual lockup (Session A:
  Latin headline + JP sub-line) reads as a single unit. Body and prose
  are written **natively-independent** in each language — same meaning,
  native structure, not a structural translation.
- **rationale:** The visual lockups demand headline parity to align, but
  forcing body prose to mirror would produce translationese and undo the
  native-register work of C10–C12; anchoring only the shared-space text
  gets alignment without sacrificing fluency.
- **PENDING (Phase 8/9):** bilingual primitive components must support a
  paired-headline slot (1:1 EN/JP) plus independent body slots per
  language. Copy guidance: headlines = parallel/mirrored; body =
  author-native per language, sync on *meaning and key points*, not
  sentence count. `compose-deck` treats headline pairs as linked,
  body blocks as independent. Closes the C10 (register map) ×
  C13 (mirroring) interaction.

> **Japanese-tone block (C10–C13) complete.** Session C fully
> interviewed.

---

## Session C — status

**All 13 topics complete (C1–C13). APPROVED by user 2026-05-18.**

Blocks: Animation (C1–C5), English tone (C6–C9), Japanese tone
(C10–C13). No topic skipped; the C1 interruption was resolved (audited
clean) and C1 answered on resume.

### Session C cross-cutting / conflict notes

- **C4 double-locks** the breath bookend (Session B Archetype 19 +
  Session C C4) — `taikyoku.md` "Nowhere else" wording must change.
- **C9 diverges from the shipped demo** (Title Case vs sentence case in
  `taikyoku.demo.tsx` / `da2-retrospective`) — flagged as a
  no-break convention change, not a regression.
- **C8 em-dash carve-out** also saved to long-term memory (cross-project
  user style, not just DA2).
- **C10–C13 form one coherent JP system**: role-mapped register (C10) +
  per-role particle consistency (C11) + strict-but-katakana-tolerant
  typesetting (C12) + anchored-headline bilingual mirroring (C13).

---

## Phase 7 — rollup (pending Session C approval)

Sessions A (8), B (triage + 19), C (13) = the brief's full three-session
refinement interview. **`themes/taikyoku.md` has NOT been edited** —
REFINEMENT.md is the decision log; reconciling decisions into the theme
contract is the post-approval step (per the brief's "updated
taikyoku.md once approved").

**Sessions A + B + C all APPROVED 2026-05-18. The Phase 7 refinement
interview is COMPLETE.** No Session D — Phase 7 ends here.

Status of the three closing items:

1. ✅ **DONE — `themes/taikyoku.md` reconciled** (2026-05-18, on
   explicit user instruction). Full rewrite from approved A/B/C:
   Archivo→Helvetica Neue, Cinzel/HomuraM added, per-role CJK scale,
   paper-tint-2 + accent-negative + brand-red + gradient variants, gold
   doctrine change, breath bookend, density-derived motion, tk-draw
   boundary, cross-fade, Prata in card/plotted roles, Prata-italic
   scoped to person roles, new Voice & language + Component library
   sections, version header + compatibility note + changelog. The five
   fixed-component code blocks preserved (font strings swapped). Demo +
   retrospective untouched (flagged in-doc as frozen reference, not
   regression).
2. ⏳ **Phase 8/9 work queue** = every `PENDING` note in this document
   (HomuraM woff2 files; confirm exact hexes for `paper-tint-2`,
   `accent-negative`, `brand-red`; `earth`/`warm-energy` gradient stops;
   logo copy-in; WordmarkLockup/KanjiSeal build; gallery; component
   library). Carried forward — not part of Phase 7.
3. ⏳ Reserved component slot #15 stays open for Phase 9.

**Phase 7 is complete.** Interview (A+B+C) approved and frozen; the
theme contract reflects it. Remaining items (2, 3) are explicitly
Phase 8/9 scope, not Phase 7.

---

## Phase 8 — Japanese rendering (in progress, started 2026-05-18)

### Prerequisite discovery (diligence before build)

Phase 8's brief said "surface what's missing before assuming." Checking
the filesystem found the brand assets, which resolved the apparent
blockers and surfaced conflicts with the older Brand Style Brief
(`TKYK_Preset/Brand Style Brief.md`):

- **HomuraM fonts located** — `Assets/Branding/Fonts/GMingChao-*/` as
  `.otf`: `04HomuraM-Medium-2.otf` (Medium=body), `05HomuraM-SemiBold-2.otf`
  (SemiBold=headlines), `06HomuraM-Bold-2.otf` (Bold = the Session A
  "display weight"). Not a missing prerequisite — present, needed
  `.otf→.woff2` conversion.
- **brand-red pinned** = `#C00000` (Brand Style Brief line 53: "kanji
  seal stamp 大, danger/emphasis only"). Replaces the PROVISIONAL.
- **WordmarkLockup/KanjiSeal validated** — the brand brief describes the
  大+TAIKYOKU·大局 lockup and a red 大 seal "behind the section number,
  never primary logo." It is a typographic construction, NOT a trace of
  the brushstroke `TKYK_logo-*.svg` (that is the separate TKYK mark).
  The Phase 7 synthesis spec stands.

### Phase 8 resolved decisions

- **Font conversion:** `.otf→.woff2` done in-session via `pip3 fonttools
  + brotli`. Output: `themes/taikyoku/assets/fonts/HomuraM-Medium.woff2`,
  `HomuraM-SemiBold.woff2`, `HomuraM-Display.woff2` (Display ← Bold).
  Weight map: Medium 500 (JP body), SemiBold 600 (JP headlines), Display
  700 (section kanji). `local()` + Noto Serif JP remain fallbacks.
  - ✅ **DONE** — conversion ran clean (exit 0). Files present + valid
    WOFF2/CFF: Medium 4.72MB, SemiBold 4.81MB, Display 5.00MB
    (~14.5MB total).
  - *PENDING (optimization, Phase 9):* full CJK fonts are glyph-heavy;
    per-deck subsetting (pyftsubset on the deck's used codepoints) would
    cut this by ~95%. Not blocking (brief deprioritised single-file
    portability; linked assets OK), but flag for the bilingual reference
    deck.
- **Red token (resolves conflict #6):** keep the Phase 7 split with
  **distinct hexes**. `brand-red` = `#C00000` (KanjiSeal seal ornament,
  from brand brief). `accent-negative` = a distinct red, **not**
  `#C00000`, so data-negative never visually collides with the brand
  seal. Both are separate tokens; `compose-deck` never substitutes.
  - *rationale:* honors the approved Phase 7 no-collision intent while
    taking the brand brief's concrete seal value; the data red must be
    visually separable from the brand seal on the same slide.
  - *PENDING:* pick the exact `accent-negative` hex (cooler/darker than
    #C00000, must read negative on paper + dark, distinct from gold).

### Phase 8 — brand-brief reconciliation (case-by-case)

User chose case-by-case on the 6 Phase-7-vs-Brand-Style-Brief conflicts.
#6 (red) resolved above. Conflicts #1–#5 interviewed one at a time
below; each reopens/confirms a slice of the approved Phase 7 contract,
so each is logged decision + rationale here and propagated to
`taikyoku.md`.

#### Conflict 1 of 5 — Card surface treatment

- **decision:** **Phase 7 flat governs.** Card surfaces stay the flat
  3-step ramp (paper / paper-tint / paper-tint-2), no shadows, hairline
  separation, sharp corners. The Brand Style Brief's grey-gradient +
  12px-radius + drop-shadow card spec is **superseded** (not adopted,
  not hybridised).
- **rationale:** The flat "structure carries depth, not fill" discipline
  is what makes the refined system distinct from a generic SaaS deck;
  it was the deliberate Phase 7 production-grade choice and the user
  reaffirmed it over the older brand brief.
- **propagate:** no change to `taikyoku.md` (already flat) — record that
  this was challenged by the brand brief and explicitly upheld, so a
  future reader doesn't "fix" it back to gradient/shadow.

#### Conflict 2 of 5 — Card role label typography

- **decision:** **Hybrid — italic-Prata role kicker.** Cards carry a
  small **italic Prata role-word kicker** (brand cue from the Brand
  Style Brief, restored). The card **title** stays Prata non-italic
  (Phase 7 Archetype 16). Generic systemic labels (eyebrow/folio/section
  TOC etc.) stay Helvetica Neue tracked caps.
- **convention update:** the Prata-italic scope **widens** from
  "person/attribution roles only" (Session B cross-cutting #1) to
  **"person/attribution roles AND the card role-word kicker."** Still
  NOT generic caps labels.
- **rationale:** the italic-Prata role-word is a deliberate brand
  signature worth keeping; scoping it as a *kicker* (not the title)
  preserves the Archetype 16 "card title = Prata" decision and the
  one-caps-system for everything else — both authorities honored without
  a full reversal.
- **propagate:** `taikyoku.md` — update the Prata-italic convention line
  and the type-scale "Role label (person)" row to also cover the card
  role-word kicker; add a card role-kicker row. Note this supersedes
  cross-cutting #1's wording (the rule evolved; the entry stands as
  history).

#### Conflict 3 of 5 — Eyebrow font (Cinzel vs Helvetica Neue)

- **decision:** **Phase 7 governs.** All eyebrows/folios = Helvetica
  Neue tracked caps. Cinzel stays **wordmark-only**. The Brand Style
  Brief's Cinzel-eyebrow (and Montserrat-caps allowance) is superseded.
- **rationale:** explicit locked narrowing in the extensions brief +
  Session A Topic 3; Cinzel at 22px tracked running caps hits the
  "contrast breaks at small caps" failure the brand brief itself warns
  about — HN is the correct tracked-caps face.
- **propagate:** no `taikyoku.md` change (already HN). Record that
  brand-brief Cinzel-eyebrow + Montserrat-caps were challenged and
  explicitly rejected (no Montserrat enters the system).

#### Conflict 4 of 5 — Montserrat for caps/labels

- **decision:** **Phase 7 governs — Montserrat fully excluded.** No
  Montserrat anywhere. Helvetica Neue covers all caps including bold
  uppercase block labels (HN 700). Font system stays 5 families:
  Prata, Helvetica Neue, Cinzel (wordmark), HomuraM (JP), JetBrains
  Mono.
- **rationale:** consistent with Conflict 3; a second caps face buys
  marginal differentiation for real system complexity, against the
  theme's restraint thesis.
- **propagate:** no `taikyoku.md` change. Record Montserrat as
  considered-and-rejected so it isn't reintroduced from the brand brief.

#### Conflict 5 of 5 — Surface grey values

- **decision:** **Phase 7 cool ramp governs.** `paper-tint` = `#F4F7FB`,
  `paper-tint-2` = **`#E9EEF4` (PROVISIONAL → LOCKED)**. Brand brief's
  warm `#F2F1F0`/`#AFAFAF` superseded; `#AFAFAF` rejected as a surface
  (too dark; it is `ink-faint`, and Conflict 1 killed the gradient).
- **rationale:** cool tints harmonize with the cool gradient stop and
  the cool-content / warm-cover identity; locking #E9EEF4 closes the
  Session A Topic 8 PENDING.
- **propagate:** `taikyoku.md` — drop `PROVISIONAL` on `paper-tint-2`,
  value `#E9EEF4`.

### Phase 8 — case-by-case reconciliation COMPLETE

All 6 Phase-7-vs-Brand-Style-Brief conflicts resolved (1–5 above + #6
red). **Net: Phase 7 upheld on 4 (card surface, eyebrow, Montserrat,
surface tints), 1 hybrid (card role kicker), 1 split-with-values (red).**
The approved Phase 7 system stands; the brand brief contributed concrete
values only.

### Phase 8 — locked values (closing Phase 7 PENDINGs)

- `brand-red` = **`#C00000`** (Brand Style Brief; KanjiSeal seal only).
- `accent-negative` = **`#9B2226`** — locked proposal: a deep
  brick-crimson, clearly darker/cooler than the vivid `#C00000` seal so
  data-negative never reads as the brand stamp on the same slide; legible
  on paper and on the future dark canvas; distinct from gold `#FFE1A4`.
  Verify visually on the bilingual reference deck (not a blocking
  PENDING — locked unless the reference deck shows a clash).
- `paper-tint-2` = **`#E9EEF4`** (locked, Conflict 5).
- Prata-italic scope = person/attribution roles **+ card role-word
  kicker** (Conflict 2).

### Phase 8 — build queue (COMPLETE 2026-05-18)

1. ✅ Logos copied → `themes/taikyoku/assets/logos/TKYK-mark-dark.svg`,
   `TKYK-mark-white.svg`.
2. ✅ `taikyoku.md` updated: locked `brand-red #C00000` /
   `accent-negative #9B2226` / `paper-tint-2 #E9EEF4`; HomuraM ×3
   `@font-face` (local() → bundled woff2 → Noto Serif JP) + a Japanese
   font-loading subsection; Prata-italic widened to card role-kicker +
   type-scale rows added; Phase 8 changelog entry; asset-attribution
   rewritten.
3. ✅ `WordmarkLockup` (full/mini, Cinzel sized off the square) +
   `KanjiSeal` (#C00000 大 stamp) added to Fixed components.
4. ✅ `BilingualHeadline` (latin-jp / jp-latin / single-*, anchored 1:1,
   CJK ≈0.92× display scale) added — covers all three brief primitives.
5. ✅ Reference deck `Projects/2026-05-18_taikyoku-bilingual-ref/`
   (5 pages) — **compiles clean** (Vite transformed 69.8KB JS, no
   errors; module imports/JSX/types all resolve) and is served by the
   dev server. Opened in-browser for visual confirmation.

### Phase 8 — known caveat (PENDING follow-up)

**Bundled woff2 not served by the open-slide dev server via relative
URL.** `url('../../themes/taikyoku/assets/fonts/HomuraM-*.woff2')`
returns the SPA shell (Vite catch-all), so in-browser the deck falls
back to **Noto Serif JP** for Japanese unless HomuraM is OS-installed.
Only the absolute `/@fs` path serves the real font. Bilingual layout /
CJK scale / components still verify via the Noto fallback (this is
exactly what the contract's fallback is for), so it is **not a blocker**
— but to make the *bundled* HomuraM actually load in-browser, a
follow-up is needed: determine open-slide's static-asset serving for
theme assets (co-locate fonts where served, or use a Vite asset import
/ `?url`, or an `@font-face` path open-slide resolves). Tracked as
Phase 8/9 follow-up; does not reopen any Phase 7/8 decision.

> **UPDATE 2026-05-18 — FIX APPLIED.** The user confirmed the
> Vite-imported logo renders, then chose to wire bundled HomuraM the
> same way. Done: the reference deck now `import`s the three
> `themes/taikyoku/assets/fonts/HomuraM-*.woff2` as URL assets and
> builds the `@font-face src` from the imported URLs (cross-dir import
> resolved by Vite to `/@fs/...?import` — no fs-allow rejection; deck
> compiles clean). Caveat status: ✅ **FULLY RESOLVED** — user confirmed
> "HomuraM is loading properly" in-browser (then JP body moved to Noto
> Sans JP by choice, item 6). The bundled-font serving problem is closed. ✅ The contract's "Japanese
> font loading" section has been rewritten to the proven Vite-import
> form — the broken relative-`url()` example is removed so future decks
> copy the working pattern.

### Phase 8 — post-verification iteration (user review 2026-05-18)

After viewing the reference deck the user directed four changes:

1. **KanjiSeal dropped — DEFERRED.** Red 大 seal removed from the deck;
   an alternate implementation will be explored later. `taikyoku.md`:
   KanjiSeal spec marked DEFERRED (parked, not deleted); `brand-red
   #C00000` token RESERVED/UNUSED (seal was its only consumer);
   Section-divider's reserved seal slot stays reserved, renders nothing.
   - *reverses:* the Phase 8 KanjiSeal build + part of Session B
     Archetype 15. The slot reservation stands; the seal does not ship.
2. **WordmarkLockup PARKED.** User judged the typographic lockup "not
   looking good." Shipping brand mark is now an **image asset**, not the
   CSS/typographic reconstruction. WordmarkLockup spec retained as
   parked design history; not used by decks.
3. **Image-asset convention established.** Future decks use image assets
   (logo first) via **Vite import from `Projects/<slug>/assets/`** —
   relative `url()` strings are NOT served by open-slide (Phase 8
   finding). Single-file HTML portability sacrificed — **explicitly
   accepted by the user** (already brief-deprioritised). Documented in
   `taikyoku.md` → "Image & media assets". The reference deck imports
   `./assets/tkyk-mark.svg`; compiles clean and — ✅ **CONFIRMED
   in-browser by the user 2026-05-18** — the logo image renders. The
   convention is **proven**, and the same mechanism is the proven fix
   path for the bundled-woff2 caveat.
4. **Cover breath dropped (from the reference deck).** Removed `breath`
   from the cover; `tk-breath` keyframe/usage gone from the deck.
   - ✅ **CONTRACT DECISION (user 2026-05-18): KILL BREATH ENTIRELY.**
     `tk-breath` removed from `taikyoku.md` completely — keyframe, the
     Rules bullet, the budget-exception clause, the Aesthetic "bookend"
     prose, and the Example-usage cover animation. No cover breath, no
     closing breath, no bookend, **no ambient/looping motion of any kind**
     in the theme. This **deliberately overturns** the previously
     doubly-locked **Session B Archetype 19** + **Session C C4** + the
     Phase 7 cross-cutting amendment #4 (breath bookend). Those entries
     stand as history; this is the superseding decision. Cover may still
     carry one **static** (un-animated) radial glow.
5. **Bundled HomuraM wired (Vite-import @font-face) — CONFIRMED.** User
   confirmed HomuraM renders in-browser. Contract's font-loading section
   rewritten to the Vite-import form; bundled-woff2 caveat resolved.
6. **JP body font split — Noto Sans JP (user 2026-05-18, ✅ CONFIRMED
   in-browser: "working as expected, size and weight are fine").** After
   seeing HomuraM render, the user moved **Japanese body prose off
   HomuraM onto Noto Sans JP**; HomuraM stays for JP **display /
   headline / large kanji** only. Body weight 400 and the ≈0.88× CJK
   size ratio confirmed acceptable as-is (no further tuning requested). Rationale: brush-serif HomuraM reads heavy at body
   size; Noto Sans JP mirrors the Inter sans Latin body (theme is
   serif-display + sans-body in both scripts). Noto Sans JP via Google
   Fonts (w400/500) — not bundled (a Google font is fine for the body
   face; the licensed HomuraM stays bundled for display).
   - **Supersedes:** Session A Topic 1 ("HomuraM Medium = JP body") and
     the Session A Topic 2 CJK-body type-scale row. Those entries stand
     as history; this governs. Propagated to `taikyoku.md` (Japanese
     typography bullet, type scale, font-loading section, BilingualHeadline
     note, Aesthetic, changelog) and the reference deck (`f.jpBody` =
     Noto Sans JP; `f.jpDisplay` = HomuraM; deck recompiles clean).
7. **Language model redefined — no same-slide bilingual (user
   2026-05-18).** The reference deck must NOT be literally bilingual.
   Restructured so each beat is an **English slide then its Japanese
   counterpart** (one language per slide, never mixed) — now 10 slides
   (Cover/Section/Body/Data/Closing × EN→JP). Recompiles clean.
   - **Durable convention** (references / examples / component
     libraries / galleries): demonstrate the theme per-language on
     **separate consecutive slides, EN first then JP**. Never both
     languages on one slide.
   - **Production model:** decks are **mono-language** — all-English
     (allowing limited, relevant Japanese) **or** all-Japanese (allowing
     limited, relevant English). No mirrored/bilingual production
     layout. Cross-language is an occasional inline exception only.
   - **Supersedes Session C C13** (same-slide "anchored-headline
     mirror") and **clarifies the Session A** bilingual stance ("JP
     opt-in" = an all-JP deck, not a mirrored one). C13/Session A
     entries stand as history; this governs. `BilingualHeadline` mixed
     modes (`latin-jp`/`jp-latin`) parked; `single-latin`/`single-jp`
     only. Propagated to `taikyoku.md` (Bilingual section,
     BilingualHeadline note, changelog) + the deck `log.md`.

---

## Phase 9 — Component library (in progress, started 2026-05-18)

Work Stream 2. Scope confirmed with the user before building:
**spec-build components first** (the screenshot skill is deferred — all
19 Tier 1 archetypes are already fully specified in Session B above, so
Tier 1 is spec-driven not screenshot-driven); **English-only gallery**;
**defer** the dark-variant spike (Session A Topic 6) and HomuraM
subsetting to a later increment.

### Increment 1 (2026-05-18) — scaffold + Group 1A

- Scaffolded `themes/taikyoku/components/`. Built the six foundational
  Group 1A components from their Session B specs, **named by intended
  use** (Phase 7 locked): `opening-hero` (Arch 1), `quarterly-metrics`
  (Arch 3), `product-comparison` (Arch 2), `headline-metric` (Arch 4),
  `customer-voice` (Arch 5), `deck-contents` (Arch 6). Each
  self-contained (redeclares `c`/`f`), header-commented, props with
  defaults, variant/density per spec.
- Architecture decision: full-slide archetypes render their own canvas
  (`opening-hero`); the other five are **canvas-agnostic content
  blocks** a Page wraps in PaperCanvas (atomic, compose-into-Pages —
  Phase 7 granularity decision). Recorded so 1B/1C follow the same rule.
- Gallery `themes/taikyoku.gallery.tsx` (English-only) + thin viewer
  `Projects/2026-05-18_taikyoku-gallery/` so it's reviewable at
  `/s/...`. All 6 components + gallery + viewer **compile clean** (Vite
  @fs transform, no errors). Opened in-browser for user review.
- **Motion vocab addition:** `tk-growY` — vertical sibling of `tk-grow`
  (scaleY), needed by `product-comparison` (column divider) and
  `deck-contents` (progress thread). Session B Archetype 2 specified
  "tk-grow (scaleY)" but the theme's `tk-grow` is scaleX-only;
  `tk-growY` reconciles this faithfully rather than a no-op/hack. Added
  to `taikyoku.md` Motion (same caps: structural-only, ≤1.6s,
  one-long-motion).
- **Deferred to later Phase 9 increments:** Group 1B (8), Group 1C (5),
  the `component-from-screenshot` skill, dark-variant gallery spike,
  woff2 subsetting, reserved slot #15.

### Increment 2 (2026-05-18) — Group 1B + 1C + full variant coverage

User: "Do both Group 1B and 1C, as well as variants … and hydrate
these components with a little more content."

- **Group 1B (8) built** from Session B specs: `chart-hero`
  (narrativePosition side/below + annotations), `timeline`
  (milestones/phased), `roadmap` (quarter-columns/swimlanes/
  now-next-later), `methodology` (stack/loop/pillars), `before-after`
  (stacked-overlay/diff-list), `bio-card` (spotlight/grid/
  lead-supporting), `image-led` (full-bleed/framed; own canvas),
  `logo-cluster` (monochrome default + toggle).
- **Group 1C (5) built — Phase-8-reconciled** (these absorb the
  post-verification reversals, not just the raw Session B text):
  `section-divider` (AccentRule beat, gradient-variant prop; **KanjiSeal
  slot reserved but renders NOTHING** — seal deferred; no breath),
  `value-grid` (card title→Prata, italic-Prata roleKicker, density +
  surface bare/tint/tint2), `process-flow` (step numbers→mono, status
  blocked→accent-negative), `quadrant` (plotted labels→Prata, axes
  draw-then-plot, highlightQuadrant→paper-tint-2), `closing` (**gold
  OFF by default / deck-assigned; NO breath/bookend; WordmarkLockup
  PARKED → `mark` ReactNode = the deck's brand image asset**).
  - Naming note: "three-card value grid" shipped as `value-grid`;
    "2×2 quadrant" as `quadrant`; "process/workflow" as `process-flow`
    (by-use names).
- **Architecture rule applied consistently:** full-slide archetypes
  (`opening-hero`, `image-led`, `section-divider`, `closing`) render
  their own canvas; the other 15 are canvas-agnostic blocks a Page/
  Stage wraps. `closing`/`section-divider` reconciled: breath removed
  (Phase 8 kill), so neither animates a canvas — entrance motion only.
- **Gallery organised by COMPONENT TYPE** (revised 2026-05-18 — not the
  Phase-7 1A/1B/1C build groups): five `section-divider` slides —
  **01 Covers & Dividers · 02 Metrics & Data · 03 Compare & Transform ·
  04 Time & Flow · 05 People & Proof**. Simple titles only; exposition
  lives in the divider kicker (eyebrow), never the title. The
  `section-divider` component is dogfooded as the gallery structure.
  ~38 pages total.
- **Gallery** rewritten to **33 component pages** — one per component per variant
  (roadmap ×3, methodology ×3, bio ×3, timeline ×2, chart ×2,
  before-after ×2, deck-contents ×2, metrics ×2, value-grid ×2 to show
  the surface ramp, image-led ×2) — with **hydrated** realistic content
  (full metric sets, multi-point comparisons, real-sounding copy).
  English-only (Phase 8 convention).
- **Verification:** all 19 component files + gallery + Projects viewer
  compile clean via Vite @fs transform (no transform/resolve/syntax
  errors); `/s/2026-05-18_taikyoku-gallery` returns 200. In-browser
  visual review is the user's (opened).
- **Still deferred:** `component-from-screenshot` skill, dark-variant
  gallery spike (Session A Topic 6), woff2 subsetting, reserved slot
  #15. These remain the open Phase 9 items.

### Increment 3 (2026-05-18) — Dark-variant spike (Session A Topic 6)

Deliverable: dark token set + light/dark comparison render + go/no-go.
**Deviation (deliberate):** Session A's PENDING said "add a dual-mode
render to taikyoku.gallery.tsx." Instead built a **separate** spike deck
`Projects/2026-05-18_taikyoku-dark-spike/` (4 highest-risk archetypes,
each Light→Dark). Rationale: the 19 production components hard-redeclare
their light `c` tokens inline (the portability convention) — adding
dual-mode to the real gallery would mean destabilising all 19 for a
*spike*. A separate comparison deck proves the aesthetic without
touching production. Logged so it's a known choice, not an omission.

**Dark token set — ✅ ACCEPTED by the user 2026-05-18** (locked as the
dark-reference palette for the future dark-mode phase; no longer
provisional):

**Organizing metaphor (user 2026-05-18): light = DAYTIME, dark =
NIGHT.** Light gradient reads as day (light-blue sky → warm sun —
unchanged). Dark reads as night: **deep indigo night sky → ashen
moonlit grey** — a visible gradient but the dark stop sits at 12% so
the slide stays overall dark; the moon is cold ashen grey (not ivory,
not yellow); night "ink" is a faint moonlight ivory, not stark white.
This
**supersedes the Brand Style Brief's `#0E2841→#7A5F2A` dark inversion**
(brand-brief stands as history; the night reading governs).

| Token | Light (day) | Dark (night) | Note |
| --- | --- | --- | --- |
| gradient | `#A6C9EB→#FFE9BF` | `#151030 40% → #8B8B96 100%` | day sky→sun · night: deep indigo → **ashen moonlit grey**. Indigo stop at **40%** (solid indigo covers more of the slide, still < half) then ramps to the darkened grey |
| canvas (paper eq) | `#FFFFFF` | `#141029` | deep indigo |
| panel (tint eq) | `#F4F7FB` | `#201A3C` | lighter indigo |
| ink ramp | `#0A0A0A…` | `#E6E0CE / #ACA6BC / #786F92` | faint moonlight ivory → muted lavender-grey |
| accent (purple) | `#7030A0` | `#B388E0` | lifted (accepted) — #7030A0 too low-contrast on indigo |
| accent-hot (gold) | `#FFE1A4` | `#FFE1A4` | unchanged — pops on dark; still carries the one-moment |
| accent-negative | `#9B2226` | `#E26D6F` | lifted (accepted) — #9B2226 ≈ invisible on indigo |
| line/hairline | `rgba(0,0,0,.12)` | `rgba(230,224,206,.14)` | faint ivory-tinted on night |
| logo monochrome filter | `grayscale(1) brightness(0)` | `+ invert(1)` | mode-dependent — black logo is invisible on dark |

**Findings (structural — visual judgment is the user's):**

1. ✅ The dark *aesthetic* is viable — now a deliberate **night**
   reading (indigo → moonlight ivory; moonlight-ivory ink). Gold is
   unchanged and still carries the one-moment (the gradient no longer
   uses gold — day/night metaphor, supersedes the brand-brief dark).
2. ⚠️ **Accent purple and accent-negative need different VALUES on
   dark** (not the same token recolored by canvas). Dark is not a
   canvas swap — it's a palette swap.
3. ⚠️ **Monochrome logos break on dark** — `brightness(0)` renders the
   logo black (invisible); dark requires `invert(1)`. Any hardcoded
   filter is mode-wrong in the other mode.
4. 🔴 **Architectural cost (the real go/no-go driver):** all 19 Tier 1
   components **hard-redeclare light hex tokens inline** (the
   portability convention from Phase 7/9). Production dark therefore is
   **not** a wrapper/context add — it requires token indirection across
   every component: either a `mode` prop threading a token map, or
   migrating hardcoded hex → CSS custom properties the slide sets per
   mode. The latter is cleaner but contradicts the current
   "redeclare-hardcoded-for-portability" rule. Either way it is a
   library-wide refactor.

**GO / NO-GO: CONDITIONAL GO.** Dark is aesthetically validated and
worth doing — but as its **own dedicated phase** (a token-indirection
refactor of the component layer + per-mode accent/red + mode-aware logo
filter), **not** bundled into Phase 9 component work and **not**
production-available yet. This honors Session A Topic 6 ("no production
decks in dark until the spike validates it"): the spike validates the
look and prices the cost. Recommended: keep the spike deck as the dark
reference; schedule "Phase: dark-mode token refactor" after Tier 1 is
accepted.

**✅ SPIKE PALETTE ACCEPTED (user, 2026-05-18).** The dark token set
above is **locked as the dark-reference palette** — no longer
provisional. It is the authoritative input for the future dark-mode
token-refactor phase. The conditional-GO conclusion is unchanged:
production dark remains gated on that phase (library-wide token
indirection); the palette being accepted does **not** make dark
production-available. `Projects/2026-05-18_taikyoku-dark-spike/` is the
canonical dark reference.

### Increment 4 (2026-05-18) — scope cut + subsetting

- **`component-from-screenshot` skill — DEFERRED to a future phase**
  (user, 2026-05-18). Work Stream 2's screenshot-driven component
  pipeline is parked, **out of Phase 9 scope** (no longer an "open
  Phase 9 item"). Rationale: all 19 Tier 1 components were spec-built
  from Session B; the screenshot tool was always for growth *beyond*
  Tier 1, so deferring costs nothing now. Becomes its own future phase
  alongside the dark-mode token-refactor phase.
- **HomuraM woff2 subsetting — DONE.** Strategy (user-chosen):
  **per-deck at finalize**. Built `scripts/da2-subset-fonts.sh` — scans
  `Projects/<slug>/*.tsx` for used codepoints + an ASCII/JP-punct/kana
  safety base, runs `fontTools.subset` on the three source woff2
  (theme = source-of-truth, never modified) → `Projects/<slug>/
  assets/fonts/HomuraM-*.woff2`. Verified on `2026-05-18_taikyoku-
  bilingual-ref`: **13.9M → 367K (−97.4%)** (370 codepoints; ~123KB
  per weight). Deck repointed to its own subset (`./assets/fonts/`),
  compiles + serves clean. `da2-finalize.sh` gained a non-fatal
  advisory when a deck still imports the shared 14MB theme fonts.
  Rare glyphs degrade to Noto Serif JP (the documented fallback).
  Documented in `taikyoku.md` font-loading section.
- **Remaining open Phase 9 item:** the reserved component slot #15
  (the only thing left in Phase 9; screenshot skill deferred out of
  scope, dark spike accepted, subsetting done).

### Phase 9 — COMPLETE (2026-05-19)

Marked complete by the user. Delivered: the full Tier 1 library (19
components, by-use names, variant+density, hydrated gallery grouped by
type), per-deck font subsetting, and the accepted dark-reference
palette (dark spike). **Slot #15 is formally left RESERVED** — no
archetype gap emerged; new slide types will be added in a future
session, named-by-use and built into the slot then. **Deferred to
their own future phases (not Phase 9):** `component-from-screenshot`
skill; dark-mode token-indirection refactor (productionizes the
accepted dark palette); slot #15 / new archetypes. Phase 9's scope is
closed.

---

## Phase 10 — prep: compose-deck ↔ library wiring (2026-05-19)

Phase 10 is the integration capstone: a real deck through the full
pipeline. Prereq surfaced and done first (user-chosen "wire
compose-deck, then Phase 10"):

- **`themes/taikyoku/COMPOSITION.md` written** — the DA2-owned
  composition spec (the engine `slide-authoring` skill is read-only +
  generic, so composition rules can't live there). Covers: 19-component
  catalog (by-use, variants/density/slots/canvas-type); beat→component
  mapping table; full-slide-vs-canvas-block assembly rule; corrected
  locked doctrine (gold deck-assigned not closing-default; NO breath;
  motion vocab incl tk-growY; HN not Archivo; three reds; Title Case);
  mono-language model; image-asset Vite-import + per-deck subsetting at
  finalize; return-summary additions. References taikyoku.md +
  REFINEMENT, doesn't duplicate.
- **`compose-deck` agent rewired** — COMPOSITION.md + the component
  library + each component's header comment added to Inputs;
  **replaced the stale "Phase 6 — Taikyoku-aware composition" section**
  (it still said `cover → GradientCanvas breath`, "closing is the
  default gold spot", listed `tk-breath`, treated WordmarkLockup/
  KanjiSeal as refuse-on-sight, Archivo) with a "Phase 7–9" section
  pointing to COMPOSITION.md + inlining the load-bearing reversals.
- Consistency swept: agent ↔ COMPOSITION.md ↔ taikyoku.md agree on
  breath (removed), gold (deck-assigned), motion (+tk-growY), fonts
  (HN), language (mono). The slide-authoring path the agent cites was
  verified present; left unchanged (read-only engine).
- **Not yet validated by an actual run — that IS Phase 10.** The
  wiring is the spec; Phase 10 exercises it on a real deck and surfaces
  whatever the spec missed.

---

## Phase 10 — integration capstone (2026-05-19) — DONE

Full pipeline run on `Projects/2026-05-19_taikyoku-seed-pack/` — a
semi-fictional Taikyoku seed information pack (agentic owner-level
assurance for capital projects/assets), 16 beats, composed from 12
distinct library components per COMPOSITION.md. Compiles clean, renders,
opened for review.

**What held (✅):**

- The pipeline produced a coherent on-doctrine deck end to end:
  order → memo → storyboard → composed index.tsx → renders.
- COMPOSITION.md's **beat→component mapping made composition nearly
  mechanical** — each storyboard beat named a component + variant/
  density; the composer followed the table without re-deriving intent.
- The corrected doctrine all held in a real build: **no breath**
  anywhere; exactly **one gold moment** (closing, deck-assigned, not
  auto-claimed); Title Case headlines; Helvetica Neue caps; Prata
  display + italic role-kickers; mono-English; logo as a Vite-imported
  image asset; single purple accent (accent-negative correctly **unused**
  — no negative data, and the composer did not force it).
- The **full-slide-vs-canvas-block rule worked cleanly**: opening-hero
  / section-divider / closing rendered their own canvas; the 11 content
  blocks were wrapped in a shared Paper canvas.

**Gap surfaced (the real Phase 10 finding):**

- **"Assemble from the library" is actually "transcribe-and-specialise
  the library spec into the one-file index.tsx" — not `import`.**
  compose-deck hard-rule #1 (one file, no sibling/imported component
  files) means a composed deck **reproduces** each component's code
  inline, specialised to the variant/density it uses. This works and is
  acceptable (decks are frozen-in-git artifacts; the library is the
  *spec/source-of-truth*, not a runtime dependency), but it has
  consequences: library bug-fixes do **not** propagate to already-
  composed decks, and the composer must faithfully re-derive variant
  logic. This was implicit; Phase 10 made it explicit. **Fix applied:**
  COMPOSITION.md §1 now states the transcribe-not-import model
  outright so future composers don't expect an import and know decks
  don't auto-inherit library changes.

**GO / NO-GO: GO.** The wired pipeline (memo → storyboard →
COMPOSITION.md-guided compose) produced a coherent, on-doctrine,
library-faithful deck end to end. The transcribe-not-import reality is
now documented, not a defect. Phase 10 validates Phases 7–9 work
together. Gates were collapsed for this validation run (semi-fictional)
— in real production memo/storyboard approval gates stand (logged in
the project log.md).

**Project status after Phase 10:** the brief's four phases (7
refinement · 8 Japanese · 9 library · 10 integration) are complete.
Outstanding = the explicitly-deferred future phases only:
`component-from-screenshot` skill, dark-mode token-indirection refactor
(palette accepted), reserved slot #15 / new archetypes. No open work in
the brief's core arc.

---

## Future phase — Dark-mode token indirection — DONE (2026-05-19)

The deferred dark productionization (spike palette accepted 2026-05-18)
is now built. Approach (user-chosen): **CSS variables + light
fallback**.

- **`taikyoku.md` "Theming tokens `--tk-*`":** the authoritative
  variable set — light fallback + accepted dark value per token — plus
  the ready-to-paste dark `:root` block. Convention amended:
  components use `var(--tk-NAME,<light-hex>)` (the light hex is the
  fallback, so standalone rendering + portability are preserved). This
  supersedes the "redeclare hardcoded hex inline" rule.
- **All 19 component files refactored** (scripted, exact quoted-token
  substitution — those hexes only occur in each file's `c` block;
  gradient builders also tokenized the `12%` position; logo-cluster
  filter tokenized). Fonts left untokenized (mode-invariant). All 19 +
  the gallery + existing decks **compile clean; light output unchanged**
  (fallbacks == prior hex — backward compatible, zero churn for light
  decks).
- **compose-deck + COMPOSITION.md wired:** light/dark is **per-deck,
  mono-mode** (like language). Light deck = nothing (fallbacks); dark
  deck = paste the dark `:root` block once in the top `<style>` and
  everything (gradient, ink, accent, paper-tint, the monochrome-logo
  filter, line) flips — no per-component/per-Page work. Composer must
  keep `var(--tk-*, …)` verbatim when transcribing (never re-hardcode).
- **Validated:** `Projects/2026-05-19_taikyoku-darkmode-check/` imports
  the *actual refactored* components and renders each LIGHT then DARK
  via the single `:root` block, **zero component changes** — compiles
  clean, served, opened. Mechanism proven (aesthetic was accepted on
  the spike). `taikyoku.md` Dark-variant section flipped SPIKED →
  PRODUCTION.
- **`brand-red` deliberately not tokenized** — it is reserved/unused
  (KanjiSeal deferred); no component consumes it, so no `--tk-brand-red`
  was added. Revisit if/when the seal's replacement ships.

**Scoping bug + fix (2026-05-19).** First cut set the dark vars via a
`:root{}` block in the deck `<style>`. Bug: open-slide injects page
styles into the shared document and slide DOM coexists, so `:root` is
**global and persistent** — dark pages bled into light pages (user:
"light mode renders as dark as well"). **Fixed:** mode vars are now
inline custom properties on a **per-slide wrapper element**
(`TK_LIGHT`/`TK_DARK` objects spread onto a full-bleed
`<div style={{…vars, width:'100%', height:'100%'}}>`). Inline custom
properties cascade only to that subtree → zero global state, no
light/dark contamination, deterministic regardless of how open-slide
composes the DOM. Propagated to taikyoku.md (replaced the `:root`
guidance with the wrapper pattern + `TK_LIGHT`/`TK_DARK`),
COMPOSITION.md, the compose-deck agent, and the validation deck
(`Projects/2026-05-19_taikyoku-darkmode-check/` — re-verified, no
`:root{}` selector, compiles + serves).

✅ **User-confirmed in-browser 2026-05-19:** "light and dark render as
expected" — light renders light, dark renders dark, no cross-
contamination. The dark-mode token-indirection phase is **COMPLETE**:
mechanism validated, scoping bug fixed and verified, palette accepted
(spike 2026-05-18). Dark is production-available per-deck via the
`TK_LIGHT`/`TK_DARK` wrapper.

Remaining deferred future work: `component-from-screenshot` skill;
reserved slot #15 / new archetypes.

---

## Master visual reference catalogue (2026-05-19) — feedback substrate

`Projects/2026-05-19_taikyoku-master-reference/` — a **59-page** pushed
catalogue, the substrate for the next refinement stage. Not a
production deck (mixes light/dark per-slide via the scoped `TK_*`
wrapper; mixes component + pure-prose + bilingual; no gates — logged in
its log.md). Imports the **real** library (auto-reflects components).
Organised by page type with section dividers (alternating light/dark —
section-divider dogfooded): Covers&Openers · Structure&Nav ·
Metrics&Data · Compare&Transform · Time&Flow · People/Voice/Proof ·
**Prose&Editorial** (new — pure typography/voice pages) · **Bilingual
Reference** (EN→JP separate slides) · **Mixed&Pushed** (multi-component
composed + density-stress) · Closing (the one gold moment). Features
all 19 components + key variants/densities, chrome incl. Folio, the
three reds, surface ramp, motion vocab (no breath), image asset,
HomuraM/Noto bilingual, light↔dark. Compiles clean; all imports
resolve; served + opened. **Next: user provides detailed feedback on
this catalogue → drives the next component/theme/aesthetic refinement
stage.**

---

## Phase 11 — Composition density (2026-05-19)

User feedback on the v1 catalogue: slides too empty / too much
whitespace; want mature production density + more multi-component
slides with better organisation + the planning agents improved.
Approach (user-chosen): **composition-only** — component defaults /
approved Phase 7 austerity **unchanged**; fullness comes from a
disciplined multi-component slide grammar + agent upgrades. Root cause:
one beat → one austere component → empty slide.

- **COMPOSITION.md §1.5 added — the organisation logic:** the
  production-slide *anatomy* (eyebrow strip · action/"so-what" title +
  subhead · body region with a primary + ≥2 supporting elements ·
  source/method line · folio — all five on every content slide); a
  **density floor** (≥3 content elements + source, fill ≈85–90% of the
  canvas, lone centred component forbidden); a **named layout grammar**
  (`primary-rail` 62/38 · `primary-band` · `two-up` · `anchored-rail` ·
  `dense-grid`) with zone budgets; a **support kit** (stat-callout,
  insight, labelled-list, annotation, mini-source) = slide furniture
  composed inline, **not new components**.
- **Agents upgraded:** `storyboard` now plans per beat an
  `action_title` + `primary` + `supporting` (≥2) + `source` + named
  `layout` (hard rule 7 = density floor; under-planned beats flagged,
  not shipped). `compose-deck` now assembles to the anatomy/grammar,
  enforces the density floor, forbids lone centred components.
- **Master reference rebuilt → v2** (`Projects/2026-05-19_taikyoku-
  master-reference/`, 34 pages — fewer but each far fuller). Every
  content slide = chrome + action title + primary library component +
  a supporting cluster (stat/insight/list/annotation) + source + folio,
  via the named layouts (`Rail`/`Band`/`TwoUp`/dense grid), light+dark,
  prose + bilingual preserved. Components imported **unchanged**
  (composition-only proven). Compiles clean; served; opened.
- Net: the empty-slide failure mode is now a spec-and-agent-level rule,
  not a per-deck accident. Phase 7 restraint is preserved *per
  component*; the *slide* is dense by construction. Next: user feedback
  on v2 → continues the refinement stage.

---

## Phase 11 — feedback round 1 (inspector comments, 2026-05-19)

User inspected v2 and left a stream of `@slide-comment` markers. Swept
per the engine apply-comments contract. **Mechanical/additive applied
in-line** (overflow→clip was wrong: replaced cramped Frame+Rail for
structural components with a `Structural` layout — full component room,
no echoing eyebrow; added an evidence `Cards` support kit; added a bench
member; gave the support kit staggered entrances; **fixed the recurring
"component doesn't fill its zone / whitespace on the right" bug at the
root — all layout primitive zone slots (`Rail`/`TwoUp`/`Band`) now
`display:block` so a block component fills the zone width**). Three
markers were **decisions, not slide edits**, ruled by the user inline:

1. **Count-up — SANCTIONED (supersedes Session B Archetype 3 + the
   forbidden-motion list).** User: "update brief — I want count-up for
   large metrics." Reversed the ban; sanctioned a **one-time count-up
   on large figures only** — `headline-metric` value + `quarterly-
   metrics` hero-lead. Constraints: once, on enter, ≈700ms ease-out, no
   overshoot, `tabular-nums` (no layout shift), honours
   `prefers-reduced-motion`, parses prefix/number/suffix. Built into
   those two components (small/delta cells deliberately excluded — the
   original "reads busy" objection still holds there). Propagated:
   taikyoku.md ("Count-up — SANCTIONED" + removed from forbidden),
   COMPOSITION.md motion bullet. **History preserved; this governs.**
2. **`Frame jp` (Bilingual·JP heading in HomuraM).** Not a doctrine
   change — the slide is Japanese, so HomuraM display is *correct* per
   the locked typography. Bug was the Phase 11 `Frame` hard-coding
   Prata. Added `jp?` → action title `HomuraM`, sub `Noto Sans JP`;
   applied to the JP bilingual slide. Aligns with the locked type
   doctrine; no reversal.
3. **deck-contents progress-map left-alignment.** Component-track fix:
   fixed-width (92px) number column so every title/descriptor shares
   one left margin.

All markers cleared; deck + touched components compile clean.
Recurring "fill the zone" comments were a real systemic finding →
fixed at the layout-primitive level (block zone slots), not per-slide.

**Regression + fix (2026-05-19): count-up must be HOOK-FREE.** The
first count-up build used `useState`/`useEffect` — the **first hooks
ever in the component library**. It blanked the whole deck ("slide
disappeared"): the library + open-slide render path are hook-free, and
hooks threw at render (transform was clean — a client runtime crash;
dev log showed only benign HMR notices). Re-implemented count-up with a
**ref-callback + `requestAnimationFrame`** (children default to the
final value — graceful with no JS / reduced-motion), zero hooks, no
`react` import. Codified as a hard constraint in taikyoku.md →
"Count-up — SANCTIONED" ("HOOK-FREE — mandatory"). Also restores the
gallery + gallery-viewer (they import these components).
