---
doc: stream-3-feedback-loop
status: round 1 shipped 2026-05-22 — commits 0ed046d · 8045688 · 80d530c. P2 / P3.b / P3.c / P4 remain open.
written: 2026-05-19 (Cowork flatten pass); CC prompt added 2026-05-22
audience: historical reference for round 1 (P1 + P3.a) — the design + CC prompt that produced the apply-comments-triage skill + smoke-check scripts. Open follow-ups remain a forward-looking spec.
related: HANDOFF.md (§4 Stream 3) · engine apply-comments skill ·
  themes/taikyoku/REFINEMENT.md App: count-up hook regression · App: Stream 3 round 1
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

- An implementation of **P2** (instance-local marker anchors) or
  **P4** (batched feedback rounds). Quality-of-life follow-ups; not
  in this round.
- A headless render check (**P3.b**) or visual diff (**P3.c**).
  Round 1 ships P3.a only — the dev-server log poll.
- Forking the engine's `apply-comments` skill. Stream 3 layers
  conventions on top via a DA2-owned triage skill; the engine skill
  is unchanged.

---

## Design decisions (locked for round 1)

### D1 — Round 1 scope = P1 + P3.a

Ship the recommended ship-first pair. P2 + P4 + P3.b/c are explicit
follow-ups; mention them in CLAUDE.md's "future" section but do not
implement.

### D2 — Triage layer lives in DA2, not in the engine

New DA2 skill at `.claude/skills/apply-comments-triage/SKILL.md`.
Trigger phrases: "apply comments", "sweep comments", "apply marker
comments". When triggered, the triage skill:

1. Scans the active deck's `index.tsx` (and any sibling project
   files) for `@slide-comment` markers.
2. Parses each marker's prefix (`fix:` / `decide:` / `brief:` /
   `ask:`; no prefix → defaults to `fix:`).
3. Splits the markers by class.
4. Delegates `fix:` markers to the engine's `apply-comments` skill
   (the existing sweep behaviour, untouched).
5. Routes `decide:` markers to `Projects/<slug>/log.md` under a
   "Pending decisions" section (project-scoped — affects this deck's
   composition or this slide's content).
6. Routes `brief:` markers to `themes/<theme-id>/REFINEMENT.md`
   under a new top-level "Pending brief changes" section
   (theme-scoped — affects the contract).
7. Answers `ask:` markers in the chat response and removes the
   marker from the deck file (no other change).
8. Runs the **P3.a smoke-check** (D4) after any `fix:` sweep that
   touched the deck file.
9. Reports counts per class + smoke-check result.

The engine's `apply-comments` skill is never called by the user
directly — the triage skill is the user-facing entry. The triage
skill calls the engine skill internally for the `fix:` slice.

### D3 — Decision queues use existing logs, not new files

- `Projects/<slug>/log.md` already exists per project. Add a new
  section at the top of the file:

  ```markdown
  ## Pending decisions

  - [ ] 2026-05-24 — slide-05/cards: should this advocate or be
    neutral? (route from `@slide-comment decide:`)
  - [x] 2026-05-23 — closing: pick gold target. **resolved:** gold
    on slide-09.
  ```

- `themes/taikyoku/REFINEMENT.md` gets a new top-level section
  above §1:

  ```markdown
  ## Pending brief changes (open for user ruling)

  - [ ] 2026-05-24 — Allow `tk-fadeOut` for slide-exit on cover-only
    transition. (route from `@slide-comment brief:`)
  ```

  Each entry timestamped, anchored to the slide and the marker's
  text. The user resolves by typing `approve decision <id>` (then
  Claude moves the entry into a numbered REFINEMENT section + the
  appendix per the supersession pattern) or `reject decision <id>:
  <reason>` (struck through with the reason). No silent edits to
  the theme contract — every entry needs explicit user approval.

### D4 — P3.a smoke-check: tail the dev-server log

Two small scripts. No new dependencies.

- **`scripts/da2-dev.sh`** — wraps `cd engine && pnpm dev` to
  `tee engine/.dev-server.log`. Users run *this* instead of bare
  `pnpm dev`. Existing terminal flow unchanged; the log file is
  new.

- **`scripts/da2-smoke-check.sh <slug>`** — touches
  `Projects/<slug>/index.tsx` (to provoke HMR), then tails
  `engine/.dev-server.log` for 3 s starting at "now". Greps the
  tail for `error`, `transform error`, `[plugin:vite]`,
  `ReferenceError`, `SyntaxError`, `Pre-transform error`. Exit `0`
  if clean, exit `1` with the offending lines if not.

`engine/.dev-server.log` is added to `.gitignore` (sandbox-local
artefact; tee output, not source).

The triage skill calls the smoke-check after any `fix:` sweep.
Smoke-check failure surfaces the error excerpt and aborts the
"done" report — the user knows the sweep compiled but didn't
render-verify.

### D5 — Backward-compat: no-prefix = `fix:`

Existing markers without a prefix continue to work — they're
treated as `fix:`. No need to migrate the master-reference deck or
any archived deck.

### D6 — Out of scope (explicit non-goals)

- Modifying the engine's `apply-comments` skill in any way.
- Detecting marker hoisting (P2 — the `<Cards>` instance-vs-helper
  ambiguity) — that's a future round.
- Batched-round `begin sweep` keyword (P4) — future round.
- Headless render check (P3.b) — future round; needs Playwright
  spike first.
- Auto-resolving `decide:` / `brief:` comments without user input.

---

## The CC prompt

Paste into Claude Code at repo root. Operates on a single branch:
`git checkout -b stream-3-feedback-triage`.

---

> Implement Stream 3 round 1 (P1 + P3.a) per
> `briefs/stream-3-feedback-loop.md`. D1–D6 are locked. Six phases
> (A read → B scripts → C triage skill → D queue conventions → E
> docs → F verify → G commit).
>
> ### Phase A — read first
>
> 1. Read this brief end-to-end (the design + D1–D6 decisions).
> 2. Read `engine/apps/demo/.claude/skills/apply-comments/SKILL.md`
>    (read-only engine reference — do NOT edit). Note its trigger
>    phrases, its inputs, and what it does. The triage skill calls
>    this one for `fix:` markers.
> 3. Read `.claude/skills/` to see the DA2 skill shape — both
>    `memo-to-minutes/SKILL.md` and `memo-to-one-pager/SKILL.md` as
>    references. Match their frontmatter + hard-rules style.
> 4. Read `scripts/da2-finalize.sh` and `scripts/da2-open.sh` for
>    the script style (relative paths, set -euo pipefail, mac/linux
>    portability).
> 5. Read `Projects/2026-05-19_taikyoku-master-reference/log.md` to
>    see the log-entry format the "Pending decisions" section will
>    extend.
> 6. Read `themes/taikyoku/REFINEMENT.md` §1 — note the
>    cross-reference style; the "Pending brief changes" section
>    will sit above §1 and use the same anchor convention.
>
> ### Phase B — scripts
>
> Write **`scripts/da2-dev.sh`**:
> - Resolves DA2_ROOT relative to script location.
> - Runs `cd "$DA2_ROOT/engine" && pnpm dev 2>&1 | tee "$DA2_ROOT/engine/.dev-server.log"`.
> - Forwards exit code of `pnpm dev`.
> - Header comment explains: this replaces bare `pnpm dev` for any
>   workflow that runs `da2-smoke-check.sh`.
> - Chmod +x.
>
> Write **`scripts/da2-smoke-check.sh <slug>`**:
> - Resolves DA2_ROOT.
> - Verifies `engine/.dev-server.log` exists; if not, error with
>   "Run scripts/da2-dev.sh in another terminal first."
> - Verifies `Projects/<slug>/index.tsx` exists.
> - Records `wc -l < engine/.dev-server.log` as the baseline cursor.
> - `touch Projects/<slug>/index.tsx` (provoke HMR).
> - `sleep 3`.
> - Tails the log from baseline to end: `tail -n +<baseline+1> engine/.dev-server.log`.
> - Greps the tail for these patterns (case-insensitive):
>   `error`, `transform error`, `\[plugin:vite\]`, `ReferenceError`,
>   `SyntaxError`, `Pre-transform error`, `Failed to compile`,
>   `Cannot find`.
> - Exit 0 if no match. Exit 1 with the offending lines if matches
>   exist. Print a one-line "✓ render smoke-check clean" on success.
> - Chmod +x.
>
> Add **`engine/.dev-server.log`** to `.gitignore` (one line at end).
>
> Update **`scripts/README.md`** to list both new scripts under their
> phase (call them Phase 11 / Stream 3 for provenance).
>
> ### Phase C — triage skill
>
> Create **`.claude/skills/apply-comments-triage/SKILL.md`**:
>
> - Frontmatter:
>   ```yaml
>   ---
>   name: apply-comments-triage
>   description: Pre-process @slide-comment markers — split by prefix (fix/decide/brief/ask), delegate fix to the engine apply-comments skill, route decide/brief to log queues, answer ask in chat. Runs the P3.a render smoke-check after any fix sweep.
>   triggers:
>     - "apply comments"
>     - "sweep comments"
>     - "apply marker comments"
>   ---
>   ```
> - "How it works" section: the 9-step flow per D2.
> - "Marker prefix grammar" section: copy from the brief's P1
>   bullet block.
> - "Routing rules" section: where each class goes (D2 steps 5–7).
> - "Smoke-check integration" section: when the triage calls
>   `da2-smoke-check.sh` and what it does with the result.
> - "Hard rules" section: don't fork the engine skill; don't
>   silently edit REFINEMENT.md or taikyoku.md off a `brief:`
>   comment; don't move a `decide:` / `brief:` entry to "resolved"
>   without an explicit user approval phrase; preserve unprefixed
>   markers as `fix:` for backward compat.
> - "Return contract" section: end every sweep with the counts per
>   class + smoke-check status (✓ clean / ✗ <error excerpt>) + a
>   list of new queue entries that need user attention.
>
> ### Phase D — queue conventions
>
> The triage skill writes to two locations. Document the shape in
> the relevant files so future agents know to expect them:
>
> 1. **`themes/taikyoku/REFINEMENT.md`**: add a new top-level
>    section above §1 titled "Pending brief changes (open for user
>    ruling)" with empty bullet template:
>    ```markdown
>    ## Pending brief changes (open for user ruling)
>
>    _Entries queued here by `apply-comments-triage` when a marker
>    uses the `brief:` prefix. Resolve via `approve decision <id>`
>    (moves into the numbered sections with appendix entry) or
>    `reject decision <id>: <reason>` (struck through, kept for
>    posterity). Never silently edited._
>
>    <!-- entries appended below -->
>    ```
>
> 2. **`.claude/agents/memo.md`** (the only agent that owns
>    `log.md` writes): note that `apply-comments-triage` may also
>    append to `Projects/<slug>/log.md` under a "Pending decisions"
>    section.
>
> Update **`Projects/2026-05-19_taikyoku-master-reference/log.md`**
> with the section template so the convention is visible on the
> live deck.
>
> ### Phase E — docs
>
> 1. **`CLAUDE.md`** — under "Skills", add a row for
>    `apply-comments-triage` (trigger phrases, what it does, where
>    it routes). Under "Locked Taikyoku constraints" or a new
>    "Inspector loop" section, document the prefix grammar.
> 2. **`HANDOFF.md`** — move Stream 3 from "design ready" to "DONE
>    round 1". List the commits. Note that P2 + P4 + P3.b/c stay
>    open as future rounds.
> 3. **`themes/taikyoku/REFINEMENT.md`** — append a new appendix
>    entry **App: Stream 3 round 1** noting what shipped and the
>    open follow-ups.
>
> ### Phase F — verify
>
> 1. **`bash -n` syntax check** on both new scripts.
> 2. **Boot test:** start `./scripts/da2-dev.sh` in one terminal;
>    confirm it serves at :5173 and `engine/.dev-server.log` is
>    populating.
> 3. **Clean-render smoke-check:** with the dev server up, run
>    `./scripts/da2-smoke-check.sh 2026-05-19_taikyoku-master-reference`.
>    Should exit 0 with "✓ render smoke-check clean".
> 4. **Failure path:** edit `Projects/2026-05-19_taikyoku-master-reference/index.tsx`
>    to introduce a deliberate syntax error (drop a closing brace).
>    Re-run the smoke-check. Should exit 1 with the offending Vite
>    error excerpt. Then revert.
> 5. **Triage skill dry-run (manual):** add one of each prefix
>    marker to a temporary slide in the master-reference (a `fix:`,
>    a `decide:`, a `brief:`, an `ask:`). Trigger the skill. Verify:
>    `fix:` was applied; `decide:` landed in `log.md`; `brief:` landed
>    in REFINEMENT.md's new section; `ask:` was answered in the
>    response with no file write; smoke-check ran after the `fix:`
>    sweep. Revert all temporary markers.
>
> ### Phase G — commit
>
> Three commits on the branch:
>
> 1. `feat(scripts): add da2-dev.sh + da2-smoke-check.sh (P3.a render verify)`
> 2. `feat(skills): add apply-comments-triage skill (P1 comment-prefix triage + P3.a wiring)`
> 3. `docs: document Stream 3 round 1; queue conventions; HANDOFF + REFINEMENT updates`
>
> Then open a PR / hand back to the user.

---

## What lands after this

- The inspector → apply → verify loop has a triage step that
  prevents doctrine-level comments from silently editing slides.
- Every `fix:` sweep gets a render smoke-check before being
  declared done — the count-up class of runtime regressions
  surfaces in 3 seconds, not at the next inspector visit.
- Two queue surfaces (`Projects/<slug>/log.md` and
  `REFINEMENT.md` top section) capture pending decisions, with
  explicit approval semantics matching the rest of DA2.
- P2 + P4 + P3.b/c remain open as future rounds; CLAUDE.md surfaces
  them in the "future" section so a future operator knows what's
  available.
