---
doc: stream-3-feedback-loop
status: design only — implementation not yet scoped
written: 2026-05-19 (Cowork flatten pass)
audience: future Cowork or Claude Code session designing the inspector → apply → verify loop
related: HANDOFF.md (§4 Stream 3) · engine apply-comments skill ·
  themes/taikyoku/REFINEMENT.md App: count-up hook regression
---

# Stream 3 — Tighter inspector → apply → verify loop

## What's wrong with the current loop

Observed during Phase 11 feedback round 1 (REFINEMENT.md → "Phase 11
— feedback round 1"). Four frictions:

1. **Comments stream faster than sweeps.** The user inspects the
   deck, marks ~12 things with `@slide-comment`, asks Claude to
   "apply comments." Claude sweeps — but by then the user has marked
   another 5. Either the sweep includes them (race) or it doesn't
   (split sweep). No batching cadence.

2. **Mechanical vs decision comments aren't triaged.** Most comments
   are mechanical ("add a card here", "fix the eyebrow alignment").
   But some are doctrine-level — Phase 11 round 1 contained "update
   brief, I want count-up for large metrics" mixed into the same
   stream of comments. That's a theme-contract change that gets
   logged in REFINEMENT, not a slide edit. Currently undifferentiated
   — they go through the same channel and get the same treatment.

3. **Markers hoist to shared helpers ⇒ ambiguous targeting.** When a
   user marks a card on slide 5, the marker often gets attached to
   the shared `<Cards>` component, not the slide-5 instance.
   "Apply this comment" is ambiguous: every slide that uses `<Cards>`
   sees the marker.

4. **Render smoke-check missing.** The Phase-11 count-up regression
   (App: count-up hook regression in REFINEMENT) compiled clean and
   passed every transform check — but the deck blanked at runtime
   because hooks crashed render. The verify step today is "did Vite
   transform succeed?" not "did the page render?". Transform-clean ≠
   renders-clean.

## Design proposals (not yet specced for build)

Four lightweight conventions / one tiny tool. Each is independent;
land any subset.

### P1 — Comment-prefix triage convention

Comments adopt a one-word prefix to declare their class:

```
@slide-comment fix:     a mechanical edit (default behavior)
@slide-comment decide:  a doctrine question — route to REFINEMENT, not the slide
@slide-comment brief:   change the theme contract / brief itself
@slide-comment ask:     not a comment, a question — Claude answers, no edit
```

`apply-comments` sweep behavior:

- `fix:` — apply in place (current behavior).
- `decide:` / `brief:` — **queue to REFINEMENT.md** as a new "open
  decision" entry. Surface the entry to the user for an explicit
  ruling (`approve decision: …` or `reject: …`). NEVER auto-edit the
  slide off a `decide:` / `brief:` comment.
- `ask:` — answer in the response thread; don't touch any file.

Backwards-compat: a bare `@slide-comment foo` (no prefix) defaults to
`fix:` — every existing deck still works.

This is the highest-leverage proposal. It collapses problem #2
entirely.

### P2 — Marker convention: instance-local IDs, not helper-hoisted

The marker doesn't attach to the rendered React component — it
attaches to a stable slide-instance ID. Convention:

```tsx
<Frame data-anchor="slide-05/cards" ...>
  <Cards data-anchor="slide-05/cards/inner" items={[...]} />
</Frame>
```

The inspector reads the nearest ancestor `data-anchor` value as the
anchor — so a marker on a `<Cards>` instance becomes
`slide-05/cards/inner`, not "every Cards in the deck."

For shared helpers like `<Stat>` or `<Insight>`, the anchor is set
at the call site, not in the helper definition. The composer / Claude
adds them when assembling the deck.

Trade-off: more boilerplate per slide. Mitigation: compose-deck
auto-emits anchors when transcribing (one per support-kit usage).

### P3 — Render smoke-check in verify

After every `apply-comments` sweep, run a render smoke-check before
declaring done. Three flavours, in increasing fidelity:

- **a. Console-log check** (cheapest). After file changes, the
  dev-server logs will show any HMR / transform errors. The verify
  step polls the dev-server log for ~3 s; flags any error.
- **b. Headless render** (medium). `puppeteer-core` or `playwright`
  navigates to `/s/<slug>` headlessly, waits for paint, checks
  `document.body.children.length > 0` AND no console errors. Detects
  hook crashes, blank slides, runtime exceptions.
- **c. Visual diff** (highest). Headless screenshot vs a baseline.
  Catches subtle visual regressions. Heavy; not for every sweep.

Recommended: ship (a) immediately (no new deps — just tail the dev-
server log). Land (b) when there's a real reason; skip (c) until
visual-diff regressions actually cost something.

### P4 — Batched feedback rounds

Convention, not code: the user accumulates markers, then types
`begin sweep` (case-insensitive). Claude takes that as the signal
to apply *every current marker* in one pass, run P3.a, and report.
New markers after `begin sweep` accumulate for the next round.

This collapses problem #1. Without it, every "apply comments" is a
race with the user's next click.

## Sequencing

These are independent. If exactly one ships, ship **P1** (the prefix
convention — biggest win). If two, add **P3.a** (render smoke-check).
P2 (anchors) and P4 (batched rounds) are quality-of-life.

## Out of scope

- **Auto-applying brief-level changes.** P1 says `decide:` and
  `brief:` always require explicit user approval. There is no
  shortcut. Doctrine drift would compound silently otherwise.
- **Replacing the engine's `apply-comments` skill.** Stream 3 layers
  conventions on top; it doesn't fork or rewrite the skill itself.
  (If the engine's skill makes layering hard, that's a separate
  upstream conversation.)
- **Inspector UI changes.** Out of DA2's scope. The engine owns the
  inspector. Open an upstream issue if the marker-hoisting is
  fixable there.

## What this brief deliberately does NOT promise

- A concrete build plan. The four proposals above are *designs*; a
  build plan needs spike work to know if e.g. P3.b's headless render
  fits in the existing finalize script. Treat this as the discussion
  doc, not the spec.
- An implementation timeline. Stream 1 (this flatten) is done. Stream
  2 (layout primitives, briefs/stream-2-layout-promotion.md) is the
  next prompt to run. Stream 3 lives behind those.
